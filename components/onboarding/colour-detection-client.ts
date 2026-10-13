/**
 * Client-only glue for photo colour detection: canvas decoding plus MediaPipe
 * face landmarking, hair segmentation and image embedding, feeding the pure
 * `lib/colour-detection` pipeline.
 */
import type { RgbaImage } from "@/lib/colour-detection/crops";
import type { DetectedColouring, Embeddings } from "@/lib/colour-detection/detect";
import type { FaceShape } from "@/lib/face-shape/measure";
import type { HairMask, PixelSource, Point } from "@/lib/colour-detection/regions";
import type {
  FaceLandmarker,
  ImageEmbedder,
  ImageSegmenter,
} from "@mediapipe/tasks-vision";

// Max edge length we feed the landmarker. Big enough for accurate landmarks,
// small enough to keep detection fast and memory light.
const CLIENT_MAX_EDGE = 512;

// MediaPipe assets. WASM via CDN (cached aggressively after first load); the
// face landmarker model is the 478-point mesh with iris refinement built in.
// calibration/scripts/extract.py must use the same models.
const WASM_BASE =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const LANDMARKER_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
const HAIR_SEGMENTER_URL =
  "https://storage.googleapis.com/mediapipe-models/image_segmenter/hair_segmenter/float32/1/hair_segmenter.tflite";
const EMBEDDER_URL =
  "https://storage.googleapis.com/mediapipe-models/image_embedder/mobilenet_v3_small/float32/1/mobilenet_v3_small.tflite";

export type PhotoDetectionOutcome =
  | {
      ok: true;
      detected: DetectedColouring;
      /** Undefined when the pose or expression is unsuitable for measuring. */
      face?: FaceShape;
      source: "photo";
    }
  | {
      ok: false;
      kind: "quality" | "unavailable" | "error";
      message: string;
    };

/**
 * Run the full on-device pipeline on a captured photo: decode → landmark →
 * quality gate → detect. Any failure (including models that can't load, e.g.
 * an old browser or blocked WASM) resolves to a non-ok outcome so the caller
 * can route the user to the manual swatches.
 */
export async function detectFromPhoto(file: File): Promise<PhotoDetectionOutcome> {
  let imageData: ImageData;
  try {
    imageData = await decodeToImageData(file, CLIENT_MAX_EDGE);
  } catch {
    return { ok: false, kind: "error", message: "Could not read that image." };
  }

  try {
    const [{ landmarker, segmenter, embedder }, lib] = await Promise.all([
      loadModels(),
      // The classifier weights are large; only fetch them once a photo is chosen.
      loadPipeline(),
    ]);
    const canvas = toCanvas(imageData);
    const faces = landmarker.detect(canvas).faceLandmarks ?? [];
    const landmarks = faces[0]?.map((p) => ({ x: p.x, y: p.y })) ?? [];
    const face =
      faces.length === 1
        ? lib.measureFace(faces[0], imageData.width, imageData.height)
        : undefined;
    const source = lib.pixelSourceFromRgba(imageData.data, imageData.width, imageData.height);
    const mask = segmenter ? hairMask(segmenter, canvas) : undefined;

    const detection = lib.detectColouring(
      source,
      landmarks,
      faces.length,
      mask,
      faces.length === 1 ? embed(embedder, lib, source, landmarks, mask) : {},
    );

    if (!detection.ok) {
      return { ok: false, kind: "quality", message: detection.quality.message };
    }
    return { ok: true, detected: detection.detected, face, source: "photo" };
  } catch {
    return {
      ok: false,
      kind: "unavailable",
      message: "Photo suggestions aren't available on this device right now.",
    };
  }
}

// --- canvas helpers -------------------------------------------------------

async function decodeToImageData(
  file: File,
  maxEdge: number,
): Promise<ImageData> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas context unavailable");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  return ctx.getImageData(0, 0, width, height);
}

function toCanvas(imageData: ImageData): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  canvas.getContext("2d")?.putImageData(imageData, 0, 0);
  return canvas;
}

type Pipeline = Awaited<ReturnType<typeof loadPipeline>>;

function loadPipeline() {
  return Promise.all([
    import("@/lib/colour-detection/detect"),
    import("@/lib/colour-detection/crops"),
    import("@/lib/colour-detection/regions"),
    import("@/lib/face-shape/measure"),
  ]).then(([detect, crops, regions, face]) => ({ ...detect, ...crops, ...regions, ...face }));
}

/** Embeds the same crops the classifier was trained on (see crops.ts). */
function embed(
  embedder: ImageEmbedder,
  lib: Pipeline,
  source: PixelSource,
  landmarks: Point[],
  mask: HairMask | undefined,
): Embeddings {
  const vector = (image: RgbaImage) =>
    embedder.embed(
      toCanvas(new ImageData(image.data, image.width, image.height)),
    ).embeddings[0]?.floatEmbedding;
  const face = lib.faceCrop(source, landmarks);
  return {
    face: face ? vector(face) : undefined,
    hair: mask ? vector(lib.hairOnly(source, mask)) : undefined,
  };
}

/** The hair segmenter's last confidence mask is "hair", at canvas size. */
function hairMask(segmenter: ImageSegmenter, canvas: HTMLCanvasElement): HairMask {
  const result = segmenter.segment(canvas);
  const mask = result.confidenceMasks?.at(-1);
  const data = mask?.getAsFloat32Array().slice();
  result.close();
  return (x, y) => data?.[y * canvas.width + x] ?? 0;
}

// --- MediaPipe loader (lazy, cached) --------------------------------------

type Models = {
  landmarker: FaceLandmarker;
  segmenter: ImageSegmenter | null;
  embedder: ImageEmbedder;
};

let modelsPromise: Promise<Models> | null = null;

function loadModels(): Promise<Models> {
  if (!modelsPromise) {
    modelsPromise = (async () => {
      const vision = await import("@mediapipe/tasks-vision");
      const fileset = await vision.FilesetResolver.forVisionTasks(WASM_BASE);
      const [landmarker, segmenter, embedder] = await Promise.all([
        vision.FaceLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: LANDMARKER_URL },
          runningMode: "IMAGE",
          // Detect up to 2 faces so the quality gate can reject multi-face shots.
          numFaces: 2,
        }),
        // Hair is optional: without the segmenter, hair is left to the user.
        vision.ImageSegmenter.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: HAIR_SEGMENTER_URL },
          runningMode: "IMAGE",
          outputConfidenceMasks: true,
          outputCategoryMask: false,
        }).catch(() => null),
        // Must match calibration/scripts/embed.py.
        vision.ImageEmbedder.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: EMBEDDER_URL },
          runningMode: "IMAGE",
          l2Normalize: true,
          quantize: false,
        }),
      ]);
      return { landmarker, segmenter, embedder };
    })().catch((err) => {
      // Reset so a later attempt can retry cleanly.
      modelsPromise = null;
      throw err;
    });
  }
  return modelsPromise;
}

let videoLandmarkerPromise: Promise<FaceLandmarker> | null = null;

/**
 * A separate VIDEO-mode landmarker for live camera guidance (a landmarker's
 * running mode is fixed per instance). Shares the WASM fileset and model.
 */
export function loadVideoLandmarker(): Promise<FaceLandmarker> {
  if (!videoLandmarkerPromise) {
    videoLandmarkerPromise = (async () => {
      const vision = await import("@mediapipe/tasks-vision");
      const fileset = await vision.FilesetResolver.forVisionTasks(WASM_BASE);
      return vision.FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: LANDMARKER_URL },
        runningMode: "VIDEO",
        // Two faces so guidance can ask for just one.
        numFaces: 2,
      });
    })().catch((err) => {
      videoLandmarkerPromise = null;
      throw err;
    });
  }
  return videoLandmarkerPromise;
}

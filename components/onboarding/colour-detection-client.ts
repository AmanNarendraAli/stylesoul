/**
 * Client-only glue for photo colour detection. This is the browser layer that
 * the pure `lib/colour-detection` pipeline plugs into — canvas decoding +
 * MediaPipe landmarking live here so `lib/` stays browser-free and portable to
 * React Native (which swaps this file for a native-camera equivalent).
 */
import {
  detectColouring,
  type DetectedColouring,
} from "@/lib/colour-detection/detect";
import type { PixelSource } from "@/lib/colour-detection/regions";

// Max edge length we feed the landmarker. Big enough for accurate landmarks,
// small enough to keep detection fast and memory light.
const CLIENT_MAX_EDGE = 512;
// Downscaled edge for the server-fallback payload (keeps the POST small).
const FALLBACK_MAX_EDGE = 160;

// MediaPipe assets. WASM via CDN (cached aggressively after first load); the
// face landmarker model is the 478-point mesh with iris refinement built in.
const WASM_BASE =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

export type PhotoDetectionOutcome =
  | { ok: true; detected: DetectedColouring; source: "photo" }
  | {
      ok: false;
      kind: "quality" | "fallback" | "error";
      message: string;
    };

/**
 * Run the full client pipeline on a chosen file: decode → landmark → quality
 * gate → detect. If landmarking is unavailable (old browser, WASM blocked) we
 * fall back to the self-hosted server route. Any hard failure resolves to a
 * non-ok outcome so the caller can route the user to the manual screen.
 */
export async function detectFromPhoto(file: File): Promise<PhotoDetectionOutcome> {
  let imageData: ImageData;
  try {
    imageData = await decodeToImageData(file, CLIENT_MAX_EDGE);
  } catch {
    return { ok: false, kind: "error", message: "Could not read that image." };
  }

  try {
    const landmarker = await loadFaceLandmarker();
    const result = landmarker.detect(toCanvas(imageData));
    const faces = result.faceLandmarks ?? [];
    const landmarks = faces[0]?.map((p) => ({ x: p.x, y: p.y })) ?? [];

    const detection = detectColouring(
      pixelSourceFromImageData(imageData),
      landmarks,
      faces.length,
    );

    if (!detection.ok) {
      return { ok: false, kind: "quality", message: detection.quality.message };
    }
    return { ok: true, detected: detection.detected, source: "photo" };
  } catch {
    // Landmarking failed — try the server fallback before giving up.
    return detectViaServerFallback(file);
  }
}

async function detectViaServerFallback(
  file: File,
): Promise<PhotoDetectionOutcome> {
  try {
    const small = await decodeToImageData(file, FALLBACK_MAX_EDGE);
    const response = await fetch("/api/analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        width: small.width,
        height: small.height,
        pixels: Array.from(small.data),
      }),
    });
    if (!response.ok) {
      return {
        ok: false,
        kind: "fallback",
        message: "Photo detection is unavailable right now.",
      };
    }
    const payload = (await response.json()) as { detected: DetectedColouring };
    return { ok: true, detected: payload.detected, source: "photo" };
  } catch {
    return {
      ok: false,
      kind: "fallback",
      message: "Photo detection is unavailable right now.",
    };
  }
}

// --- canvas helpers -------------------------------------------------------

function pixelSourceFromImageData(imageData: ImageData): PixelSource {
  const { data, width, height } = imageData;
  return {
    width,
    height,
    getPixel: (x, y) => {
      const i = (y * width + x) * 4;
      return { r: data[i], g: data[i + 1], b: data[i + 2] };
    },
  };
}

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

// --- MediaPipe loader (lazy, cached) --------------------------------------

let landmarkerPromise: Promise<FaceLandmarkerLike> | null = null;

function loadFaceLandmarker(): Promise<FaceLandmarkerLike> {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const vision = await import("@mediapipe/tasks-vision");
      const fileset = await vision.FilesetResolver.forVisionTasks(WASM_BASE);
      return vision.FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: MODEL_URL },
        runningMode: "IMAGE",
        // Detect up to 2 faces so the quality gate can reject multi-face shots.
        numFaces: 2,
      });
    })().catch((err) => {
      // Reset so a later attempt (or the server fallback) can retry cleanly.
      landmarkerPromise = null;
      throw err;
    });
  }
  return landmarkerPromise;
}

// Minimal structural type so this module type-checks against the parts of the
// MediaPipe API we use without depending on its full type surface.
type FaceLandmarkerLike = {
  detect: (image: HTMLCanvasElement) => {
    faceLandmarks?: { x: number; y: number }[][];
  };
};

"""
Run MediaPipe face landmarking + hair segmentation over a folder of images and
write what the TypeScript detector needs, mirroring the in-browser client:

  <out>/<id>.png        image downscaled to 512px max edge (what the client samples)
  <out>/<id>.json       {"faceCount": n, "landmarks": [[x, y], ...]}  (478 points, normalised)
  <out>/<id>.hair.png   hair confidence mask, 0-255, same size as <id>.png

The Python and JS MediaPipe tasks load the same .task/.tflite models, so the
landmarks match what `colour-detection-client.ts` sees.

Usage:
  calibration/.venv/bin/python calibration/scripts/extract.py <images-dir> <out-dir>
"""

import json
import sys
from pathlib import Path

import mediapipe as mp
import numpy as np
from mediapipe.tasks.python import BaseOptions, vision
from PIL import Image, ImageOps
from pillow_heif import register_heif_opener

register_heif_opener()

MAX_EDGE = 512
MODELS = Path(__file__).resolve().parent.parent / "models"


def main(src: Path, out: Path) -> None:
    out.mkdir(parents=True, exist_ok=True)
    landmarker = vision.FaceLandmarker.create_from_options(
        vision.FaceLandmarkerOptions(
            base_options=BaseOptions(model_asset_path=str(MODELS / "face_landmarker.task")),
            running_mode=vision.RunningMode.IMAGE,
            num_faces=2,
        )
    )
    segmenter = vision.ImageSegmenter.create_from_options(
        vision.ImageSegmenterOptions(
            base_options=BaseOptions(model_asset_path=str(MODELS / "hair_segmenter.tflite")),
            running_mode=vision.RunningMode.IMAGE,
            output_confidence_masks=True,
            output_category_mask=False,
        )
    )

    paths = sorted(p for p in src.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".heic"})
    done = 0
    for path in paths:
        if (out / f"{path.stem}.json").exists():
            continue
        try:
            img = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
        except Exception as error:  # unreadable / truncated file
            print(f"skip {path.name}: {error}", file=sys.stderr)
            continue
        img.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.BILINEAR)
        rgb = np.asarray(img)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)

        faces = landmarker.detect(mp_image).face_landmarks
        # The hair segmenter wants RGBA; its last confidence mask is "hair".
        rgba = np.dstack([rgb, np.full(rgb.shape[:2], 255, np.uint8)])
        masks = segmenter.segment(mp.Image(image_format=mp.ImageFormat.SRGBA, data=rgba)).confidence_masks
        hair = (np.clip(np.squeeze(masks[-1].numpy_view()), 0, 1) * 255).astype(np.uint8)

        img.save(out / f"{path.stem}.png")
        Image.fromarray(hair).save(out / f"{path.stem}.hair.png")
        landmarks = [[round(p.x, 5), round(p.y, 5)] for p in faces[0]] if faces else []
        (out / f"{path.stem}.json").write_text(json.dumps({"faceCount": len(faces), "landmarks": landmarks}))
        done += 1
    print(f"extracted {done} new / {len(paths)} images -> {out}")


if __name__ == "__main__":
    main(Path(sys.argv[1]), Path(sys.argv[2]))

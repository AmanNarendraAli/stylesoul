"""
Embed the crops written by features.ts with the same MediaPipe image embedder
the browser uses, and add them to the features JSON as `emb.face` / `emb.hair`.

Usage:
  calibration/.venv/bin/python calibration/scripts/embed.py <extract-dir> <features.json>
"""

import json
import sys
from pathlib import Path

import mediapipe as mp
import numpy as np
from mediapipe.tasks.python import BaseOptions, vision
from PIL import Image

MODEL = Path(__file__).resolve().parent.parent / "models" / "mobilenet_v3_small.tflite"
CROPS = {"emb.face": "face", "emb.hair": "haironly"}


def main(extract: Path, features_path: Path) -> None:
    embedder = vision.ImageEmbedder.create_from_options(
        vision.ImageEmbedderOptions(
            base_options=BaseOptions(model_asset_path=str(MODEL)), l2_normalize=True, quantize=False
        )
    )
    rows = json.loads(features_path.read_text())
    for sid, row in rows.items():
        for key, suffix in CROPS.items():
            path = extract / f"{sid}.{suffix}.png"
            if not path.exists():
                continue
            rgb = np.ascontiguousarray(np.asarray(Image.open(path).convert("RGB")))
            result = embedder.embed(mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb))
            row[key] = [round(float(v), 5) for v in result.embeddings[0].embedding]
    features_path.write_text(json.dumps(rows))
    print(f"embedded {len(rows)} rows -> {features_path}")


if __name__ == "__main__":
    main(Path(sys.argv[1]), Path(sys.argv[2]))

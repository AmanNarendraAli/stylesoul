"""
Re-run the face landmarker on the 512px images extract.py wrote and keep the
3D landmarks (x, y normalised to the image; z on roughly the x scale), which
face_shape.ts needs:

  <out>/<id>.face3d.json   {"faceCount": n, "landmarks": [[x, y, z], ...]}

Usage:
  calibration/.venv/bin/python calibration/scripts/face_landmarks.py calibration/out/photos
"""

import json
import sys
from pathlib import Path

import mediapipe as mp
from mediapipe.tasks.python import BaseOptions, vision

MODELS = Path(__file__).resolve().parent.parent / "models"


def main(out: Path) -> None:
    landmarker = vision.FaceLandmarker.create_from_options(
        vision.FaceLandmarkerOptions(
            base_options=BaseOptions(model_asset_path=str(MODELS / "face_landmarker.task")),
            running_mode=vision.RunningMode.IMAGE,
            num_faces=2,
        )
    )
    paths = [p for p in sorted(out.glob("*.png")) if p.stem.count(".") == 0]
    for path in paths:
        dest = out / f"{path.stem}.face3d.json"
        if dest.exists():
            continue
        faces = landmarker.detect(mp.Image.create_from_file(str(path))).face_landmarks
        landmarks = [[round(p.x, 5), round(p.y, 5), round(p.z, 5)] for p in faces[0]] if faces else []
        dest.write_text(json.dumps({"faceCount": len(faces), "landmarks": landmarks}))
    print(f"{len(paths)} images -> {out}")


if __name__ == "__main__":
    main(Path(sys.argv[1]))

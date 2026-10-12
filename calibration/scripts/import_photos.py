"""
Export single-face photos from the local macOS Photos library, grouped by the
person Photos assigned the face to, for calibration.

Writes (all git-ignored):
  <out>/<person8>_<photo8>.jpg   up to --per-person photos per person, largest faces first
  <out>/groups.json              {sample id: person uuid}, so CV never splits a person
  <out>/people.json              {person uuid: [sample ids]} for per-person labelling

Labels may then be written per person (one CSV row whose `id` is the person
uuid); train.py applies them to every photo in that group.

Needs Full Disk Access for the terminal running it.

Usage:
  calibration/.venv/bin/python calibration/scripts/import_photos.py calibration/data/photos [--per-person 20]
"""

import argparse
import json
from collections import defaultdict
from pathlib import Path

import osxphotos
from PIL import Image, ImageOps
from pillow_heif import register_heif_opener

register_heif_opener()

MAX_EDGE = 1024
MIN_PHOTOS = 3


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("out", type=Path)
    parser.add_argument("--per-person", type=int, default=20)
    args = parser.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)

    by_person = defaultdict(list)
    for photo in osxphotos.PhotosDB().photos(images=True, movies=False):
        if len(photo.face_info) != 1:
            continue
        person = photo.face_info[0].person_info
        path = photo.path or next(iter(photo.path_derivatives or []), None)
        if person is None or path is None:
            continue
        by_person[person.uuid].append((photo.face_info[0].size_pixels, photo.uuid, path))

    groups, people = {}, {}
    for person_uuid, photos in by_person.items():
        if len(photos) < MIN_PHOTOS:
            continue
        for _, photo_uuid, path in sorted(photos, key=lambda p: p[0] or 0, reverse=True)[: args.per_person]:
            sample_id = f"{person_uuid[:8]}_{photo_uuid[:8]}"
            dest = args.out / f"{sample_id}.jpg"
            if not dest.exists():
                try:
                    image = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
                except OSError as error:
                    print(f"skip {path}: {error}")
                    continue
                image.thumbnail((MAX_EDGE, MAX_EDGE))
                image.save(dest, quality=92)
            groups[sample_id] = person_uuid
            people.setdefault(person_uuid, []).append(sample_id)

    (args.out / "groups.json").write_text(json.dumps(groups, indent=1))
    (args.out / "people.json").write_text(json.dumps(people, indent=1))
    print(f"{len(groups)} photos of {len(people)} people -> {args.out}")


if __name__ == "__main__":
    main()

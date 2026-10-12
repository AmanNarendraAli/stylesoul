"""
Render labelling contact sheets from extracted samples: each tile shows the
512px image plus both irises zoomed, captioned with the sample id.

Usage:
  calibration/.venv/bin/python calibration/scripts/sheets.py <extract-dir> <ids.txt> <sheet-dir> [per-sheet]
"""
import json
import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw

TILE = 300
EYE = 140
EYES = [(468, [469, 470, 471, 472]), (473, [474, 475, 476, 477])]


def tile(extract: Path, sid: str) -> Image.Image:
    img = Image.open(extract / f"{sid}.png").convert("RGB")
    w, h = img.size
    lm = json.loads((extract / f"{sid}.json").read_text())["landmarks"]
    out = Image.new("RGB", (TILE, TILE + EYE + 20), "white")
    face = img.copy()
    face.thumbnail((TILE, TILE))
    out.paste(face, ((TILE - face.width) // 2, 0))
    for i, (centre, ring) in enumerate(EYES):
        cx, cy = lm[centre][0] * w, lm[centre][1] * h
        r = sum(math.hypot(lm[j][0] * w - cx, lm[j][1] * h - cy) for j in ring) / len(ring)
        half = max(4, r * 2.2)
        crop = img.crop((cx - half * 1.4, cy - half, cx + half * 1.4, cy + half)).resize((EYE + 5, EYE), Image.Resampling.LANCZOS)
        out.paste(crop, (i * (EYE + 10), TILE))
    ImageDraw.Draw(out).text((4, TILE + EYE + 4), sid, fill="black")
    return out


def main(extract: Path, ids_file: Path, dest: Path, per_sheet: int = 12) -> None:
    dest.mkdir(parents=True, exist_ok=True)
    ids = [line.strip() for line in ids_file.read_text().splitlines() if line.strip()]
    cols = 4
    for n in range(0, len(ids), per_sheet):
        chunk = ids[n : n + per_sheet]
        tiles = [tile(extract, sid) for sid in chunk]
        rows = math.ceil(len(tiles) / cols)
        sheet = Image.new("RGB", (cols * (TILE + 8), rows * (tiles[0].height + 8)), "white")
        for k, t in enumerate(tiles):
            sheet.paste(t, ((k % cols) * (TILE + 8), (k // cols) * (t.height + 8)))
        sheet.save(dest / f"sheet_{n // per_sheet:03d}.jpg", quality=90)
        (dest / f"sheet_{n // per_sheet:03d}.txt").write_text("\n".join(chunk))
    print(f"{math.ceil(len(ids) / per_sheet)} sheets -> {dest}")


if __name__ == "__main__":
    main(Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3]), *(int(a) for a in sys.argv[4:]))

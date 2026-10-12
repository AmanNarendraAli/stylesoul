"""
Download the ljnlonoljpiljm/flickr-faces-attributes-2048 images through the
Hugging Face dataset viewer API. Its caption-derived attributes are kept in
meta.json for reference only; they are not used as labels.

Usage:
  calibration/.venv/bin/python calibration/scripts/fetch_hf.py calibration/data/hf
"""

import concurrent.futures
import json
import sys
import time
import urllib.request
from pathlib import Path

API = (
    "https://datasets-server.huggingface.co/rows?dataset=ljnlonoljpiljm/flickr-faces-attributes-2048"
    "&config=default&split=train&offset={}&length=100"
)
TOTAL = 2048


def get(url: str) -> bytes:
    for attempt in range(6):
        try:
            with urllib.request.urlopen(url, timeout=60) as response:
                return response.read()
        except OSError:
            time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"failed: {url}")


def main(out: Path) -> None:
    out.mkdir(parents=True, exist_ok=True)
    rows = [r for offset in range(0, TOTAL, 100) for r in json.loads(get(API.format(offset)))["rows"]]

    def download(r: dict) -> tuple[str, dict]:
        name = f"hf_{r['row_idx']:04d}.jpg"
        if not (out / name).exists():
            (out / name).write_bytes(get(r["row"]["image"]["src"]))
        return name, {k: v for k, v in r["row"].items() if k != "image"}

    with concurrent.futures.ThreadPoolExecutor(8) as pool:
        meta = dict(pool.map(download, rows))
    (out / "meta.json").write_text(json.dumps(meta, indent=1))
    print(f"{len(meta)} images -> {out}")


if __name__ == "__main__":
    main(Path(sys.argv[1]))

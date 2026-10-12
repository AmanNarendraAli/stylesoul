"""
Download a targeted subset of FairFace (CC BY 4.0; Kärkkäinen & Joo, 2021)
through the Hugging Face dataset viewer API. The race attribute is used only to
oversample groups the other sets lack (deeper skin tones); it is never used as
a label.

Usage:
  calibration/.venv/bin/python calibration/scripts/fetch_fairface.py calibration/data/fairface
"""

import concurrent.futures
import json
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

API = "https://datasets-server.huggingface.co/rows?dataset=HuggingFaceM4/FairFace&config=1.25&split=train"
TOTAL_ROWS = 86744
# race index -> images wanted (FairFace races: 0 East Asian, 1 Indian, 2 Black,
# 3 White, 4 Middle Eastern, 5 Latino_Hispanic, 6 Southeast Asian).
TARGETS = {2: 600, 1: 300, 6: 120, 4: 120, 5: 120}
ADULT = 3  # age bucket "20-29" and older
WOMEN_SHARE = 0.75


def get(url: str) -> bytes:
    for attempt in range(6):
        try:
            with urllib.request.urlopen(url, timeout=60) as response:
                return response.read()
        except OSError:
            time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"failed: {url}")


def main(out: Path) -> None:
    """Pages through the dataset (the viewer's filter endpoint is too slow),
    downloading each page's picks straight away (image links are signed and
    expire) until every race/gender quota is met."""
    out.mkdir(parents=True, exist_ok=True)
    quota = {}
    for race, total in TARGETS.items():
        quota[(race, 1)] = round(total * WOMEN_SHARE)
        quota[(race, 0)] = total - quota[(race, 1)]

    def download(r: dict) -> tuple[str, dict]:
        name = f"ff_{r['row_idx']:05d}.jpg"
        if not (out / name).exists():
            (out / name).write_bytes(get(r["row"]["image"]["src"]))
        return name, {k: v for k, v in r["row"].items() if k != "image"}

    meta = {}
    with concurrent.futures.ThreadPoolExecutor(8) as pool:
        for offset in range(0, TOTAL_ROWS, 100):
            page = json.loads(get(f"{API}&{urllib.parse.urlencode({'offset': offset, 'length': 100})}"))["rows"]
            picks = []
            for r in page:
                key = (r["row"]["race"], r["row"]["gender"])
                if r["row"]["age"] >= ADULT and quota.get(key, 0) > 0:
                    quota[key] -= 1
                    picks.append(r)
            meta.update(pool.map(download, picks))
            if not any(quota.values()):
                break
    (out / "meta.json").write_text(json.dumps(meta, indent=1))
    print(f"{len(meta)} images -> {out}")


if __name__ == "__main__":
    main(Path(sys.argv[1]))

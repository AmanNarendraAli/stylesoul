"""
Merge original labels with blind relabels into one CSV by majority vote.

For each sample that was relabelled, a channel keeps a value only if at least
two of the votes agree on it; otherwise it becomes `?` (unknown, so the
sample is skipped for that channel). Samples that were never relabelled keep
their original label.

Usage:
  calibration/.venv/bin/python calibration/scripts/vote.py <labels-dir> <relabel-dir> <out.csv>
"""

import csv
import sys
from collections import Counter, defaultdict
from pathlib import Path

CHANNELS = ["skinTone", "undertone", "eyeColour", "hairColour"]


def read(paths) -> dict[str, list[dict]]:
    rows = defaultdict(list)
    for path in paths:
        for row in csv.DictReader(path.open()):
            row = {k.strip(): (v or "").strip() for k, v in row.items() if k}
            rows[row["id"]].append(row)
    return rows


def main(labels_dir: Path, relabel_dir: Path, out: Path) -> None:
    original = read(sorted(labels_dir.glob("*.csv")))
    relabels = read(sorted(relabel_dir.glob("*.csv")))
    changed = Counter()
    with out.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["id", *CHANNELS])
        writer.writeheader()
        for sid, rows in original.items():
            first = rows[0]
            votes = [first, *relabels.get(sid, [])]
            final = {"id": sid}
            for ch in CHANNELS:
                if len(votes) == 1:
                    final[ch] = first[ch]
                    continue
                value, count = Counter(v[ch] for v in votes).most_common(1)[0]
                final[ch] = value if count >= 2 else "?"
                changed[ch] += final[ch] != first[ch]
            writer.writerow(final)
    print(f"wrote {len(original)} rows -> {out}; changed vs original: {dict(changed)}")


if __name__ == "__main__":
    main(Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3]))

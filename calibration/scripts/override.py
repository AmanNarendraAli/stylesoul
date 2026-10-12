"""
Apply a single-channel relabel to existing label CSVs in place.

The relabel CSV has `id,<channel>`; ids found in the labels directory get that
channel replaced (`?` included). When an id was relabelled twice, the first
file (sorted by name) wins and disagreements are reported.

Usage:
  calibration/.venv/bin/python calibration/scripts/override.py <labels-dir> <channel> <relabel.csv> [...]
"""

import csv
import sys
from collections import Counter
from pathlib import Path


def main(labels_dir: Path, channel: str, relabel_files: list[Path]) -> None:
    new, seen = {}, {}
    for f in sorted(relabel_files):
        for row in csv.DictReader(f.open()):
            sid, value = row["id"].strip(), (row[channel] or "").strip()
            seen.setdefault(sid, []).append(value)
            new.setdefault(sid, value)
    pairs = [v for v in seen.values() if len(v) > 1]
    if pairs:
        same = sum(v[0] == v[1] for v in pairs)
        print(f"double-labelled {len(pairs)}: {same / len(pairs):.0%} agree; disagreements: "
              f"{Counter(tuple(sorted(v[:2])) for v in pairs if v[0] != v[1]).most_common(6)}")

    changed = Counter()
    for f in sorted(labels_dir.glob("*.csv")):
        rows = list(csv.DictReader(f.open()))
        if not rows or channel not in rows[0]:
            continue
        for row in rows:
            sid = row["id"].strip()
            if sid in new and row[channel].strip() != new[sid]:
                changed[(row[channel].strip(), new[sid])] += 1
                row[channel] = new[sid]
        with f.open("w", newline="") as out:
            writer = csv.DictWriter(out, fieldnames=list(rows[0].keys()))
            writer.writeheader()
            writer.writerows(rows)
    print(f"relabelled {len(new)} ids; changes: {dict(changed.most_common())}")


if __name__ == "__main__":
    main(Path(sys.argv[1]), sys.argv[2], [Path(p) for p in sys.argv[3:]])

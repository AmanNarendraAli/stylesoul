"""
Fit and evaluate the per-channel colour classifiers.

Each --data is `features.json:labels[:groups.json]`. labels is a CSV or a
directory of CSVs (`id,skinTone,undertone,eyeColour,hairColour`, `?` =
unknown). groups.json maps sample id -> person so cross-validation never splits
one person across train and test; a label row whose id is a person applies to
all of that person's samples. exclude*.txt files in a labels directory list
sample ids to skip (filtered or edited photos).

Each channel is a multinomial logistic regression over standardised colour
features, plus (for some channels) PCA components of a MediaPipe image
embedding. A fixed ~20% of people is held out (see is_holdout) and only scored
with --test, so tuning against grouped CV on the rest cannot overfit it.
Grouped CV gives the report, the SCORE used for hill-climbing, and the
confidence threshold at which suggestions reach --precision. With --write,
models fitted on all data are written to lib/colour-detection/model.ts, with
the PCA folded into one weight matrix over the raw embedding.

Usage:
  calibration/.venv/bin/python calibration/scripts/train.py \
      --data out/hf-features.json:out/labels \
      [--data out/photos-features.json:out/labels-photos:data/photos/groups.json] \
      [--data out/fairface-features.json:out/labels-ff#skinTone,eyeColour] [--test] [--write]
"""

import argparse
import csv
import hashlib
import json
from collections import Counter, defaultdict
from pathlib import Path

import numpy as np
from sklearn.decomposition import PCA
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedGroupKFold

ROOT = Path(__file__).resolve().parents[2]
MODEL_PATH = ROOT / "lib" / "colour-detection" / "model.ts"

CLASSES = {
    "skinTone": ["porcelain", "fair", "light", "medium", "tan", "brown", "deep", "very_deep"],
    "undertone": ["cool", "neutral", "warm", "olive"],
    "eyeColour": ["blue", "green", "grey", "hazel", "brown", "amber"],
    "hairColour": ["platinum_blonde", "golden_blonde", "ash_brown", "chestnut_brown", "auburn", "red", "black", "grey"],
}


def lab(region: str) -> list[str]:
    return [f"{region}.l", f"{region}.a", f"{region}.b"]


# Keys produced by `extractFeatures` in lib/colour-detection/features.ts.
FEATURES = {
    "skinTone": lab("skin") + lab("image"),
    "undertone": lab("skin"),
    "eyeColour": lab("eye") + lab("sclera") + lab("skin"),
    "hairColour": lab("hair") + ["hair.lHigh", "hair.lLow"] + lab("hairLit") + lab("skin"),
}
# Embedding input (added by embed.py) and PCA size per channel. Eye colour is
# better without: the iris is only a few pixels of the face crop.
EMBEDDING = {"skinTone": ("face", 32), "undertone": ("face", 16), "hairColour": ("hair", 16)}
# Regularisation and partial class balancing (0 = none, 1 = fully balanced):
# rare classes (deep skin, amber eyes, red hair) still get predicted without
# the common ones collapsing.
C = {"skinTone": 1.0, "undertone": 1.0, "eyeColour": 1.0, "hairColour": 1.0}
BALANCE = {"skinTone": 0.5, "undertone": 0.75, "eyeColour": 0.75, "hairColour": 0.5}


def load_labels(path: Path) -> tuple[dict, list]:
    files = sorted(path.glob("*.csv")) if path.is_dir() else [path]
    labels, seen = {}, defaultdict(list)
    for f in files:
        for row in csv.DictReader(f.open()):
            row = {k.strip(): (v or "").strip() for k, v in row.items() if k}
            seen[row["id"]].append(row)
            labels.setdefault(row["id"], row)
    return labels, [rows for rows in seen.values() if len(rows) > 1]


def agreement(pairs: list) -> None:
    if not pairs:
        return
    print(f"Labeller agreement on {len(pairs)} double-labelled samples (both non-?):")
    for ch, order in CLASSES.items():
        both = [(a[ch], b[ch]) for a, b, *_ in pairs if a[ch] in order and b[ch] in order]
        if both:
            same = np.mean([x == y for x, y in both])
            near = np.mean([abs(order.index(x) - order.index(y)) <= 1 for x, y in both])
            extra = f", within-one {near:.0%}" if ch == "skinTone" else ""
            print(f"  {ch:11} {same:.0%} exact (n={len(both)}){extra}")


def is_holdout(group: str) -> bool:
    """A fixed ~20% of people, never used for tuning; see --test."""
    return int(hashlib.sha1(group.encode()).hexdigest(), 16) % 5 == 0


def dataset(sources, channel: str):
    """Returns X (colour features), E (embeddings or None), y, groups, ids."""
    embedding = EMBEDDING.get(channel)
    needed = FEATURES[channel] + ([f"emb.{embedding[0]}"] if embedding else [])
    rows, y, groups, ids = [], [], [], []
    for features_path, labels_path, *groups_path, channels in sources:
        if channels and channel not in channels:
            continue
        feats = json.loads(features_path.read_text())
        labels, _ = load_labels(labels_path)
        groups_map = json.loads(groups_path[0].read_text()) if groups_path else {}
        for sid, person in groups_map.items():
            if sid not in labels and person in labels:
                labels[sid] = labels[person]
        # exclude*.txt next to the labels lists filtered/edited photos to skip.
        excluded = set()
        if labels_path.is_dir():
            for f in labels_path.glob("exclude*.txt"):
                excluded |= {line.strip() for line in f.read_text().splitlines() if line.strip()}
        for sid, lab_row in labels.items():
            value, f = lab_row.get(channel), feats.get(sid)
            if sid in excluded or value not in CLASSES[channel] or f is None or any(k not in f for k in needed):
                continue
            rows.append(f)
            y.append(value)
            groups.append(groups_map.get(sid, sid))
            ids.append(sid)
    X = np.array([[f[k] for k in FEATURES[channel]] for f in rows])
    E = np.array([f[f"emb.{embedding[0]}"] for f in rows]) if embedding else None
    return X, E, np.array(y), np.array(groups), ids


class ChannelModel:
    def __init__(self, channel: str):
        self.channel = channel

    def _design(self, X, E):
        parts = [(X - self.mean) / self.scale]
        if E is not None:
            parts.append(self.pca.transform(E) / self.pca_scale)
        return np.hstack(parts)

    def fit(self, X, E, y):
        self.mean, self.scale = X.mean(axis=0), X.std(axis=0) + 1e-9
        if E is not None:
            self.pca = PCA(EMBEDDING[self.channel][1], random_state=0).fit(E)
            self.pca_scale = self.pca.transform(E).std(axis=0) + 1e-9
        counts = Counter(y)
        weights = {c: (len(y) / (len(counts) * n)) ** BALANCE[self.channel] for c, n in counts.items()}
        self.lr = LogisticRegression(C=C[self.channel], class_weight=weights, max_iter=5000)
        self.lr.fit(self._design(X, E), y)
        self.classes_ = self.lr.classes_
        return self

    def predict_proba(self, X, E):
        return self.lr.predict_proba(self._design(X, E))

    def export(self, min_confidence: float) -> dict:
        n_colour = len(self.mean)
        coef, bias = self.lr.coef_, self.lr.intercept_
        out = {
            "features": FEATURES[self.channel],
            "classes": list(self.classes_),
            "mean": [round(float(v), 4) for v in self.mean],
            "scale": [round(float(v), 4) for v in self.scale],
            "weights": [[round(float(v), 4) for v in row] for row in coef[:, :n_colour]],
            "minConfidence": min_confidence,
        }
        if self.channel in EMBEDDING:
            # logits = W_p · (P(e - mu) / s) + ...  ==  (W_p / s) P · e  -  (W_p / s) P · mu
            folded = (coef[:, n_colour:] / self.pca_scale) @ self.pca.components_
            bias = bias - folded @ self.pca.mean_
            out["embedding"] = {
                "input": EMBEDDING[self.channel][0],
                "weights": [[round(float(v), 5) for v in row] for row in folded],
            }
        out["bias"] = [round(float(v), 4) for v in bias]
        return out


def cross_validate(X, E, y, groups, channel: str):
    counts = Counter(y)
    folds = min(5, min(counts.values()))
    prob = np.zeros((len(y), len(counts)))
    classes = sorted(counts)
    for tr, te in StratifiedGroupKFold(n_splits=folds, shuffle=True, random_state=0).split(X, y, groups):
        model = ChannelModel(channel).fit(X[tr], None if E is None else E[tr], y[tr])
        p = model.predict_proba(X[te], None if E is None else E[te])
        for j, c in enumerate(model.classes_):
            prob[te, classes.index(c)] = p[:, j]
    return np.array(classes), prob


def acceptable(channel: str, y, pred):
    """Skin tone is an ordinal scale, so a one-step miss still counts as useful."""
    if channel == "skinTone":
        order = CLASSES[channel]
        return np.array([abs(order.index(p) - order.index(t)) <= 1 for p, t in zip(pred, y)])
    return pred == y


def score(channel: str, y, pred) -> float:
    """Hill-climbing target: accuracy and balanced accuracy (plus within-one
    for the ordinal skin scale), averaged."""
    present = [c for c in CLASSES[channel] if c in set(y)]
    parts = [np.mean(pred == y), np.mean([np.mean(pred[y == c] == c) for c in present])]
    if channel == "skinTone":
        parts.append(np.mean(acceptable(channel, y, pred)))
    return float(np.mean(parts))


def report(name: str, channel: str, y, pred) -> None:
    present = [c for c in CLASSES[channel] if c in set(y)]
    recalls = [np.mean(pred[y == c] == c) for c in present]
    line = f"  {name:22} accuracy {np.mean(pred == y):.1%}  balanced {np.mean(recalls):.1%}"
    if channel == "skinTone":
        line += f"  within-one {np.mean(acceptable(channel, y, pred)):.1%}"
    print(line + f"  score {score(channel, y, pred):.3f}")
    print("    recall " + " ".join(f"{c}:{r:.0%}" for c, r in zip(present, recalls)))


def threshold_for(ok, confidence, precision: float) -> float:
    """Lowest confidence cut-off whose accepted suggestions reach `precision`."""
    for t in np.arange(0.0, 1.0, 0.01):
        accepted = confidence >= t
        if accepted.sum() >= 10 and np.mean(ok[accepted]) >= precision:
            return round(float(t), 2)
    return 1.0


def parse_source(spec: str) -> tuple:
    """`features.json:labels[:groups.json][#channel,channel]`; the channel list
    limits which classifiers a dataset trains (none = all)."""
    paths, _, channels = spec.partition("#")
    return (*(Path(p) for p in paths.split(":")), set(filter(None, channels.split(","))))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", action="append", required=True, help="features.json:labels[:groups.json][#channels]")
    parser.add_argument("--precision", type=float, default=0.8)
    parser.add_argument("--skin-precision", type=float, default=0.9, help="within-one precision target")
    parser.add_argument("--test", action="store_true", help="also score the held-out people (use sparingly)")
    parser.add_argument("--write", action="store_true", help="fit on all data and write model.ts")
    args = parser.parse_args()
    sources = [parse_source(d) for d in args.data]

    for _, labels_path, *_ in sources:
        agreement(load_labels(labels_path)[1])

    model_json, cv_scores, test_scores = {}, [], []
    for channel in CLASSES:
        X_all, E_all, y_all, groups_all, _ = dataset(sources, channel)
        counts = Counter(y_all)
        # Classes too rare to fit or evaluate are dropped rather than guessed.
        keep = np.isin(y_all, [c for c, n in counts.items() if n >= 5])
        X_all, y_all, groups_all = X_all[keep], y_all[keep], groups_all[keep]
        E_all = None if E_all is None else E_all[keep]
        if len(set(y_all)) < 2:
            print(f"\n== {channel}: skipped, fewer than two classes with 5+ samples")
            continue
        print(f"\n== {channel}: n={len(y_all)}  " + " ".join(f"{c}:{counts[c]}" for c in CLASSES[channel] if c in counts))

        held = np.array([is_holdout(g) for g in groups_all])
        X, y, groups = X_all[~held], y_all[~held], groups_all[~held]
        E = None if E_all is None else E_all[~held]
        classes, prob = cross_validate(X, E, y, groups, channel)
        pred, confidence = classes[prob.argmax(axis=1)], prob.max(axis=1)
        report("grouped CV (dev)", channel, y, pred)
        cv_scores.append(score(channel, y, pred))
        if args.test:
            model = ChannelModel(channel).fit(X, E, y)
            test_prob = model.predict_proba(X_all[held], None if E_all is None else E_all[held])
            test_pred = model.classes_[test_prob.argmax(axis=1)]
            report(f"held-out (n={held.sum()})", channel, y_all[held], test_pred)
            test_scores.append(score(channel, y_all[held], test_pred))

        ok = acceptable(channel, y, pred)
        target = args.skin_precision if channel == "skinTone" else args.precision
        threshold = threshold_for(ok, confidence, target)
        accepted = confidence >= threshold
        kind = "within-one precision" if channel == "skinTone" else "precision"
        print(f"  suggest when confidence >= {threshold:.2f}: {kind} {np.mean(ok[accepted]):.1%} on {accepted.mean():.0%} of photos")

        model_json[channel] = ChannelModel(channel).fit(X_all, E_all, y_all).export(threshold)

    print(f"\nSCORE grouped-CV {np.mean(cv_scores):.4f}" + (f"  held-out {np.mean(test_scores):.4f}" if test_scores else ""))

    if args.write:
        body = ",\n".join(f"  {ch}: {json.dumps(m)}" for ch, m in model_json.items())
        MODEL_PATH.write_text(
            "// Generated by calibration/scripts/train.py. Do not edit by hand.\n\n"
            "export type ChannelModel = {\n"
            "  features: string[];\n  classes: string[];\n  mean: number[];\n  scale: number[];\n"
            "  weights: number[][];\n  bias: number[];\n  minConfidence: number;\n"
            '  /** Extra weights over a raw image embedding (see crops.ts). */\n'
            '  embedding?: { input: "face" | "hair"; weights: number[][] };\n};\n\n'
            'export const model: Record<"skinTone" | "undertone" | "eyeColour" | "hairColour", ChannelModel> = {\n'
            f"{body},\n}};\n"
        )
        print(f"\nwrote {MODEL_PATH}")


if __name__ == "__main__":
    main()

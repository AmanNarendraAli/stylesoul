# Colour-detection calibration

The photo-detection ΔE thresholds and quality gates in `lib/colour-detection`
ship with **placeholder values**. This directory is the harness for tuning them
against real, labelled photos. Tuning itself is deferred until a labelled set
exists — see WORKPLAN §5, Phase 2 item 7.

## Why this is gated on data

The matcher maps a detected Lab colour to the nearest preset by ΔE2000. The two
numbers that need real photos to set well are:

- `MAX_USEFUL_DELTA_E` in [`lib/colour-detection/match.ts`](../lib/colour-detection/match.ts)
  — above this, a match is treated as "no confident match".
- the lightness / face-size bounds in [`lib/colour-detection/quality.ts`](../lib/colour-detection/quality.ts).

Guessing these without data risks either rejecting good photos or pre-filling
confident-but-wrong swatches.

## Collecting the set

Target: **50+ samples per skin tone** (per WORKPLAN §4.1), spread across
undertones, eye and hair colours, lighting, and camera quality. For each subject:

1. A clear, front-facing photo in even daylight.
2. Self-identified ground-truth labels for the four channels, using the exact
   preset values in [`lib/colour-season/options.ts`](../lib/colour-season/options.ts).

⚠️ **These are face photos — sensitive personal data.** The `samples/` folder,
`labels.csv`, and `predictions.json` are git-ignored. Keep them out of the repo
and the deploy. Get consent; delete when calibration is done.

## Files

| File | Tracked? | Purpose |
|------|----------|---------|
| `samples/` | no | the photos, named e.g. `0001.jpg` |
| `labels.csv` | no | ground truth; copy `labels.example.csv` |
| `predictions.json` | no | detector output; copy `predictions.example.json` |
| `prediction-details.json` | no | detector output with confidence values |
| `hf-flickr-summary.json` | no | import summary for the Hugging Face bootstrap set |
| `labels.example.csv` | yes | column template |
| `predictions.example.json` | yes | shape template |
| `scripts/import-hf-flickr.ts` | yes | local bootstrap importer for `ljnlonoljpiljm/flickr-faces-attributes-2048` |
| `scripts/predict.ts` | yes | batch prediction script using the self-hosted heuristic detector |
| `scripts/report.ts` | yes | accuracy + confusion report |

## Workflow

1. Drop photos in `samples/` and fill in `labels.csv`.
2. Produce `predictions.json` by running each photo through the detector. The
   in-app client pipeline (`components/onboarding/colour-detection-client.ts`)
   is the source of truth; for batch runs use a small local script with an
   image decoder (`@napi-rs/canvas` or `sharp`) that feeds pixels into
   `detectColouring` / `detectColouringHeuristic`. That decoder is a **local
   dev dependency only** — keep it out of the app bundle.
3. Run the report:

   ```bash
   npm run calibrate
   ```

4. Read per-channel accuracy and the confusion pairs. Adjust the thresholds in
   `match.ts` / `quality.ts`, regenerate predictions, and repeat until accuracy
   plateaus. Record the final numbers and date in this README.

## Hugging Face bootstrap workflow

The `ljnlonoljpiljm/flickr-faces-attributes-2048` dataset can be used as a
bootstrap signal, but not as launch-grade ground truth: its dataset card is
sparse and its attributes appear proxy/caption-derived rather than
self-identified StyleSoul labels.

Run:

```bash
npm run calibrate:import:hf-flickr
npm run calibrate:predict
npm run calibrate
```

The importer streams rows through the Hugging Face dataset viewer API, maps
usable proxy attributes into StyleSoul's fixed skin/undertone/eye/hair vocabulary, and
writes gitignored local files. The predictor currently uses
`detectColouringHeuristic`, so it only gives a bootstrap read on the
landmark-free fallback path. It should not be used to tune the full MediaPipe
client path by itself.

## Results log

### 2026-05-22 - Hugging Face bootstrap, no threshold changes

- Source: `ljnlonoljpiljm/flickr-faces-attributes-2048`
- Rows scanned: 2,048
- Samples selected: 247
- Skin coverage used the older combined tone/undertone vocabulary
  (`fair_cool`, `light_neutral`, `medium_warm`, `olive`, `deep_warm`) and should
  be regenerated before any future calibration work.
- Detector path: `detectColouringHeuristic` via `npm run calibrate:predict`
  (skin/hair only; eye colour requires landmarks and was not detected).
- Report: skinTone 9.7% (24/247), hairColour 30.0% (74/247), eyeColour n/a
  (247 not detected), overall 19.8% over evaluated skin/hair channels.
- Decision: do not tune `MAX_USEFUL_DELTA_E` or quality gates from this run.
  The combination of proxy labels, incomplete undertone coverage, and
  landmark-free sampling is too weak for production thresholds.

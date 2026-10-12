# Colour-detection calibration

Trains and evaluates the photo colour classifier in
[`lib/colour-detection`](../lib/colour-detection). Everything under `data/`,
`models/` and `out/` is face photos, labels or derived data: it is git-ignored
and must stay local.

## How detection works

1. The browser runs MediaPipe's Face Landmarker (478 points incl. irises) and
   hair segmenter on a 512px copy of the photo
   ([`colour-detection-client.ts`](../components/onboarding/colour-detection-client.ts)).
2. [`regions.ts`](../lib/colour-detection/regions.ts) samples skin (discs on
   cheeks/forehead/chin scaled to face width, minus hair), iris (annulus
   between pupil and limbus, inside the eyelids), sclera, and hair (segmenter
   mask outside the face oval).
3. [`features.ts`](../lib/colour-detection/features.ts) reduces each region to
   L-trimmed median Lab values plus a whole-image median for lighting context.
4. [`crops.ts`](../lib/colour-detection/crops.ts) builds a face crop and a
   hair-only image, which the browser embeds with MediaPipe's MobileNetV3-small
   image embedder (1024-d). Training embeds the same crops in Python; browser
   and Python embeddings agree to cosine 1.000.
5. [`detect.ts`](../lib/colour-detection/detect.ts) scores each channel with a
   multinomial logistic regression from the generated
   [`model.ts`](../lib/colour-detection/model.ts) over the colour features and
   (skin tone, undertone, hair) the raw embedding, and drops any channel whose
   probability is below its calibrated `minConfidence`.

## Pipeline

```bash
uv venv --python 3.12 calibration/.venv
VIRTUAL_ENV=calibration/.venv uv pip install -r calibration/requirements.txt
mkdir -p calibration/models && cd calibration/models
curl -LO https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task
curl -LO https://storage.googleapis.com/mediapipe-models/image_segmenter/hair_segmenter/float32/1/hair_segmenter.tflite
curl -LO https://storage.googleapis.com/mediapipe-models/image_embedder/mobilenet_v3_small/float32/1/mobilenet_v3_small.tflite
cd ../..

PY=calibration/.venv/bin/python
# 1. Images
$PY calibration/scripts/fetch_hf.py calibration/data/hf
$PY calibration/scripts/fetch_fairface.py calibration/data/fairface
$PY calibration/scripts/import_photos.py calibration/data/photos   # macOS Photos; needs Full Disk Access
# 2. Landmarks + hair masks (same models as the browser)
$PY calibration/scripts/extract.py calibration/data/hf calibration/out/hf
# 3. Features and embedder crops, computed by the app's own code; then embeddings
node --experimental-strip-types calibration/scripts/features.ts calibration/out/hf calibration/out/hf-features.json
$PY calibration/scripts/embed.py calibration/out/hf calibration/out/hf-features.json
# 4. Labelling sheets (image + zoomed irises per tile); label into out/labels/*.csv
$PY calibration/scripts/sheets.py calibration/out/hf calibration/out/label-ids.txt calibration/out/sheets
# 5. Evaluate (grouped CV on the dev split) and write lib/colour-detection/model.ts
$PY calibration/scripts/train.py --data calibration/out/hf-features.json:calibration/out/labels --write
```

Repeat steps 2–4 per dataset and pass one `--data` per dataset to train.py.
`train.py` holds out a fixed ~20% of people (by hashed person id); tune
against the grouped-CV `SCORE` and only run `--test` to check the held-out
people once a change is settled.

Data sources: [ljnlonoljpiljm/flickr-faces-attributes-2048](https://huggingface.co/datasets/ljnlonoljpiljm/flickr-faces-attributes-2048);
[FairFace](https://github.com/joojs/fairface) (CC BY 4.0, Kärkkäinen & Joo
2021), sampled by its race attribute only to oversample deeper skin tones;
the owner's Photos library. None of the datasets' own attributes are used as
labels.

For the Photos library, run steps 2–3 on `data/photos` and pass
`--data out/photos-features.json:out/labels-photos:data/photos/groups.json`.
Labels there can be one row per person (the `id` is the person uuid from
`people.json`).

Labels are `id,skinTone,undertone,eyeColour,hairColour` using the values in
[`lib/colour-season/options.ts`](../lib/colour-season/options.ts), with `?` for
anything that cannot be judged.

## Results log

### 2026-10-12 — trained classifier replaces nearest-swatch matching (HF only)

- Data: `ljnlonoljpiljm/flickr-faces-attributes-2048` (2,035 single-face images).
  The dataset's caption-derived attributes were **not** used as labels.
  1,465 images were labelled visually against a written rubric by model-based
  labellers (Claude), oversampling rare classes; 132 were labelled twice.
- Labeller agreement: skin tone 80% exact / 100% within one step, undertone
  72%, eye 88%, hair 91%. This is the realistic ceiling for these labels.
- Grouped 5-fold CV, new model vs the previous nearest-swatch detector on the
  same images (full landmark path):

  | Channel | Old accuracy | New accuracy | New balanced | Suggest threshold → precision / coverage |
  |---|---|---|---|---|
  | skinTone | 19.6% (64.6% within one) | 53.3% (87.1% within one) | 30.6% | 0.34 → 90% within-one / 85% |
  | undertone | 53.0% | 65.0% | 41.6% | 0.57 → 80% / 46% |
  | eyeColour | 36.9% | 74.2% | 56.8% | 0.44 → 81% / 82% |
  | hairColour | 9.2% | 63.1% | 53.9% | 0.63 → 81% / 36% |

- Linear models matched or beat gradient boosting, random forests, RBF SVMs
  and kNN, so the limit is features and labels, not model capacity.
  Sclera-referenced white balance did not help (the sclera is often shadowed).
- **Known gaps:** no `very_deep` and only 41 `deep` skin samples, so
  medium/tan/brown recall is low (15–20%) and `very_deep` cannot be predicted;
  `olive` undertone (20) and `amber` eyes (10) are barely represented. The
  labels are visual judgements, not self-identified. Photo suggestions must
  stay reviewable and must not be described as accurate until consented,
  self-identified samples across all skin tones are added.
- Quality gate: minimum skin L* lowered from 25 to 15. Labelled deep skin sits
  at L* ≈ 30–50, and the old cut-off risked rejecting very deep skin.

### 2026-10-12 — added the owner's Photos library (current model)

- `import_photos.py` exported 1,086 single-face photos of 168 Photos "people";
  660 had a face the landmarker could find at 512px (others were too small).
  People were labelled once each from a sheet of up to 8 photos; filtered,
  meme, screenshot and black-and-white photos (226) were excluded, and pets,
  cartoons and celebrity-meme sheets left as `?`. That left 419 skin-labelled
  photos of 75 people, mostly medium/tan with brown eyes and black hair, which
  fills the HF set's gap.
- These real phone photos are a distribution shift from the curated Flickr
  set. Evaluated on them with grouped CV over people:

  | Channel | Trained on HF only | Trained on HF + Photos |
  |---|---|---|
  | skinTone | 21% (63% within one) | 35% (79% within one) |
  | undertone | 76% | 88% |
  | eyeColour | 67% | 78% |
  | hairColour | 76% | 78% |

- The shipped model is trained on both sets (1,891 skin-labelled photos).
  Follow-up changes, all chosen by grouped CV on both sets:
  - Skin tone uses skin + whole-image context only. The sclera added "wild"
    errors (3+ steps off): 5.0% → 3.8% without it. Undertone uses skin only.
  - Hair: the face oval is grown 15% before excluding it (the segmenter bleeds
    onto forehead skin at the hairline), and lit-strand Lab plus shadow L were
    added. Hair accuracy 66.7% → 67.3%, balanced 49.5% → 54.7%. Dropping
    hair pixels near the skin colour, other mask thresholds, and gradient
    boosting did not help.
  - `detectColouring` now returns whichever channels are confident and only
    fails when none are, instead of failing whenever skin tone abstains.
- Current thresholds (grouped CV): skin 0.35 → 90% within-one on 72% of
  photos; undertone 0.51 → 81% on 61%; eye 0.41 → 81% on 85%; hair 0.54 → 81%
  on 59%.
- Hair is reliable for black (86% recall), golden blonde, grey, platinum and
  red; brown subtypes are weak (ash 29%, chestnut 54%, auburn 36%), and that
  is also where the labellers disagree most (chestnut vs ash).
- Still no `very_deep` samples and only 43 `deep`; `brown` skin recall is 0%
  (absorbed by tan/deep). The Photos set adds almost no light eyes or
  blonde/red hair. Accuracy is not uniform across skin tones.

### 2026-10-12 — hill-climb: image embeddings + FairFace (current model)

Method: a fixed ~20% of people is held out (`is_holdout`); every change was
judged by grouped CV on the remaining people (`SCORE` = mean over channels of
accuracy and balanced accuracy, plus within-one for skin). The held-out people
were only used for the two data decisions below and the final report.

Kept:
- **MobileNetV3-small image embeddings** (MediaPipe Image Embedder, 4 MB,
  runs in the browser) of a face crop (skin tone, undertone) and a hair-only
  image (hair), added to the colour features via PCA folded into the logistic
  weights. Browser and Python embeddings match (cosine 1.000). Dev SCORE
  0.584 → 0.609; tuning PCA size/C/balance → 0.613. The 11 MB large model was
  only ~0.006 better.
- **FairFace** (702 labelled faces, mostly medium to very deep skin), used for
  skin tone and eye colour only: on the same held-out people skin-tone score
  rose 0.624 → 0.634 on the original sets and 0.460 → 0.535 on FairFace;
  undertone and hair got slightly worse with it, so it is excluded there.
  Skin recall for `brown` 0% → 20% and `deep` 16% → 57% (dev CV).

Rejected (no gain or worse): iris inner/outer ring features (eye 0.670 →
0.639), cheek-only skin sampling, mirror-averaged embeddings (0.610 vs 0.613),
embeddings for eye colour (the iris is too few pixels of the face crop), and
**majority-vote label cleaning** of 313 high-loss samples (3 blind labels
each; held-out 0.629 → 0.597, likely because held-out labels share the
original labellers' conventions and voting dropped hard examples).

Final, same held-out people (n≈330–520 per channel), before → after:

| Channel | Before | After |
|---|---|---|
| skinTone | acc 40.2%, within-one 81.9%, balanced 28.0% | acc 51.6%, within-one 86.5%, balanced 41.8% |
| undertone | acc 68.7%, balanced 38.9% | acc 64.7%, balanced 63.8% |
| eyeColour | acc 78.7%, balanced 51.1% | acc 76.0%, balanced 52.6% |
| hairColour | acc 66.5%, balanced 53.9% | acc 69.9%, balanced 55.8% |
| composite SCORE | 0.572 | 0.629 |

Thresholds (dev CV): skin 0.45 → 90% within-one on 70% of photos; undertone
0.63 → 80% on 50%; eye 0.42 → 81% on 85%; hair 0.67 → 80% on 53%.
`very_deep` still has only 4 labelled samples and cannot be predicted.

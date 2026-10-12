import type {
  EyeColour,
  HairColour,
  SkinTone,
  Undertone,
} from "../colour-season/map.ts";
import { extractFeatures, type Features } from "./features.ts";
import { model } from "./model.ts";
import { assessQuality, type QualityResult } from "./quality.ts";
import {
  faceAreaFraction,
  type HairMask,
  type PixelSource,
  type Point,
} from "./regions.ts";

/**
 * A single detected channel: the predicted preset plus the classifier's
 * probability for it. In a DetectionResult, channels that could not be
 * sampled or fall below the calibrated threshold are absent.
 */
export type DetectedChannel<T extends string> = {
  value: T;
  confidence: number;
};

export type DetectedColouring = {
  skinTone?: DetectedChannel<SkinTone>;
  undertone?: DetectedChannel<Undertone>;
  eyeColour?: DetectedChannel<EyeColour>;
  hairColour?: DetectedChannel<HairColour>;
};

export type DetectionResult =
  | { ok: true; detected: DetectedColouring }
  | { ok: false; quality: Extract<QualityResult, { ok: false }> };

/** Image-embedder vectors for the crops in crops.ts. */
export type Embeddings = { face?: ArrayLike<number>; hair?: ArrayLike<number> };

/**
 * Landmark-driven detection: quality gate, then per-channel classification of
 * the sampled skin / iris / sclera / hair colours plus image embeddings.
 * `hairMask` comes from the hair segmenter; without it hair colour is left to
 * the manual screen.
 */
export function detectColouring(
  source: PixelSource,
  landmarks: Point[],
  faceCount: number,
  hairMask?: HairMask,
  embeddings: Embeddings = {},
): DetectionResult {
  const features = faceCount === 1 ? extractFeatures(source, landmarks, hairMask) : {};
  const quality = assessQuality({
    faceCount,
    skinLightness: features["skin.l"] ?? 0,
    faceAreaFraction: faceAreaFraction(landmarks),
  });
  if (!quality.ok) {
    return { ok: false, quality };
  }

  const detected: DetectedColouring = {
    skinTone: confident("skinTone", features, embeddings),
    undertone: confident("undertone", features, embeddings),
    eyeColour: confident("eyeColour", features, embeddings),
    hairColour: confident("hairColour", features, embeddings),
  };
  if (!Object.values(detected).some(Boolean)) {
    return {
      ok: false,
      quality: {
        ok: false,
        reason: "low_confidence",
        message:
          "We couldn't confidently estimate your colouring from this photo.",
      },
    };
  }
  return { ok: true, detected };
}

type Channel = keyof typeof model;
type ChannelValue = {
  skinTone: SkinTone;
  undertone: Undertone;
  eyeColour: EyeColour;
  hairColour: HairColour;
};

/** A prediction only if it clears the channel's calibrated threshold. */
function confident<C extends Channel>(channel: C, features: Features, embeddings: Embeddings) {
  const prediction = classify(channel, features, embeddings);
  return prediction && prediction.confidence >= model[channel].minConfidence
    ? prediction
    : undefined;
}

/**
 * Multinomial logistic regression over standardised features and, for some
 * channels, a raw image embedding (fitted by calibration/scripts/train.py).
 * Returns undefined when a required region or embedding is missing.
 */
export function classify<C extends Channel>(
  channel: C,
  features: Features,
  embeddings: Embeddings = {},
): DetectedChannel<ChannelValue[C]> | undefined {
  const m = model[channel];
  const x = m.features.map((name, i) => (features[name] - m.mean[i]) / m.scale[i]);
  if (x.some((v) => !Number.isFinite(v))) return undefined;
  const e = m.embedding && embeddings[m.embedding.input];
  if (m.embedding && !e) return undefined;

  const scores = m.weights.map((w, k) => {
    let sum = w.reduce((acc, wi, i) => acc + wi * x[i], m.bias[k]);
    if (m.embedding && e) {
      const we = m.embedding.weights[k];
      for (let j = 0; j < we.length; j++) sum += we[j] * e[j];
    }
    return sum;
  });
  const max = Math.max(...scores);
  const exps = scores.map((s) => Math.exp(s - max));
  const total = exps.reduce((a, b) => a + b, 0);
  const best = scores.indexOf(max);
  // Near misses (an adjacent skin shade, a neighbouring dark hair shade) count
  // towards confidence, matching how the thresholds were calibrated.
  const near = m.neighbours?.[m.classes[best]] ?? [];
  const confidence =
    near.reduce((sum, n) => sum + exps[m.classes.indexOf(n)], exps[best]) / total;
  return { value: m.classes[best] as ChannelValue[C], confidence };
}

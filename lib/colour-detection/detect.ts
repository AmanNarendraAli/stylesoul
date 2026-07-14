import type {
  EyeColour,
  HairColour,
  SkinTone,
  Undertone,
} from "../colour-season/map.ts";
import type { Lab } from "./colour.ts";
import { dominantLab } from "./cluster.ts";
import { matchNearest } from "./match.ts";
import { eyePresets, hairPresets, skinPresets } from "./presets.ts";
import {
  faceAreaFraction,
  meanLightness,
  sampleBox,
  sampleEye,
  sampleHair,
  sampleSkin,
  type PixelSource,
  type Point,
} from "./regions.ts";
import { assessQuality, type QualityResult } from "./quality.ts";

/**
 * A single detected channel: the matched preset plus a 0–1 confidence the UX
 * uses to decide how strongly to suggest it. Channels with no usable samples
 * (e.g. hair off-frame) are simply absent.
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

/**
 * Full client detection: landmark-driven region sampling, quality gate, then
 * dominant-colour + nearest-preset matching per channel.
 */
export function detectColouring(
  source: PixelSource,
  landmarks: Point[],
  faceCount: number,
): DetectionResult {
  const skinSamples = sampleSkin(source, landmarks);

  const quality = assessQuality({
    faceCount,
    meanLightness: meanLightness(skinSamples),
    faceAreaFraction: faceAreaFraction(landmarks),
  });
  if (!quality.ok) {
    return { ok: false, quality };
  }

  return {
    ok: true,
    detected: detectFromSamples({
      skin: skinSamples,
      eye: sampleEye(source, landmarks),
      hair: sampleHair(source, landmarks),
    }),
  };
}

/**
 * Landmark-free detection for the server fallback. Without a face mesh we
 * approximate regions by position: a centre box for skin and a top band for
 * hair. Eye colour needs the iris landmarks, so it is left for the manual
 * screen.
 */
export function detectColouringHeuristic(
  source: PixelSource,
): DetectedColouring {
  const skin = sampleBox(source, { x0: 0.35, y0: 0.4, x1: 0.65, y1: 0.7 });
  const hair = sampleBox(source, { x0: 0.3, y0: 0.02, x1: 0.7, y1: 0.15 });
  return detectFromSamples({ skin, eye: [], hair });
}

/** Match each channel's dominant colour to the nearest preset. */
export function detectFromSamples(samples: {
  skin: Lab[];
  eye: Lab[];
  hair: Lab[];
}): DetectedColouring {
  const detected: DetectedColouring = {};

  if (samples.skin.length > 0) {
    const skinLab = dominantLab(samples.skin);
    const m = matchNearest(skinLab, skinPresets);
    detected.skinTone = { value: m.value, confidence: m.confidence };
    detected.undertone = {
      value: undertoneFromLab(skinLab),
      confidence: Math.max(0, Math.min(1, m.confidence * 0.55)),
    };
  }
  if (samples.eye.length > 0) {
    const m = matchNearest(dominantLab(samples.eye), eyePresets);
    detected.eyeColour = { value: m.value, confidence: m.confidence };
  }
  if (samples.hair.length > 0) {
    const m = matchNearest(dominantLab(samples.hair), hairPresets);
    detected.hairColour = { value: m.value, confidence: m.confidence };
  }

  return detected;
}

function undertoneFromLab({ a, b }: Lab): Undertone {
  const warmth = b - a * 0.35;
  if (warmth > 14 && a < 13) return "olive";
  if (warmth > 10) return "warm";
  if (warmth < 5) return "cool";
  return "neutral";
}

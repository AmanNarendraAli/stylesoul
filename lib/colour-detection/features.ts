import { rgbToLab, type Lab } from "./colour.ts";
import {
  sampleEye,
  sampleHair,
  sampleSclera,
  sampleSkin,
  type HairMask,
  type PixelSource,
  type Point,
} from "./regions.ts";

/**
 * Scalar colour features the classifier consumes, e.g. `skin.l`, `eye.b`.
 * A region that could not be sampled contributes no keys. Training
 * (calibration/scripts) and the runtime both call this, so they cannot drift.
 */
export type Features = Record<string, number>;

const MIN_SAMPLES = { skin: 50, eye: 20, hair: 100, sclera: 10 };
const IMAGE_STRIDE = 8;

export function extractFeatures(
  source: PixelSource,
  landmarks: Point[],
  hairMask?: HairMask,
): Features {
  const features: Features = {};
  // Drop the darkest quarter (pores, shadow, lashes) and brightest tenth
  // (specular highlights) before taking the median.
  add(features, "skin", sampleSkin(source, landmarks, hairMask), MIN_SAMPLES.skin, 0.25, 0.9);
  add(features, "eye", sampleEye(source, landmarks), MIN_SAMPLES.eye, 0.25, 0.9);
  // The brightest sclera pixels are the best stand-in for the light's white point.
  add(features, "sclera", sampleSclera(source, landmarks), MIN_SAMPLES.sclera, 0.6, 0.95);
  const hair = sampleHair(source, landmarks, hairMask);
  if (add(features, "hair", hair, MIN_SAMPLES.hair, 0.25, 0.9)) {
    features["hair.lHigh"] = percentileL(hair, 0.9);
    // Lit strands show whether dark hair is brown or black and how warm it is.
    add(features, "hairLit", hair, MIN_SAMPLES.hair, 0.75, 0.97);
    features["hair.lLow"] = percentileL(hair, 0.1);
  }

  const image: Lab[] = [];
  for (let y = 0; y < source.height; y += IMAGE_STRIDE) {
    for (let x = 0; x < source.width; x += IMAGE_STRIDE) {
      image.push(rgbToLab(source.getPixel(x, y)));
    }
  }
  add(features, "image", image, 1, 0, 1);
  return features;
}

function add(
  features: Features,
  region: string,
  samples: Lab[],
  minSamples: number,
  lo: number,
  hi: number,
): boolean {
  if (samples.length < minSamples) return false;
  const byL = [...samples].sort((p, q) => p.l - q.l);
  const band = byL.slice(Math.floor(lo * byL.length), Math.max(1, Math.ceil(hi * byL.length)));
  features[`${region}.l`] = median(band.map((s) => s.l));
  features[`${region}.a`] = median(band.map((s) => s.a));
  features[`${region}.b`] = median(band.map((s) => s.b));
  return true;
}

function percentileL(samples: Lab[], q: number): number {
  const ls = samples.map((s) => s.l).sort((a, b) => a - b);
  return ls[Math.floor(q * (ls.length - 1))];
}

export function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

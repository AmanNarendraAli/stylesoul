import { deltaE2000, type Lab } from "./colour.ts";
import type { Preset } from "./presets.ts";

/**
 * Match result for a single channel (skin / eye / hair).
 *
 * `confidence` blends two signals into a 0–1 score:
 *  - how close the best preset is (small ΔE → high confidence), and
 *  - how much it beats the runner-up (a clear winner is more trustworthy than
 *    a near-tie between two presets).
 *
 * Above-threshold ΔE to the *nearest* preset means the detected colour is far
 * from anything we offer (bad lighting, wrong region) — callers treat that as a
 * low-confidence guess and lean on the manual screen.
 */
export type Match<T extends string> = {
  value: T;
  deltaE: number;
  runnerUpDeltaE: number;
  confidence: number;
};

// ΔE at/above which a single match is considered "no real match". ~25 ΔE2000
// is a large perceptual gap given how spread the presets are. Placeholder
// pending calibration against labelled photos (see /calibration).
const MAX_USEFUL_DELTA_E = 25;

export function matchNearest<T extends string>(
  detected: Lab,
  presets: Preset<T>[],
): Match<T> {
  if (presets.length === 0) {
    throw new Error("matchNearest: no presets provided");
  }

  const ranked = presets
    .map((p) => ({ value: p.value, deltaE: deltaE2000(detected, p.lab) }))
    .sort((a, b) => a.deltaE - b.deltaE);

  const best = ranked[0];
  const runnerUp = ranked[1] ?? { deltaE: Infinity };

  return {
    value: best.value,
    deltaE: best.deltaE,
    runnerUpDeltaE: runnerUp.deltaE,
    confidence: confidenceFrom(best.deltaE, runnerUp.deltaE),
  };
}

function confidenceFrom(bestDeltaE: number, runnerUpDeltaE: number): number {
  // Closeness: 1 when ΔE is 0, 0 once it reaches MAX_USEFUL_DELTA_E.
  const closeness = clamp01(1 - bestDeltaE / MAX_USEFUL_DELTA_E);
  // Separation: how decisively the winner beats the runner-up, normalised by
  // the winner's own distance so a 2-unit lead matters more when ΔE is small.
  const margin = runnerUpDeltaE - bestDeltaE;
  const separation = clamp01(margin / (bestDeltaE + margin || 1));
  return clamp01(0.6 * closeness + 0.4 * separation);
}

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

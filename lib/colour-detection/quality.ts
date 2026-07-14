/**
 * Photo quality gate. Runs before we trust any detected colour: a too-dark,
 * too-small, or multi-face photo produces unreliable samples, so we'd rather
 * send the user straight to the manual screen than pre-fill a bad guess.
 *
 * Pure: takes already-measured metrics so it unit-tests without an image.
 */

export type QualityMetrics = {
  /** Number of faces the landmarker detected. */
  faceCount: number;
  /** Mean L* (0–100) over the sampled skin region. */
  meanLightness: number;
  /** Face bounding-box area as a fraction (0–1) of the whole image. */
  faceAreaFraction: number;
};

export type QualityResult =
  | { ok: true }
  | { ok: false; reason: QualityReason; message: string };

export type QualityReason =
  | "no_face"
  | "multiple_faces"
  | "too_dark"
  | "too_bright"
  | "face_too_small";

// Thresholds are placeholders pending calibration (see /calibration).
const MIN_LIGHTNESS = 25; // below this, shadows dominate the skin sample
const MAX_LIGHTNESS = 95; // above this, the region is blown out / overexposed
const MIN_FACE_AREA = 0.04; // face smaller than ~4% of frame → too few pixels

export function assessQuality(metrics: QualityMetrics): QualityResult {
  if (metrics.faceCount === 0) {
    return {
      ok: false,
      reason: "no_face",
      message: "We couldn't find a face. Try a clear, front-facing photo.",
    };
  }
  if (metrics.faceCount > 1) {
    return {
      ok: false,
      reason: "multiple_faces",
      message: "We found more than one face. Use a photo of just you.",
    };
  }
  if (metrics.faceAreaFraction < MIN_FACE_AREA) {
    return {
      ok: false,
      reason: "face_too_small",
      message: "Move a little closer so your face fills more of the frame.",
    };
  }
  if (metrics.meanLightness < MIN_LIGHTNESS) {
    return {
      ok: false,
      reason: "too_dark",
      message: "The photo is too dark. Find softer, even daylight.",
    };
  }
  if (metrics.meanLightness > MAX_LIGHTNESS) {
    return {
      ok: false,
      reason: "too_bright",
      message: "The photo is overexposed. Avoid direct, harsh light.",
    };
  }
  return { ok: true };
}

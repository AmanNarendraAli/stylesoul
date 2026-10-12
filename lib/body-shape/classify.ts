import { z } from "zod";

export const bodyShapes = [
  "hourglass",
  "triangle",
  "full_midsection",
  "rectangle",
  "inverted_triangle",
] as const;

export type BodyShape = (typeof bodyShapes)[number];

export function isBodyShape(value: string): value is BodyShape {
  return (bodyShapes as readonly string[]).includes(value);
}

const emptyToUndefined = (value: unknown) =>
  value === "" || value === null || value === undefined ? undefined : value;

/** Whole-number measurement whose every error states the allowed range. */
const measurement = (label: string, min: number, max: number, unit = "cm") => {
  const message = `Enter a ${label} between ${min} and ${max} ${unit}`;
  return z.coerce
    .number({ error: message })
    .int(message)
    .min(min, message)
    .max(max, message);
};

/** An optional measurement; blank or null counts as not given. */
export const optionalMeasurement = (
  label: string,
  min: number,
  max: number,
  unit = "cm",
) => z.preprocess(emptyToUndefined, measurement(label, min, max, unit).optional());

/** Bust, waist and hips drive the shape; height and shoulders are extras. */
export const bodyMeasurementsSchema = z.object({
  heightCm: optionalMeasurement("height", 120, 230),
  bustCm: measurement("bust measurement", 60, 180),
  waistCm: measurement("waist measurement", 45, 180),
  hipsCm: measurement("hip measurement", 60, 190),
  // Stored as `shouldersCm` for compatibility; this is shoulder-to-shoulder width.
  shouldersCm: optionalMeasurement("shoulder width", 25, 70),
});

export type BodyMeasurements = z.infer<typeof bodyMeasurementsSchema>;

/**
 * Reduced FFIT/Lee drop thresholds, converted from inches to centimetres.
 *
 * Sokolowski and Bettencourt present modified FFIT formulas adapted from Lee
 * et al. in Table 9:
 * https://proc.3dbody.tech/papers/2020/2022sokolowski.pdf
 * High-hip-dependent subtypes cannot be separated from the measurements
 * collected here; Diamond and Oval are intentionally combined to retain five
 * styling labels. This reduction is measurement-based and evidence-informed,
 * not FFIT-validated anatomy or an accuracy claim.
 */
const CM_PER_INCH = 2.54;
const BALANCED_DROP_CM = 3.6 * CM_PER_INCH;
const DEFINED_WAIST_CM = 9 * CM_PER_INCH;
const HOURGLASS_HIP_WAIST_CM = 10 * CM_PER_INCH;
// Keep exact inch-to-centimetre boundaries stable after floating-point math.
const FLOAT_TOLERANCE_CM = 1e-9;

export function classifyBodyShape({
  bustCm,
  waistCm,
  hipsCm,
}: BodyMeasurements): BodyShape {
  const bustMinusHip = bustCm - hipsCm;
  const hipMinusBust = hipsCm - bustCm;
  const bustMinusWaist = bustCm - waistCm;
  const hipMinusWaist = hipsCm - waistCm;

  if (
    bustMinusHip <= CM_PER_INCH + FLOAT_TOLERANCE_CM &&
    hipMinusBust < BALANCED_DROP_CM + FLOAT_TOLERANCE_CM &&
    (bustMinusWaist >= DEFINED_WAIST_CM - FLOAT_TOLERANCE_CM ||
      hipMinusWaist >= HOURGLASS_HIP_WAIST_CM - FLOAT_TOLERANCE_CM)
  ) {
    return "hourglass";
  }

  // This reduced five-label model intentionally combines the modified FFIT
  // Diamond/Oval branches when the waist is larger than the hip.
  if (hipMinusWaist < -FLOAT_TOLERANCE_CM) {
    return "full_midsection";
  }

  if (
    (hipMinusBust >= BALANCED_DROP_CM - FLOAT_TOLERANCE_CM &&
      hipMinusWaist >= -FLOAT_TOLERANCE_CM &&
      hipMinusWaist < DEFINED_WAIST_CM + FLOAT_TOLERANCE_CM) ||
    (bustMinusWaist < -FLOAT_TOLERANCE_CM &&
      hipMinusWaist >= -FLOAT_TOLERANCE_CM)
  ) {
    return "triangle";
  }

  if (
    bustMinusHip >= BALANCED_DROP_CM - FLOAT_TOLERANCE_CM &&
    bustMinusWaist < DEFINED_WAIST_CM + FLOAT_TOLERANCE_CM &&
    hipMinusWaist >= -FLOAT_TOLERANCE_CM
  ) {
    return "inverted_triangle";
  }

  if (
    hipMinusBust < BALANCED_DROP_CM + FLOAT_TOLERANCE_CM &&
    bustMinusHip < BALANCED_DROP_CM + FLOAT_TOLERANCE_CM &&
    bustMinusWaist >= -FLOAT_TOLERANCE_CM &&
    bustMinusWaist < DEFINED_WAIST_CM + FLOAT_TOLERANCE_CM &&
    hipMinusWaist < HOURGLASS_HIP_WAIST_CM + FLOAT_TOLERANCE_CM
  ) {
    return "rectangle";
  }

  // The reduced labels are exhaustive even where a published subtype needs
  // an unavailable high-hip or torso measurement.
  if (bustMinusHip > hipMinusBust) return "inverted_triangle";
  if (hipMinusBust > bustMinusHip) return "triangle";
  return "rectangle";
}

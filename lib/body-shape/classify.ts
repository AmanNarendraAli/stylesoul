import { z } from "zod";

export const bodyShapes = [
  "hourglass",
  "triangle",
  "full_midsection",
  "rectangle",
  "inverted_triangle",
] as const;

export type BodyShape = (typeof bodyShapes)[number];

const emptyToUndefined = (value: unknown) =>
  value === "" || value === null || value === undefined ? undefined : value;

export const bodyMeasurementsSchema = z.object({
  heightCm: z.coerce.number().int().min(120).max(230),
  weightKg: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().min(35).max(250).optional(),
  ),
  bustCm: z.coerce.number().int().min(60).max(180),
  waistCm: z.coerce.number().int().min(45).max(180),
  hipsCm: z.coerce.number().int().min(60).max(190),
  // Stored as `shouldersCm` for compatibility; this is shoulder-to-shoulder width.
  shouldersCm: z.coerce
    .number()
    .int()
    .min(25, "Enter a shoulder width between 25 and 70 cm")
    .max(70, "Enter a shoulder width between 25 and 70 cm"),
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

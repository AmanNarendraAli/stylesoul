import { z } from "zod";

export const bodyShapes = [
  "hourglass",
  "pear",
  "apple",
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
  shouldersCm: z.coerce.number().int().min(55).max(190),
});

export type BodyMeasurements = z.infer<typeof bodyMeasurementsSchema>;

export function classifyBodyShape({
  bustCm,
  waistCm,
  hipsCm,
  shouldersCm,
}: BodyMeasurements): BodyShape {
  const bustHips = bustCm / hipsCm;
  const waistHips = waistCm / hipsCm;

  if (Math.abs(bustHips - 1) < 0.05 && waistHips < 0.75) {
    return "hourglass";
  }

  if (hipsCm > bustCm * 1.05) {
    return "pear";
  }

  if (waistCm > bustCm * 0.95) {
    return "apple";
  }

  if (shouldersCm > hipsCm * 1.05) {
    return "inverted_triangle";
  }

  return "rectangle";
}

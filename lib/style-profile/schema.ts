import { z } from "zod";
import {
  bodyMeasurementsSchema,
  classifyBodyShape,
  optionalMeasurement,
  type BodyMeasurements,
} from "../body-shape/classify.ts";
import {
  colouringSchema,
  deriveDimensions,
  mapColourSeason,
} from "../colour-season/map.ts";

export const detectionSources = ["manual", "photo", "photo_corrected"] as const;

const requiredMeasurementKeys = ["bustCm", "waistCm", "hipsCm"] as const;

export function hasMeasurements<T extends Partial<BodyMeasurements>>(
  input: T,
): input is T & BodyMeasurements {
  return requiredMeasurementKeys.every((key) => input[key] !== undefined);
}

/**
 * Colouring is required. Bust, waist and hips come together or not at all;
 * height and shoulder width are optional extras alongside them. Weight is no
 * longer collected but older clients may still send it.
 */
export const styleProfileInputSchema = bodyMeasurementsSchema
  .partial()
  .merge(colouringSchema)
  .extend({
    weightKg: optionalMeasurement("weight", 35, 250, "kg"),
    detectionSource: z.enum(detectionSources).default("manual"),
  })
  .superRefine((input, ctx) => {
    const anyMeasurement = [
      ...Object.keys(bodyMeasurementsSchema.shape),
      "weightKg",
    ].some((key) => input[key as keyof typeof input] !== undefined);
    if (anyMeasurement && !hasMeasurements(input)) {
      ctx.addIssue({
        code: "custom",
        message: "Enter your bust, waist and hips together, or no measurements.",
      });
    }
  });

export type StyleProfileInput = z.infer<typeof styleProfileInputSchema>;

export function deriveStyleProfile(input: StyleProfileInput) {
  const parsed = styleProfileInputSchema.parse(input);
  const bodyShape = hasMeasurements(parsed) ? classifyBodyShape(parsed) : null;

  return {
    ...parsed,
    // New measurements replace saved ones, so a cleared optional field clears.
    ...(bodyShape && {
      heightCm: parsed.heightCm ?? null,
      shouldersCm: parsed.shouldersCm ?? null,
    }),
    ...deriveDimensions(parsed),
    bodyShape,
    colourSeason: mapColourSeason(parsed),
    analysisVersion: 2,
  };
}

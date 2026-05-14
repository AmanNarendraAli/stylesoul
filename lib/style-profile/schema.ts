import { z } from "zod";
import {
  bodyMeasurementsSchema,
  classifyBodyShape,
} from "../body-shape/classify.ts";
import { colouringSchema, mapColourSeason } from "../colour-season/map.ts";

export const detectionSources = ["manual", "photo", "photo_corrected"] as const;

export const styleProfileInputSchema = bodyMeasurementsSchema
  .merge(colouringSchema)
  .extend({
    detectionSource: z.enum(detectionSources).default("manual"),
  });

export type StyleProfileInput = z.infer<typeof styleProfileInputSchema>;

export function deriveStyleProfile(input: StyleProfileInput) {
  const parsed = styleProfileInputSchema.parse(input);

  return {
    ...parsed,
    bodyShape: classifyBodyShape(parsed),
    colourSeason: mapColourSeason(parsed),
    analysisVersion: 1,
  };
}

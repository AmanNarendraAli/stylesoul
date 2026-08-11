import { z } from "zod";
import { bodyShapes } from "@/lib/body-shape/classify";
import { colourSeasons } from "@/lib/colour-season/map";

export const garmentCategories = [
  "tops",
  "knitwear",
  "dresses",
  "trousers",
  "skirts",
  "outerwear",
  "shoes",
  "accessories",
] as const;

export const occasionTags = [
  "casual",
  "work",
  "weekend",
  "evening",
  "occasion",
] as const;

export const priceTiers = ["entry", "mid", "premium"] as const;
export const productStatuses = ["active", "inactive"] as const;

const httpsUrl = z
  .url()
  .refine((value) => new URL(value).protocol === "https:", "Must use HTTPS");

const uniqueValues = <T extends z.ZodTypeAny>(item: T) =>
  z
    .array(item)
    .min(1)
    .refine((values) => new Set(values).size === values.length, {
      message: "Values must be unique",
    });

const productFields = {
  brand: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().max(600).nullable().optional(),
  imageUrl: httpsUrl,
  productUrl: httpsUrl,
  priceCents: z.coerce.number().int().positive().max(10_000_000),
  currency: z.literal("GBP"),
  status: z.enum(productStatuses),
  eligibleShapes: uniqueValues(z.enum(bodyShapes)),
  eligibleSeasons: uniqueValues(z.enum(colourSeasons)),
  garmentCategory: z.enum(garmentCategories),
  occasionTags: uniqueValues(z.enum(occasionTags)),
  priceTier: z.enum(priceTiers),
};

export const productInputSchema = z.object({
  ...productFields,
  currency: productFields.currency.default("GBP"),
  status: productFields.status.default("active"),
});

export const productUpdateSchema = z
  .object(productFields)
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one product field is required",
  });

export type ProductInput = z.infer<typeof productInputSchema>;
export type ProductUpdate = z.infer<typeof productUpdateSchema>;

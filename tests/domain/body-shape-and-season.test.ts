// @vitest-environment node
import assert from "node:assert/strict";
import { describe, it } from "vitest";
import {
  bodyMeasurementsSchema,
  classifyBodyShape,
} from "@/lib/body-shape/classify";
import {
  colouringSchema,
  colourSeasons,
  eyeColours,
  hairColours,
  mapColourSeason,
  seasonDimensionsSchema,
  skinTones,
  undertones,
  type Colouring,
} from "@/lib/colour-season/map";
import {
  deriveStyleProfile,
  styleProfileInputSchema,
} from "@/lib/style-profile/schema";

function measurements(
  bustCm: number,
  waistCm: number,
  hipsCm: number,
) {
  return {
    heightCm: 168,
    bustCm,
    waistCm,
    hipsCm,
    shouldersCm: 40,
  };
}

function testClassifiesReducedBodyShapeExamples() {
  assert.equal(classifyBodyShape(measurements(90, 65, 90)), "hourglass");
  assert.equal(classifyBodyShape(measurements(86, 74, 96)), "triangle");
  assert.equal(classifyBodyShape(measurements(92, 96, 91)), "full_midsection");
  assert.equal(classifyBodyShape(measurements(100, 80, 88)), "inverted_triangle");
  assert.equal(classifyBodyShape(measurements(88, 78, 89)), "rectangle");
}

function testUsesPublishedCentimetreDropBoundaries() {
  const inch = 2.54;

  assert.equal(
    classifyBodyShape(measurements(100, 100 - 9 * inch, 100 - inch)),
    "hourglass",
  );
  assert.equal(
    classifyBodyShape(
      measurements(100, 90, 100 + 3.6 * inch),
    ),
    "triangle",
  );
  assert.equal(
    classifyBodyShape(
      measurements(100 + 3.6 * inch, 90, 100),
    ),
    "inverted_triangle",
  );
  assert.equal(
    classifyBodyShape(measurements(100, 85, 100 + 3.6 * inch - 0.001)),
    "rectangle",
  );
}

function testEverySeasonIsReachable() {
  const seasons = new Set<string>();
  for (const skinTone of skinTones)
    for (const undertone of undertones)
      for (const eyeColour of eyeColours)
        for (const hairColour of hairColours)
          seasons.add(mapColourSeason({ skinTone, undertone, eyeColour, hairColour }));
  assert.deepEqual([...seasons].sort(), [...colourSeasons].sort());
}

function testMapsTextbookArchetypes() {
  const season = (c: Colouring) => mapColourSeason(c);
  // Fair, black hair, blue eyes, cool: the classic bright/clear winter.
  assert.equal(season({ skinTone: "porcelain", undertone: "cool", eyeColour: "blue", hairColour: "black" }), "bright_winter");
  assert.equal(season({ skinTone: "medium", undertone: "warm", eyeColour: "hazel", hairColour: "chestnut_brown" }), "warm_autumn");
  assert.equal(season({ skinTone: "fair", undertone: "cool", eyeColour: "grey", hairColour: "ash_brown" }), "cool_summer");
  assert.equal(season({ skinTone: "porcelain", undertone: "cool", eyeColour: "blue", hairColour: "platinum_blonde" }), "light_summer");
  // Deep colouring is dominated by depth regardless of the hair–skin gap.
  for (const skinTone of ["brown", "deep", "very_deep"] as const) {
    assert.equal(season({ skinTone, undertone: "warm", eyeColour: "brown", hairColour: "black" }), "deep_autumn");
    assert.equal(season({ skinTone, undertone: "cool", eyeColour: "brown", hairColour: "black" }), "deep_winter");
  }
}

function testValidatesAndDerivesStyleProfilePayload() {
  const input = styleProfileInputSchema.parse({
    heightCm: "170",
    weightKg: "64",
    bustCm: "90",
    waistCm: "65",
    hipsCm: "90",
    shouldersCm: "40",
    skinTone: "fair",
    undertone: "warm",
    eyeColour: "green",
    hairColour: "golden_blonde",
    // Client-supplied dimensions are ignored; they are derived from colouring.
    temperature: "cool",
    value: "deep",
  });

  const profile = deriveStyleProfile(input);

  assert.equal(profile.detectionSource, "manual");
  assert.equal(profile.bodyShape, "hourglass");
  assert.equal(profile.colourSeason, "warm_spring");
  assert.deepEqual(
    {
      temperature: profile.temperature,
      value: profile.value,
      chroma: profile.chroma,
      contrast: profile.contrast,
    },
    {
      temperature: "warm",
      value: "light",
      chroma: "bright",
      contrast: "low",
    },
  );
  assert.equal(profile.analysisVersion, 2);
}

function testAcceptsPhotoCorrectedUndertonePayload() {
  const input = styleProfileInputSchema.parse({
    heightCm: 170,
    bustCm: 90,
    waistCm: 65,
    hipsCm: 90,
    shouldersCm: 40,
    skinTone: "medium",
    undertone: "warm",
    eyeColour: "hazel",
    hairColour: "chestnut_brown",
    detectionSource: "photo_corrected",
  });

  const profile = deriveStyleProfile(input);

  assert.equal(profile.undertone, "warm");
  assert.equal(profile.detectionSource, "photo_corrected");
  assert.equal(profile.colourSeason, "warm_autumn");
}

function testRejectsInvalidValues() {
  assert.equal(
    styleProfileInputSchema.safeParse({
      heightCm: 80,
      bustCm: 90,
      waistCm: 65,
      hipsCm: 90,
      shouldersCm: 40,
      skinTone: "purple",
      undertone: "warm",
      eyeColour: "green",
      hairColour: "golden_blonde",
      temperature: "warm",
      value: "light",
      chroma: "bright",
      contrast: "medium",
    }).success,
    false,
  );
  assert.equal(
    seasonDimensionsSchema.safeParse({
      temperature: "warm",
      value: "light",
      chroma: "bright",
      contrast: "extreme",
    }).success,
    false,
  );
}

function testDerivesColourOnlyProfileWithoutBodyShape() {
  const profile = deriveStyleProfile(
    styleProfileInputSchema.parse({
      skinTone: "fair",
      undertone: "warm",
      eyeColour: "green",
      hairColour: "golden_blonde",
    }),
  );

  assert.equal(profile.bodyShape, null);
  assert.equal(profile.colourSeason, "warm_spring");
  assert.equal(profile.temperature, "warm");
}

function testRejectsPartialMeasurements() {
  const colouring = {
    skinTone: "fair",
    undertone: "warm",
    eyeColour: "green",
    hairColour: "golden_blonde",
  };
  const partial = styleProfileInputSchema.safeParse({
    ...colouring,
    heightCm: 170,
    bustCm: 90,
  });
  assert.equal(partial.success, false);
  assert.match(
    partial.error?.issues[0].message ?? "",
    /bust, waist and hips together/,
  );
  for (const extra of [{ heightCm: 170 }, { shouldersCm: 40 }, { weightKg: 64 }]) {
    assert.equal(
      styleProfileInputSchema.safeParse({ ...colouring, ...extra }).success,
      false,
    );
  }
}

function testHeightAndShouldersAreOptional() {
  const profile = deriveStyleProfile(
    styleProfileInputSchema.parse({
      skinTone: "fair",
      undertone: "warm",
      eyeColour: "green",
      hairColour: "golden_blonde",
      bustCm: 90,
      waistCm: 65,
      hipsCm: 90,
    }),
  );

  assert.equal(profile.bodyShape, "hourglass");
  assert.equal(profile.heightCm, null);
  assert.equal(profile.shouldersCm, null);
}

function testColouringErrorsAreFriendly() {
  const result = colouringSchema.safeParse({ undertone: "" });
  assert.deepEqual(
    result.error?.issues.map((issue) => issue.message),
    ["Pick a skin tone", "Pick an undertone", "Pick an eye colour", "Pick a hair colour"],
  );
}

function testAcceptsShoulderWidthAndRejectsCircumferenceRange() {
  assert.equal(
    bodyMeasurementsSchema.safeParse(measurements(90, 65, 90)).success,
    true,
  );
  assert.equal(
    bodyMeasurementsSchema.safeParse({
      ...measurements(90, 65, 90),
      shouldersCm: 80,
    }).success,
    false,
  );
}

describe("body shape and colour season derivation", () => {
  it("classifies reduced body shape examples", testClassifiesReducedBodyShapeExamples);
  it("uses published centimetre drop boundaries", testUsesPublishedCentimetreDropBoundaries);
  it("can reach every season", testEverySeasonIsReachable);
  it("maps textbook archetypes", testMapsTextbookArchetypes);
  it("validates and derives a style profile payload", testValidatesAndDerivesStyleProfilePayload);
  it("accepts a photo-corrected undertone payload", testAcceptsPhotoCorrectedUndertonePayload);
  it("rejects invalid values", testRejectsInvalidValues);
  it(
    "derives a colour-only profile without a body shape",
    testDerivesColourOnlyProfileWithoutBodyShape,
  );
  it("rejects a partial set of measurements", testRejectsPartialMeasurements);
  it("treats height and shoulder width as optional", testHeightAndShouldersAreOptional);
  it("gives a friendly message for each unpicked colouring group", testColouringErrorsAreFriendly);
  it(
    "accepts shoulder width and rejects an out-of-range shoulder value",
    testAcceptsShoulderWidthAndRejectsCircumferenceRange,
  );
});

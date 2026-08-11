import assert from "node:assert/strict";
import {
  bodyMeasurementsSchema,
  classifyBodyShape,
} from "../lib/body-shape/classify.ts";
import {
  colourSeasons,
  mapColourSeason,
  seasonDimensionsSchema,
  seasonPrototypes,
} from "../lib/colour-season/map.ts";
import {
  deriveStyleProfile,
  styleProfileInputSchema,
} from "../lib/style-profile/schema.ts";

const baseColouring = {
  skinTone: "fair" as const,
  undertone: "neutral" as const,
  eyeColour: "grey" as const,
  hairColour: "ash_brown" as const,
};

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

function testMapsEveryCanonicalSeason() {
  const seasons = seasonPrototypes.map((prototype) =>
    mapColourSeason(baseColouring, prototype),
  );

  assert.deepEqual(seasons, [...colourSeasons]);
  assert.equal(new Set(seasons).size, 12);
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
    temperature: "warm",
    value: "light",
    chroma: "bright",
    contrast: "medium",
  });

  const profile = deriveStyleProfile(input);

  assert.equal(profile.detectionSource, "manual");
  assert.equal(profile.bodyShape, "hourglass");
  assert.equal(profile.colourSeason, "light_spring");
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
      contrast: "medium",
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
    temperature: "warm",
    value: "medium",
    chroma: "soft",
    contrast: "medium",
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

testClassifiesReducedBodyShapeExamples();
testUsesPublishedCentimetreDropBoundaries();
testMapsEveryCanonicalSeason();
testValidatesAndDerivesStyleProfilePayload();
testAcceptsPhotoCorrectedUndertonePayload();
testRejectsInvalidValues();
testAcceptsShoulderWidthAndRejectsCircumferenceRange();

console.log("Phase 1 backend tests passed");

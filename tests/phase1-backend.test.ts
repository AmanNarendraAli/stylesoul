import assert from "node:assert/strict";
import { classifyBodyShape } from "../lib/body-shape/classify.ts";
import { mapColourSeason } from "../lib/colour-season/map.ts";
import {
  deriveStyleProfile,
  styleProfileInputSchema,
} from "../lib/style-profile/schema.ts";

function testClassifiesCanonicalBodyShapeExamples() {
  assert.equal(
    classifyBodyShape({
      heightCm: 168,
      bustCm: 90,
      waistCm: 65,
      hipsCm: 90,
      shouldersCm: 92,
    }),
    "hourglass",
  );

  assert.equal(
    classifyBodyShape({
      heightCm: 168,
      bustCm: 86,
      waistCm: 74,
      hipsCm: 96,
      shouldersCm: 88,
    }),
    "pear",
  );

  assert.equal(
    classifyBodyShape({
      heightCm: 168,
      bustCm: 92,
      waistCm: 89,
      hipsCm: 91,
      shouldersCm: 93,
    }),
    "apple",
  );

  assert.equal(
    classifyBodyShape({
      heightCm: 168,
      bustCm: 86,
      waistCm: 76,
      hipsCm: 88,
      shouldersCm: 96,
    }),
    "inverted_triangle",
  );

  assert.equal(
    classifyBodyShape({
      heightCm: 168,
      bustCm: 88,
      waistCm: 78,
      hipsCm: 89,
      shouldersCm: 91,
    }),
    "rectangle",
  );
}

function testMapsColouringToMvpSeasons() {
  assert.equal(
    mapColourSeason({
      skinTone: "fair",
      undertone: "warm",
      eyeColour: "green",
      hairColour: "golden_blonde",
    }),
    "warm_spring",
  );

  assert.equal(
    mapColourSeason({
      skinTone: "medium",
      undertone: "warm",
      eyeColour: "brown",
      hairColour: "chestnut_brown",
    }),
    "warm_autumn",
  );

  assert.equal(
    mapColourSeason({
      skinTone: "fair",
      undertone: "cool",
      eyeColour: "blue",
      hairColour: "ash_brown",
    }),
    "cool_summer",
  );

  assert.equal(
    mapColourSeason({
      skinTone: "deep",
      undertone: "cool",
      eyeColour: "brown",
      hairColour: "black",
    }),
    "cool_winter",
  );

  assert.equal(
    mapColourSeason({
      skinTone: "brown",
      undertone: "neutral",
      eyeColour: "hazel",
      hairColour: "chestnut_brown",
    }),
    "warm_autumn",
  );
}

function testValidatesAndDerivesStyleProfilePayload() {
  const input = styleProfileInputSchema.parse({
    heightCm: "170",
    weightKg: "64",
    bustCm: "90",
    waistCm: "65",
    hipsCm: "90",
    shouldersCm: "92",
    skinTone: "fair",
    undertone: "warm",
    eyeColour: "green",
    hairColour: "golden_blonde",
  });

  const profile = deriveStyleProfile(input);

  assert.equal(profile.detectionSource, "manual");
  assert.equal(profile.bodyShape, "hourglass");
  assert.equal(profile.colourSeason, "warm_spring");
  assert.equal(profile.analysisVersion, 1);
}

function testAcceptsPhotoCorrectedUndertonePayload() {
  const input = styleProfileInputSchema.parse({
    heightCm: 170,
    bustCm: 90,
    waistCm: 65,
    hipsCm: 90,
    shouldersCm: 92,
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
  const result = styleProfileInputSchema.safeParse({
    heightCm: 80,
    bustCm: 90,
    waistCm: 65,
    hipsCm: 90,
    shouldersCm: 92,
    skinTone: "purple",
    undertone: "warm",
    eyeColour: "green",
    hairColour: "golden_blonde",
  });

  assert.equal(result.success, false);
}

testClassifiesCanonicalBodyShapeExamples();
testMapsColouringToMvpSeasons();
testValidatesAndDerivesStyleProfilePayload();
testAcceptsPhotoCorrectedUndertonePayload();
testRejectsInvalidValues();

console.log("Phase 1 backend tests passed");

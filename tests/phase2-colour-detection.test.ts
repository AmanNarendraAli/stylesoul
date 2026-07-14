import assert from "node:assert/strict";
import {
  deltaE2000,
  hexToLab,
  hexToRgb,
  rgbToLab,
  type Lab,
} from "../lib/colour-detection/colour.ts";
import { dominantLab, kmeansLab } from "../lib/colour-detection/cluster.ts";
import { matchNearest } from "../lib/colour-detection/match.ts";
import {
  eyePresets,
  hairPresets,
  skinPresets,
} from "../lib/colour-detection/presets.ts";
import { assessQuality } from "../lib/colour-detection/quality.ts";
import {
  faceAreaFraction,
  meanLightness,
} from "../lib/colour-detection/regions.ts";
import { detectFromSamples } from "../lib/colour-detection/detect.ts";
import { skinOptions } from "../lib/colour-season/options.ts";

function approx(actual: number, expected: number, tol: number, label: string) {
  assert.ok(
    Math.abs(actual - expected) <= tol,
    `${label}: expected ~${expected}, got ${actual} (tol ${tol})`,
  );
}

function testRgbAndLabConversions() {
  assert.deepEqual(hexToRgb("#FF8000"), { r: 255, g: 128, b: 0 });
  assert.deepEqual(hexToRgb("#fff"), { r: 255, g: 255, b: 255 });

  const white = rgbToLab({ r: 255, g: 255, b: 255 });
  approx(white.l, 100, 0.5, "white L");
  approx(white.a, 0, 0.5, "white a");
  approx(white.b, 0, 0.5, "white b");

  const black = rgbToLab({ r: 0, g: 0, b: 0 });
  approx(black.l, 0, 0.5, "black L");

  const red = rgbToLab({ r: 255, g: 0, b: 0 });
  approx(red.l, 53.24, 0.6, "red L");
  approx(red.a, 80.09, 0.6, "red a");
  approx(red.b, 67.2, 0.6, "red b");
}

function testDeltaE2000ReferencePairs() {
  // Identical colours → 0.
  const c: Lab = { l: 40, a: 10, b: -20 };
  approx(deltaE2000(c, c), 0, 1e-9, "ΔE identical");

  // Symmetric.
  const x: Lab = { l: 50, a: 2.6772, b: -79.7751 };
  const y: Lab = { l: 50, a: 0, b: -82.7485 };
  approx(deltaE2000(x, y), deltaE2000(y, x), 1e-9, "ΔE symmetry");

  // Sharma et al. (2005) CIEDE2000 reference pairs.
  approx(deltaE2000(x, y), 2.0425, 0.02, "ΔE Sharma pair 1");
  approx(
    deltaE2000({ l: 50, a: 2.49, b: -0.001 }, { l: 50, a: -2.49, b: 0.0009 }),
    7.1792,
    0.02,
    "ΔE Sharma rotation pair",
  );
}

function testEveryPresetMatchesItself() {
  for (const presets of [skinPresets, eyePresets, hairPresets]) {
    for (const preset of presets) {
      const m = matchNearest(preset.lab, presets);
      assert.equal(
        m.value,
        preset.value,
        `preset ${preset.value} should match itself`,
      );
      approx(m.deltaE, 0, 1e-9, `${preset.value} self ΔE`);
      assert.ok(m.confidence > 0.9, `${preset.value} self confidence high`);
    }
  }
}

function testClusteringIgnoresOutliers() {
  // 30 near-identical "skin" pixels plus a handful of shadow/highlight outliers.
  const skin: Lab = { l: 70, a: 12, b: 22 };
  const pixels: Lab[] = [];
  for (let i = 0; i < 30; i++) {
    pixels.push({ l: skin.l + (i % 3), a: skin.a, b: skin.b });
  }
  pixels.push({ l: 5, a: 0, b: 0 }); // deep shadow
  pixels.push({ l: 98, a: 0, b: 0 }); // specular highlight
  pixels.push({ l: 4, a: 1, b: -1 });

  const dom = dominantLab(pixels, 3);
  approx(dom.l, skin.l + 1, 2, "dominant L near skin");
  approx(dom.a, skin.a, 1, "dominant a near skin");

  // The dominant cluster should be the populous one.
  const clusters = kmeansLab(pixels, 3);
  assert.ok(clusters[0].size >= 28, "dominant cluster holds the skin pixels");
}

function testQualityGate() {
  assert.equal(
    assessQuality({ faceCount: 0, meanLightness: 60, faceAreaFraction: 0.2 })
      .ok,
    false,
  );
  assert.equal(
    (
      assessQuality({
        faceCount: 2,
        meanLightness: 60,
        faceAreaFraction: 0.2,
      }) as { reason: string }
    ).reason,
    "multiple_faces",
  );
  assert.equal(
    (
      assessQuality({
        faceCount: 1,
        meanLightness: 10,
        faceAreaFraction: 0.2,
      }) as { reason: string }
    ).reason,
    "too_dark",
  );
  assert.equal(
    (
      assessQuality({
        faceCount: 1,
        meanLightness: 60,
        faceAreaFraction: 0.01,
      }) as { reason: string }
    ).reason,
    "face_too_small",
  );
  assert.equal(
    assessQuality({ faceCount: 1, meanLightness: 60, faceAreaFraction: 0.2 })
      .ok,
    true,
  );
}

function testDetectFromSamplesRecoversPreset() {
  // Build a uniform skin region from a known preset hex and confirm it maps
  // back to that preset.
  const target = skinOptions[3]; // medium
  const lab = hexToLab(target.hex);
  const skin = Array.from({ length: 25 }, () => ({ ...lab }));

  const detected = detectFromSamples({ skin, eye: [], hair: [] });
  assert.equal(detected.skinTone?.value, target.value);
  assert.equal(detected.undertone?.value, "warm");
  assert.ok((detected.skinTone?.confidence ?? 0) > 0.9);
  assert.ok((detected.undertone?.confidence ?? 0) > 0.5);
  // No eye/hair samples → those channels absent.
  assert.equal(detected.eyeColour, undefined);
  assert.equal(detected.hairColour, undefined);
}

function testRegionMetrics() {
  approx(meanLightness([{ l: 40, a: 0, b: 0 }, { l: 60, a: 0, b: 0 }]), 50, 1e-9, "meanLightness");
  assert.equal(meanLightness([]), 0);

  const frac = faceAreaFraction([
    { x: 0.2, y: 0.3 },
    { x: 0.6, y: 0.8 },
    { x: 0.4, y: 0.5 },
  ]);
  approx(frac, 0.4 * 0.5, 1e-9, "faceAreaFraction");
}

const tests = [
  testRgbAndLabConversions,
  testDeltaE2000ReferencePairs,
  testEveryPresetMatchesItself,
  testClusteringIgnoresOutliers,
  testQualityGate,
  testDetectFromSamplesRecoversPreset,
  testRegionMetrics,
];

let failures = 0;
for (const test of tests) {
  try {
    test();
    console.log(`  ✓ ${test.name}`);
  } catch (err) {
    failures += 1;
    console.error(`  ✗ ${test.name}`);
    console.error(err);
  }
}

if (failures > 0) {
  console.error(`\n${failures} test(s) failed`);
  process.exit(1);
}
console.log("\nphase2 colour-detection tests passed");

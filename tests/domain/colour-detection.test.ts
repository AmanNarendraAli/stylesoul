// @vitest-environment node
import { describe, expect, it } from "vitest";
import { skinTones } from "@/lib/colour-season/map";
import { hexToRgb, rgbToLab, type Lab, type Rgb } from "@/lib/colour-detection/colour";
import { classify, detectColouring } from "@/lib/colour-detection/detect";
import { assessQuality } from "@/lib/colour-detection/quality";
import {
  sampleEye,
  sampleHair,
  sampleSkin,
  type PixelSource,
  type Point,
} from "@/lib/colour-detection/regions";

const SIZE = 200;

function labDistance(p: Lab, q: Lab): number {
  return Math.hypot(p.l - q.l, p.a - q.a, p.b - q.b);
}

function image(paint: (x: number, y: number) => Rgb): PixelSource {
  return { width: SIZE, height: SIZE, getPixel: paint };
}

/** 478 MediaPipe-indexed points, all at the centre unless overridden. */
function landmarks(overrides: Record<number, Point>): Point[] {
  return Array.from({ length: 478 }, (_, i) => overrides[i] ?? { x: 0.5, y: 0.5 });
}

describe("colour maths", () => {
  it("converts sRGB to CIE Lab", () => {
    expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    const red = rgbToLab({ r: 255, g: 0, b: 0 });
    expect(red.l).toBeCloseTo(53.24, 0);
    expect(red.a).toBeCloseTo(80.09, 0);
    expect(red.b).toBeCloseTo(67.2, 0);
  });
});

describe("quality gate", () => {
  const good = { faceCount: 1, skinLightness: 60, faceAreaFraction: 0.2 };

  it("rejects missing, multiple and tiny faces and blown exposure", () => {
    expect(assessQuality({ ...good, faceCount: 0 })).toMatchObject({ reason: "no_face" });
    expect(assessQuality({ ...good, faceCount: 2 })).toMatchObject({ reason: "multiple_faces" });
    expect(assessQuality({ ...good, faceAreaFraction: 0.01 })).toMatchObject({ reason: "face_too_small" });
    expect(assessQuality({ ...good, skinLightness: 5 })).toMatchObject({ reason: "too_dark" });
    expect(assessQuality({ ...good, skinLightness: 99 })).toMatchObject({ reason: "too_bright" });
  });

  it("accepts very deep skin in ordinary light", () => {
    expect(assessQuality({ ...good, skinLightness: 25 })).toEqual({ ok: true });
  });

  it("fails detection without a face", () => {
    const result = detectColouring(image(() => ({ r: 200, g: 160, b: 140 })), [], 0);
    expect(result).toMatchObject({ ok: false, quality: { reason: "no_face" } });
  });
});

describe("region sampling", () => {
  // One eye centred at (0.3, 0.5) with iris radius 10px and a lid box of
  // ±25px × ±8px; the other iris is pushed off-image.
  const BLUE = { r: 60, g: 110, b: 170 };
  const eyeLandmarks = landmarks({
    468: { x: 0.3, y: 0.5 },
    469: { x: 0.35, y: 0.5 },
    470: { x: 0.3, y: 0.45 },
    471: { x: 0.25, y: 0.5 },
    472: { x: 0.3, y: 0.55 },
    ...Object.fromEntries(
      [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246].map((idx, i) => {
        // Walk the lid outline: lower lid left→right, upper lid right→left.
        const t = i < 9 ? i / 8 : 1 - (i - 8) / 8;
        return [idx, { x: 0.175 + 0.25 * t, y: i < 9 ? 0.54 : 0.46 }];
      }),
    ),
    473: { x: 2, y: 2 },
  });
  const eyeImage = image((x, y) => {
    const d = Math.hypot(x - 60, y - 100);
    if (d < 3) return { r: 0, g: 0, b: 0 }; // pupil
    if (d <= 10) return BLUE;
    return { r: 240, g: 240, b: 240 }; // sclera
  });

  it("samples only iris between pupil and limbus, inside the lids", () => {
    const samples = sampleEye(eyeImage, eyeLandmarks);
    const blue = rgbToLab(BLUE);
    expect(samples.length).toBeGreaterThan(50);
    for (const s of samples) expect(labDistance(s, blue)).toBeLessThan(1);
  });

  it("takes hair only from the segmentation mask", () => {
    const brown = { r: 90, g: 60, b: 40 };
    const source = image((_, y) => (y < 40 ? brown : { r: 230, g: 230, b: 230 }));
    expect(sampleHair(source, landmarks({}))).toEqual([]);
    const samples = sampleHair(source, landmarks({}), (_, y) => (y < 40 ? 1 : 0));
    expect(samples.length).toBeGreaterThan(0);
    for (const s of samples) expect(labDistance(s, rgbToLab(brown))).toBeLessThan(1);
  });

  it("drops skin pixels covered by hair", () => {
    const skinPoints = landmarks({ 234: { x: 0.2, y: 0.5 }, 454: { x: 0.8, y: 0.5 } });
    const source = image(() => ({ r: 200, g: 160, b: 140 }));
    const all = sampleSkin(source, skinPoints);
    expect(all.length).toBeGreaterThan(0);
    expect(sampleSkin(source, skinPoints, () => 1)).toEqual([]);
  });
});

describe("skin classifier", () => {
  const context = {
    "sclera.l": 60, "sclera.a": 2, "sclera.b": 5,
    "image.l": 50, "image.a": 5, "image.b": 10,
  };
  const order = (value: string) => skinTones.indexOf(value as (typeof skinTones)[number]);

  it("never ranks darker skin as lighter under the same light and face", () => {
    // Most skin-depth signal comes from the face embedding; holding it fixed,
    // a darker measured skin colour must never give a lighter tone.
    for (const seed of [1, 2, 3]) {
      const face = Array.from({ length: 1024 }, (_, i) => Math.sin(i * seed) / 32);
      const ranks = [85, 75, 65, 55, 45, 35, 25].map((l) =>
        order(classify("skinTone", { ...context, "skin.l": l, "skin.a": 14, "skin.b": 18 }, { face })!.value),
      );
      expect([...ranks].sort((a, b) => a - b)).toEqual(ranks);
    }
  });

  it("abstains when a required region was not sampled", () => {
    expect(classify("eyeColour", { ...context, "skin.l": 60, "skin.a": 14, "skin.b": 18 })).toBeUndefined();
  });

  it("abstains when the image embedding it needs is missing", () => {
    expect(classify("skinTone", { ...context, "skin.l": 60, "skin.a": 14, "skin.b": 18 })).toBeUndefined();
  });
});

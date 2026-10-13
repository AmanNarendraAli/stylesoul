// @vitest-environment node
import { describe, expect, it } from "vitest";
import { faceFit, faceGuidance, necklineFit } from "@/lib/face-shape/guidance";
import { faceLength, faceLines, measureFace, type Point3 } from "@/lib/face-shape/measure";
import { styleProfileInputSchema } from "@/lib/style-profile/schema";

/** A frontal face in a 100×100 image; `bend` moves the jaw points off the line through their neighbours. */
function face({
  forehead = 0.2,
  chin = 0.8,
  bend = 0,
  overrides = {},
}: {
  forehead?: number;
  chin?: number;
  bend?: number;
  overrides?: Record<number, Point3>;
} = {}): Point3[] {
  const nose = forehead + (chin - forehead) / 2;
  const points: Record<number, Point3> = {
    10: { x: 0.5, y: forehead },
    152: { x: 0.5, y: chin },
    1: { x: 0.5, y: nose },
    234: { x: 0.25, y: 0.5 },
    454: { x: 0.75, y: 0.5 },
    33: { x: 0.38, y: 0.42 },
    263: { x: 0.62, y: 0.42 },
    // Side of the face, jaw point and lower jaw on a line, then bent at the jaw point.
    93: { x: 0.26, y: 0.56 },
    58: { x: 0.3 + bend, y: 0.66 },
    136: { x: 0.34, y: 0.76 },
    323: { x: 0.74, y: 0.56 },
    288: { x: 0.7 - bend, y: 0.66 },
    365: { x: 0.66, y: 0.76 },
    ...overrides,
  };
  return Array.from({ length: 478 }, (_, i) => points[i] ?? { x: 0.5, y: 0.6 });
}

describe("face measurement", () => {
  it("skips turned heads and open mouths, which change the outline", () => {
    expect(measureFace(face(), 100, 100)).toBeDefined();
    expect(measureFace(face({ overrides: { 1: { x: 0.58, y: 0.5 } } }), 100, 100)).toBeUndefined();
    expect(
      measureFace(face({ overrides: { 13: { x: 0.5, y: 0.6 }, 14: { x: 0.5, y: 0.64 } } }), 100, 100),
    ).toBeUndefined();
    expect(measureFace(face().slice(0, 100), 100, 100)).toBeUndefined();
  });

  it("places a longer face further towards long", () => {
    const short = measureFace(face({ forehead: 0.25, chin: 0.76 }), 100, 100)!;
    const long = measureFace(face({ forehead: 0.15, chin: 0.84 }), 100, 100)!;

    expect(long.length).toBeGreaterThan(short.length);
    expect(faceLength(short)).toBe("compact");
    expect(faceLength(long)).toBe("long");
  });

  it("reads a straighter jaw contour as straighter lines", () => {
    const curved = measureFace(face({ bend: -0.04 }), 100, 100)!;
    const straight = measureFace(face({ bend: 0 }), 100, 100)!;

    expect(straight.lines).toBeGreaterThan(curved.lines);
    expect(faceLines(curved)).toBe("curved");
    expect(faceLines(straight)).toBe("straight");
  });

  it("uses the image's aspect ratio", () => {
    const square = measureFace(face(), 100, 100)!;
    const tall = measureFace(face(), 100, 130)!;

    expect(tall.length).toBeGreaterThan(square.length);
  });
});

describe("face guidance", () => {
  const compactCurved = { length: 0, lines: 0 };
  const compactStraight = { length: 0, lines: 1 };
  const longStraight = { length: 1, lines: 1 };

  it("suggests necklines, prints and fabrics that suit the face", () => {
    expect(faceGuidance(compactCurved)).toEqual({
      length: "compact",
      lines: "curved",
      necklinesToWear: ["v", "scoop", "sweetheart", "round", "cowl"],
      necklinesToSkip: ["square", "boat", "collar", "mandarin", "high"],
      pattern: "floral",
      drape: "fluid",
    });
  });

  it("lets conflicting rules cancel out", () => {
    // A V neck lengthens (bad for a long face) but echoes straight lines.
    expect(necklineFit("v", longStraight)).toBe(0);
    expect(faceGuidance(longStraight).necklinesToWear).not.toContain("v");
    expect(faceGuidance(longStraight).necklinesToSkip).not.toContain("v");
  });

  it("scores a garment's neckline, print and drape together", () => {
    const garment = { neckline: "v", pattern: "geometric", drape: "crisp" };

    expect(faceFit(garment, compactStraight)).toBe(4);
    expect(faceFit(garment, compactCurved)).toBe(-1);
    expect(faceFit({ neckline: null, pattern: "plain", drape: null }, compactCurved)).toBe(0);
  });

  it("accepts both face positions from a photo, or neither", () => {
    const colouring = { skinTone: "fair", undertone: "warm", eyeColour: "green", hairColour: "black" };

    expect(styleProfileInputSchema.safeParse(colouring).success).toBe(true);
    expect(
      styleProfileInputSchema.safeParse({ ...colouring, faceLength: 0.4, faceLines: 0.7 }).success,
    ).toBe(true);
    expect(styleProfileInputSchema.safeParse({ ...colouring, faceLength: 0.4 }).success).toBe(false);
    expect(
      styleProfileInputSchema.safeParse({ ...colouring, faceLength: 1.4, faceLines: 0.7 }).success,
    ).toBe(false);
  });
});

// @vitest-environment node
import { describe, expect, it } from "vitest";
import type { Rgb } from "@/lib/colour-detection/colour";
import { assessCaptureFrame } from "@/lib/colour-detection/capture-guidance";
import { LEFT_CHEEK, RIGHT_CHEEK, type PixelSource, type Point } from "@/lib/colour-detection/regions";

const SIZE = 200;
const SKIN = { r: 200, g: 160, b: 140 };
const GREY = { r: 180, g: 180, b: 180 };

/** Upright, centred, front-facing face 40% of the frame wide. */
const BASE: Record<number, Point> = {
  1: { x: 0.5, y: 0.5 }, // nose tip
  10: { x: 0.5, y: 0.25 }, // forehead
  152: { x: 0.5, y: 0.75 }, // chin
  234: { x: 0.3, y: 0.5 },
  454: { x: 0.7, y: 0.5 },
  33: { x: 0.38, y: 0.42 },
  263: { x: 0.62, y: 0.42 },
  ...Object.fromEntries(LEFT_CHEEK.map((i) => [i, { x: 0.38, y: 0.55 }])),
  ...Object.fromEntries(RIGHT_CHEEK.map((i) => [i, { x: 0.62, y: 0.55 }])),
};

/** 478 MediaPipe-indexed points, all at the centre unless overridden. */
function landmarks(overrides: Record<number, Point> = {}): Point[] {
  const points = { ...BASE, ...overrides };
  return Array.from({ length: 478 }, (_, i) => points[i] ?? { x: 0.5, y: 0.5 });
}

/** Skin inside the face box (x 0.3–0.7, y 0.25–0.75), `background` elsewhere. */
function frame(skin: (x: number) => Rgb = () => SKIN, background: Rgb = GREY): PixelSource {
  return {
    width: SIZE,
    height: SIZE,
    getPixel: (x, y) =>
      x >= 60 && x <= 140 && y >= 50 && y <= 150 ? skin(x) : background,
  };
}

function reason(source: PixelSource, points: Point[], faceCount = 1) {
  return assessCaptureFrame(source, points, faceCount).issue?.reason;
}

describe("capture guidance", () => {
  it("is ready for a centred, level, evenly lit face", () => {
    expect(assessCaptureFrame(frame(), landmarks(), 1)).toEqual({ ready: true });
  });

  it("asks for exactly one face", () => {
    expect(reason(frame(), [], 0)).toBe("no_face");
    expect(reason(frame(), landmarks(), 2)).toBe("multiple_faces");
  });

  it("checks the face size", () => {
    expect(reason(frame(), landmarks({ 234: { x: 0.4, y: 0.5 }, 454: { x: 0.6, y: 0.5 } }))).toBe("too_far");
    expect(reason(frame(), landmarks({ 234: { x: 0.05, y: 0.5 }, 454: { x: 0.95, y: 0.5 } }))).toBe("too_close");
  });

  it("checks the face is centred", () => {
    expect(
      reason(frame(), landmarks({ 234: { x: 0.05, y: 0.5 }, 454: { x: 0.45, y: 0.5 }, 1: { x: 0.25, y: 0.5 } })),
    ).toBe("off_centre");
  });

  it("checks head pose", () => {
    expect(reason(frame(), landmarks({ 1: { x: 0.56, y: 0.5 } }))).toBe("head_turned");
    expect(reason(frame(), landmarks({ 1: { x: 0.44, y: 0.5 } }))).toBe("head_turned");
    expect(reason(frame(), landmarks({ 263: { x: 0.62, y: 0.5 } }))).toBe("head_tilted");
    expect(reason(frame(), landmarks({ 1: { x: 0.5, y: 0.42 } }))).toBe("chin_up");
    expect(reason(frame(), landmarks({ 1: { x: 0.5, y: 0.6 } }))).toBe("chin_down");
  });

  it("gives opposite turn directions for opposite yaw", () => {
    const toImageRight = assessCaptureFrame(frame(), landmarks({ 1: { x: 0.56, y: 0.5 } }), 1);
    const toImageLeft = assessCaptureFrame(frame(), landmarks({ 1: { x: 0.44, y: 0.5 } }), 1);
    expect(toImageRight.issue?.message).not.toBe(toImageLeft.issue?.message);
  });

  it("checks exposure", () => {
    expect(reason(frame(() => ({ r: 30, g: 22, b: 18 })), landmarks())).toBe("too_dark");
    expect(reason(frame(() => ({ r: 252, g: 250, b: 248 })), landmarks())).toBe("too_bright");
  });

  it("flags side lighting from a cheek-to-cheek brightness gap", () => {
    const sideLit = frame((x) => (x < 100 ? SKIN : { r: 110, g: 85, b: 72 }));
    expect(reason(sideLit, landmarks())).toBe("uneven_light");
  });

  it("flags a strong warm colour cast in the background", () => {
    const tungsten = frame(() => SKIN, { r: 235, g: 185, b: 110 });
    const result = assessCaptureFrame(tungsten, landmarks(), 1);
    expect(result).toMatchObject({ ready: false, issue: { reason: "colour_cast" } });
  });
});

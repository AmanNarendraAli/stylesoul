// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  cmToFeetInches,
  cmToInches,
  feetInchesToCm,
  formatLength,
  inchesToCm,
  parseUnit,
} from "@/lib/units";

describe("length units", () => {
  it("rounds inches to the nearest half and centimetres to whole numbers", () => {
    expect(cmToInches(86)).toBe(34);
    expect(cmToInches(90)).toBe(35.5);
    expect(inchesToCm(34)).toBe(86);
    expect(inchesToCm(27.5)).toBe(70);
  });

  it("round-trips height through feet and inches", () => {
    expect(cmToFeetInches(168)).toEqual({ feet: 5, inches: 6 });
    expect(feetInchesToCm(5, 6)).toBe(168);
    expect(cmToFeetInches(152)).toEqual({ feet: 5, inches: 0 });
  });

  it("formats stored centimetres in the chosen unit", () => {
    expect(formatLength(86, "in")).toBe("34 in");
    expect(formatLength(168, "in", "height")).toBe("5 ft 6 in");
    expect(formatLength(86, "cm")).toBe("86 cm");
  });

  it("falls back to inches for a missing or unknown cookie", () => {
    expect(parseUnit(undefined)).toBe("in");
    expect(parseUnit("furlongs")).toBe("in");
    expect(parseUnit("cm")).toBe("cm");
  });
});

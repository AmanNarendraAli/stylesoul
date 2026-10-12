/** Length units for body measurements. Values are stored in whole centimetres. */
export type LengthUnit = "cm" | "in";

/** Cookie holding the user's chosen unit, so server pages can show it too. */
export const UNIT_COOKIE = "stylesoul_units";
export const DEFAULT_UNIT: LengthUnit = "in";

const CM_PER_INCH = 2.54;

export function parseUnit(value: string | undefined | null): LengthUnit {
  return value === "cm" || value === "in" ? value : DEFAULT_UNIT;
}

/** Inches to the nearest half inch, which is how tape measures are read. */
export function cmToInches(cm: number): number {
  return Math.round((cm / CM_PER_INCH) * 2) / 2;
}

export function inchesToCm(inches: number): number {
  return Math.round(inches * CM_PER_INCH);
}

export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const total = Math.round(cm / CM_PER_INCH);
  return { feet: Math.floor(total / 12), inches: total % 12 };
}

export function feetInchesToCm(feet: number, inches: number): number {
  return Math.round((feet * 12 + inches) * CM_PER_INCH);
}

/** A stored centimetre value in the user's unit, e.g. "34 in" or "5 ft 6 in". */
export function formatLength(cm: number, unit: LengthUnit, kind: "girth" | "height" = "girth"): string {
  if (unit === "cm") return `${cm} cm`;
  if (kind === "height") {
    const { feet, inches } = cmToFeetInches(cm);
    return `${feet} ft ${inches} in`;
  }
  return `${cmToInches(cm)} in`;
}

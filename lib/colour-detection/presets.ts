import type { EyeColour, HairColour, SkinTone } from "../colour-season/map.ts";
import {
  eyeOptions,
  hairOptions,
  skinOptions,
} from "../colour-season/options.ts";
import { hexToLab, type Lab } from "./colour.ts";

/**
 * Lab reference values for each preset option, derived once from the canonical
 * swatch hexes in `lib/colour-season/options.ts`. The matcher compares a
 * detected colour against these by ΔE.
 */
export type Preset<T extends string> = { value: T; lab: Lab };

function toPresets<T extends string>(
  options: { value: T; hex: string }[],
): Preset<T>[] {
  return options.map((o) => ({ value: o.value, lab: hexToLab(o.hex) }));
}

export const skinPresets: Preset<SkinTone>[] = toPresets(skinOptions);
export const eyePresets: Preset<EyeColour>[] = toPresets(eyeOptions);
export const hairPresets: Preset<HairColour>[] = toPresets(hairOptions);

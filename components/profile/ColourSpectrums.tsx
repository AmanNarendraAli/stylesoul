import {
  deriveDimensions,
  dimensionPositions,
  type Colouring,
} from "@/lib/colour-season/map";
import { SpectrumList } from "./SpectrumList";

type Spectrum = {
  label: string;
  ends: [string, string];
  middle: string;
  /** Category boundaries on the 0–1 scale (see dimensionPositions). */
  bounds: [number, number];
  background: string;
};

const SPECTRUMS = {
  temperature: {
    label: "Temperature",
    ends: ["Cool", "Warm"],
    middle: "Neutral",
    bounds: [0.26, 0.655],
    background: "linear-gradient(90deg, #6E8FD0, #A7A6CB 30%, #C8BEB3 50%, #D8AC67 72%, #D9893A)",
  },
  value: {
    label: "Depth",
    ends: ["Light", "Deep"],
    middle: "Medium",
    bounds: [0.245, 0.615],
    background: "linear-gradient(90deg, #F5ECDF, #C9A98A 40%, #7A5A44 72%, #261B16)",
  },
  chroma: {
    label: "Clarity",
    ends: ["Soft", "Clear"],
    middle: "Balanced",
    bounds: [0.4, 0.6],
    background: "linear-gradient(90deg, #9A8F8E, #B97C88 50%, #E2306B)",
  },
  contrast: {
    label: "Contrast",
    ends: ["Low", "High"],
    middle: "Medium",
    bounds: [0.285, 0.6],
    // Two tones that start the same grey and split into white over black.
    background:
      "linear-gradient(90deg, #918A85, #F6F1E8) top / 100% 50% no-repeat, linear-gradient(90deg, #87807B, #141210) bottom / 100% 50% no-repeat",
  },
} satisfies Record<string, Spectrum>;

type Dimension = keyof typeof SPECTRUMS;

/** The category word, with "Leans …" near the edges of the middle band. */
function reading(spectrum: Spectrum, category: "low" | "middle" | "high", position: number) {
  const [low, high] = spectrum.ends;
  if (category === "low") return low;
  if (category === "high") return high;
  const [a, b] = spectrum.bounds;
  const third = (b - a) / 3;
  if (position < a + third) return `Leans ${low.toLowerCase()}`;
  if (position > b - third) return `Leans ${high.toLowerCase()}`;
  return spectrum.middle;
}

const CATEGORY: Record<Dimension, Record<string, "low" | "middle" | "high">> = {
  temperature: { cool: "low", neutral: "middle", warm: "high" },
  value: { light: "low", medium: "middle", deep: "high" },
  chroma: { soft: "low", medium: "middle", bright: "high" },
  contrast: { low: "low", medium: "middle", high: "high" },
};

export function ColourSpectrums({
  colouring,
  skinHex,
}: {
  colouring: Colouring;
  skinHex: string;
}) {
  const positions = dimensionPositions(colouring);
  const dimensions = deriveDimensions(colouring);

  return (
    <SpectrumList
      markerColour={skinHex}
      items={(Object.keys(SPECTRUMS) as Dimension[]).map((key) => {
        const spectrum = SPECTRUMS[key];
        return {
          key,
          label: spectrum.label,
          ends: spectrum.ends,
          reading: reading(spectrum, CATEGORY[key][dimensions[key]], positions[key]),
          position: positions[key],
          background: spectrum.background,
        };
      })}
    />
  );
}

import type { Drape, Pattern } from "@/lib/catalogue/schema";
import { faceGuidance } from "@/lib/face-shape/guidance";
import type { FaceShape } from "@/lib/face-shape/measure";
import { NECKLINE_LABELS } from "@/lib/labels";
import { NecklineIcon } from "./NecklineIcon";
import { SpectrumList } from "./SpectrumList";

const READINGS = {
  length: { compact: "Compact", balanced: "Balanced", long: "Long" },
  lines: { curved: "Curved", balanced: "Balanced", straight: "Straight" },
};

const NECKLINE_REASONS = {
  length: {
    compact: "Open necklines lengthen your face.",
    balanced: "",
    long: "Wider and higher necklines balance a longer face.",
  },
  lines: {
    curved: "Rounded necklines echo your curved lines.",
    balanced: "",
    straight: "Sharper necklines echo your straight lines.",
  },
};

const SKIP_REASONS: Record<string, string> = {
  compact: "High and wide necklines make a compact face look shorter. If you love one, pick a deeper cut.",
  long: "Deep V necks make a long face look longer. A shallow V works.",
  curved: "Sharp corners at the neck fight your curved lines.",
  straight: "Soft, rounded necklines blur your straight lines.",
  balanced: "",
};

const PRINTS: Record<Exclude<Pattern, "plain">, { label: string; background: string }> = {
  floral: {
    label: "Florals, paisleys and buta",
    background:
      `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cg fill='%23D9849A'%3E%3Ccircle cx='12' cy='7' r='3.2'/%3E%3Ccircle cx='16.8' cy='10.5' r='3.2'/%3E%3Ccircle cx='15' cy='16' r='3.2'/%3E%3Ccircle cx='9' cy='16' r='3.2'/%3E%3Ccircle cx='7.2' cy='10.5' r='3.2'/%3E%3C/g%3E%3Ccircle cx='12' cy='12' r='2.2' fill='%23E8B04B'/%3E%3Cpath d='M2 22 q3 -5 6 -2' stroke='%237FA37A' stroke-width='1.6' fill='none'/%3E%3C/svg%3E") 0 0 / 24px 24px, #F4EBDD`,
  },
  geometric: {
    label: "Stripes, checks and ikat",
    background:
      "repeating-linear-gradient(90deg, #2F4858 0 5px, transparent 5px 12px), repeating-linear-gradient(0deg, #B5523B 0 4px, transparent 4px 14px), #F4EBDD",
  },
};

const FABRICS: Record<Drape, string> = {
  fluid: "Fluid fabrics that drape: georgette, chiffon, mulmul and crepe.",
  crisp: "Crisp fabrics that hold a line: cotton, linen, organza and chanderi.",
};

const SPECTRUM_BACKGROUND = "linear-gradient(90deg, #E8DCCB, #B8955C)";

export function FaceGuide({ face, skinHex }: { face: FaceShape; skinHex: string }) {
  const guide = faceGuidance(face);
  const necklineReason =
    [NECKLINE_REASONS.length[guide.length], NECKLINE_REASONS.lines[guide.lines]]
      .filter(Boolean)
      .join(" ") || "Most necklines suit you.";
  const prints = guide.pattern && guide.pattern !== "plain" ? [guide.pattern] : (["floral", "geometric"] as const);

  return (
    <>
      <SpectrumList
        markerColour={skinHex}
        items={[
          {
            key: "length",
            label: "Face length",
            ends: ["Compact", "Long"],
            reading: READINGS.length[guide.length],
            position: face.length,
            background: SPECTRUM_BACKGROUND,
          },
          {
            key: "lines",
            label: "Lines",
            ends: ["Curved", "Straight"],
            reading: READINGS.lines[guide.lines],
            position: face.lines,
            background: SPECTRUM_BACKGROUND,
          },
        ]}
      />

      <div className="mt-10 space-y-8">
        <GuideRow title="Necklines to wear" explainer={necklineReason}>
          {guide.necklinesToWear.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
              {guide.necklinesToWear.map((neckline) => (
                <NecklineTile key={neckline} label={NECKLINE_LABELS[neckline]}>
                  <NecklineIcon neckline={neckline} className="h-10 w-12 text-gold" />
                </NecklineTile>
              ))}
            </ul>
          ) : null}
        </GuideRow>

        {guide.necklinesToSkip.length > 0 ? (
          <GuideRow title="Necklines to skip" explainer={SKIP_REASONS[guide.length] || SKIP_REASONS[guide.lines]}>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
              {guide.necklinesToSkip.map((neckline) => (
                <NecklineTile key={neckline} label={NECKLINE_LABELS[neckline]}>
                  <NecklineIcon neckline={neckline} className="h-10 w-12 text-cream/65" />
                </NecklineTile>
              ))}
            </ul>
          </GuideRow>
        ) : null}

        <GuideRow
          title="Prints"
          explainer={prints.length > 1 ? "Florals and geometric prints both suit you." : "Prints that repeat your lines."}
        >
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
            {prints.map((print) => (
              <li key={print} className="flex w-24 flex-col items-center gap-1.5 text-center">
                <span
                  aria-hidden="true"
                  className="h-12 w-12 rounded-lg border border-cream/15"
                  style={{ background: PRINTS[print].background }}
                />
                <span className="text-[11px] leading-tight text-cream/70">{PRINTS[print].label}</span>
              </li>
            ))}
          </ul>
        </GuideRow>

        <GuideRow
          title="Fabrics"
          explainer={
            guide.drape
              ? FABRICS[guide.drape]
              : "Crisp and fluid fabrics both work, from cotton, linen and organza to georgette, chiffon and mulmul."
          }
        />
      </div>
    </>
  );
}

function GuideRow({
  title,
  explainer,
  children,
}: {
  title: string;
  explainer: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
        <h3 className="shrink-0 font-display text-xl">{title}</h3>
        <p className="text-sm text-cream/65">{explainer}</p>
      </div>
      {children}
    </div>
  );
}

function NecklineTile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="flex w-20 flex-col items-center gap-1.5 text-center">
      <span className="flex h-14 w-16 items-center justify-center rounded-lg border border-cream/15 bg-cream/[0.04]">
        {children}
      </span>
      <span className="text-[11px] leading-tight text-cream/70">{label}</span>
    </li>
  );
}

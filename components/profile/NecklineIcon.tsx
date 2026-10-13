import type { Neckline } from "@/lib/catalogue/schema";

// A bodice front in a 48×40 box: shoulders from x=6 to x=42 at y≈10, and the
// neckline cut between the two shoulder seams. `edge` runs left to right.
const SHAPES: Record<Neckline, { edge: string; detail?: string }> = {
  round: { edge: "M16 8 C18 17 30 17 32 8" },
  scoop: { edge: "M14 8 C15 24 33 24 34 8" },
  v: { edge: "M16 8 L24 24 L32 8" },
  square: { edge: "M16 8 L16 20 L32 20 L32 8" },
  boat: { edge: "M11 9 Q24 15 37 9" },
  sweetheart: { edge: "M16 8 L16 16 C16 23 23 23 24 18 C25 23 32 23 32 16 L32 8" },
  collar: { edge: "M16 8 L24 22 L32 8", detail: "M16 8 L19 17 L23 15 M32 8 L29 17 L25 15" },
  // A short band collar open at the front, against a tall, closed high neck.
  mandarin: { edge: "M16 8 L16 4 Q20 3 23 4 L23 10 L25 10 L25 4 Q28 3 32 4 L32 8" },
  high: { edge: "M19 8 L19 0 L29 0 L29 8", detail: "M19 3 L29 3" },
  cowl: { edge: "M15 8 C16 22 32 22 33 8", detail: "M18 10 Q24 15 30 10 M20 13 Q24 17 28 13" },
  off_shoulder: { edge: "M6 16 Q24 20 42 16" },
};

export function NecklineIcon({ neckline, className }: { neckline: Neckline; className?: string }) {
  const { edge, detail } = SHAPES[neckline];
  const start = edge.match(/^M([\d.]+) ([\d.]+)/)!;
  const body =
    neckline === "off_shoulder"
      ? `${edge} L46 40 L2 40 Z`
      : `M6 10 L${start[1]} ${start[2]} ${edge.slice(start[0].length)} L42 10 L46 40 L2 40 Z`;
  return (
    <svg viewBox="0 0 48 40" aria-hidden="true" className={className}>
      <path d={body} fill="currentColor" fillOpacity={0.18} stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
      {detail ? <path d={detail} fill="none" stroke="currentColor" strokeWidth={1.2} /> : null}
    </svg>
  );
}

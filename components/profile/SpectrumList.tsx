export type SpectrumItem = {
  key: string;
  label: string;
  ends: [string, string];
  /** The word shown beside the label, e.g. "Leans warm". */
  reading: string;
  /** 0–1 marker position. */
  position: number;
  background: string;
};

/** Labelled gradient bars with a marker where the profile sits. */
export function SpectrumList({
  items,
  markerColour,
}: {
  items: SpectrumItem[];
  markerColour: string;
}) {
  return (
    <ul className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.key}>
          <p className="flex items-baseline justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.18em] text-cream/60">
              {item.label}
              <span className="sr-only">:</span>
            </span>
            <span className="text-sm text-cream">{item.reading}</span>
          </p>
          <div aria-hidden="true" className="relative mt-3">
            <div
              className="h-3 rounded-full ring-1 ring-cream/10"
              style={{ background: item.background }}
            />
            <span
              className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cream shadow-md"
              style={{ left: `${item.position * 100}%`, backgroundColor: markerColour }}
            />
          </div>
          <div aria-hidden="true" className="mt-1.5 flex justify-between text-[11px] text-cream/50">
            <span>{item.ends[0]}</span>
            <span>{item.ends[1]}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

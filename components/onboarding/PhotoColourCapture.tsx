"use client";

import { useRef, useState } from "react";
import type { DetectedColouring } from "@/lib/colour-detection/detect";
import { detectFromPhoto } from "./colour-detection-client";

type Status =
  | { kind: "idle" }
  | { kind: "detecting" }
  | { kind: "error"; message: string };

/**
 * Optional photo step that pre-fills the manual colouring screen. The manual
 * selectors remain the canonical input — this is positioned as a time-saver,
 * and any failure quietly routes the user back to choosing by hand.
 */
export function PhotoColourCapture({
  onDetected,
  onPhotoSelected,
}: {
  onDetected: (detected: DetectedColouring) => void;
  /**
   * Fired with the chosen file before analysis so the parent can show a
   * transient, local-only preview. The file itself is never persisted here.
   */
  onPhotoSelected?: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [consented, setConsented] = useState(false);
  const consentedRef = useRef(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    onPhotoSelected?.(file);
    setStatus({ kind: "detecting" });
    const outcome = await detectFromPhoto(file, () => consentedRef.current);
    if (outcome.ok) {
      setStatus({ kind: "idle" });
      onDetected(outcome.detected);
    } else {
      setStatus({ kind: "error", message: outcome.message });
    }
  };

  return (
    <div className="rounded-lg border border-cream/15 bg-cream/[0.03] p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-display text-xl">
            Try experimental photo suggestions
          </p>
          <p className="mt-1 max-w-md text-sm text-cream/70">
            Photo matching is not yet calibrated on self-identified samples.
            We&apos;ll suggest swatches from a clear, front-facing daylight
            photo; review and change every suggestion below.
          </p>
          <label className="mt-3 flex max-w-md items-start gap-2 text-xs text-cream/70">
            <input
              type="checkbox"
              checked={consented}
              onChange={(event) => {
                consentedRef.current = event.target.checked;
                setConsented(event.target.checked);
              }}
              className="mt-0.5 accent-gold"
            />
            <span>
              Allow server fallback if on-device analysis is unavailable. A
              downscaled pixel buffer will be processed on StyleSoul&apos;s
              server and immediately discarded.
            </span>
          </label>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={status.kind === "detecting"}
          className="min-h-11 rounded-full border border-gold/40 px-5 py-2 text-sm text-gold transition hover:bg-gold/10 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          {status.kind === "detecting" ? "Analysing…" : "Detect from a photo"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        aria-label="Choose a photo for colour suggestions"
        tabIndex={-1}
        className="sr-only"
        onChange={(e) => {
          void handleFile(e.target.files?.[0]);
          // Reset so re-selecting the same file fires onChange again.
          e.target.value = "";
        }}
      />

      <p className="mt-3 text-xs text-cream/60">
        Your photo is analysed on your device. If you enable server fallback, a
        downscaled pixel buffer may be processed on our server and is never stored.
      </p>

      {status.kind === "detecting" ? (
        <p className="mt-3 text-xs text-cream/70" role="status">
          First-time analysis downloads its face-landmark files and can take
          longer. You can keep choosing swatches below.
        </p>
      ) : null}

      {status.kind === "error" ? (
        <p className="mt-3 text-xs text-blush" role="alert">
          {status.message} You can still choose your swatches below.
        </p>
      ) : null}
    </div>
  );
}

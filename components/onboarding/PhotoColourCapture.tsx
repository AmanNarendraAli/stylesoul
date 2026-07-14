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
}: {
  onDetected: (detected: DetectedColouring) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setStatus({ kind: "detecting" });
    const outcome = await detectFromPhoto(file);
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
          <p className="font-display text-xl">Save time with a photo</p>
          <p className="mt-1 max-w-md text-sm text-cream/70">
            We&apos;ll pre-fill the swatches below from a clear, front-facing
            photo in daylight. You can change anything afterwards.
          </p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={status.kind === "detecting"}
          className="rounded-full border border-gold/40 px-5 py-2 text-sm text-gold transition hover:bg-gold/10 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          {status.kind === "detecting" ? "Analysing…" : "Detect from a photo"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          void handleFile(e.target.files?.[0]);
          // Reset so re-selecting the same file fires onChange again.
          e.target.value = "";
        }}
      />

      <p className="mt-3 text-xs text-cream/45">
        Your photo is analysed on your device. If that isn&apos;t possible, a
        downscaled copy is processed on our server and never stored.
      </p>

      {status.kind === "error" ? (
        <p className="mt-3 text-xs text-blush" role="alert">
          {status.message} You can still choose your swatches below.
        </p>
      ) : null}
    </div>
  );
}

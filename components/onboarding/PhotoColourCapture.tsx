"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Camera } from "lucide-react";
import type { DetectedColouring } from "@/lib/colour-detection/detect";
import { CameraCapture } from "./CameraCapture";
import { detectFromPhoto } from "./colour-detection-client";

type Status =
  | { kind: "idle" }
  | { kind: "detecting" }
  | { kind: "error"; message: string };

const subscribeNever = () => () => {};

/**
 * Optional camera step that pre-fills the manual colouring screen. The manual
 * swatches remain the canonical input — the photo is a time-saver, and any
 * failure routes the user back to choosing by hand.
 */
export function PhotoColourCapture({
  onDetected,
  onPhotoSelected,
  onPickManually,
}: {
  onDetected: (detected: DetectedColouring) => void;
  /**
   * Fired with the captured file before analysis so the parent can show a
   * transient, local-only preview. The file itself is never persisted here.
   */
  onPhotoSelected?: (file: File) => void;
  /** Moves the user to the manual swatches. */
  onPickManually: () => void;
}) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [cameraOpen, setCameraOpen] = useState(false);
  const pickAfterCloseRef = useRef(false);
  // Client-only check; null during the server render so nothing flashes.
  const canUseCamera = useSyncExternalStore<boolean | null>(
    subscribeNever,
    () => Boolean(navigator.mediaDevices?.getUserMedia),
    () => null,
  );

  // Runs after the closed camera restores focus, so this focus move wins.
  useEffect(() => {
    if (!cameraOpen && pickAfterCloseRef.current) {
      pickAfterCloseRef.current = false;
      onPickManually();
    }
  }, [cameraOpen, onPickManually]);

  const handlePhoto = async (file: File) => {
    onPhotoSelected?.(file);
    setStatus({ kind: "detecting" });
    const outcome = await detectFromPhoto(file);
    if (outcome.ok) {
      setStatus({ kind: "idle" });
      onDetected(outcome.detected);
    } else {
      setStatus({ kind: "error", message: outcome.message });
    }
  };

  if (canUseCamera === null) return null;

  if (!canUseCamera) {
    return (
      <p className="text-sm text-cream/70">
        Photo suggestions need a camera, so pick your colours below.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center rounded-lg border border-cream/15 bg-cream/[0.03] px-5 py-8 text-center">
      <button
        type="button"
        onClick={() => setCameraOpen(true)}
        disabled={status.kind === "detecting"}
        className="group flex flex-col items-center gap-3 rounded-lg p-2 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-gold text-charcoal transition group-hover:bg-gold/90">
          <Camera aria-hidden="true" className="h-10 w-10" />
        </span>
        <span className="font-display text-xl">Take a photo</span>
      </button>
      <p className="mt-1 text-sm text-cream/70">
        We&apos;ll guide you to good light. Your photo never leaves this device.
      </p>

      {status.kind === "detecting" ? (
        <p className="mt-3 text-xs text-cream/70" role="status">
          Analysing your photo…
        </p>
      ) : null}

      {status.kind === "error" ? (
        <p className="mt-3 text-xs text-blush" role="alert">
          {status.message} You can pick your colours below.
        </p>
      ) : null}

      <button
        type="button"
        onClick={onPickManually}
        className="mt-4 min-h-11 px-3 text-sm text-gold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        Pick your colours yourself
      </button>

      {cameraOpen ? (
        <CameraCapture
          onCapture={(file) => {
            setCameraOpen(false);
            void handlePhoto(file);
          }}
          onClose={() => setCameraOpen(false)}
          onPickManually={() => {
            pickAfterCloseRef.current = true;
            setCameraOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}

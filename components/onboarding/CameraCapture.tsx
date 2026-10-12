"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FaceLandmarker } from "@mediapipe/tasks-vision";
import { Glasses, ScanFace, Smartphone, Sun } from "lucide-react";
import {
  assessCaptureFrame,
  type CaptureGuidance,
} from "@/lib/colour-detection/capture-guidance";
import { pixelSourceFromRgba } from "@/lib/colour-detection/regions";
import { loadVideoLandmarker } from "./colour-detection-client";

// Live checks run on a small copy of the frame to stay cheap on phones.
const GUIDANCE_MAX_EDGE = 320;
const GUIDANCE_INTERVAL_MS = 200;
// Auto-capture once the frame has stayed ready through a short 3-2-1 (~1.2s).
const COUNTDOWN_FROM = 3;
const COUNTDOWN_STEP_MS = 400;
const JPEG_QUALITY = 0.92;

const TIPS = [
  { Icon: Sun, label: "Face a window" },
  { Icon: Glasses, label: "Glasses off" },
  { Icon: ScanFace, label: "Hair off your face" },
  { Icon: Smartphone, label: "Phone at eye level" },
];

type Phase =
  | { kind: "tips" }
  | { kind: "starting" }
  | { kind: "live" }
  | { kind: "error"; message: string };

type Landmarking =
  | { kind: "loading" }
  | { kind: "ready"; landmarker: FaceLandmarker }
  | { kind: "unavailable" };

/**
 * Guided camera capture for the photo step. Preview frames are only checked on
 * device and never uploaded or stored; the one captured photo is handed to the
 * parent, which runs it through the on-device colour pipeline.
 */
export function CameraCapture({
  onCapture,
  onClose,
  onPickManually,
}: {
  onCapture: (file: File) => void;
  onClose: () => void;
  onPickManually: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mountedRef = useRef(false);
  const capturingRef = useRef(false);
  const [phase, setPhase] = useState<Phase>({ kind: "tips" });
  const [landmarking, setLandmarking] = useState<Landmarking>({ kind: "loading" });
  const [guidance, setGuidance] = useState<CaptureGuidance | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [warned, setWarned] = useState(false);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const handleClose = useCallback(() => {
    stopCamera();
    onClose();
  }, [stopCamera, onClose]);

  // Focus the dialog on open; on unmount stop the camera and restore focus.
  useEffect(() => {
    mountedRef.current = true;
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => {
      mountedRef.current = false;
      stopCamera();
      previous?.focus();
    };
  }, [stopCamera]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  useEffect(() => {
    if (phase.kind === "live" && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [phase.kind]);

  /** Full-resolution, unmirrored frame → JPEG file. */
  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !streamRef.current || capturingRef.current) return;
    capturingRef.current = true;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    stopCamera();
    canvas.toBlob(
      (blob) => {
        if (!mountedRef.current) return;
        if (blob) {
          onCapture(new File([blob], "camera-photo.jpg", { type: "image/jpeg" }));
        } else {
          capturingRef.current = false;
          setPhase({
            kind: "error",
            message: "We couldn't take the photo. Close and try again, or pick your colours yourself.",
          });
        }
      },
      "image/jpeg",
      JPEG_QUALITY,
    );
  }, [onCapture, stopCamera]);

  // Guidance loop: downscale the frame, landmark it, assess it, auto-capture.
  useEffect(() => {
    if (phase.kind !== "live" || landmarking.kind !== "ready") return;
    const { landmarker } = landmarking;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let readySince: number | null = null;

    const id = window.setInterval(() => {
      const video = videoRef.current;
      if (!ctx || !video || !streamRef.current || capturingRef.current) return;
      if (video.readyState < 2 || !video.videoWidth) return;
      const scale = Math.min(
        1,
        GUIDANCE_MAX_EDGE / Math.max(video.videoWidth, video.videoHeight),
      );
      const width = Math.round(video.videoWidth * scale);
      const height = Math.round(video.videoHeight * scale);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      ctx.drawImage(video, 0, 0, width, height);

      let next: CaptureGuidance;
      try {
        const now = performance.now();
        const faces = landmarker.detectForVideo(canvas, now).faceLandmarks ?? [];
        const image = ctx.getImageData(0, 0, width, height);
        next = assessCaptureFrame(
          pixelSourceFromRgba(image.data, width, height),
          faces[0]?.map((p) => ({ x: p.x, y: p.y })) ?? [],
          faces.length,
        );
      } catch {
        setLandmarking({ kind: "unavailable" });
        return;
      }
      setGuidance(next);

      if (!next.ready) {
        readySince = null;
        setCountdown(null);
        return;
      }
      const now = performance.now();
      readySince ??= now;
      const remaining =
        COUNTDOWN_FROM - Math.floor((now - readySince) / COUNTDOWN_STEP_MS);
      if (remaining > 0) {
        setCountdown(remaining);
      } else {
        setCountdown(null);
        capture();
      }
    }, GUIDANCE_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [phase.kind, landmarking, capture]);

  const startCamera = async () => {
    if (window.isSecureContext === false || !navigator.mediaDevices?.getUserMedia) {
      setPhase({
        kind: "error",
        message:
          "The camera needs a secure (https) connection in a supported browser. Pick your colours yourself instead.",
      });
      return;
    }
    setPhase({ kind: "starting" });
    setLandmarking({ kind: "loading" });
    // Guidance is optional: without it the user can still take the photo.
    loadVideoLandmarker().then(
      (landmarker) => {
        if (mountedRef.current) setLandmarking({ kind: "ready", landmarker });
      },
      () => {
        if (mountedRef.current) setLandmarking({ kind: "unavailable" });
      },
    );
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });
      if (!mountedRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;
      setPhase({ kind: "live" });
    } catch (error) {
      if (mountedRef.current) {
        setPhase({ kind: "error", message: cameraErrorMessage(error) });
      }
    }
  };

  const takePhoto = () => {
    // Warn once if live guidance says the frame isn't ready yet.
    if (landmarking.kind === "ready" && !guidance?.ready && !warned) {
      setWarned(true);
      return;
    }
    capture();
  };

  const ready = guidance?.ready === true && landmarking.kind === "ready";
  const instruction =
    phase.kind === "starting"
      ? "Starting your camera…"
      : landmarking.kind === "loading"
        ? "Getting live guidance ready…"
        : landmarking.kind === "unavailable"
          ? "Live guidance isn't available. Centre your face in the oval and take the photo yourself."
          : !guidance
            ? "Looking for your face…"
            : guidance.ready
              ? "Perfect. Hold still while we take your photo."
              : guidance.issue?.message;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="camera-capture-title"
        tabIndex={-1}
        className="max-h-full w-full max-w-lg overflow-y-auto rounded-lg border border-cream/15 bg-charcoal p-5 text-cream focus:outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="camera-capture-title" className="font-display text-xl">
            Take a colour photo
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close camera"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-xl text-cream/70 transition hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            ×
          </button>
        </div>

        {phase.kind === "tips" ? (
          <>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {TIPS.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-lg border border-cream/15 p-3 text-center text-sm text-cream/85"
                >
                  <Icon aria-hidden="true" className="h-6 w-6 text-gold" />
                  {label}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-cream/80">
              We&apos;ll take the photo when the oval turns gold.
            </p>
            <p className="mt-4 text-xs text-cream/60">
              The live preview is checked on your device. Camera frames are
              never uploaded or stored.
            </p>
            <button
              type="button"
              onClick={() => void startCamera()}
              className="mt-5 min-h-11 w-full rounded-full bg-gold px-5 py-2 text-sm text-charcoal transition hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
            >
              Start camera
            </button>
          </>
        ) : null}

        {phase.kind === "error" ? (
          <>
            <p className="mt-4 text-sm text-blush" role="alert">
              {phase.message}
            </p>
            <button
              type="button"
              onClick={onPickManually}
              className="mt-5 min-h-11 w-full rounded-full border border-gold/40 px-5 py-2 text-sm text-gold transition hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Pick your colours instead
            </button>
          </>
        ) : null}

        {phase.kind === "starting" || phase.kind === "live" ? (
          <>
            <div className="relative mt-4 aspect-[3/4] overflow-hidden rounded-lg bg-black sm:aspect-[4/3]">
              {/* Mirrored for the user only; the captured photo is not. */}
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                aria-label="Camera preview"
                className="h-full w-full -scale-x-100 object-cover"
              />
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute left-1/2 top-1/2 aspect-[3/4] h-[75%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-4 transition-colors ${
                  ready ? "border-gold" : "border-cream/50"
                }`}
              />
              {countdown !== null ? (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center font-display text-6xl text-gold"
                >
                  {countdown}
                </div>
              ) : null}
            </div>

            <p aria-live="polite" className="mt-3 min-h-10 text-sm text-cream/90">
              {instruction}
            </p>
            {warned ? (
              <p className="mt-1 text-xs text-blush">
                This frame isn&apos;t ideal yet, so suggestions may be less
                accurate.
              </p>
            ) : null}
            <button
              type="button"
              onClick={takePhoto}
              disabled={phase.kind !== "live"}
              className="mt-3 min-h-11 w-full rounded-full border border-gold/40 px-5 py-2 text-sm text-gold transition hover:bg-gold/10 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {warned ? "Take photo anyway" : "Take photo"}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

function cameraErrorMessage(error: unknown): string {
  const name =
    typeof error === "object" && error !== null && "name" in error
      ? String(error.name)
      : "";
  if (name === "NotAllowedError" || name === "SecurityError") {
    return "Camera access was blocked. Allow it in your browser settings, or pick your colours yourself.";
  }
  if (name === "NotFoundError" || name === "OverconstrainedError") {
    return "We couldn't find a camera on this device. Pick your colours yourself instead.";
  }
  return "We couldn't start your camera. It may be in use by another app. Pick your colours yourself instead.";
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/avatar/Avatar";
import { classifyBodyShape } from "@/lib/body-shape/classify";
import { mapColourSeason } from "@/lib/colour-season/map";
import { useOnboarding } from "../OnboardingProvider";

type StepStatus = "pending" | "active" | "done";

type StepLabel = {
  key: string;
  label: string;
};

const STEPS: StepLabel[] = [
  { key: "body", label: "Calculating body proportions" },
  { key: "season", label: "Mapping colour season" },
  { key: "avatar", label: "Generating avatar" },
  { key: "edit", label: "Curating silhouettes" },
  { key: "profile", label: "Building your style profile" },
];

const MIN_STEP_DURATION_MS = 800;

function minDelay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function run<T>(work: Promise<T> | (() => Promise<T>) | (() => T)) {
  const value =
    typeof work === "function" ? await Promise.resolve((work as () => T | Promise<T>)()) : await work;
  await minDelay(MIN_STEP_DURATION_MS);
  return value;
}

export default function OnboardingAnalysingPage() {
  const router = useRouter();
  const { draft, reset } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;
    const { body, colouring } = draft;
    if (!body) {
      router.replace("/onboarding/body");
      return;
    }
    if (!colouring) {
      router.replace("/onboarding/colouring");
      return;
    }
    hasStartedRef.current = true;

    (async () => {
      try {
        setCurrentStep(0);
        await run(() => classifyBodyShape(body));

        setCurrentStep(1);
        await run(() => mapColourSeason(colouring));

        setCurrentStep(2);
        await run(async () => {
          await import("@/components/avatar/Avatar");
        });

        setCurrentStep(3);
        // Phase 3 will wire this to the weekly-edit query. For Phase 1, hold
        // the cinematic beat without a real fetch.
        await run(() => undefined);

        setCurrentStep(4);
        await run(async () => {
          const response = await fetch("/api/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...body,
              ...colouring,
              detectionSource: "manual",
            }),
          });

          if (!response.ok) {
            const payload = await response.json().catch(() => ({}));
            throw new Error(payload?.message ?? "Failed to save profile");
          }
        });

        setCurrentStep(STEPS.length);
        reset();
        router.replace("/profile");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong building your profile",
        );
      }
    })();
  }, [draft, router, reset]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-charcoal px-6 text-cream">
      <section className="w-full max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Step 3 of 3</p>
        <h1 className="mt-3 font-display text-5xl">Building your style profile</h1>
        <p className="mt-4 text-cream/70">Hold on — this takes a moment.</p>

        <div className="mt-12 flex justify-center">
          <motion.div
            className="rounded-full"
            initial={{ scale: 0.96, opacity: 0.6 }}
            animate={{ scale: [0.96, 1.02, 0.96], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="h-32 w-32 rounded-full border border-gold/30 bg-gold/10" />
          </motion.div>
        </div>

        <ol className="mx-auto mt-12 max-w-md space-y-3 text-left">
          {STEPS.map((step, index) => {
            const status: StepStatus =
              index < currentStep ? "done" : index === currentStep ? "active" : "pending";
            return (
              <li
                key={step.key}
                className="flex items-center gap-3 text-sm"
              >
                <StepIcon status={status} />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    transition={{ duration: 0.2 }}
                    className={
                      status === "done"
                        ? "text-cream"
                        : status === "active"
                          ? "text-cream"
                          : "text-cream/45"
                    }
                  >
                    {step.label}
                  </motion.span>
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        {error ? (
          <div className="mt-10 rounded border border-blush/40 bg-blush/10 p-4 text-sm text-cream">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => router.push("/onboarding/body")}
              className="mt-3 text-gold underline"
            >
              Start over
            </button>
          </div>
        ) : null}

        {/* Preload the avatar component visually offscreen so it is ready when
            the profile page renders. */}
        <div aria-hidden className="pointer-events-none invisible h-0 overflow-hidden">
          <Avatar shape="hourglass" season="warm_spring" size={80} pulse={false} />
        </div>
      </section>
    </main>
  );
}

function StepIcon({ status }: { status: StepStatus }) {
  if (status === "done") {
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-charcoal">
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M2 6.5 L5 9.5 L10 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (status === "active") {
    return (
      <motion.span
        className="h-5 w-5 rounded-full border-2 border-gold border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    );
  }
  return <span className="h-5 w-5 rounded-full border border-cream/25" />;
}

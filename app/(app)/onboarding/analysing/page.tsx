"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/avatar/Avatar";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { classifyBodyShape, type BodyShape } from "@/lib/body-shape/classify";
import { mapColourSeason, type ColourSeason } from "@/lib/colour-season/map";
import { SEASON_LABELS } from "@/lib/labels";
import { useOnboarding } from "../OnboardingProvider";

type StepStatus = "pending" | "active" | "done";

type StepLabel = {
  key: string;
  label: string;
};

const STEPS: StepLabel[] = [
  { key: "season", label: "Finding your colour season" },
  { key: "shape", label: "Working out your shape" },
  { key: "pieces", label: "Picking this week's three pieces" },
];

const SAVE_ERROR = "We couldn't save your profile. Please try again.";

const MIN_STEP_DURATION_MS = 800;

function minDelay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function run<T>(work: () => T | Promise<T>) {
  const [value] = await Promise.all([
    Promise.resolve().then(work),
    minDelay(MIN_STEP_DURATION_MS),
  ]);
  return value;
}

export default function OnboardingAnalysingPage() {
  const router = useRouter();
  const isEdit = useSearchParams().get("edit") === "1";
  const { draft, isHydrated, reset } = useOnboarding();
  const [steps, setSteps] = useState(STEPS);
  const [currentStep, setCurrentStep] = useState(0);
  const [season, setSeason] = useState<ColourSeason | null>(null);
  const [shape, setShape] = useState<BodyShape | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;
    if (!isHydrated) return;
    const { body, colouring } = draft;
    if (!colouring) {
      router.replace("/onboarding/colouring");
      return;
    }
    hasStartedRef.current = true;
    // Measurements are optional; without them there is no shape to work out.
    const activeSteps = body
      ? STEPS
      : STEPS.filter((step) => step.key !== "shape");
    const stepIndex = (key: string) =>
      activeSteps.findIndex((step) => step.key === key);

    (async () => {
      setSteps(activeSteps);
      setCurrentStep(stepIndex("season"));
      setSeason(await run(() => mapColourSeason(colouring)));

      if (body) {
        setCurrentStep(stepIndex("shape"));
        setShape(await run(() => classifyBodyShape(body)));
      }

      setCurrentStep(stepIndex("pieces"));
      const saved = await run(async () => {
        const profileResponse = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...body,
            ...colouring,
            detectionSource: draft.colouringSource ?? "manual",
          }),
        }).catch(() => null);
        if (!profileResponse?.ok) return false;
        // The products page copes with a missing edit, so a failure here
        // still lets the user continue to their profile.
        await fetch("/api/recs/weekly").catch(() => null);
        return true;
      });
      if (!saved) {
        setError(SAVE_ERROR);
        return;
      }

      setCurrentStep(activeSteps.length);
      reset();
      router.replace("/profile");
    })();
  }, [attempt, draft, isHydrated, router, reset]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-charcoal px-6 text-cream">
      <section className="w-full max-w-2xl text-center">
        {isEdit ? null : <OnboardingProgress current={2} />}
        <h1 className="mt-8 font-display text-5xl">
          {isEdit ? "Updating your profile" : "Building your style profile"}
        </h1>
        <p className="mt-4 text-cream/70">This takes a few seconds.</p>

        {/* Fixed height so the page doesn't jump when the avatar appears. */}
        <div className="mt-10 flex h-64 justify-center">
          {season ? <Avatar shape={shape} season={season} size={160} /> : null}
        </div>
        <p aria-live="polite" className="mt-4 min-h-8 font-display text-2xl text-gold">
          {season ? SEASON_LABELS[season] : null}
        </p>

        <ol className="mx-auto mt-8 max-w-md space-y-3 text-left">
          {steps.map((step, index) => {
            const status: StepStatus =
              index < currentStep ? "done" : index === currentStep ? "active" : "pending";
            return (
              <li
                key={step.key}
                aria-current={status === "active" ? "step" : undefined}
                className="flex items-center gap-3 text-sm"
              >
                <StepIcon status={status} />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={status}
                    initial={{ x: -4 }}
                    animate={{ x: 0 }}
                    exit={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className={
                      status === "done"
                        ? "text-cream"
                        : status === "active"
                          ? "text-cream"
                          : "text-cream/60"
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
          <div role="alert" className="mt-10 rounded border border-blush/40 bg-blush/10 p-4 text-sm text-cream">
            <p>{error}</p>
            <div className="mt-3 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setCurrentStep(0);
                  hasStartedRef.current = false;
                  setAttempt((value) => value + 1);
                }}
                className="min-h-11 min-w-11 rounded text-gold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Retry
              </button>
              <button
                type="button"
                onClick={() => router.push("/onboarding/colouring")}
                className="min-h-11 min-w-11 rounded text-cream/75 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Start over
              </button>
            </div>
          </div>
        ) : null}
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

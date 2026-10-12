"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  bodyMeasurementsSchema,
  type BodyMeasurements,
} from "@/lib/body-shape/classify";
import { NEUTRAL_PROPORTIONS } from "@/components/avatar/palettes";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "../OnboardingProvider";

type BodyFormInput = z.input<typeof bodyMeasurementsSchema>;
type FieldName = keyof BodyMeasurements;

type FieldConfig = {
  name: FieldName;
  label: string;
  hint: string;
  required: boolean;
};

const FIELDS: FieldConfig[] = [
  { name: "bustCm", label: "Bust (cm)", hint: "Measure around the fullest part.", required: true },
  { name: "waistCm", label: "Waist (cm)", hint: "Measure around the narrowest part.", required: true },
  { name: "hipsCm", label: "Hips (cm)", hint: "Measure around the fullest part.", required: true },
  {
    name: "shouldersCm",
    label: "Shoulder width (cm)",
    hint: "Measure straight across from one shoulder point to the other.",
    required: false,
  },
  { name: "heightCm", label: "Height (cm)", hint: "Stand straight without shoes.", required: false },
];

export default function OnboardingBodyPage() {
  const router = useRouter();
  const isEdit = useSearchParams().get("edit") === "1";
  const { draft, isHydrated, setBody } = useOnboarding();
  const [activeField, setActiveField] = useState<FieldName | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BodyFormInput, unknown, BodyMeasurements>({
    resolver: zodResolver(bodyMeasurementsSchema),
    defaultValues: draft.body,
  });

  useEffect(() => {
    if (isHydrated && draft.body) {
      reset(draft.body);
    }
  }, [draft.body, isHydrated, reset]);

  useEffect(() => {
    if (isHydrated && !draft.colouring) {
      router.replace("/onboarding/colouring");
    }
  }, [draft.colouring, isHydrated, router]);

  const analysingPath = isEdit
    ? "/onboarding/analysing?edit=1"
    : "/onboarding/analysing";

  const onSubmit: SubmitHandler<BodyMeasurements> = (data) => {
    setBody(data);
    router.push(analysingPath);
  };

  const onSkip = () => {
    setBody(undefined);
    router.push(analysingPath);
  };

  return (
    <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
      <section className="mx-auto max-w-3xl">
        {isEdit ? null : <OnboardingProgress current={1} />}
        <h1 className="mt-8 font-display text-5xl">
          Your measurements (optional)
        </h1>

        {isEdit ? null : (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded border border-cream/15 p-4">
            <p className="text-sm text-cream/75">
              Skip this and we&apos;ll pick by colour only. You can add them
              later.
            </p>
            <Button type="button" variant="secondary" onClick={onSkip}>
              Skip for now
            </Button>
          </div>
        )}

        <p className="mt-6 max-w-xl text-cream/75">
          Use a soft tape measure and round to the nearest centimetre. We use
          your bust, waist and hips to work out your shape.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
          <div className="grid gap-8 sm:grid-cols-[180px_1fr]">
            <MeasureDiagram active={activeField} />
            <div
              className="grid gap-6 sm:grid-cols-2"
              onFocus={(event) =>
                setActiveField((event.target as HTMLInputElement).name as FieldName)
              }
              onBlur={() => setActiveField(null)}
            >
              {FIELDS.map((field) => {
                const error = errors[field.name];
                return (
                  <label key={field.name} className="block">
                    <span className="block text-sm font-semibold text-cream">
                      {field.label}
                      {!field.required ? (
                        <span className="ml-2 text-xs font-normal text-cream/55">
                          Optional
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-xs text-cream/55">
                      {field.hint}
                    </span>
                    <Input
                      type="number"
                      inputMode="numeric"
                      step={1}
                      className="mt-2"
                      aria-invalid={error ? "true" : "false"}
                      aria-describedby={error ? `${field.name}-error` : undefined}
                      {...register(field.name)}
                    />
                    {error ? (
                      <span
                        id={`${field.name}-error`}
                        className="mt-2 block text-xs text-blush"
                      >
                        {error.message}
                      </span>
                    ) : null}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                router.push(isEdit ? "/profile" : "/onboarding/colouring")
              }
            >
              Back
            </Button>
            <div className="flex flex-wrap items-center gap-4">
              {isEdit ? (
                <p className="text-sm text-cream/70">
                  Saving updates this week&apos;s three pieces.
                </p>
              ) : null}
              <Button type="submit" disabled={isSubmitting}>
                {isEdit ? "Save" : "Continue"}
              </Button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

// Matches the Avatar silhouette's geometry.
const CENTRE_X = 100;
const TAPE_LINES: { field: FieldName; label: string; y: number; width: number }[] = [
  { field: "shouldersCm", label: "Shoulders", y: 82, width: NEUTRAL_PROPORTIONS.shoulders },
  { field: "bustCm", label: "Bust", y: 118, width: NEUTRAL_PROPORTIONS.bust },
  { field: "waistCm", label: "Waist", y: 168, width: NEUTRAL_PROPORTIONS.waist },
  { field: "hipsCm", label: "Hips", y: 214, width: NEUTRAL_PROPORTIONS.hips },
];

/** A plain figure with a tape line at each place to measure. */
function MeasureDiagram({ active }: { active: FieldName | null }) {
  const p = NEUTRAL_PROPORTIONS;
  const outline = [
    [-p.shoulders / 2, 82],
    [-p.bust / 2, 118],
    [-p.waist / 2, 168],
    [-p.hips / 2, 214],
    [-p.hem / 2, 286],
    [p.hem / 2, 286],
    [p.hips / 2, 214],
    [p.waist / 2, 168],
    [p.bust / 2, 118],
    [p.shoulders / 2, 82],
  ]
    .map(([x, y], index) => `${index ? "L" : "M"} ${CENTRE_X + x} ${y}`)
    .join(" ");

  return (
    <svg
      viewBox="0 0 230 300"
      role="img"
      aria-label="Where to measure your shoulders, bust, waist and hips"
      className="mx-auto block w-32 sm:w-full"
    >
      <circle cx={CENTRE_X} cy={46} r={20} className="fill-cream/10 stroke-cream/30" />
      <path d={`${outline} Z`} className="fill-cream/10 stroke-cream/30" />
      {TAPE_LINES.map(({ field, label, y, width }) => {
        const isActive = active === field;
        const end = CENTRE_X + width / 2 + 6;
        return (
          <g
            key={field}
            className={isActive ? "fill-gold stroke-gold" : "fill-cream/60 stroke-cream/60"}
          >
            <line
              x1={CENTRE_X - width / 2 - 6}
              x2={end}
              y1={y}
              y2={y}
              strokeWidth={isActive ? 3 : 1.5}
              strokeDasharray="4 3"
            />
            <text x={end + 4} y={y + 4} fontSize={11} stroke="none">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

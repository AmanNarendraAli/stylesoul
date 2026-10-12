"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type FieldErrors, type Resolver } from "react-hook-form";
import {
  bodyMeasurementsSchema,
  MEASUREMENT_LIMITS,
  type BodyMeasurements,
} from "@/lib/body-shape/classify";
import {
  cmToFeetInches,
  cmToInches,
  feetInchesToCm,
  inchesToCm,
  parseUnit,
  UNIT_COOKIE,
  type LengthUnit,
} from "@/lib/units";
import { NEUTRAL_PROPORTIONS } from "@/components/avatar/palettes";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "../OnboardingProvider";

type FieldName = keyof BodyMeasurements;
/** What the user types, in their chosen unit. Height in inches is feet + inches. */
type FormValues = Record<FieldName | "heightFt" | "heightIn", string>;

type FieldConfig = {
  name: FieldName;
  label: string;
  hint: string;
  required: boolean;
};

const FIELDS: FieldConfig[] = [
  { name: "bustCm", label: "Bust", hint: "Measure around the fullest part.", required: true },
  { name: "waistCm", label: "Waist", hint: "Measure around the narrowest part.", required: true },
  { name: "hipsCm", label: "Hips", hint: "Measure around the fullest part.", required: true },
  {
    name: "shouldersCm",
    label: "Shoulder width",
    hint: "Measure straight across from one shoulder point to the other.",
    required: false,
  },
  { name: "heightCm", label: "Height", hint: "Stand straight without shoes.", required: false },
];

const GIRTHS = ["bustCm", "waistCm", "hipsCm", "shouldersCm"] as const;
const EMPTY: FormValues = {
  bustCm: "",
  waistCm: "",
  hipsCm: "",
  shouldersCm: "",
  heightCm: "",
  heightFt: "",
  heightIn: "",
};

/** Stored centimetres → what the form shows in `unit`. */
function toForm(body: Partial<BodyMeasurements> | undefined, unit: LengthUnit): FormValues {
  const values = { ...EMPTY };
  if (!body) return values;
  for (const name of GIRTHS) {
    const cm = body[name];
    if (cm != null) values[name] = String(unit === "cm" ? cm : cmToInches(cm));
  }
  if (body.heightCm != null) {
    if (unit === "cm") values.heightCm = String(body.heightCm);
    else {
      const { feet, inches } = cmToFeetInches(body.heightCm);
      values.heightFt = String(feet);
      values.heightIn = String(inches);
    }
  }
  return values;
}

const num = (value: string) => (value.trim() === "" ? undefined : Number(value));

/** What the form shows → centimetres (unparseable text passes through to fail validation). */
function toCm(values: FormValues, unit: LengthUnit): Record<FieldName, unknown> {
  const convert = (value: string) => {
    const n = num(value);
    if (n === undefined || Number.isNaN(n) || unit === "cm") return n ?? "";
    return inchesToCm(n);
  };
  const feet = num(values.heightFt);
  const inches = num(values.heightIn);
  const height =
    unit === "cm"
      ? convert(values.heightCm)
      : feet === undefined && inches === undefined
        ? ""
        : feetInchesToCm(feet ?? 0, inches ?? 0);
  return {
    bustCm: convert(values.bustCm),
    waistCm: convert(values.waistCm),
    hipsCm: convert(values.hipsCm),
    shouldersCm: convert(values.shouldersCm),
    heightCm: height,
  };
}

function rangeMessage(name: FieldName, unit: LengthUnit) {
  const { label, min, max } = MEASUREMENT_LIMITS[name];
  if (unit === "cm") return `Enter a ${label} between ${min} and ${max} cm`;
  if (name === "heightCm") {
    const low = cmToFeetInches(min);
    const high = cmToFeetInches(max);
    return `Enter a ${label} between ${low.feet} ft ${low.inches} in and ${high.feet} ft ${high.inches} in`;
  }
  return `Enter a ${label} between ${cmToInches(min)} and ${cmToInches(max)} in`;
}

function resolverFor(unit: LengthUnit): Resolver<FormValues, unknown, BodyMeasurements> {
  return async (values) => {
    const parsed = bodyMeasurementsSchema.safeParse(toCm(values, unit));
    if (parsed.success) return { values: parsed.data, errors: {} };
    const errors: FieldErrors<FormValues> = {};
    for (const issue of parsed.error.issues) {
      const name = issue.path[0] as FieldName;
      errors[name] = { type: "validate", message: rangeMessage(name, unit) };
    }
    return { values: {}, errors };
  };
}

function readUnitCookie(): LengthUnit {
  const match = document.cookie.match(new RegExp(`(?:^|; )${UNIT_COOKIE}=([^;]*)`));
  return parseUnit(match?.[1]);
}

export default function OnboardingBodyPage() {
  const router = useRouter();
  const isEdit = useSearchParams().get("edit") === "1";
  const { draft, isHydrated, setBody } = useOnboarding();
  const [activeField, setActiveField] = useState<FieldName | null>(null);
  const [unit, setUnit] = useState<LengthUnit>("in");
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues, unknown, BodyMeasurements>({
    resolver: resolverFor(unit),
    defaultValues: EMPTY,
  });

  // The saved unit is only readable in the browser.
  useEffect(() => setUnit(readUnitCookie()), []);

  useEffect(() => {
    if (isHydrated && draft.body) {
      reset(toForm(draft.body, unit));
    }
    // Re-run only when the draft arrives; unit switches convert in changeUnit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft.body, isHydrated, reset]);

  const changeUnit = (next: LengthUnit) => {
    if (next === unit) return;
    // Carry over each value that converts, even if the form isn't valid yet.
    const typed = Object.fromEntries(
      Object.entries(toCm(getValues(), unit)).filter(
        ([, cm]) => typeof cm === "number" && Number.isFinite(cm) && cm > 0,
      ),
    ) as Partial<BodyMeasurements>;
    reset(toForm(typed, next));
    document.cookie = `${UNIT_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    setUnit(next);
  };

  useEffect(() => {
    if (isHydrated && !draft.colouring) {
      router.replace("/onboarding/colouring");
    }
  }, [draft.colouring, isHydrated, router]);

  const analysingPath = isEdit
    ? "/onboarding/analysing?edit=1"
    : "/onboarding/analysing";

  const onSubmit = (data: BodyMeasurements) => {
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
        <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
          <h1 className="font-display text-5xl">Your measurements (optional)</h1>
          <UnitToggle unit={unit} onChange={changeUnit} />
        </div>

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
          Use a soft tape measure and round to the nearest{" "}
          {unit === "cm" ? "centimetre" : "half inch"}. We use your bust, waist
          and hips to work out your shape.
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
                    {field.name === "heightCm" && unit === "in" ? (
                      <span className="mt-2 grid grid-cols-2 gap-2">
                        <UnitInput
                          suffix="ft"
                          step={1}
                          label="Height, feet"
                          error={error ? `${field.name}-error` : undefined}
                          registration={register("heightFt")}
                        />
                        <UnitInput
                          suffix="in"
                          step={1}
                          label="Height, inches"
                          error={error ? `${field.name}-error` : undefined}
                          registration={register("heightIn")}
                        />
                      </span>
                    ) : (
                      <span className="mt-2 block">
                        <UnitInput
                          suffix={unit}
                          step={unit === "cm" ? 1 : 0.5}
                          error={error ? `${field.name}-error` : undefined}
                          registration={register(field.name)}
                        />
                      </span>
                    )}
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

function UnitToggle({
  unit,
  onChange,
}: {
  unit: LengthUnit;
  onChange: (unit: LengthUnit) => void;
}) {
  return (
    <div role="group" aria-label="Units" className="flex rounded-full border border-cream/20 p-1">
      {(["cm", "in"] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={unit === option}
          onClick={() => onChange(option)}
          className={`min-h-9 min-w-12 rounded-full px-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
            unit === option ? "bg-gold font-semibold text-charcoal" : "text-cream/70 hover:text-cream"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function UnitInput({
  suffix,
  step,
  label,
  error,
  registration,
}: {
  suffix: string;
  step: number;
  label?: string;
  error: string | undefined;
  registration: ReturnType<ReturnType<typeof useForm<FormValues>>["register"]>;
}) {
  return (
    <span className="relative block">
      <Input
        type="number"
        inputMode="decimal"
        step={step}
        aria-label={label}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error}
        className="pr-10"
        {...registration}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-cream/50"
      >
        {suffix}
      </span>
    </span>
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

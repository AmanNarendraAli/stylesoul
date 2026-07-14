"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  bodyMeasurementsSchema,
  type BodyMeasurements,
} from "@/lib/body-shape/classify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "../OnboardingProvider";

type BodyFormInput = z.input<typeof bodyMeasurementsSchema>;

type FieldConfig = {
  name: keyof BodyMeasurements;
  label: string;
  hint: string;
  required: boolean;
};

const FIELDS: FieldConfig[] = [
  { name: "heightCm", label: "Height (cm)", hint: "Standing height", required: true },
  { name: "weightKg", label: "Weight (kg)", hint: "Optional — helps calibrate fit", required: false },
  { name: "bustCm", label: "Bust (cm)", hint: "Around the fullest part", required: true },
  { name: "waistCm", label: "Waist (cm)", hint: "Narrowest part of the torso", required: true },
  { name: "hipsCm", label: "Hips (cm)", hint: "Around the fullest part", required: true },
  { name: "shouldersCm", label: "Shoulders (cm)", hint: "Across the back, shoulder to shoulder", required: true },
];

export default function OnboardingBodyPage() {
  const router = useRouter();
  const { draft, isHydrated, setBody } = useOnboarding();
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

  const onSubmit: SubmitHandler<BodyMeasurements> = (data) => {
    setBody(data);
    router.push("/onboarding/colouring");
  };

  return (
    <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
      <section className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Step 1 of 3</p>
        <h1 className="mt-3 font-display text-5xl">Body composition</h1>
        <p className="mt-4 max-w-xl text-cream/75">
          Measure to the nearest centimetre. We use these to derive your silhouette
          — they never leave your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
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

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              Continue
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { colouringSchema, type Colouring } from "@/lib/colour-season/map";
import {
  eyeOptions,
  hairOptions,
  skinOptions,
  undertoneOptions,
  type ColourOption,
} from "@/lib/colour-season/options";
import type { DetectedColouring } from "@/lib/colour-detection/detect";
import { Button } from "@/components/ui/button";
import { PhotoColourCapture } from "@/components/onboarding/PhotoColourCapture";
import { useOnboarding, type DetectionSource } from "../OnboardingProvider";

export default function OnboardingColouringPage() {
  const router = useRouter();
  const { draft, isHydrated, setColouring } = useOnboarding();
  const detectedRef = useRef<DetectedColouring | null>(null);
  const [showDetectedBanner, setShowDetectedBanner] = useState(false);

  useEffect(() => {
    if (isHydrated && !draft.body) {
      router.replace("/onboarding/body");
    }
  }, [draft.body, isHydrated, router]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Colouring>({
    resolver: zodResolver(colouringSchema),
    defaultValues: draft.colouring,
  });

  useEffect(() => {
    if (isHydrated && draft.colouring) {
      reset(draft.colouring);
    }
  }, [draft.colouring, isHydrated, reset]);

  const selectedSkin = watch("skinTone");
  const selectedUndertone = watch("undertone");
  const selectedEye = watch("eyeColour");
  const selectedHair = watch("hairColour");

  const handleDetected = (detected: DetectedColouring) => {
    detectedRef.current = detected;
    if (detected.skinTone) {
      setValue("skinTone", detected.skinTone.value, { shouldValidate: true });
    }
    if (detected.undertone) {
      setValue("undertone", detected.undertone.value, {
        shouldValidate: true,
      });
    }
    if (detected.eyeColour) {
      setValue("eyeColour", detected.eyeColour.value, { shouldValidate: true });
    }
    if (detected.hairColour) {
      setValue("hairColour", detected.hairColour.value, {
        shouldValidate: true,
      });
    }
    setShowDetectedBanner(true);
  };

  const onSubmit = (data: Colouring) => {
    setColouring(data, resolveSource(data, detectedRef.current));
    router.push("/onboarding/analysing");
  };

  return (
    <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
      <section className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Step 2 of 3</p>
        <h1 className="mt-3 font-display text-5xl">Natural colouring</h1>
        <p className="mt-4 max-w-2xl text-cream/75">
          Choose the swatch closest to your natural tone. Pick under daylight if
          you can — these drive your seasonal palette.
        </p>

        <div className="mt-10">
          <PhotoColourCapture onDetected={handleDetected} />
        </div>

        {showDetectedBanner ? (
          <p className="mt-4 rounded border border-gold/30 bg-gold/10 p-3 text-sm text-cream">
            We pre-filled the swatches below from your photo — change anything
            that looks off before continuing.
          </p>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-12">
          <SwatchGroup
            title="Skin tone"
            name="skinTone"
            options={skinOptions}
            selected={selectedSkin}
            onSelect={(value) =>
              setValue("skinTone", value, { shouldValidate: true })
            }
            register={register("skinTone")}
            error={errors.skinTone?.message}
          />

          <SwatchGroup
            title="Undertone"
            name="undertone"
            options={undertoneOptions}
            selected={selectedUndertone}
            onSelect={(value) =>
              setValue("undertone", value, { shouldValidate: true })
            }
            register={register("undertone")}
            error={errors.undertone?.message}
          />

          <SwatchGroup
            title="Eye colour"
            name="eyeColour"
            options={eyeOptions}
            selected={selectedEye}
            onSelect={(value) =>
              setValue("eyeColour", value, { shouldValidate: true })
            }
            register={register("eyeColour")}
            error={errors.eyeColour?.message}
          />

          <SwatchGroup
            title="Hair colour"
            name="hairColour"
            options={hairOptions}
            selected={selectedHair}
            onSelect={(value) =>
              setValue("hairColour", value, { shouldValidate: true })
            }
            register={register("hairColour")}
            error={errors.hairColour?.message}
          />

          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push("/onboarding/body")}
            >
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Continue
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

/**
 * Derive the profile's detectionSource from how the colouring was reached:
 * never used a photo → manual; photo detected every channel and the user kept
 * them all → photo; otherwise (some channel undetected or edited) →
 * photo_corrected.
 */
function resolveSource(
  data: Colouring,
  detected: DetectedColouring | null,
): DetectionSource {
  if (!detected) return "manual";
  const unchanged =
    detected.skinTone?.value === data.skinTone &&
    detected.undertone?.value === data.undertone &&
    detected.eyeColour?.value === data.eyeColour &&
    detected.hairColour?.value === data.hairColour;
  return unchanged ? "photo" : "photo_corrected";
}

type SwatchGroupProps<T extends string> = {
  title: string;
  name: string;
  options: ColourOption<T>[];
  selected: T | undefined;
  onSelect: (value: T) => void;
  register: ReturnType<ReturnType<typeof useForm<Colouring>>["register"]>;
  error: string | undefined;
};

function SwatchGroup<T extends string>({
  title,
  name,
  options,
  selected,
  onSelect,
  register,
  error,
}: SwatchGroupProps<T>) {
  return (
    <fieldset>
      <legend className="font-display text-2xl">{title}</legend>
      <input type="hidden" {...register} />
      <div className="mt-5 grid grid-cols-4 gap-4 sm:grid-cols-8">
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={isSelected}
              aria-label={option.label}
              className={`group flex flex-col items-center gap-2 rounded p-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                isSelected
                  ? "bg-cream/10 ring-2 ring-gold"
                  : "ring-1 ring-cream/10 hover:bg-cream/5"
              }`}
            >
              <span
                className="block h-14 w-14 rounded-full border border-cream/20"
                style={{ backgroundColor: option.hex }}
              />
              <span className="text-center text-[11px] leading-tight text-cream/80">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
      {error ? (
        <p
          id={`${name}-error`}
          className="mt-3 text-xs text-blush"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  colouringSchema,
  type Colouring,
  type EyeColour,
  type HairColour,
  type SkinTone,
} from "@/lib/colour-season/map";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "../OnboardingProvider";

type Swatch<T extends string> = { value: T; label: string; hex: string };

const SKIN_OPTIONS: Swatch<SkinTone>[] = [
  { value: "fair_cool", label: "Fair · cool", hex: "#F2D5CB" },
  { value: "fair_warm", label: "Fair · warm", hex: "#F3CFB1" },
  { value: "light_neutral", label: "Light · neutral", hex: "#E6C2A1" },
  { value: "medium_cool", label: "Medium · cool", hex: "#C99C84" },
  { value: "medium_warm", label: "Medium · warm", hex: "#BD8458" },
  { value: "olive", label: "Olive", hex: "#9F7C4D" },
  { value: "deep_cool", label: "Deep · cool", hex: "#5E3B2E" },
  { value: "deep_warm", label: "Deep · warm", hex: "#4A2A18" },
];

const EYE_OPTIONS: Swatch<EyeColour>[] = [
  { value: "blue", label: "Blue", hex: "#6A98B7" },
  { value: "green", label: "Green", hex: "#6F8F5C" },
  { value: "grey", label: "Grey", hex: "#8C8E8B" },
  { value: "hazel", label: "Hazel", hex: "#8B7150" },
  { value: "brown", label: "Brown", hex: "#5C3E26" },
  { value: "amber", label: "Amber", hex: "#B07E2F" },
];

const HAIR_OPTIONS: Swatch<HairColour>[] = [
  { value: "platinum_blonde", label: "Platinum blonde", hex: "#E6D4A8" },
  { value: "golden_blonde", label: "Golden blonde", hex: "#C9A063" },
  { value: "ash_brown", label: "Ash brown", hex: "#6E5947" },
  { value: "chestnut_brown", label: "Chestnut brown", hex: "#5A2E15" },
  { value: "auburn", label: "Auburn", hex: "#893A1F" },
  { value: "red", label: "Red", hex: "#B8442B" },
  { value: "black", label: "Black", hex: "#1A0F0A" },
  { value: "grey", label: "Grey", hex: "#B3AFA8" },
];

export default function OnboardingColouringPage() {
  const router = useRouter();
  const { draft, setColouring } = useOnboarding();

  useEffect(() => {
    if (!draft.body) {
      router.replace("/onboarding/body");
    }
  }, [draft.body, router]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Colouring>({
    resolver: zodResolver(colouringSchema),
    defaultValues: draft.colouring,
  });

  const selectedSkin = watch("skinTone");
  const selectedEye = watch("eyeColour");
  const selectedHair = watch("hairColour");

  const onSubmit = (data: Colouring) => {
    setColouring(data);
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

        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-12">
          <SwatchGroup
            title="Skin tone"
            name="skinTone"
            options={SKIN_OPTIONS}
            selected={selectedSkin}
            onSelect={(value) =>
              setValue("skinTone", value, { shouldValidate: true })
            }
            register={register("skinTone")}
            error={errors.skinTone?.message}
          />

          <SwatchGroup
            title="Eye colour"
            name="eyeColour"
            options={EYE_OPTIONS}
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
            options={HAIR_OPTIONS}
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

type SwatchGroupProps<T extends string> = {
  title: string;
  name: string;
  options: Swatch<T>[];
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

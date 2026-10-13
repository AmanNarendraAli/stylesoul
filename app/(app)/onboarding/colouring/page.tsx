"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { colouringSchema, type Colouring } from "@/lib/colour-season/map";
import {
  eyeOptions,
  hairOptions,
  skinOptions,
  undertoneOptions,
  type ColourOption,
} from "@/lib/colour-season/options";
import type { DetectedColouring } from "@/lib/colour-detection/detect";
import type { FaceShape } from "@/lib/face-shape/measure";
import { Button } from "@/components/ui/button";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { PhotoColourCapture } from "@/components/onboarding/PhotoColourCapture";
import { useOnboarding, type DetectionSource } from "../OnboardingProvider";

const GROUP_NAMES: Record<keyof Colouring, string> = {
  skinTone: "skin tone",
  undertone: "undertone",
  eyeColour: "eye colour",
  hairColour: "hair colour",
};

/** "a", "a and b", "a, b and c". */
function joinNames(names: string[]) {
  return names.length < 2
    ? names.join("")
    : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

export default function OnboardingColouringPage() {
  const router = useRouter();
  const isEdit = useSearchParams().get("edit") === "1";
  const { draft, isHydrated, setColouring, setColouringSelections } =
    useOnboarding();
  const detectedRef = useRef<DetectedColouring | null>(null);
  const faceRef = useRef<FaceShape | undefined>(undefined);
  const manuallySelectedRef = useRef<Set<keyof Colouring>>(new Set());
  const [showDetectedBanner, setShowDetectedBanner] = useState(false);
  // Values the photo filled in, cleared per group once the user picks.
  const [photoPicks, setPhotoPicks] = useState<Partial<Colouring>>({});
  const swatchesHeadingRef = useRef<HTMLHeadingElement>(null);

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

  // Restore once on hydration; later draft updates come from this form.
  const restoredRef = useRef(false);
  useEffect(() => {
    if (!isHydrated || restoredRef.current) return;
    restoredRef.current = true;
    reset({ ...draft.colouring, ...draft.colouringSelections });
  }, [draft, isHydrated, reset]);

  // Persist each pick (but not restores, which carry no field name) so a
  // reload keeps in-progress selections.
  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (!name) return;
      // Unpicked groups hold "" from their hidden inputs; keep only picks.
      setColouringSelections(
        Object.fromEntries(
          Object.entries(values).filter(([, value]) => value),
        ) as Partial<Colouring>,
      );
    });
    return () => subscription.unsubscribe();
  }, [watch, setColouringSelections]);

  const selectedSkin = watch("skinTone");
  const selectedUndertone = watch("undertone");
  const selectedEye = watch("eyeColour");
  const selectedHair = watch("hairColour");

  const handleDetected = (detected: DetectedColouring, face?: FaceShape) => {
    detectedRef.current = detected;
    faceRef.current = face;
    const filled: Partial<Colouring> = {};
    for (const name of Object.keys(GROUP_NAMES) as (keyof Colouring)[]) {
      const value = detected[name]?.value;
      if (value && !manuallySelectedRef.current.has(name)) {
        setValue(name, value, { shouldValidate: true });
        Object.assign(filled, { [name]: value });
      }
    }
    setPhotoPicks(filled);
    if (Object.keys(filled).length > 0) setShowDetectedBanner(true);
    swatchesHeadingRef.current?.focus();
  };

  const pick = (name: keyof Colouring, value: Colouring[keyof Colouring]) => {
    manuallySelectedRef.current.add(name);
    setPhotoPicks(({ [name]: _, ...rest }) => rest);
    setValue(name, value, { shouldValidate: true });
  };

  const missingGroups = (
    [
      ["skinTone", selectedSkin],
      ["undertone", selectedUndertone],
      ["eyeColour", selectedEye],
      ["hairColour", selectedHair],
    ] as const
  )
    .filter(([, value]) => !value)
    .map(([name]) => GROUP_NAMES[name]);

  const onSubmit = (data: Colouring) => {
    const colouring: Colouring = {
      skinTone: data.skinTone,
      undertone: data.undertone,
      eyeColour: data.eyeColour,
      hairColour: data.hairColour,
    };
    setColouring(
      colouring,
      resolveSource(
        colouring,
        detectedRef.current,
        draft.colouringSource,
        draft.colouring,
      ),
      faceRef.current,
    );
    router.push(isEdit ? "/onboarding/analysing?edit=1" : "/onboarding/body");
  };

  return (
    <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
      <section className="mx-auto max-w-4xl">
        {isEdit ? null : <OnboardingProgress current={0} />}
        <h1 className="mt-8 font-display text-5xl">Natural colouring</h1>
        <p className="mt-4 max-w-2xl text-cream/75">
          Pick the swatch closest to your natural colouring, or take a photo
          and we&apos;ll suggest them. We use these four to find your colour
          season.
        </p>

        <div className="mt-10">
          <PhotoColourCapture
            onDetected={handleDetected}
            onPickManually={() => swatchesHeadingRef.current?.focus()}
          />
        </div>

        <h2
          ref={swatchesHeadingRef}
          tabIndex={-1}
          className="mt-12 scroll-mt-6 font-display text-3xl focus:outline-none"
        >
          Your colouring
        </h2>
        <p className="mt-2 text-sm text-cream/70">
          Pick the closest swatch in each group.
        </p>

        {/* Always mounted so screen readers announce the banner when it appears. */}
        <div aria-live="polite">
          {showDetectedBanner ? (
            <p className="mt-4 rounded border border-gold/30 bg-gold/10 p-3 text-sm text-cream">
              We&apos;ve filled these in from your photo.{" "}
              {missingGroups.length > 0
                ? `Pick your ${joinNames(missingGroups)} too.`
                : "Change anything that looks wrong."}
            </p>
          ) : null}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-12">
          <SwatchGroup
            title="Skin tone"
            name="skinTone"
            options={skinOptions}
            selected={selectedSkin}
            photoPick={photoPicks.skinTone}
            onSelect={(value) => pick("skinTone", value)}
            register={register("skinTone")}
            error={errors.skinTone?.message}
          />

          <SwatchGroup
            title="Undertone"
            name="undertone"
            options={undertoneOptions}
            selected={selectedUndertone}
            photoPick={photoPicks.undertone}
            onSelect={(value) => pick("undertone", value)}
            register={register("undertone")}
            error={errors.undertone?.message}
          />

          <SwatchGroup
            title="Eye colour"
            name="eyeColour"
            options={eyeOptions}
            selected={selectedEye}
            photoPick={photoPicks.eyeColour}
            onSelect={(value) => pick("eyeColour", value)}
            register={register("eyeColour")}
            error={errors.eyeColour?.message}
          />

          <SwatchGroup
            title="Hair colour"
            name="hairColour"
            options={hairOptions}
            selected={selectedHair}
            photoPick={photoPicks.hairColour}
            onSelect={(value) => pick("hairColour", value)}
            register={register("hairColour")}
            error={errors.hairColour?.message}
          />

          <div className="flex flex-wrap items-center justify-end gap-4 pt-4">
            {isEdit ? (
              <p className="text-sm text-cream/70">
                Saving updates this week&apos;s three pieces.
              </p>
            ) : null}
            <Button type="submit" disabled={isSubmitting}>
              {isEdit ? "Save" : "Continue"}
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
  persistedSource: DetectionSource | undefined,
  persistedColouring: Colouring | undefined,
): DetectionSource {
  if (!detected) {
    if (persistedSource === "photo" && persistedColouring) {
      const unchanged =
        persistedColouring.skinTone === data.skinTone &&
        persistedColouring.undertone === data.undertone &&
        persistedColouring.eyeColour === data.eyeColour &&
        persistedColouring.hairColour === data.hairColour;
      return unchanged ? "photo" : "photo_corrected";
    }
    return persistedSource ?? "manual";
  }
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
  /** The photo's pick, badged until the user changes it. */
  photoPick: T | undefined;
  onSelect: (value: T) => void;
  register: UseFormRegisterReturn;
  error: string | undefined;
};

function SwatchGroup<T extends string>({
  title,
  name,
  options,
  selected,
  photoPick,
  onSelect,
  register,
  error,
}: SwatchGroupProps<T>) {
  const hasCues = options.some((option) => option.cue);
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="font-display text-2xl">{title}</legend>
      <input type="hidden" {...register} />
      <div
        className={`mt-5 grid gap-4 ${
          hasCues ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-[repeat(auto-fill,minmax(4.5rem,1fr))]"
        }`}
      >
        {options.map((option) => {
          const isSelected = selected === option.value;
          const fromPhoto = photoPick === option.value;
          const cueId = `${name}-${option.value}-cue`;
          const photoId = `${name}-photo`;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={isSelected}
              aria-label={option.label}
              aria-describedby={
                [option.cue && cueId, fromPhoto && photoId]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
              className={`group flex flex-col items-center gap-2 rounded p-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                isSelected
                  ? "bg-cream/10 ring-2 ring-gold"
                  : "ring-1 ring-cream/10 hover:bg-cream/5"
              }`}
            >
              <span className="relative block">
                <span
                  className="block h-14 w-14 rounded-full border border-cream/20"
                  style={{ backgroundColor: option.hex }}
                />
                {fromPhoto ? (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-charcoal">
                    <Camera aria-hidden="true" className="h-3 w-3" />
                    <span id={photoId} className="sr-only">
                      From your photo
                    </span>
                  </span>
                ) : null}
              </span>
              <span className="text-center text-[13px] leading-tight text-cream/80">
                {option.label}
              </span>
              {option.cue ? (
                <span
                  id={cueId}
                  className="text-center text-xs leading-snug text-cream/60"
                >
                  {option.cue}
                </span>
              ) : null}
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

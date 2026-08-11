"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  colouringSchema,
  seasonDimensionsSchema,
  type Chroma,
  type Colouring,
  type Contrast,
  type SeasonDimensions,
  type Temperature,
  type Value,
} from "@/lib/colour-season/map";
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

/** Natural colouring plus the four confirmed drape comparisons. */
const colouringFormSchema = colouringSchema.merge(seasonDimensionsSchema);

type ColouringFormValues = Colouring & SeasonDimensions;

/**
 * Drape choices are deliberately hex-literal: they represent generic fabric
 * colour families for comparison, not design-system surfaces, mirroring how
 * `ColourOption.hex` swatches already work.
 */
type DrapeOption<T extends string> = {
  value: T;
  label: string;
  hexes: readonly string[];
};

const temperatureDrapes: DrapeOption<Temperature>[] = [
  { value: "warm", label: "Warm — golds and corals", hexes: ["#C96F3B", "#D9A441", "#7A6A32"] },
  { value: "neutral", label: "Neutral — both look fine", hexes: ["#5F8C85", "#C08A8E", "#8E8073"] },
  { value: "cool", label: "Cool — blues and berry pinks", hexes: ["#3E6FA8", "#B04A78", "#7C8797"] },
];

const valueDrapes: DrapeOption<Value>[] = [
  { value: "light", label: "Light — pale, delicate tones", hexes: ["#EAD9C8", "#DCE4E8", "#E8D9E2"] },
  { value: "medium", label: "Medium — mid-depth tones", hexes: ["#A98A6B", "#7E93A2", "#9C7F94"] },
  { value: "deep", label: "Deep — rich, dark tones", hexes: ["#4A3423", "#233648", "#3E2438"] },
];

const chromaDrapes: DrapeOption<Chroma>[] = [
  { value: "bright", label: "Bright — clear and vivid", hexes: ["#D93B4B", "#1F7FD1", "#19A974"] },
  { value: "medium", label: "Between bright and soft", hexes: ["#B95E68", "#4A7BA6", "#4C9179"] },
  { value: "soft", label: "Soft — gently muted", hexes: ["#A5757B", "#6E8299", "#6F8C80"] },
];

const contrastDrapes: DrapeOption<Contrast>[] = [
  { value: "high", label: "High contrast", hexes: ["#1C1A19", "#F5EFE6"] },
  { value: "medium", label: "Medium contrast", hexes: ["#5A4A3F", "#CBB9A6"] },
  { value: "low", label: "Low contrast", hexes: ["#9C9187", "#B4A99E"] },
];

export default function OnboardingColouringPage() {
  const router = useRouter();
  const { draft, isHydrated, setColouring } = useOnboarding();
  const detectedRef = useRef<DetectedColouring | null>(null);
  const manuallySelectedRef = useRef<Set<keyof Colouring>>(new Set());
  const [showDetectedBanner, setShowDetectedBanner] = useState(false);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const photoPreviewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (isHydrated && !draft.body) {
      router.replace("/onboarding/body");
    }
  }, [draft.body, isHydrated, router]);

  // Revoke the transient preview on unmount so the object URL never leaks.
  useEffect(
    () => () => {
      if (photoPreviewUrlRef.current) {
        URL.revokeObjectURL(photoPreviewUrlRef.current);
        photoPreviewUrlRef.current = null;
      }
    },
    [],
  );

  const handlePhotoSelected = useCallback((file: File) => {
    // jsdom and very old browsers lack object URLs; the drapes stay usable
    // without a preview.
    if (typeof URL.createObjectURL !== "function") return;
    if (photoPreviewUrlRef.current) {
      URL.revokeObjectURL(photoPreviewUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    photoPreviewUrlRef.current = url;
    setPhotoPreviewUrl(url);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ColouringFormValues>({
    resolver: zodResolver(colouringFormSchema),
    defaultValues: { ...draft.colouring, ...draft.dimensions },
  });

  useEffect(() => {
    if (isHydrated && (draft.colouring || draft.dimensions)) {
      reset({ ...draft.colouring, ...draft.dimensions });
    }
  }, [draft.colouring, draft.dimensions, isHydrated, reset]);

  const selectedSkin = watch("skinTone");
  const selectedUndertone = watch("undertone");
  const selectedEye = watch("eyeColour");
  const selectedHair = watch("hairColour");
  const selectedTemperature = watch("temperature");
  const selectedValue = watch("value");
  const selectedChroma = watch("chroma");
  const selectedContrast = watch("contrast");

  const handleDetected = (detected: DetectedColouring) => {
    detectedRef.current = detected;
    if (detected.skinTone && !manuallySelectedRef.current.has("skinTone")) {
      setValue("skinTone", detected.skinTone.value, { shouldValidate: true });
    }
    if (detected.undertone && !manuallySelectedRef.current.has("undertone")) {
      setValue("undertone", detected.undertone.value, {
        shouldValidate: true,
      });
    }
    if (detected.eyeColour && !manuallySelectedRef.current.has("eyeColour")) {
      setValue("eyeColour", detected.eyeColour.value, { shouldValidate: true });
    }
    if (detected.hairColour && !manuallySelectedRef.current.has("hairColour")) {
      setValue("hairColour", detected.hairColour.value, {
        shouldValidate: true,
      });
    }
    setShowDetectedBanner(true);
  };

  const onSubmit = (data: ColouringFormValues) => {
    const colouring: Colouring = {
      skinTone: data.skinTone,
      undertone: data.undertone,
      eyeColour: data.eyeColour,
      hairColour: data.hairColour,
    };
    const dimensions: SeasonDimensions = {
      temperature: data.temperature,
      value: data.value,
      chroma: data.chroma,
      contrast: data.contrast,
    };
    setColouring(
      colouring,
      dimensions,
      resolveSource(
        colouring,
        detectedRef.current,
        draft.colouringSource,
        draft.colouring,
      ),
    );
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
          <PhotoColourCapture
            onDetected={handleDetected}
            onPhotoSelected={handlePhotoSelected}
          />
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
            onSelect={(value) => {
              manuallySelectedRef.current.add("skinTone");
              setValue("skinTone", value, { shouldValidate: true });
            }}
            register={register("skinTone")}
            error={errors.skinTone?.message}
          />

          <SwatchGroup
            title="Undertone"
            name="undertone"
            options={undertoneOptions}
            selected={selectedUndertone}
            onSelect={(value) => {
              manuallySelectedRef.current.add("undertone");
              setValue("undertone", value, { shouldValidate: true });
            }}
            register={register("undertone")}
            error={errors.undertone?.message}
          />

          <SwatchGroup
            title="Eye colour"
            name="eyeColour"
            options={eyeOptions}
            selected={selectedEye}
            onSelect={(value) => {
              manuallySelectedRef.current.add("eyeColour");
              setValue("eyeColour", value, { shouldValidate: true });
            }}
            register={register("eyeColour")}
            error={errors.eyeColour?.message}
          />

          <SwatchGroup
            title="Hair colour"
            name="hairColour"
            options={hairOptions}
            selected={selectedHair}
            onSelect={(value) => {
              manuallySelectedRef.current.add("hairColour");
              setValue("hairColour", value, { shouldValidate: true });
            }}
            register={register("hairColour")}
            error={errors.hairColour?.message}
          />

          <div className="border-t border-cream/10 pt-10">
            <h2 className="font-display text-3xl">Drape comparisons</h2>
            <p className="mt-3 max-w-2xl text-cream/75">
              Four quick comparisons refine your palette to one of twelve
              seasons. There are no wrong answers — choose whichever group
              flatters your face most.
            </p>
            {photoPreviewUrl ? (
              <p className="mt-3 max-w-2xl text-sm text-cream/60">
                Your photo appears inside each option, like holding fabric
                beneath your chin. It stays on this device only and is
                discarded when you leave this page.
              </p>
            ) : (
              <p className="mt-3 max-w-2xl text-sm text-cream/60">
                No photo? Stand facing a mirror in natural daylight, hold
                clothing from each colour group under your chin, and pick the
                group that makes your face look freshest.
              </p>
            )}
          </div>

          <DrapeGroup
            title="Temperature"
            name="temperature"
            explanation="Hold warm golds, then cool blues, near your face. Which group makes your skin look clear rather than sallow or ashen?"
            options={temperatureDrapes}
            selected={selectedTemperature}
            onSelect={(value) =>
              setValue("temperature", value, { shouldValidate: true })
            }
            register={register("temperature")}
            error={errors.temperature?.message}
            previewUrl={photoPreviewUrl}
          />

          <DrapeGroup
            title="Depth"
            name="value"
            explanation="Taken together, are your hair, eyes and skin overall light, medium, or deep?"
            options={valueDrapes}
            selected={selectedValue}
            onSelect={(value) =>
              setValue("value", value, { shouldValidate: true })
            }
            register={register("value")}
            error={errors.value?.message}
            previewUrl={photoPreviewUrl}
          />

          <DrapeGroup
            title="Clarity"
            name="chroma"
            explanation="Do clear, vivid colours light you up, or do gently muted colours sit more naturally against your skin?"
            options={chromaDrapes}
            selected={selectedChroma}
            onSelect={(value) =>
              setValue("chroma", value, { shouldValidate: true })
            }
            register={register("chroma")}
            error={errors.chroma?.message}
            previewUrl={photoPreviewUrl}
          />

          <DrapeGroup
            title="Contrast"
            name="contrast"
            explanation="How strong is the difference between your hair, skin and eyes? Think dark hair with fair skin (high) versus tone-on-tone colouring (low)."
            options={contrastDrapes}
            selected={selectedContrast}
            onSelect={(value) =>
              setValue("contrast", value, { shouldValidate: true })
            }
            register={register("contrast")}
            error={errors.contrast?.message}
            previewUrl={photoPreviewUrl}
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
 * photo_corrected. The drape comparisons are always answered by the user, so
 * they never affect the source.
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
  onSelect: (value: T) => void;
  register: UseFormRegisterReturn;
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
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
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

type DrapeGroupProps<T extends string> = {
  title: string;
  name: string;
  /** One-line plain-English instruction for making the comparison. */
  explanation: string;
  options: DrapeOption<T>[];
  selected: T | undefined;
  onSelect: (value: T) => void;
  register: UseFormRegisterReturn;
  error: string | undefined;
  /** Transient local object URL of the user's photo, if one was chosen. */
  previewUrl: string | null;
};

function DrapeGroup<T extends string>({
  title,
  name,
  explanation,
  options,
  selected,
  onSelect,
  register,
  error,
  previewUrl,
}: DrapeGroupProps<T>) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="font-display text-2xl">{title}</legend>
      <p className="mt-2 max-w-2xl text-sm text-cream/70">{explanation}</p>
      <input type="hidden" {...register} />
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={isSelected}
              aria-label={option.label}
              className={`flex flex-col items-center gap-3 rounded p-4 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                isSelected
                  ? "bg-cream/10 ring-2 ring-gold"
                  : "ring-1 ring-cream/10 hover:bg-cream/5"
              }`}
            >
              <span className="flex w-full flex-col items-center">
                {previewUrl ? (
                  // Decorative repeat of the user's own face so each drape can
                  // be judged against it; the button is named by its label.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt=""
                    aria-hidden="true"
                    data-drape-preview={name}
                    className="relative z-10 -mb-3 h-12 w-12 rounded-full border border-cream/30 object-cover"
                  />
                ) : null}
                <span className="flex h-10 w-full overflow-hidden rounded">
                  {option.hexes.map((hex) => (
                    <span
                      key={hex}
                      className="h-full flex-1"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </span>
              </span>
              <span className="text-center text-sm leading-tight text-cream/85">
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

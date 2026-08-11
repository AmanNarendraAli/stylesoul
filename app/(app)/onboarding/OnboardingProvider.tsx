"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  bodyMeasurementsSchema,
  type BodyMeasurements,
} from "@/lib/body-shape/classify";
import {
  colouringSchema,
  seasonDimensionsSchema,
  type Colouring,
  type SeasonDimensions,
} from "@/lib/colour-season/map";
import { detectionSources } from "@/lib/style-profile/schema";
import { ONBOARDING_DRAFT_STORAGE_KEY as DRAFT_STORAGE_KEY } from "@/lib/onboarding-draft";

export type DetectionSource = (typeof detectionSources)[number];

export type OnboardingDraft = {
  body?: BodyMeasurements;
  colouring?: Colouring;
  /** The four confirmed drape comparisons; required to map a season. */
  dimensions?: SeasonDimensions;
  /** How the colouring was obtained — drives the profile's detectionSource. */
  colouringSource?: DetectionSource;
};

function parseStoredDraft(stored: string): OnboardingDraft {
  const candidate: unknown = JSON.parse(stored);
  if (
    typeof candidate !== "object" ||
    candidate === null ||
    Array.isArray(candidate)
  ) {
    return {};
  }

  const values = candidate as Record<string, unknown>;
  const body = bodyMeasurementsSchema.safeParse(values.body);
  const colouring = colouringSchema.safeParse(values.colouring);
  const colouringSource = detectionSources.find(
    (source) => source === values.colouringSource,
  );
  const draft: OnboardingDraft = {};

  if (body.success) draft.body = body.data;
  if (colouring.success) {
    draft.colouring = colouring.data;
    const dimensions = seasonDimensionsSchema.safeParse(values.dimensions);
    if (dimensions.success) draft.dimensions = dimensions.data;
    if (colouringSource) draft.colouringSource = colouringSource;
  }

  return draft;
}

type OnboardingContextValue = {
  draft: OnboardingDraft;
  isHydrated: boolean;
  setBody: (body: BodyMeasurements) => void;
  setColouring: (
    colouring: Colouring,
    dimensions: SeasonDimensions,
    source: DetectionSource,
  ) => void;
  reset: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<OnboardingDraft>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsHydrated(true);
      return;
    }
    try {
      const stored = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);
      if (stored) {
        setDraft(parseStoredDraft(stored));
      }
    } catch {
      // ignore malformed stored draft
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isHydrated) return;
    try {
      window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // sessionStorage may be unavailable; we still have in-memory state
    }
  }, [draft, isHydrated]);

  const setBody = useCallback((body: BodyMeasurements) => {
    setDraft((prev) => ({ ...prev, body }));
  }, []);

  const setColouring = useCallback(
    (
      colouring: Colouring,
      dimensions: SeasonDimensions,
      source: DetectionSource,
    ) => {
      setDraft((prev) => ({
        ...prev,
        colouring,
        dimensions,
        colouringSource: source,
      }));
    },
    [],
  );

  const reset = useCallback(() => {
    setDraft({});
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  }, []);

  const value = useMemo(
    () => ({ draft, isHydrated, setBody, setColouring, reset }),
    [draft, isHydrated, setBody, setColouring, reset],
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return ctx;
}

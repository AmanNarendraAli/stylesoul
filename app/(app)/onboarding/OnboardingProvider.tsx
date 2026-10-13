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
import { z } from "zod";
import { colouringSchema, type Colouring } from "@/lib/colour-season/map";
import type { FaceShape } from "@/lib/face-shape/measure";
import { detectionSources } from "@/lib/style-profile/schema";
import { ONBOARDING_DRAFT_STORAGE_KEY as DRAFT_STORAGE_KEY } from "@/lib/onboarding-draft";

export type DetectionSource = (typeof detectionSources)[number];

export type OnboardingDraft = {
  body?: BodyMeasurements;
  colouring?: Colouring;
  /** How the colouring was obtained — drives the profile's detectionSource. */
  colouringSource?: DetectionSource;
  /** In-progress swatch picks, so a reload keeps them. */
  colouringSelections?: Partial<Colouring>;
  /** Face positions from the photo, when one was taken and measurable. */
  face?: FaceShape;
};

const colouringSelectionsSchema = colouringSchema.partial();
const faceSchema = z.object({
  length: z.number().min(0).max(1),
  lines: z.number().min(0).max(1),
});

function parseDraft(candidate: unknown): OnboardingDraft {
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
  const colouringSelections = colouringSelectionsSchema.safeParse(
    values.colouringSelections,
  );
  const face = faceSchema.safeParse(values.face);
  const colouringSource = detectionSources.find(
    (source) => source === values.colouringSource,
  );
  const draft: OnboardingDraft = {};

  if (body.success) draft.body = body.data;
  if (colouring.success) {
    draft.colouring = colouring.data;
    if (colouringSource) draft.colouringSource = colouringSource;
    if (face.success) draft.face = face.data;
  }
  if (colouringSelections.success) {
    draft.colouringSelections = colouringSelections.data;
  }

  return draft;
}

/** Seeds a re-run of the analysis from the user's saved profile, if any. */
async function fetchProfileDraft(): Promise<OnboardingDraft> {
  const response = await fetch("/api/profile");
  if (!response.ok) return {};
  const { profile } = await response.json();
  return parseDraft({
    body: profile,
    colouring: profile,
    colouringSource: profile.detectionSource,
  });
}

type OnboardingContextValue = {
  draft: OnboardingDraft;
  isHydrated: boolean;
  /** `undefined` skips measurements; they stay optional. */
  setBody: (body: BodyMeasurements | undefined) => void;
  /** A new photo's face replaces the draft's; without one it is kept. */
  setColouring: (colouring: Colouring, source: DetectionSource, face?: FaceShape) => void;
  setColouringSelections: (selections: Partial<Colouring>) => void;
  reset: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<OnboardingDraft>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let storedDraft: OnboardingDraft = {};
    try {
      const stored = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);
      if (stored) {
        storedDraft = parseDraft(JSON.parse(stored));
      }
    } catch {
      // ignore malformed stored draft
    }

    // A local draft is the user's latest work; only without one do we
    // prefill from the saved profile.
    if (Object.keys(storedDraft).length > 0) {
      setDraft(storedDraft);
      setIsHydrated(true);
      return;
    }
    fetchProfileDraft()
      .catch(() => ({}))
      .then((profileDraft) => {
        if (cancelled) return;
        setDraft(profileDraft);
        setIsHydrated(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // sessionStorage may be unavailable; we still have in-memory state
    }
  }, [draft, isHydrated]);

  const setBody = useCallback((body: BodyMeasurements | undefined) => {
    setDraft((prev) => ({ ...prev, body }));
  }, []);

  const setColouring = useCallback(
    (colouring: Colouring, source: DetectionSource, face?: FaceShape) => {
      setDraft((prev) => ({
        ...prev,
        colouring,
        colouringSource: source,
        face: face ?? prev.face,
      }));
    },
    [],
  );

  const setColouringSelections = useCallback(
    (colouringSelections: Partial<Colouring>) => {
      setDraft((prev) => ({ ...prev, colouringSelections }));
    },
    [],
  );

  const reset = useCallback(() => {
    setDraft({});
    try {
      window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(
    () => ({
      draft,
      isHydrated,
      setBody,
      setColouring,
      setColouringSelections,
      reset,
    }),
    [draft, isHydrated, setBody, setColouring, setColouringSelections, reset],
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

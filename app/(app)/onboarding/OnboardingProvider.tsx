"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { BodyMeasurements } from "@/lib/body-shape/classify";
import type { Colouring } from "@/lib/colour-season/map";
import type { detectionSources } from "@/lib/style-profile/schema";

const DRAFT_STORAGE_KEY = "stylesoul.onboardingDraft.v3";

export type DetectionSource = (typeof detectionSources)[number];

export type OnboardingDraft = {
  body?: BodyMeasurements;
  colouring?: Colouring;
  /** How the colouring was obtained — drives the profile's detectionSource. */
  colouringSource?: DetectionSource;
};

type OnboardingContextValue = {
  draft: OnboardingDraft;
  isHydrated: boolean;
  setBody: (body: BodyMeasurements) => void;
  setColouring: (colouring: Colouring, source: DetectionSource) => void;
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
        setDraft(JSON.parse(stored) as OnboardingDraft);
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
    (colouring: Colouring, source: DetectionSource) => {
      setDraft((prev) => ({ ...prev, colouring, colouringSource: source }));
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

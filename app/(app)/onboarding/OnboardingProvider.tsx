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

const DRAFT_STORAGE_KEY = "stylesoul.onboardingDraft.v1";

export type OnboardingDraft = {
  body?: BodyMeasurements;
  colouring?: Colouring;
};

type OnboardingContextValue = {
  draft: OnboardingDraft;
  setBody: (body: BodyMeasurements) => void;
  setColouring: (colouring: Colouring) => void;
  reset: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<OnboardingDraft>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);
      if (stored) {
        setDraft(JSON.parse(stored) as OnboardingDraft);
      }
    } catch {
      // ignore malformed stored draft
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // sessionStorage may be unavailable; we still have in-memory state
    }
  }, [draft]);

  const setBody = useCallback((body: BodyMeasurements) => {
    setDraft((prev) => ({ ...prev, body }));
  }, []);

  const setColouring = useCallback((colouring: Colouring) => {
    setDraft((prev) => ({ ...prev, colouring }));
  }, []);

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
    () => ({ draft, setBody, setColouring, reset }),
    [draft, setBody, setColouring, reset],
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

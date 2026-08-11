"use client";

import { useEffect } from "react";

export function FirstEditViewTracker() {
  useEffect(() => {
    void fetch("/api/funnel/first-edit", {
      method: "POST",
      credentials: "same-origin",
      keepalive: true,
    }).catch(() => undefined);
  }, []);

  return null;
}

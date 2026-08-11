"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { ONBOARDING_DRAFT_STORAGE_KEY } from "@/lib/onboarding-draft";

export function AccountDataControls() {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAccount = async () => {
    const confirmed = window.confirm(
      "Permanently delete your StyleSoul account, profile, and weekly edits? This cannot be undone.",
    );
    if (!confirmed) return;

    setDeleting(true);
    setError(null);
    try {
      const response = await fetch("/api/account", { method: "DELETE" });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(payload?.message ?? "Account deletion failed");
      }
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Account deletion failed",
      );
      setDeleting(false);
      return;
    }

    try {
      window.sessionStorage.removeItem(ONBOARDING_DRAFT_STORAGE_KEY);
    } catch {
      // The account is deleted even when browser storage is unavailable.
    }
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      await supabase.auth.signOut({ scope: "local" });
    } catch {
      // The deletion response also clears the server-side session cookie.
    }
    window.location.replace("/");
  };

  return (
    <section aria-labelledby="account-data-heading" className="mt-12 max-w-2xl">
      <h2 id="account-data-heading" className="font-display text-3xl">
        Your data
      </h2>
      <p className="mt-3 leading-7 text-cream/75">
        Download a JSON copy of your authentication details, profile, weekly
        edits, coarse funnel milestones, security metadata, and any catalogue
        audit actions linked to your account.
      </p>
      <a
        href="/api/account/export"
        download
        className="mt-5 inline-flex min-h-11 items-center rounded border border-gold/50 px-5 py-2 text-sm font-semibold text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        Download my data
      </a>

      <div className="mt-10 border-t border-blush/30 pt-8">
        <h3 className="font-display text-2xl">Delete account</h3>
        <p id="delete-account-description" className="mt-3 leading-7 text-cream/75">
          Permanently remove your sign-in identity, profile, weekly edits,
          coarse funnel milestones, and photo-analysis rate-limit record.
          Catalogue audit history is retained for accountability, but its link
          to your account is removed.
          A one-way deletion marker is retained to prevent an in-flight request
          from recreating those records.
        </p>
        <button
          type="button"
          disabled={deleting}
          aria-describedby="delete-account-description"
          onClick={() => void deleteAccount()}
          className="mt-5 min-h-11 rounded border border-blush/60 px-5 py-2 text-sm font-semibold text-blush transition hover:bg-blush/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush disabled:opacity-50"
        >
          {deleting ? "Deleting account…" : "Delete my account"}
        </button>
        {error ? (
          <p className="mt-4 text-sm text-blush" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}

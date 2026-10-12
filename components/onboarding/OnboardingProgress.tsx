const STEPS = ["Colouring", "Measurements (optional)", "Your profile"];

/** Three-part progress bar for onboarding; `current` is the 0-based step. */
export function OnboardingProgress({ current }: { current: number }) {
  return (
    <nav aria-label="Onboarding progress">
      <ol className="grid grid-cols-3 gap-2">
        {STEPS.map((label, index) => (
          <li
            key={label}
            aria-current={index === current ? "step" : undefined}
            className={`border-t-4 pt-2 text-xs sm:text-sm ${
              index === current
                ? "border-gold text-gold"
                : index < current
                  ? "border-gold/50 text-cream/75"
                  : "border-cream/15 text-cream/55"
            }`}
          >
            {label}
          </li>
        ))}
      </ol>
    </nav>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      className={cn(
        "w-full rounded border border-cream/20 bg-cream/5 px-4 py-3 text-cream outline-none transition placeholder:text-cream/40 focus:border-gold focus-visible:ring-2 focus-visible:ring-gold",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

Input.displayName = "Input";

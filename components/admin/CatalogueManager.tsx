"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { bodyShapes } from "@/lib/body-shape/classify";
import { colourSeasons } from "@/lib/colour-season/map";
import { formatPrice } from "@/lib/catalogue/price";
import { SEASON_LABELS, SHAPE_LABELS } from "@/lib/labels";
import {
  garmentCategories,
  occasionTags,
  priceTiers,
  productStatuses,
} from "@/lib/catalogue/schema";

type ProductView = {
  id: string;
  brand: string;
  title: string;
  description: string | null;
  imageUrl: string;
  productUrl: string;
  isAffiliate: boolean;
  priceCents: number;
  currency: string;
  status: string;
  eligibleShapes: string[];
  eligibleSeasons: string[];
  garmentCategory: string;
  occasionTags: string[];
  priceTier: string;
  createdAt: string;
  updatedAt: string;
};

type Coverage = { shape: string; season: string; count: number };

type FieldErrors = Record<string, string>;

const COVERAGE_MINIMUM = 15;

/** "Light spring" becomes "LSp": unique and short enough for a 12-column grid. */
function shortSeason(label: string) {
  const [modifier, season] = label.split(" ");
  return `${modifier[0].toUpperCase()}${season[0].toUpperCase()}${season[1]}`;
}

/** Maps the API's zod issues onto form field names, first message wins. */
function fieldErrorsFrom(
  issues: Array<{ path: PropertyKey[]; message: string }> = [],
): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of issues) {
    const field = String(issue.path[0] ?? "");
    const name = field === "priceCents" ? "price" : field;
    errors[name] ??= issue.message;
  }
  return errors;
}

export function CatalogueManager({
  products,
  coverage,
}: {
  products: ProductView[];
  coverage: Coverage[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<ProductView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const formSection = useRef<HTMLDivElement>(null);

  const counts = new Map(
    coverage.map((bucket) => [`${bucket.shape}:${bucket.season}`, bucket.count]),
  );

  const startEditing = (product: ProductView) => {
    flushSync(() => {
      setEditing(product);
      setFieldErrors({});
      setSaved(false);
    });
    formSection.current?.scrollIntoView({ block: "start" });
    formSection.current
      ?.querySelector<HTMLInputElement>("input")
      ?.focus({ preventScroll: true });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);
    setFieldErrors({});
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      brand: String(form.get("brand")),
      title: String(form.get("title")),
      description: String(form.get("description") ?? "").trim() || null,
      imageUrl: String(form.get("imageUrl")),
      productUrl: String(form.get("productUrl")),
      priceCents: Math.round(Number(form.get("price")) * 100),
      currency: "INR",
      status: String(form.get("status")),
      eligibleShapes: form.getAll("eligibleShapes").map(String),
      eligibleSeasons: form.getAll("eligibleSeasons").map(String),
      garmentCategory: String(form.get("garmentCategory")),
      occasionTags: form.getAll("occasionTags").map(String),
      priceTier: String(form.get("priceTier")),
    };

    try {
      const response = await fetch(
        editing ? `/api/admin/products/${editing.id}` : "/api/admin/products",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const result = (await response.json()) as {
        message?: string;
        issues?: Array<{ path: PropertyKey[]; message: string }>;
      };
      if (!response.ok) {
        setFieldErrors(fieldErrorsFrom(result.issues));
        throw new Error(result.message ?? "Could not save product");
      }
      setEditing(null);
      formElement.reset();
      setSaved(true);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save product");
    } finally {
      setSaving(false);
    }
  };

  const setStatus = async (product: ProductView, status: "active" | "inactive") => {
    const action = status === "active" ? "activate" : "deactivate";
    if (
      status === "inactive" &&
      !window.confirm(
        `Deactivate ${product.brand} ${product.title}? It will stop appearing in weekly edits until you activate it again.`,
      )
    ) {
      return;
    }
    setError(null);
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        const result = (await response.json()) as { message?: string };
        throw new Error(result.message ?? `Could not ${action} product`);
      }
      router.refresh();
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : `Could not ${action} product`,
      );
    }
  };

  return (
    <main className="min-h-screen bg-charcoal px-4 py-10 text-cream sm:px-6">
      <section className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.24em] text-gold">Admin</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Catalogue</h1>

        <section aria-labelledby="coverage-heading" className="mt-10">
          <h2 id="coverage-heading" className="font-display text-2xl">
            Coverage
          </h2>
          <p id="coverage-legend" className="mt-2 text-sm text-cream/70">
            Active products for each shape and season. Minimum {COVERAGE_MINIMUM}.{" "}
            <span className="ml-2 inline-block size-3 rounded-sm bg-sage/40 align-middle" aria-hidden />{" "}
            Meets minimum
            <span className="ml-3 inline-block size-3 rounded-sm bg-blush/40 align-middle" aria-hidden />{" "}
            Below minimum
          </p>
          <div className="mt-4 overflow-x-auto">
            <table
              aria-labelledby="coverage-heading"
              aria-describedby="coverage-legend"
              className="border-separate border-spacing-1 text-xs"
            >
              <thead>
                <tr>
                  <th scope="col" className="px-2 text-left font-normal text-cream/60">
                    Shape
                  </th>
                  {colourSeasons.map((season) => (
                    <th key={season} scope="col" className="px-1 font-semibold">
                      <abbr title={SEASON_LABELS[season]} aria-hidden>
                        {shortSeason(SEASON_LABELS[season])}
                      </abbr>
                      <span className="sr-only">{SEASON_LABELS[season]}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyShapes.map((shape) => (
                  <tr key={shape}>
                    <th scope="row" className="whitespace-nowrap px-2 text-left font-semibold">
                      {SHAPE_LABELS[shape]}
                    </th>
                    {colourSeasons.map((season) => {
                      const count = counts.get(`${shape}:${season}`) ?? 0;
                      return (
                        <td
                          key={season}
                          className={`min-w-9 rounded px-2 py-1.5 text-center tabular-nums ${
                            count < COVERAGE_MINIMUM ? "bg-blush/25" : "bg-sage/25"
                          }`}
                        >
                          {count}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.7fr)]">
          <div ref={formSection} className="scroll-mt-4">
            <h2 className="font-display text-2xl">
              {editing ? `Edit ${editing.title}` : "Add a product"}
            </h2>
            <form
              key={editing?.id ?? "new"}
              onSubmit={submit}
              className="mt-5 space-y-5 rounded border border-cream/15 bg-cream/[0.03] p-5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  name="brand"
                  label="Brand"
                  defaultValue={editing?.brand}
                  error={fieldErrors.brand}
                />
                <TextField
                  name="title"
                  label="Title"
                  defaultValue={editing?.title}
                  error={fieldErrors.title}
                />
              </div>
              <TextField
                name="description"
                label="Description (optional)"
                defaultValue={editing?.description ?? ""}
                multiline
                error={fieldErrors.description}
              />
              <TextField
                name="imageUrl"
                label="HTTPS image URL"
                type="url"
                defaultValue={editing?.imageUrl}
                error={fieldErrors.imageUrl}
              />
              <TextField
                name="productUrl"
                label="HTTPS retailer URL"
                type="url"
                defaultValue={editing?.productUrl}
                error={fieldErrors.productUrl}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  name="price"
                  label="Price (INR)"
                  type="number"
                  step="1"
                  min="1"
                  defaultValue={editing ? String(editing.priceCents / 100) : undefined}
                  error={fieldErrors.price}
                />
                <SelectField
                  name="status"
                  label="Status"
                  options={productStatuses}
                  defaultValue={editing?.status}
                  error={fieldErrors.status}
                />
                <SelectField
                  name="garmentCategory"
                  label="Garment category"
                  options={garmentCategories}
                  defaultValue={editing?.garmentCategory}
                  error={fieldErrors.garmentCategory}
                />
                <SelectField
                  name="priceTier"
                  label="Price tier"
                  options={priceTiers}
                  defaultValue={editing?.priceTier}
                  error={fieldErrors.priceTier}
                />
              </div>
              <CheckGroup
                name="eligibleShapes"
                label="Eligible shapes (choose at least one)"
                options={bodyShapes}
                labels={SHAPE_LABELS}
                selected={editing?.eligibleShapes}
                error={fieldErrors.eligibleShapes}
              />
              <CheckGroup
                name="eligibleSeasons"
                label="Eligible seasons (choose at least one)"
                options={colourSeasons}
                labels={SEASON_LABELS}
                selected={editing?.eligibleSeasons}
                error={fieldErrors.eligibleSeasons}
              />
              <CheckGroup
                name="occasionTags"
                label="Occasions (choose at least one)"
                options={occasionTags}
                selected={editing?.occasionTags}
                error={fieldErrors.occasionTags}
              />

              {error ? <p role="alert" className="text-sm text-blush">{error}</p> : null}
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="min-h-11 rounded bg-gold px-5 py-2 text-sm font-semibold text-charcoal disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {saving ? "Saving…" : editing ? "Save changes" : "Create product"}
                </button>
                {editing ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(null);
                      setFieldErrors({});
                      setSaved(false);
                    }}
                    className="min-h-11 rounded border border-cream/25 px-5 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
            <p role="status" aria-live="polite" className="mt-3 text-sm text-sage">
              {saved ? "Saved" : ""}
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl">Products ({products.length})</h2>
            <ul className="mt-5 space-y-3">
              {products.map((product) => (
                <li key={product.id} className="rounded border border-cream/15 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{product.brand} · {product.title}</p>
                      <p className="mt-1 text-sm text-cream/60">
                        {formatPrice(product.priceCents, product.currency)} · {product.status}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => startEditing(product)}
                      className="min-h-11 min-w-11 rounded text-sm text-gold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      Edit
                    </button>
                  </div>
                  {product.status === "active" ? (
                    <button
                      type="button"
                      onClick={() => void setStatus(product, "inactive")}
                    className="mt-3 min-h-11 rounded text-xs text-blush underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void setStatus(product, "active")}
                      className="mt-3 min-h-11 rounded text-xs text-gold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      Activate
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}

function TextField({
  name,
  label,
  defaultValue,
  multiline = false,
  error,
  ...inputProps
}: {
  name: string;
  label: string;
  defaultValue?: string;
  multiline?: boolean;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue">) {
  const className = "mt-1 min-h-11 w-full rounded border border-cream/20 bg-charcoal px-3 py-2 text-sm text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";
  const errorProps = {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${name}-error` : undefined,
  };
  return (
    <div>
      <label className="block text-sm text-cream/75">
        {label}
        {multiline ? (
          <textarea name={name} defaultValue={defaultValue} className={className} rows={3} {...errorProps} />
        ) : (
          <input name={name} defaultValue={defaultValue} required className={className} {...errorProps} {...inputProps} />
        )}
      </label>
      <FieldError name={name} error={error} />
    </div>
  );
}

function FieldError({ name, error }: { name: string; error?: string }) {
  return error ? (
    <span id={`${name}-error`} className="mt-1 block text-xs text-blush">
      {error}
    </span>
  ) : null;
}

function SelectField({
  name,
  label,
  options,
  defaultValue,
  error,
}: {
  name: string;
  label: string;
  options: readonly string[];
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-cream/75">
        {label}
        <select
          name={name}
          defaultValue={defaultValue ?? options[0]}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          className="mt-1 min-h-11 w-full rounded border border-cream/20 bg-charcoal px-3 py-2 text-sm text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          {options.map((option) => (
            <option key={option} value={option}>{option.replaceAll("_", " ")}</option>
          ))}
        </select>
      </label>
      <FieldError name={name} error={error} />
    </div>
  );
}

function CheckGroup({
  name,
  label,
  options,
  labels,
  selected = [],
  error,
}: {
  name: string;
  label: string;
  options: readonly string[];
  labels?: Record<string, string>;
  selected?: string[];
  error?: string;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="text-sm text-cream/75">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className={`flex min-h-11 items-center rounded border border-cream/15 px-3 py-2 text-xs ${labels ? "" : "capitalize"}`}>
            <input
              type="checkbox"
              name={name}
              value={option}
              defaultChecked={selected.includes(option)}
              className="mr-2 accent-gold"
            />
            {labels?.[option] ?? option.replaceAll("_", " ")}
          </label>
        ))}
      </div>
      <FieldError name={name} error={error} />
    </fieldset>
  );
}

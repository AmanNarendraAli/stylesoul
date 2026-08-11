"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { bodyShapes } from "@/lib/body-shape/classify";
import { colourSeasons } from "@/lib/colour-season/map";
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
  const [saving, setSaving] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      brand: String(form.get("brand")),
      title: String(form.get("title")),
      description: String(form.get("description") ?? "").trim() || null,
      imageUrl: String(form.get("imageUrl")),
      productUrl: String(form.get("productUrl")),
      priceCents: Math.round(Number(form.get("price")) * 100),
      currency: "GBP",
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
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Could not save product");
      setEditing(null);
      formElement.reset();
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save product");
    } finally {
      setSaving(false);
    }
  };

  const deactivate = async (product: ProductView) => {
    setError(null);
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "inactive" }),
      });
      if (!response.ok) {
        const result = (await response.json()) as { message?: string };
        throw new Error(result.message ?? "Could not deactivate product");
      }
      router.refresh();
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Could not deactivate product",
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
            Shape × season coverage
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
            {coverage.map((bucket) => (
              <div
                key={`${bucket.shape}:${bucket.season}`}
                className={`rounded border px-3 py-2 text-xs ${
                  bucket.count < 15
                    ? "border-blush/40 bg-blush/10"
                    : "border-sage/40 bg-sage/10"
                }`}
              >
                <p className="font-semibold capitalize">
                  {bucket.shape.replaceAll("_", " ")}
                </p>
                <p className="mt-1 capitalize text-cream/65">
                  {bucket.season.replaceAll("_", " ")} · {bucket.count} items
                </p>
                <p className="mt-1 text-cream/65">
                  {bucket.count < 15
                    ? "Below 15-item minimum"
                    : "Meets 15-item minimum"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.7fr)]">
          <div>
            <h2 className="font-display text-2xl">
              {editing ? `Edit ${editing.title}` : "Add a product"}
            </h2>
            <form
              key={editing?.id ?? "new"}
              onSubmit={submit}
              className="mt-5 space-y-5 rounded border border-cream/15 bg-cream/[0.03] p-5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField name="brand" label="Brand" defaultValue={editing?.brand} />
                <TextField name="title" label="Title" defaultValue={editing?.title} />
              </div>
              <TextField
                name="description"
                label="Description"
                defaultValue={editing?.description ?? ""}
                multiline
              />
              <TextField
                name="imageUrl"
                label="HTTPS image URL"
                type="url"
                defaultValue={editing?.imageUrl}
              />
              <TextField
                name="productUrl"
                label="HTTPS retailer URL"
                type="url"
                defaultValue={editing?.productUrl}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  name="price"
                  label="Price (GBP)"
                  type="number"
                  step="0.01"
                  min="0.01"
                  defaultValue={editing ? String(editing.priceCents / 100) : undefined}
                />
                <SelectField
                  name="status"
                  label="Status"
                  options={productStatuses}
                  defaultValue={editing?.status}
                />
                <SelectField
                  name="garmentCategory"
                  label="Garment category"
                  options={garmentCategories}
                  defaultValue={editing?.garmentCategory}
                />
                <SelectField
                  name="priceTier"
                  label="Price tier"
                  options={priceTiers}
                  defaultValue={editing?.priceTier}
                />
              </div>
              <CheckGroup
                name="eligibleShapes"
                label="Eligible shapes"
                options={bodyShapes}
                selected={editing?.eligibleShapes}
              />
              <CheckGroup
                name="eligibleSeasons"
                label="Eligible seasons"
                options={colourSeasons}
                selected={editing?.eligibleSeasons}
              />
              <CheckGroup
                name="occasionTags"
                label="Occasions"
                options={occasionTags}
                selected={editing?.occasionTags}
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
                    onClick={() => setEditing(null)}
                    className="min-h-11 rounded border border-cream/25 px-5 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
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
                        £{(product.priceCents / 100).toFixed(2)} · {product.status}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditing(product)}
                      className="min-h-11 min-w-11 rounded text-sm text-gold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      Edit
                    </button>
                  </div>
                  {product.status === "active" ? (
                    <button
                      type="button"
                      onClick={() => void deactivate(product)}
                    className="mt-3 min-h-11 rounded text-xs text-blush underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      Deactivate
                    </button>
                  ) : null}
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
  ...inputProps
}: {
  name: string;
  label: string;
  defaultValue?: string;
  multiline?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue">) {
  const className = "mt-1 min-h-11 w-full rounded border border-cream/20 bg-charcoal px-3 py-2 text-sm text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";
  return (
    <label className="block text-sm text-cream/75">
      {label}
      {multiline ? (
        <textarea name={name} defaultValue={defaultValue} className={className} rows={3} />
      ) : (
        <input name={name} defaultValue={defaultValue} required className={className} {...inputProps} />
      )}
    </label>
  );
}

function SelectField({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: readonly string[];
  defaultValue?: string;
}) {
  return (
    <label className="block text-sm text-cream/75">
      {label}
      <select
        name={name}
        defaultValue={defaultValue ?? options[0]}
        className="mt-1 min-h-11 w-full rounded border border-cream/20 bg-charcoal px-3 py-2 text-sm text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option.replaceAll("_", " ")}</option>
        ))}
      </select>
    </label>
  );
}

function CheckGroup({
  name,
  label,
  options,
  selected = [],
}: {
  name: string;
  label: string;
  options: readonly string[];
  selected?: string[];
}) {
  return (
    <fieldset>
      <legend className="text-sm text-cream/75">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="flex min-h-11 items-center rounded border border-cream/15 px-3 py-2 text-xs capitalize">
            <input
              type="checkbox"
              name={name}
              value={option}
              defaultChecked={selected.includes(option)}
              className="mr-2 accent-gold"
            />
            {option.replaceAll("_", " ")}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

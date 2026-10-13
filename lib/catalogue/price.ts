/** Whole-rupee prices, e.g. "₹2,499" (catalogue prices are stored in paise). */
export function formatPrice(priceCents: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(priceCents / 100);
}

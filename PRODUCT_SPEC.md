# StyleSoul — Product Specification

**Tagline:** Your Personal Style Intelligence
**Pricing:** Deferred. The current web MVP has no checkout, trial, subscription, or payment collection.
**Positioning:** A lifelong fashion compass, built around the individual user.
**Platform:** Responsive web. Native mobile is a post-MVP workstream.
**Target audience (MVP):** Womenswear. Avatar geometry, body-shape archetypes, colour seasons, and the curated edit are designed for women. Menswear and unisex recommendations are out of scope.

StyleSoul builds a personalised style profile from body measurements and natural colouring, then presents an abstract avatar and a three-product weekly shopping edit with direct retailer links.

---

## 1. Product Overview

StyleSoul produces a personalised style profile in three steps:

| Step | Name | Inputs | Output |
|------|------|--------|--------|
| 01 | Body Composition | Height, bust, waist, hips, shoulder width; weight optional | Provisional body-shape silhouette |
| 02 | Natural Colouring | Skin tone, undertone, eye colour, hair colour | Seasonal colour palette |
| 03 | Avatar & Profile | Derived from steps 01 and 02 | Personalised avatar and current style profile |

The output of the three steps is a single "style DNA" used to drive every downstream recommendation.

---

## 2. Feature 01 — Body Composition Analysis

Users provide five required measurements and may add weight. The current deterministic heuristic classifies bust, waist, hips, and shoulder-to-shoulder width into one of five body-shape archetypes. Height and optional weight are stored in the profile but do not affect that classification.

### Inputs
- Height — required profile measurement; not used by the current classifier
- Weight — optional; not used by the current classifier
- Bust — required circumference
- Waist — required circumference
- Hips — required circumference
- Shoulder width — required straight-line distance from one shoulder point to the other

The 5% / 0.75 / 0.95 ratios and 2.25 shoulder-width conversion are provisional product heuristics, not population-calibrated health or anatomy claims. The UI presents the result as a styling silhouette, not a verdict.

### Body Shape Archetypes (5)

| Archetype | Description |
|-----------|-------------|
| Hourglass | Balanced proportions |
| Pear | Fuller hips |
| Apple | Fuller waist |
| Rectangle | Uniform silhouette |
| Inverted Triangle | Broader shoulders |

---

## 3. Feature 02 — Seasonal Colour Profiling

The user explicitly selects from fixed natural-colouring options. The system maps the four selections to one of four colour seasons.

### Inputs
- Skin tone — 8 options
- Undertone — 4 options
- Eye colour — 6 options
- Hair colour — 8 options

Optional photo suggestions are experimental and uncalibrated. Manual swatches remain canonical; every suggestion must be reviewed, and server fallback requires explicit consent.

### Colour Seasons (4)

| Season | Key Tones | Description |
|--------|-----------|-------------|
| Warm Spring | Golden · Peachy · Coral | Radiates warmth. Golden, peachy and earthy tones. |
| Warm Autumn | Rust · Olive · Camel | Deep, rich and earthy. Burnt orange makes the user glow. |
| Cool Summer | Lavender · Dusty Rose · Blue | Soft and muted tones are the strongest allies. |
| Cool Winter | Jewel Tones · White · Black | Bold, high-contrast looks. |

Each season exposes a curated colour palette (visualised as colour swatches in the UI) used to filter recommendations and theme the avatar.

---

## 4. Feature 03 — Personal Style Avatar

An abstract SVG avatar is generated from the user's body-shape silhouette and colour season. Recommendation cards show the avatar as a profile reference; the MVP does not render garments onto the figure or claim virtual try-on.

### Avatar Requirements
- **Shape-linked silhouette** — geometry derived from the current body-shape archetype.
- **Season-matched colour palette** — fills and accents pulled from the user's colour season.
- **Animated pulse indicator** — visual confirmation that the avatar is linked to the active profile.
- **Updates with every analysis** — re-analysis replaces the current profile and increments its analysis version.

### Display Metadata
The avatar surface displays the user's current Body Shape (e.g. *Hourglass*) and Colour Season (e.g. *Warm Spring*) alongside a swatch row of the season's signature colours.

---

## 5. Feature 04 — Weekly Curated Recommendations

Each weekly edit targets three distinct active products. Selection prioritises fresh products matching both body shape and colour season, then relaxes history, eligibility, and finally brand-diversity constraints when a catalogue pool is thin. The current curated catalogue keeps every strict shape/season bucket above the three-product requirement.

### Card Structure (per product)
- Product image, brand, title, price, garment category, and price tier
- Small avatar overlay as a silhouette/palette reference
- One direct HTTPS link to the retailer product page

The MVP has no garment-concept equivalence layer, multi-brand offers, price tracking, sale alerts, affiliate redirect, or commission attribution. The curated catalogue is maintained directly in StyleSoul; live ingestion and affiliate partnerships require separate approval.

---

## 6. Feature 05 — Immersive Analysis Experience

After data entry, the app runs a cinematic loading sequence so the analysis feels premium and ceremonial rather than transactional.

### Sequence (screen: "Building your style profile")
1. ✓ Calculating body proportions…
2. ✓ Mapping colour season…
3. ✓ Generating avatar…
4. *Curating silhouettes…* (in-progress state)
5. Building your style profile… (queued state)

An ordered status list moves each step from pending to active to complete before the profile page opens.

---

## 7. Deferred — Shop with Friends

Sharing, voting, discount alerts, wishlists, gift ideas, and preference tracking are post-MVP capabilities. They are not exposed in the current web app and must not be described as available.

---

## 8. Access, Monetisation & Data Handling

- **Current access:** Authenticated web MVP, available for testing without charge.
- **Payments:** Pricing, trials, subscriptions, checkout, customer portal, and payment-provider selection are deferred pending explicit approval.
- **Retail links:** Direct HTTPS links only. Affiliate partnerships and tracking are not active.
- **Profile data:** Authentication and profile/catalogue data use Supabase infrastructure. Hosting and database providers act as processors as described on the legal page.
- **Photo data:** On-device analysis is preferred. With explicit consent, an in-memory downscaled pixel buffer may be processed by the StyleSoul server fallback and is discarded after the request; original photos and pixel buffers are not persisted.

### Current User Benefits
- Body measurement and provisional silhouette analysis
- Manual seasonal colour profiling with explicit undertone
- Optional experimental photo suggestions with manual review
- Personalised abstract avatar
- Stable three-product weekly edit with direct retailer links

---

## 9. Visual & Brand Direction

Derived from the deck's design language:

- **Palette:** Deep near-black backgrounds (warm-charcoal), cream/ivory primary text, muted gold/tan accent for highlights and CTAs.
- **Typography:** High-contrast serif for display ("StyleSoul", section titles), clean sans-serif for body and UI labels, wide-tracked uppercase letter-spacing for section eyebrows ("FEATURE 01", "OVERVIEW").
- **Motifs:** Soft circular gradient orbs in the background; thin gold dividers; circular numbered badges for steps; pill-style boxes for input fields.
- **Tone:** Premium, ceremonial, confidence-building — the analysis is positioned as a ritual, not a form-fill.

---

## 10. Resolved Scope & Deferred Decisions

1. **Measurements** — height, bust, waist, hips, and shoulder width are required; weight is optional. Bust, waist, and hips are circumferences; shoulder width is a straight-line distance. The classifier converts shoulder width to a provisional comparable scale before applying the shoulder-dominance rule.
2. **Recommendation sourcing** — the MVP uses a hand-curated catalogue and deterministic weekly selection.
3. **Monetisation** — pricing, trials, subscriptions, provider choice, and affiliate partnerships require explicit post-MVP approval.
4. **Sale alerts and social shopping** — alerts, sharing, voting, wishlists, and preference tracking are post-MVP.
5. **Re-analysis** — users may re-run analysis; the current profile is replaced and its version increments. Profile history is deferred.
6. **Platform** — supported responsive web is in scope; native mobile UI and low-end native optimisation are post-MVP.
7. **Catalogue links** — current cards use one direct retailer link per product. Multi-brand equivalents and live ingestion are deferred.
8. **Size range** — catalogue items are not filtered by a declared size range in the MVP; add size eligibility only with verified retailer data.

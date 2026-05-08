# StyleSoul — Product Specification

**Tagline:** Your Personal Style Intelligence
**Pricing:** £9.99 / month (Free Trial available)
**Positioning:** A lifelong fashion compass, built around the individual user.
**Target audience (v1):** Womenswear. Avatar geometry, body shape archetypes, colour seasons, and the curated edit are all designed for women. Menswear / unisex are out of scope for now.

StyleSoul builds a complete, personalised style profile from body measurements and natural colouring, then delivers an avatar, a curated weekly shopping edit, and social shopping tools.

---

## 1. Product Overview

StyleSoul produces a personalised style profile in three steps:

| Step | Name | Inputs | Output |
|------|------|--------|--------|
| 01 | Body Composition | Height, bust, waist, hips, shoulders | Body shape archetype |
| 02 | Natural Colouring | Skin tone, eye colour, hair colour | Seasonal colour palette |
| 03 | Avatar & Profile | (Derived from steps 01 & 02) | Personalised avatar + complete style DNA (shape, season, silhouette guide) |

The output of the three steps is a single "style DNA" used to drive every downstream recommendation.

---

## 2. Feature 01 — Body Composition Analysis

Users input six measurements; an algorithm classifies them into one of five body shape archetypes. This forms the foundation of the style profile.

### Inputs (6 measurements)
- Height
- Weight
- Bust
- Waist
- Hips
- Shoulders

> Note: The intro deck mentions "six measurements" but the "How It Works" overview lists five (omitting weight). Treat all six as inputs; weight is captured but the archetype classification is driven primarily by the bust/waist/hips/shoulders ratio plus height.

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

User selects from a fixed set of natural colouring options; the system maps them to one of four colour seasons, each with its own personalised palette.

### Inputs
- Skin tone — 8 options
- Eye colour — 6 options
- Hair colour — 8 options

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

A unique SVG avatar is generated from the user's body shape and colour season. Every recommendation surfaced by the product is rendered on the user's avatar first, so the user sees clothing on a figure that matches their own shape and palette.

### Avatar Requirements
- **Shape-accurate silhouette** — geometry derived from the body shape archetype.
- **Season-matched colour palette** — fills/accents pulled from the user's colour season.
- **Animated pulse indicator** — visual confirmation the avatar is "live" / linked to the active profile.
- **Updates with every new analysis** — re-runs of body or colour analysis regenerate the avatar.

### Display Metadata
The avatar surface displays the user's current Body Shape (e.g. *Hourglass*) and Colour Season (e.g. *Warm Spring*) alongside a swatch row of the season's signature colours.

---

## 5. Feature 04 — Weekly Curated Recommendations

Each week the user receives three hand-picked items matched to their body shape and colour season. Each item is offered across multiple brands at multiple price points, with one-tap sale tracking per brand.

### Card Structure (per item)
- **Item name** (e.g. Wrap Midi Dress)
- **Colour + occasion tags** (e.g. Sage Green · Work & Weekends)
- **Brand list** — multiple brands with prices, ordered by price; the highlighted brand is the primary recommendation

### Example Edit (from deck)

| Item | Colour · Occasion | Brand Options |
|------|-------------------|---------------|
| Wrap Midi Dress | Sage Green · Work & Weekends | & Other Stories £89 (primary) · Reformation £178 · ASOS £42 |
| Wide-Leg Trousers | Warm Camel · Office & Evenings | Massimo Dutti £79 (primary) · Zara £49 · M&S £35 |
| Fitted Blazer | Dusty Rose · Formal & Smart Casual | COS £145 (primary) · Reiss £195 · River Island £65 |

### Sale Alerts
Tapping any brand entry activates a sale alert for that item at that brand. Members are notified the moment prices drop.

---

## 6. Feature 05 — Immersive Analysis Experience

After data entry, the app runs a cinematic loading sequence so the analysis feels premium and ceremonial rather than transactional.

### Sequence (header: "Crafting Your Style Profile")
1. ✓ Calculating body proportions…
2. ✓ Mapping colour season…
3. ✓ Generating avatar…
4. *Curating silhouettes…* (in-progress state)
5. Building your style profile… (queued state)

A horizontal progress bar tracks overall completion. Each step transitions from queued → in-progress (italic with active marker) → complete (✓).

---

## 7. Feature 06 — Shop with Friends Experience

Users can share their recommendations with friends to gather opinions before buying.

### Capabilities ("Is it a Yes?" panel)
- Share recommendations with friends
- Receive thumbs up / thumbs down votes from friends
- Set discount alerts on shared items
- Create a wishlist that doubles as a gift-ideas list (in-progress state in deck)
- Track style preferences over time (queued state in deck)

The last two items are presented as upcoming/in-progress capabilities in the same visual style as Feature 05's sequence.

---

## 8. Membership & Pricing

- **Plan:** Single tier — £9.99 / month
- **Trial:** Free trial available before the first charge
- **Privacy commitment:** User data is private and never shared

### Member Benefits Recap (from "Join StyleSoul")
- Body composition & silhouette analysis
- Seasonal colour profiling (4 archetypes)
- Personalised style avatar
- Weekly curated shopping edit
- Sale alerts for tracked brands
- Immersive analysis experience

---

## 9. Visual & Brand Direction

Derived from the deck's design language:

- **Palette:** Deep near-black backgrounds (warm-charcoal), cream/ivory primary text, muted gold/tan accent for highlights and CTAs.
- **Typography:** High-contrast serif for display ("StyleSoul", section titles), clean sans-serif for body and UI labels, wide-tracked uppercase letter-spacing for section eyebrows ("FEATURE 01", "OVERVIEW").
- **Motifs:** Soft circular gradient orbs in the background; thin gold dividers; circular numbered badges for steps; pill-style boxes for input fields.
- **Tone:** Premium, ceremonial, confidence-building — the analysis is positioned as a ritual, not a form-fill.

---

## 10. Open Questions / To Confirm

1. **Six vs five measurements** — confirm whether weight is a required input or only used for refinement; the overview slide lists five inputs, the feature detail lists six.
2. **Recommendation sourcing** — whether weekly edits are human-curated, algorithmically generated, or hybrid.
3. **Sale alert mechanism** — push, email, or in-app only; latency target after a price drop.
4. **Friend sharing surface** — whether shares are link-based (works for non-members) or require both parties to be StyleSoul members.
5. **Wishlist & preference tracking** — these are shown as in-progress in the deck; confirm scope for v1 launch vs follow-up.
6. **Re-analysis cadence** — how often users can re-run body/colour analysis and whether prior profiles are versioned.
7. **Size range** — confirm the size range supported within the womenswear scope (e.g. UK 4–24, petite/tall variants).

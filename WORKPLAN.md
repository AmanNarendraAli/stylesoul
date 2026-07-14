# StyleSoul — MVP Workplan

This is the build plan for shipping a paid v1 of StyleSoul. It's opinionated — every choice is meant to minimise time-to-validation while leaving room to grow into the v1.1 roadmap (sale alerts, shop-with-friends, wishlist).

**MVP success criteria:** A user can sign up, complete the 3-step analysis, see their avatar, view this week's curated edit, and pay £9.99/month after the trial.

---

## 1. Stack at a Glance

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend framework | **Next.js 15 (App Router) + React 19** | One framework for marketing pages, app, and API. Server Components for SEO on the landing page. |
| Language | **TypeScript** (strict) | Tight types across forms, API, and the body-shape/season classifiers. |
| Styling | **Tailwind CSS** + **shadcn/ui** | Dark/cream/gold aesthetic is trivial to express in Tailwind. shadcn for forms, dialogs, toasts. |
| Animation | **Framer Motion** | The "cinematic loading" sequence and avatar pulse animation. |
| Forms | **React Hook Form** + **Zod** | Multi-step onboarding with shared schema between client validation and server enforcement. |
| Auth + DB + Storage | **Supabase** | Postgres, auth, and image storage in one. Cheaper than Clerk + Neon + S3 at MVP scale. |
| ORM | **Prisma** | Pointed at Supabase Postgres. Migrations are gentler than Supabase's SQL-only flow. |
| Payments | **Stripe** (Subscriptions + Customer Portal) | Free trial → £9.99/month. Use Checkout for v1, embedded later. |
| Image analysis | **MediaPipe Tasks (Face Landmarker)** in-browser, with a server fallback via **Cloud Vision API** | Run client-side first for privacy and cost; server-side only when the user opts in or the client model fails. |
| Hosting | **Vercel** (frontend + API routes) + **Supabase** (db/storage/auth) | Zero-ops for MVP. |
| Email | **Resend** | Transactional emails (welcome, weekly edit, trial-ending). |
| Analytics | _Deferred to post-MVP_ | Funnels and engagement tracking added once traffic justifies the data. Pre-launch we rely on direct user feedback. |
| Error tracking | _Deferred until beta_ (Sentry or similar) | Pre-beta, errors visible in dev console / Vercel logs are sufficient. Add before any non-dev tester touches the app. |

**Deliberately deferred (but planned):** a native mobile app — see [§8 Mobile App](#8-mobile-app-post-mvp). Real-time features, server-side ML training, microservices are deferred indefinitely.

**Choices made now to make the mobile app cheap later:**
- Business logic lives in `lib/` as pure TypeScript functions with **no DOM, no Next.js, no browser globals**. The body-shape classifier, colour-season mapper, ΔE preset matcher, and recommendation picker must all be importable from React Native unchanged.
- The web app talks to its own backend over HTTP/JSON only — no direct Prisma calls from React Server Components in routes the mobile app will mirror. This keeps a single API surface.
- Auth uses **Supabase**, which has a first-class React Native SDK. No swapping providers later.
- Image capture is abstracted behind a `<PhotoSource>` component on web (file input). On mobile this becomes the native camera — same downstream pipeline.

---

## 2. Repository Layout

A single Next.js app, no monorepo for MVP.

```
stylesoul/
  app/
    (marketing)/        # Landing, pricing, legal — public
    (app)/              # Authed app — onboarding, profile, edit
      onboarding/
        body/
        colouring/
        analysing/      # The cinematic loading screen
      profile/
      edit/             # Weekly curated recommendations
      account/
    api/
      stripe/webhook/
      analysis/         # Server-side colour detection fallback
      recs/weekly/      # Returns this week's edit
  components/
    avatar/             # Parametric SVG avatar
    onboarding/
    edit/
    ui/                 # shadcn primitives
  lib/
    body-shape/         # Archetype classifier
    colour-season/      # Skin+eye+hair → season mapper
    colour-detection/   # MediaPipe pipeline + colour quantisation
    recommendations/    # Bucketed catalogue lookup
    db/                 # Prisma client
    stripe/
  prisma/
    schema.prisma
  public/
    brand/              # Static marketing/brand assets only
```

---

## 3. Data Model (Prisma sketch)

```prisma
model User {
  id              String   @id @default(cuid())
  email           String   @unique
  stripeCustomerId String? @unique
  subscription    Subscription?
  profile         StyleProfile?
  createdAt       DateTime @default(now())
}

model Subscription {
  id                String   @id @default(cuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id])
  stripeSubId       String   @unique
  status            String   // trialing, active, past_due, canceled
  currentPeriodEnd  DateTime
}

model StyleProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])

  // Body composition
  heightCm        Int
  weightKg        Int?
  bustCm          Int
  waistCm         Int
  hipsCm          Int
  shouldersCm     Int
  bodyShape       String   // hourglass | pear | apple | rectangle | inverted_triangle

  // Colouring
  skinTone        String   // one of 8 enum values
  undertone       String   // cool | neutral | warm | olive
  eyeColour       String   // one of 6
  hairColour      String   // one of 8
  colourSeason    String   // warm_spring | warm_autumn | cool_summer | cool_winter
  detectionSource String   // photo | manual | photo_corrected

  analysisVersion Int      @default(1)
  updatedAt       DateTime @updatedAt
  createdAt       DateTime @default(now())
}

model Product {
  id              String    @id @default(cuid())
  brand           String
  title           String
  description     String?
  imageUrl        String
  productUrl      String    // affiliate-wrapped where possible
  isAffiliate     Boolean   @default(false)
  priceCents      Int
  currency        String    @default("GBP")
  status          String    @default("active") // active | inactive

  eligibleShapes  String[]
  eligibleSeasons String[]
  garmentCategory String
  occasionTags    String[]
  priceTier       String    // entry | mid | premium

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model WeeklyEdit {
  id              String   @id @default(cuid())
  userId          String
  weekStart       DateTime // Monday 00:00 UTC
  productIds      String[] // 3 product IDs
  createdAt       DateTime @default(now())
  @@unique([userId, weekStart])
}
```

The MVP catalogue lives in Postgres from day one and is edited through the admin UI. No JSON catalogue for v1; live ingestion later writes into the same `Product` table.

---

## 4. Key Architectural Decisions

### 4.1 Photo-driven colour detection (with manual fallback)

**Decision:** Run MediaPipe Face Landmarker in the browser on the uploaded photo. Sample pixel regions defined by the landmark mesh. Cluster colours, map to nearest preset option. Always show the result for the user to confirm or override.

**Pipeline:**
1. User uploads / takes a photo.
2. Browser loads MediaPipe Face Landmarker WASM (~10 MB; cache aggressively).
3. Detect a single face. If 0 or >1, fall back to manual.
4. For each region (skin = cheek triangles, eye = iris landmarks, hair = above-forehead bbox), sample pixels from the source image.
5. Convert to CIE Lab space; run k-means (k=2 or 3) to find the dominant colour while ignoring shadows/highlights.
6. Map the dominant Lab colour to the **closest** preset (8 skin / 6 eye / 8 hair) by ΔE distance, then derive a lower-confidence undertone pre-fill from the skin match.
7. Show the user the detected values pre-filled on the manual selection screen — they can confirm or change any of them before continuing.

**Why client-side first:**
- Privacy — the photo never has to leave the device.
- Cost — no per-request inference fee.
- Latency — feels part of the cinematic experience, not a server round-trip.

**Server fallback (Cloud Vision):** if the client model fails (old browser, no WASM, low-light image), POST the photo to `/api/analysis/colour` which runs the same logic server-side. Photo is processed in memory and not persisted unless the user opts in.

**Always-manual path:** the manual selection screen is the canonical UI. Photo upload is positioned as "Save time — let us pre-fill these from a photo" and the user can skip it entirely.

**Refinement to-dos:**
- Calibrate ΔE thresholds against a labelled dataset (start with ~50 self-identified samples per skin tone).
- Decide colour space: Lab is more perceptual but the presets may be defined in sRGB hex — convert once, store both.
- Lighting normalisation: white-balance estimate from the sclera (white of the eye) before sampling skin.
- Add a quality gate ("photo too dark / face too small") rather than returning a low-confidence guess.

### 4.2 Body shape classification

**Decision:** Pure deterministic ratio rules — no ML. Five archetypes, well-defined ratios. Document the thresholds in code with citations to the styling literature we adopt.

```ts
// lib/body-shape/classify.ts
function classify({ bust, waist, hips, shoulders }: Measurements): BodyShape {
  const bustHips = bust / hips
  const waistHips = waist / hips
  const shoulderHips = shoulders / hips
  // thresholds tuned against a calibration set
  if (Math.abs(bustHips - 1) < 0.05 && waistHips < 0.75) return 'hourglass'
  if (hips > bust * 1.05) return 'pear'
  if (waist > bust * 0.95) return 'apple'
  if (shoulders > hips * 1.05) return 'inverted_triangle'
  return 'rectangle'
}
```

These thresholds are placeholders — they need calibration against a labelled set before launch. A unit-test suite of "known" cases (e.g. canonical hourglass = 90/65/90) protects future tuning from regressions.

### 4.3 Colour season mapping

**Decision:** Lookup table over (skin_tone, undertone, eye_colour, hair_colour) → season, with `undertone` (warm/cool/neutral/olive) and `value` (light/dark) as the discriminators.

There are 8 × 4 × 6 × 8 = 1,536 combinations. We don't need to enumerate all of them — take explicit undertone first, use skin + hair + eyes to resolve neutral/olive edge cases, derive value/contrast from hair vs skin, then map to one of the 4 seasons. This logic lives in `lib/colour-season/map.ts` and is a pure function that's trivially unit-testable.

### 4.4 Avatar — parametric React SVG

**Decision:** A single React component, `<Avatar shape={...} season={...} />`, that renders an SVG with shape-driven proportions and season-driven fills. No avatar service, no image generation API.

- Body geometry: 5 sets of `<rect>`/`<path>` width/height ratios, one per archetype.
- Palette: each season exports an array of hex codes; the avatar consumes the first 4 (skin, top, bottom, accent).
- Pulse: a Framer Motion `animate` loop on a `<circle>` opacity behind the figure.

Renders identically on the profile page, the recommendation cards (small), and the share image (large).

### 4.5 Weekly recommendations — hand-curated catalogue (MVP)

**Decision:** Ship the MVP with a hand-curated catalogue of ~150 items stored in Postgres and edited via a small admin UI. The weekly edit is a database query against this hand-tagged set. Live affiliate-feed ingestion + auto-tagging is explicitly **post-MVP** — see §7. The argument for living-data won the principle but lost the timeline trade: shipping the static version validates the core thesis (do users want body-shape × colour-season × weekly edit?) two weeks earlier, and the upgrade path is a single adapter away.

**Why DB-backed and not a JSON file in the repo:**
- Adding live ingestion later is a small adapter that writes to the same `Product` table — no schema migration, no rewrite of the weekly-edit query.
- Edits don't require a deploy.
- The same schema supports the v1.1 sale-alerts feature once we add `PriceHistory` snapshots.

**Pipeline (MVP):**

1. **Curate** — manually find items on retailer sites, paste URL/title/price/image into the admin UI. Tag eligible shapes, seasons, garment category, occasion, and price tier inline.
2. **Approve** — items have `status: active|inactive`. Inactive ones are still in the DB but not eligible for recommendations.
3. **Affiliate-wrap** — for brands you have an affiliate relationship with, store the affiliate URL in `productUrl`. Otherwise, store the direct brand URL. The recommendation card shows the disclosure component only for affiliate-wrapped items.
4. **Recommend** — per user, per week, the same DB query as the live-data plan, just operating on a hand-curated set:
   ```sql
   SELECT * FROM products
   WHERE status = 'active'
     AND $userShape = ANY(eligible_shapes)
     AND $userSeason = ANY(eligible_seasons)
     AND id NOT IN (SELECT product_id FROM weekly_edit_items
                    WHERE user_id = $userId AND created_at > NOW() - INTERVAL '8 weeks')
   ORDER BY random_seeded($userId, $weekStart)
   LIMIT 3;
   ```
5. **Cache** — write the chosen 3 items into `WeeklyEdit` so the user sees the same edit all week.

**Schema (Prisma sketch):**

```prisma
model Product {
  id              String    @id @default(cuid())
  brand           String
  title           String
  description     String?
  imageUrl        String
  productUrl      String    // affiliate-wrapped where possible
  isAffiliate     Boolean   @default(false)
  priceCents      Int
  currency        String    @default("GBP")
  status          String    @default("active") // active | inactive

  // Hand-tagged
  eligibleShapes  String[]
  eligibleSeasons String[]
  garmentCategory String    // dress, blazer, trousers, ...
  occasionTags    String[]  // work, weekend, formal, ...
  priceTier       String    // entry | mid | premium

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model WeeklyEdit {
  id          String   @id @default(cuid())
  userId      String
  weekStart   DateTime
  productIds  String[] // 3 product IDs
  createdAt   DateTime @default(now())
  @@unique([userId, weekStart])
}
```

`PriceHistory` is intentionally omitted in MVP — it only matters once ingestion is automated.

**Catalogue target for launch:** ~150 items, distributed across the 5×4 = 20 (shape, season) buckets so no bucket has fewer than ~15 eligible items. This is roughly a week of focused curation work.

**Affiliate posture:**
- Apply for Skimlinks in week 0 — still on; revenue upside, no longer load-bearing.
- For brands without an affiliate link, just link out to the brand site directly. The user paid £9.99/mo; affiliate revenue is upside, not the business.

**Refinement to-dos:**

- **Curation rota** — decide who refreshes the catalogue weekly post-launch and how many new items per week. Likely 10–20 new items / week to keep the edit feeling alive.
- **Price-tier diversity** — the deck shows 3 brands per item across price tiers. Decide between (a) 3 distinct items varying in price, or (b) 1 archetypal "garment template" shown across 3 brand price points. (b) is a bigger schema lift — defer that call until the static catalogue is live.
- **Brand diversity** — ranker rule: no more than one item from the same brand per weekly edit.
- **Coverage tracking** — show per-bucket count in the admin UI so thin buckets are obvious.
- **Affiliate compliance** — per-item disclosure component required for any affiliate-wrapped item; legal copy review before launch.

### 4.6 The cinematic loading sequence

**Decision:** It runs over real work, not as theatre. The five steps map to actual computations:
1. "Calculating body proportions" → run the classifier (instant, but await a 600 ms minimum).
2. "Mapping colour season" → run the colour mapper.
3. "Generating avatar" → preload the SVG component and any imagery.
4. "Curating silhouettes" → fetch this week's edit.
5. "Building your style profile" → write to DB and redirect.

Each step has a minimum visible duration so the cinematic feel is preserved even when the work is sub-millisecond. Implemented with `Promise.all([work, minDelay(800)])`.

### 4.7 Subscription gating

**Decision:** Trial-then-paid via Stripe. The free trial gates on **time, not features** — every user gets the full product for 7 days, then the paywall appears.

- Stripe Checkout in `subscription_mode` with `trial_period_days: 7` and a payment method required upfront.
- Webhook on `customer.subscription.updated` writes status to the `Subscription` row.
- Middleware on `app/(app)/*` routes blocks if `status not in ('trialing','active')`.

### 4.8 Security and privacy baseline

**Decision:** Security work is part of MVP, not a launch-week afterthought. The app stores body measurements, style-profile data, subscription state, and may process photos, so the default is least privilege and minimal retention.

- **Supabase RLS:** enable row-level security for user-owned tables (`StyleProfile`, `Subscription`, `WeeklyEdit`) and enforce `userId = auth.uid()` wherever the client SDK can read/write.
- **Server-side entitlement checks:** API routes that return profile, weekly edit, or account data check the authenticated user and active/trialing subscription server-side. Middleware is UX gating, not the only control.
- **Admin access:** admin catalogue routes require an explicit admin role/claim. Product create/edit/deactivate actions are logged with the acting user.
- **Stripe webhooks:** verify webhook signatures, handle events idempotently, tolerate duplicate/out-of-order events, and never trust client-submitted subscription status.
- **Photo processing:** require explicit consent before server fallback, enforce file size/type limits, strip metadata where possible, avoid persisting photos by default, and ensure image payloads/URLs are not logged.
- **Observability redaction:** when error tracking and analytics are added (post-MVP / beta), configure them to avoid capturing photos, measurements, raw profile fields, full emails, Stripe IDs, or auth tokens.
- **Affiliate URLs:** validate admin-entered `productUrl` and `imageUrl` as HTTPS URLs; server-side image fetching for future ingestion must block private IP ranges, redirects to private networks, oversized files, and unexpected content types.

---

## 5. Build Order

Roughly 6 phases. Each phase produces something testable end-to-end.

### Phase 0 — Foundations (week 1)
- [ ] Apply for Skimlinks (Sovrn) — runs in parallel, not on the critical path. Awin as backup.
- [x] Next.js + TS + Tailwind + shadcn-style UI primitives scaffold
- [x] Prisma schema + initial migration file
- [x] Supabase project + environment variables (initial migration applied 2026-05-08)
- [x] Auth UI/routes scaffolded for email magic link via Supabase
- [x] Verify magic-link auth against the real Supabase project (verified 2026-05-08)
- [x] Marketing landing page shell using the deck's copy & visual direction
- [x] CI: GitHub Actions running typecheck + tests + Prisma generate

### Phase 1 — Manual onboarding (week 2)
- [x] Body composition form (6 fields, RHF + Zod) (completed 2026-05-14)
- [x] Backend body measurement validation schema (6 fields, Zod) (completed 2026-05-14)
- [x] Body shape classifier with unit tests (completed 2026-05-14)
- [x] Manual colouring form (8 / 6 / 8 selectors as visual swatch grids) (completed 2026-05-14)
- [x] Backend colouring options + validation schema (8 / 6 / 8 selectors, Zod) (completed 2026-05-14)
- [x] Colour season mapper with unit tests (completed 2026-05-14)
- [x] Cinematic loading screen wired to real work (completed 2026-05-14)
- [x] Backend style-profile derivation + authenticated create/update/read API (`/api/profile`) (completed 2026-05-14)
- [x] Profile page rendering avatar + shape + season (completed 2026-05-14)

### Phase 2 — Photo detection (week 3)
- [x] MediaPipe Face Landmarker integration (client, lazy-loaded; completed 2026-05-21)
- [x] Region-sampling + Lab clustering pipeline (`lib/colour-detection`, pure/unit-tested; completed 2026-05-21)
- [x] ΔE-based mapping to preset options, including explicit undertone pre-fill (CIEDE2000; completed 2026-05-22)
- [x] Pre-fill manual screen with detected values + "we detected these — change anything?" UX (completed 2026-05-21)
- [x] ~~Cloud Vision~~ **self-hosted** server fallback route (`/api/analysis`; decision changed — see note below; completed 2026-05-21)
- [x] Quality gate (face count, brightness, size) (completed 2026-05-21)
- [~] Calibration harness scaffolded (`/calibration`, `npm run calibrate`); Hugging Face bootstrap import/predict workflow added and run 2026-05-22 (247 proxy-labelled samples). **Production threshold tuning still deferred pending self-identified 50+ labelled samples per skin tone.**

> **Fallback decision (2026-05-21):** The server fallback uses the **same self-hosted Lab/ΔE pipeline**, not Cloud Vision. The client always decodes/downscales the photo locally (canvas is universal); only when in-browser landmarking is unavailable does it POST a small RGBA buffer to `/api/analysis`, which runs heuristic-region detection with no external vision API. This avoids a paid GCP dependency and aligns with the open-source-first preference. The §4.1 Cloud Vision reference is superseded.

### Phase 3 — Catalogue + recommendations (week 4)
- [ ] `Product`, `WeeklyEdit` schema + migration
- [ ] Admin UI (Next.js route gated to admin users): create/edit products, multi-select tag fields, per-bucket coverage indicator
- [ ] Weekly edit query + caching into `WeeklyEdit`
- [ ] Recommendation cards + avatar-overlay rendering
- [ ] Affiliate disclosure component (only shown when `isAffiliate = true`)
- [ ] Hand-curate first 60-80 items so the recommendation flow can be tested before full catalogue completion

### Phase 4 — Monetisation + security hardening (week 5)
- [ ] Stripe Checkout + webhook + customer portal
- [ ] Trial countdown UI + paywall middleware
- [ ] Weekly edit email via Resend (Sunday morning UTC)
- [ ] Supabase RLS policies for user-owned tables
- [ ] Server-side entitlement checks on protected API routes
- [ ] Admin role enforcement + catalogue action audit log
- [ ] Stripe webhook signature verification + idempotency handling
- [ ] Photo upload consent, size/type limits, and no-photo-logging checks
- [ ] Observability redaction rules (deferred — applies once error tracking is re-introduced for beta)

### Phase 5 — Catalogue curation + pre-launch hardening (week 6)
- [ ] Hand-curate ~150 items across the 20 (shape, season) buckets, no bucket below ~15 items
- [ ] Mobile polish (phone-first product)
- [ ] Accessibility pass (forms, swatch grids, colour-only signifiers)
- [ ] Privacy policy + terms — explicit photo-handling and affiliate disclosure language
- [ ] Legal: GDPR data export + delete endpoints
- [ ] Load testing the photo pipeline on low-end Android
- [ ] Analytics funnels: signup → analysis-complete → first-rec-view → checkout

**Total: ~6 weeks of focused single-developer time.** Add 1-2 weeks of buffer for photo-detection quality, design polish, and catalogue curation. If schedule pressure is high, ship manual colouring first and move Phase 2 photo detection to the first post-launch iteration. Live ingestion (Shopify, Skimlinks, etc.) becomes a v1.1 workstream — see §7.

---

## 6. Open Refinement Points

These are decisions deferred to data, not avoided.

1. **Trial length** — 7 days vs 14 vs "until first weekly edit." Test post-launch.
2. **Photo storage** — by default the photo is processed in-memory and discarded. Should we offer "save to improve future detection"? GDPR implications either way.
3. **Catalogue coverage by bucket** — with hand curation, thin buckets need active filling. The admin UI surfaces per-bucket counts; weekly curation rota tops up the thinnest first. Once any bucket has <10 active items, that's the trigger to invest in live ingestion.
4. **Re-analysis** — should a user be able to re-run analysis any time, or only every 30 days? Premium products usually rate-limit to feel substantive.
5. **Affiliate partner choice** — Skimlinks (broad, easy) vs direct programs (better commission). Start with Skimlinks; migrate big-traffic brands to direct as volume grows.
6. **Cinematic timing** — 5 steps × ~800 ms = 4 seconds. Long enough to feel ceremonial, short enough not to frustrate. Measure abandonment.
7. **Avatar fidelity** — the deck shows a deliberately abstract figure. Confirm we're not chasing realism — the abstraction is part of the brand.
8. **Skin-tone preset count** — 8 may be too coarse for accurate detection. Consider expanding to a Monk Skin Tone Scale (10) once we have detection data.

---

## 7. v1.1 Roadmap (Out of MVP Scope)

Listed so the MVP architecture leaves room.

- **Live catalogue ingestion** — the most important v1.1 workstream. Pluggable `IngestionSource` adapters writing to the same `Product` table: Shopify storefront APIs (`/products.json`) on ~30 indie womenswear brands, then Skimlinks once approved, then direct Awin programs for named brands. Adds an LLM auto-tagger (open-source VLM via Together / Fireworks) behind a `Tagger` interface and a review queue that gates auto-tagged items into the `active` set. Rough scope: 2 weeks. Trigger: any (shape, season) bucket falls below 10 active items, or curation overhead exceeds ~2 hours/week.
- **Sale alerts** — once live ingestion exists, snapshot price into a new `PriceHistory` table on each ingest. A daily diff job fans out push/email when a watched product drops below a threshold.
- **Shop with Friends** — share link generates a public read-only view of a recommendation; friends thumbs-up/down via a lightweight unauthed form. Notifications via email or push.
- **Wishlist / gift ideas** — adds a `Wishlist` model and a public gift-list URL.
- **Style preference tracking** — log thumbs-up/down on weekly edits, feed into ranking. Eventually replace deterministic catalogue filter with a learned ranker.

---

## 8. Mobile App (Post-MVP)

Ships after the web MVP is paying. The mobile app is the long-term primary surface — fashion is a phone-first behaviour, the camera is dramatically better than browser uploads, and push notifications make sale alerts work properly.

### 8.1 Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **React Native + Expo (managed)** | Maximum code reuse with the web app's TypeScript logic. Expo Router mirrors Next.js App Router, so screen structure ports easily. |
| Language | **TypeScript** (same `lib/` as web) | Body-shape, colour-season, recommendation logic is shared verbatim. |
| Navigation | **Expo Router** | File-based, familiar to anyone on the web side. |
| Camera | **expo-camera** + **expo-image-picker** | Native camera with proper exposure control beats anything we can do on the web. |
| On-device ML | **react-native-fast-tflite** (or ONNX Runtime React Native) | Run the same face landmark + colour pipeline on-device. No server round-trip, works offline. |
| State / data | **TanStack Query** + Supabase JS SDK (RN-compatible) | Same data layer as web. |
| Styling | **NativeWind** (Tailwind for RN) | Reuse the design tokens, mostly. Some RN-specific work for layout. |
| Payments | **RevenueCat** wrapping App Store / Play Billing | Apple and Google take their 30%/15% on subscriptions; we can't legally bypass it for digital goods. RevenueCat reconciles iOS/Android receipts back to the same Stripe customer. |
| Push | **Expo Notifications** | One API for APNs + FCM. Critical for sale alerts and weekly edit drops. |
| Build / release | **EAS Build + EAS Submit** | OTA updates for JS-only changes via EAS Update. |

**Not React Native CLI / bare workflow:** Expo managed gets us to the App Store in weeks, not months. We adopt bare only if a native dependency forces it.

**Not Flutter:** would mean rewriting all the TypeScript logic in Dart. The cross-platform code reuse is the entire point.

### 8.2 Repo Restructure (when mobile work begins)

Convert the single Next.js repo into a **pnpm workspace monorepo** at the start of mobile work, not before:

```
stylesoul/
  apps/
    web/          # the existing Next.js app, moved here
    mobile/       # new Expo app
  packages/
    core/         # the existing lib/ — body shape, colour, recs, types
    ui-tokens/    # shared design tokens (colours, spacing, type scale)
```

Because we kept `lib/` browser-free in the MVP, this conversion is mostly file moves plus a `package.json` per workspace. No logic rewrites.

### 8.3 What Changes vs Web

- **Photo capture** is the camera, not a file picker. Live preview, autofocus, exposure lock on the face. Detection runs on the captured frame, not a streamed video feed (battery + UX).
- **On-device ML** uses TFLite/ONNX runtimes — we'll likely re-export the MediaPipe model to a TFLite-compatible format, or swap to a lighter face-landmark model that has first-class RN support.
- **Subscriptions** route through StoreKit / Play Billing via RevenueCat. The web Stripe subscription and the mobile IAP both create entitlements in RevenueCat; the user has one StyleSoul subscription regardless of where they signed up.
- **Push notifications** become the primary channel for weekly edits and sale alerts (email becomes secondary).
- **Deep links** — `stylesoul://edit/this-week`, `stylesoul://item/<slug>` — for share-with-friends, email links, and notification taps.

### 8.4 Mobile Build Order (rough, ~6 weeks)

- **Week 1** — Monorepo conversion. Expo app scaffold. Auth via Supabase RN SDK. Marketing splash + sign-in flow. Onboarding screens reusing `lib/` classifiers.
- **Week 2** — Native camera flow. Frame capture → preset matcher (port the web pipeline).
- **Week 3** — On-device face landmarker + colour detection working at usable quality. Manual fallback path mirrors web exactly.
- **Week 4** — Profile, avatar, weekly edit, recommendation cards. Same `<Avatar>` component re-rendered with `react-native-svg`.
- **Week 5** — RevenueCat + StoreKit + Play Billing. Subscription state synced back to our Postgres via RevenueCat webhook.
- **Week 6** — Push notifications, deep links, App Store / Play Store submission, beta via TestFlight + internal testing.

### 8.5 Refinement Points for Mobile

1. **iOS-first or both at once** — TestFlight is faster and the affluent fashion-app demographic skews iOS, but Android can't be a year behind. Realistically: ship both via Expo from day one, prioritise iOS polish.
2. **Apple's 30%** — eats hard into a £9.99/month plan. Consider a higher mobile-purchased price (£11.99) so post-fee revenue matches web, with web purchases unlocking mobile access at the lower price (legal under current Apple rules for "reader" apps; needs review).
3. **On-device model size** — bundling MediaPipe / TFLite models can balloon the binary past 50 MB. Use Expo's asset-on-demand mechanism so the model downloads on first open.
4. **Avatar parity** — `react-native-svg` supports nearly everything our web SVG does, but the pulse animation needs Reanimated rather than Framer Motion. One small fork in the codebase.
5. **Web → mobile handoff** — a user who signs up on web should get a clean magic-link sign-in on mobile. Test this end-to-end before launch.

---

## 9. Risks

| Risk | Mitigation |
|------|------------|
| Photo detection accuracy is mediocre | Manual selection is always available and pre-fills are clearly editable. Low-confidence detections fall through to manual. |
| 150-item catalogue feels thin | Track per-bucket coverage from day one; commit to topping up weekly until automated. |
| Stripe trial abuse | Require payment method on trial start (Stripe handles re-trial detection by card fingerprint). |
| Body-shape thresholds insult users | Avoid showing the raw label as a verdict — frame it as "your silhouette today" and let the styling guidance do the work. |
| MediaPipe WASM bundle slows first load | Lazy-load on the colouring step; show a small "preparing analysis" spinner. |
| Womenswear-only is limiting | Acknowledged; revisit after 1k paying users. |
| Skimlinks denies / delays API access | Not a launch blocker — MVP ships on a hand-curated catalogue with direct brand links. Skimlinks/Awin/direct programs are post-launch revenue upside. |
| Hand-curation doesn't scale beyond ~500 items | Acknowledged — this is the explicit trigger for the v1.1 live-ingestion workstream. Track per-bucket coverage and weekly curation hours; pull the trigger when either signal degrades. |
| Stale prices in static catalogue | Item URLs link to live retailer pages, so the user always sees current price on click-through. The card price may briefly disagree with the retailer site mid-sale — acceptable for v1, fixed by live ingestion. |
| Showing non-monetised brands forever | Acceptable temporarily — user pays £9.99/mo, affiliate revenue is upside. Track conversion per brand; prioritise direct-program signups for the brands that actually drive clicks. |
| Affiliate disclosure not compliant (FTC/ASA) | Per-item disclosure component is mandatory before ship; legal copy review in Phase 5. |
| Apple/Google 30% fee on mobile subscriptions | Price mobile IAP higher than web (£11.99 vs £9.99), or steer first-purchase to web where allowed. RevenueCat lets a single user keep entitlement across both. |
| MediaPipe model doesn't port cleanly to TFLite/ONNX for React Native | Keep the colour-mapping logic (which is the part that took tuning) decoupled from the face-landmark model. Swap to a lighter RN-native landmark model if needed; the mapping stays. |
| Monorepo conversion is bigger than expected | Hard rule during MVP: nothing in `lib/` imports from `next/*`, `react-dom`, or browser globals. Enforce with a custom ESLint rule. |

# StyleSoul — MVP Workplan

This is the build plan for shipping a web-first v1 of StyleSoul. Every choice is meant to minimise time-to-validation while leaving room for post-MVP monetisation, a mobile interface, and the v1.1 roadmap (sale alerts, shop-with-friends, wishlist).

**MVP success criteria:** A user can sign up, complete the 3-step analysis, see their avatar, and view a stable weekly curated edit.

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
| Payments | **Deferred post-MVP** | The web MVP validates onboarding and recommendations before selecting or integrating a payment provider. |
| Image analysis | **MediaPipe Tasks (Face Landmarker)** in-browser, with the implemented self-hosted Lab/ΔE heuristic fallback | Run client-side first for privacy and landmark accuracy; send only the locally downscaled RGBA buffer to `/api/analysis` when client landmarking is unavailable. No external vision API. |
| Hosting | **Vercel** (frontend + API routes) + **Supabase** (db/storage/auth) | Zero-ops for MVP. |
| Email | **Resend or equivalent, subject to cost approval** | Optional welcome and weekly-edit transactional emails; no trial or billing email work in the web MVP. |
| Analytics | **Minimal first-party funnel events before launch** | Record only signup, analysis completion, and first edit view. Rich behavioural and monetisation analytics stay post-MVP. |
| Error tracking | **Add before beta** (Sentry or similar) | Development can rely on local/Vercel logs, but no non-dev tester should use the app without redacted error reporting. |

**Deliberately deferred (but planned):** payments and a native mobile interface. The web app is the MVP; mobile follows only after the web experience is validated. Real-time features, server-side ML training, and microservices remain deferred.

**Web-first boundaries that keep a later mobile interface possible without designing for it now:**
- Domain modules (`lib/body-shape`, `lib/colour-season`, `lib/colour-detection`, and the future `lib/recommendations`) remain pure TypeScript with **no DOM, no Next.js, and no browser globals**. Infrastructure modules under `lib/db` and `lib/supabase` remain web-specific.
- Web operations use HTTP/JSON where an API boundary improves ownership checks or client reuse; Server Components may call shared server-only services directly. Do not build speculative mobile-only endpoints.
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
      analysis/         # Self-hosted heuristic colour-detection fallback
      recs/weekly/      # Returns this week's edit
  components/
    avatar/             # Parametric SVG avatar
    onboarding/
    edit/
    ui/                 # shadcn primitives
  lib/
    body-shape/         # Archetype classifier
    colour-season/      # Skin+undertone+eye+hair → season mapper
    colour-detection/   # MediaPipe pipeline + colour quantisation
    recommendations/    # Bucketed catalogue lookup
    db/                 # Prisma client
    server/             # Server-only profile, catalogue, and recommendation services
  prisma/
    schema.prisma
  public/
    brand/              # Static marketing/brand assets only
```

---

## 3. Data Model (original planning sketch)

The implementation in `prisma/schema.prisma` is canonical. Dormant `User`/`Subscription` fields remain from the original monetisation plan, but the web MVP has no checkout, webhook, customer portal, payment-provider integration, or billing service.

```prisma
model User {
  id              String   @id @default(cuid())
  email           String   @unique
  stripeCustomerId String? @unique
  subscription    Subscription?
  profile         StyleProfile?
  weeklyEdits     WeeklyEdit[]
  createdAt       DateTime @default(now())
}

// Dormant legacy model; no payment flow is active.
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
  shouldersCm     Int      // shoulder-to-shoulder width in centimetres
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
  productUrl      String    // direct HTTPS retailer URL in the MVP
  isAffiliate     Boolean   @default(false) // retained for future use; all curated rows are false
  priceCents      Int
  currency        String    @default("GBP")
  status          String    @default("active") // active | inactive

  eligibleShapes  String[]
  eligibleSeasons String[]
  garmentCategory String
  occasionTags    String[]
  priceTier       String    // entry | mid | premium
  weeklyEditItems WeeklyEditItem[]

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model WeeklyEdit {
  id              String           @id @default(cuid())
  userId          String
  user            User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  weekStart       DateTime         // Monday 00:00 UTC
  items           WeeklyEditItem[] // exactly 3 ordered items, enforced by application logic
  createdAt       DateTime         @default(now())
  @@unique([userId, weekStart])
}

model WeeklyEditItem {
  id           String     @id @default(cuid())
  weeklyEditId String
  weeklyEdit   WeeklyEdit @relation(fields: [weeklyEditId], references: [id], onDelete: Cascade)
  productId    String
  product      Product    @relation(fields: [productId], references: [id], onDelete: Restrict)
  position     Int

  @@unique([weeklyEditId, productId])
  @@unique([weeklyEditId, position])
  @@index([productId])
}
```

The MVP catalogue lives in Postgres from day one and is edited through the admin UI. No JSON catalogue for v1; live ingestion later writes into the same `Product` table. The initial migration already contains `Product` and `WeeklyEdit`; Phase 3 replaces `WeeklyEdit.productIds` with the relational `WeeklyEditItem` model before recommendation data is populated.

---

## 4. Key Architectural Decisions

### 4.1 Photo-assisted colour detection (with manual fallback)

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

**Self-hosted server fallback (implemented and security-gated):** if client landmarking is unavailable, the browser locally decodes and downsizes the photo and may POST a bounded RGBA buffer to `/api/analysis` only after the user explicitly enables server fallback. The route requires authentication, applies a durable per-user rate limit, processes the same pure Lab/ΔE heuristic in memory, rejects malformed or low-quality input, redacts error context, and does not persist pixels or call an external vision provider. Failure returns the user to manual selection rather than forcing a guess.

**Always-manual path:** manual selection is canonical. Photo suggestions are explicitly experimental and uncalibrated, every pre-fill remains editable, and the user can skip photo handling entirely.

**Remaining calibration work:**
- Calibrate ΔE thresholds only after collecting the consented, self-identified labelled dataset defined in `calibration/README.md`; proxy labels are bootstrap evidence only.
- Keep the current Lab/CIEDE2000 matcher and quality gates frozen until that dataset can measure accuracy and coverage honestly.
- Revisit lighting normalisation only with labelled failure cases; do not introduce a confident-but-wrong fallback.

### 4.2 Body shape classification

**Decision:** Keep a deterministic five-label styling heuristic — no ML and no health/anatomy claim. The current numeric thresholds remain provisional until a compatible, consented labelled set is agreed.

```ts
// lib/body-shape/classify.ts
function classify({ bust, waist, hips, shoulders }: Measurements): BodyShape {
  const bustHips = bust / hips
  const waistHips = waist / hips
  const shoulderEquivalentCircumference = shoulders * 2.25
  // provisional launch heuristics; not population-calibrated
  if (Math.abs(bustHips - 1) < 0.05 && waistHips < 0.75) return 'hourglass'
  if (hips > bust * 1.05) return 'pear'
  if (waist > bust * 0.95) return 'apple'
  if (shoulderEquivalentCircumference > hips * 1.05) return 'inverted_triangle'
  return 'rectangle'
}
```

**Evidence and limitation (reviewed 2026-07-14):** Devarajan's [FFIT validation thesis](https://repository.lib.ncsu.edu/items/35fb969e-9394-4307-8799-e42f957e76b8) validated expert-labelled 3D scans using bust, waist, hips, high hip, abdomen, and stomach across nine shapes; Connell et al.'s [Body Shape Assessment Scale](https://doi.org/10.1177/0887302X0602400203) used expert visual ratings of front/side body scans. Neither publishes a per-subject labelled set compatible with this app's five labels and bust/waist/hip circumference plus shoulder-width inputs. Accuracy and coverage therefore cannot be calculated honestly, the 5%/0.75/0.95 constants and provisional 2.25 shoulder-width conversion remain frozen placeholders, and profile copy frames the output as a styling “silhouette”, not a verdict. The existing canonical regression cases protect behavior from accidental drift but are not calibration evidence.

### 4.3 Colour season mapping

**Decision:** Lookup table over (skin_tone, undertone, eye_colour, hair_colour) → season, with `undertone` (warm/cool/neutral/olive) and `value` (light/dark) as the discriminators.

There are 8 × 4 × 6 × 8 = 1,536 combinations. We don't need to enumerate all of them — take explicit undertone first, use skin + hair + eyes to resolve neutral/olive edge cases, derive value/contrast from hair vs skin, then map to one of the 4 seasons. This logic lives in `lib/colour-season/map.ts` and is a pure function that's trivially unit-testable.

### 4.4 Avatar — parametric React SVG

**Decision:** A single React component, `<Avatar shape={...} season={...} />`, that renders an SVG with shape-driven proportions and season-driven fills. No avatar service, no image generation API.

- Body geometry: 5 sets of `<rect>`/`<path>` width/height ratios, one per archetype.
- Palette: each season exports an array of hex codes; the avatar consumes the first 4 (skin, top, bottom, accent).
- Pulse: a Framer Motion `animate` loop on a `<circle>` opacity behind the figure.

Renders on the profile page and recommendation cards. Share-image rendering remains deferred with social shopping.

### 4.5 Weekly recommendations — hand-curated catalogue (MVP)

**Decision:** Ship the MVP with a hand-curated catalogue of ~150 individual retailer products stored in Postgres and edited via a small admin UI. Each weekly edit contains three distinct product cards; each card has one brand, price, and destination URL. Grouping one garment concept across multiple brands/price points is deferred until after the MVP validates the simpler body-shape × colour-season × weekly-edit loop. Live affiliate-feed ingestion + auto-tagging is also explicitly **post-MVP** — see §7.

**Why DB-backed and not a JSON file in the repo:**
- Adding live ingestion later is a small adapter that writes to the same `Product` table — no schema migration, no rewrite of the weekly-edit query.
- Edits don't require a deploy.
- The same schema supports the v1.1 sale-alerts feature once we add `PriceHistory` snapshots.

**Pipeline (MVP):**

1. **Curate** — manually find items on retailer sites, paste URL/title/price/image into the admin UI. Tag eligible shapes, seasons, garment category, occasion, and price tier inline.
2. **Approve** — items have `status: active|inactive`. Inactive ones are still in the DB but not eligible for recommendations.
3. **Link directly** — store the retailer's direct HTTPS URL in `productUrl`. Affiliate wrapping and partner applications are post-MVP and require a separate approval.
4. **Recommend** — query the eligible active pool, exclude products shown to the user in the previous eight weeks through `WeeklyEditItem`, then rank deterministically in application code using a stable hash of `(userId, weekStart, productId)`. Select three while enforcing no duplicate products and no more than one product per brand. If fewer than three survive, relax the eight-week history window before relaxing shape/season eligibility.
5. **Cache** — create the `WeeklyEdit` and its three ordered `WeeklyEditItem` rows in one transaction so the user sees the same edit all week. A unique `(userId, weekStart)` constraint makes retries idempotent.

The authoritative Prisma sketch is in §3; do not maintain a second schema copy here.

`PriceHistory` is intentionally omitted in MVP — it only matters once ingestion is automated.

**Catalogue target for launch:** ~150 items, distributed across the 5×4 = 20 (shape, season) buckets so no bucket has fewer than ~15 eligible items. This is roughly a week of focused curation work.

**MVP link posture:**
- Use direct retailer links only. Do not apply for or integrate Skimlinks, Awin, or another affiliate programme during the web MVP.
- Affiliate monetisation is a separate post-MVP decision and is not load-bearing for recommendation quality.

**Refinement to-dos:**

- **Curation rota** — decide who refreshes the catalogue weekly post-launch and how many new items per week. Likely 10–20 new items / week to keep the edit feeling alive.
- **Price-tier diversity** — the MVP returns three distinct products and should vary price tier across the edit where the eligible pool permits. Multi-brand equivalents for one garment concept are a post-MVP schema/UI decision.
- **Brand diversity** — prioritise one item per brand, but relax brand uniqueness only after history and eligibility fallbacks when a thin catalogue cannot fill three distinct products.
- **Coverage tracking** — show per-bucket count in the admin UI so thin buckets are obvious.

### 4.6 The cinematic loading sequence

**Decision:** It runs over real work, not as theatre. The five visible steps map to actual computations:
1. "Calculating body proportions" → run the classifier (instant, but await an 800 ms minimum).
2. "Mapping colour season" → run the colour mapper.
3. "Generating avatar" → preload the SVG component and any imagery.
4. "Curating silhouettes" → fetch or create this week's edit.
5. "Building your style profile" → ensure the profile/edit writes completed, then redirect.

The profile must exist before the weekly-edit endpoint selects products. The analysing page may start the profile write before step 4, but it must not mark either step complete until the corresponding server work succeeds. Each step has a minimum visible duration so the cinematic feel is preserved even when the work is sub-millisecond, implemented with `Promise.all([work, minDelay(800)])` so slow work does not incur an additional fixed delay.

**Current state:** body classification, colour mapping, avatar preload, profile persistence, and `/api/recs/weekly` are wired. Each step runs its work concurrently with `minDelay(800)`, and the UI advances only after both the corresponding work and minimum visible duration complete.

### 4.7 Payments are post-MVP

**Decision:** The web MVP has no checkout, trial, paywall, subscription entitlement, payment webhook, or billing portal. Validate the onboarding and weekly-edit loop first. Provider, price, and entitlement design are a later product decision and must not shape current access control.

### 4.8 Security and privacy baseline

**Decision:** Security work is part of MVP, not a launch-week afterthought. The app stores body measurements, style-profile data, and may process photos, so the default is least privilege and minimal retention.

- **Supabase RLS:** row-level policies protect `StyleProfile`, `WeeklyEdit`, and `WeeklyEditItem` through their owning user/edit, and were verified with authenticated application roles plus the anonymous role. Prisma paths that may bypass RLS also enforce ownership in server services.
- **Server-side ownership checks:** API routes that return profile, weekly edit, or account data verify the authenticated user owns the requested data. Middleware is UX gating, not the only control.
- **Admin access:** admin catalogue routes require an explicit admin role/claim. Product create/edit/deactivate actions are logged with the acting user.
- **Photo processing:** server fallback requires explicit consent and authentication, enforces bounded size/type validation plus a durable per-user rate limit, processes pixels in memory, and excludes pixel data from logs.
- **Privacy language:** never claim that data is "never shared." The accurate MVP promise is that personal data is not sold and is disclosed only to contracted processors needed to operate the service; a pixel buffer reaches the self-hosted fallback only after explicit consent.
- **Observability redaction:** the built-in server error reporter recursively redacts photos/pixels, measurements, profile payloads, emails, cookies, and auth tokens. Any future third-party error tracking or analytics must preserve that contract before enablement.
- **External URLs:** admin product inputs enforce HTTPS `productUrl` and `imageUrl` values. Any future server-side ingestion fetcher must additionally block private networks, unsafe redirects, oversized files, and unexpected content types.

### 4.9 Locked MVP product decisions

These decisions remove ambiguity from the remaining build; post-launch experiments may revisit them without blocking v1.

- **Measurements:** height, bust, waist, hips, and shoulder width are required. Weight is the sixth field but remains optional and does not affect the v1 classifier.
- **Weekly edit shape:** three individual retailer products per week, one brand/price/link per card. Multi-brand equivalents for one garment concept are post-MVP.
- **Payments:** checkout, trials, subscriptions, entitlements, and provider selection are explicitly post-MVP.
- **Re-analysis:** users may re-run analysis at any time. The MVP keeps only the current profile, increments `analysisVersion` on each successful update, and does not retain historical measurements.
- **Deferred features:** sale alerts, shop-with-friends, wishlist, and preference learning are v1.1.
- **Privacy promise:** personal data is not sold. Required processors are disclosed, and the self-hosted pixel-buffer fallback is opt-in.

---

## 5. Build Order

Roughly 6 phases. Each phase produces something testable end-to-end.

### Phase 0 — Foundations (week 1)
- [~] Skimlinks/Awin application deferred post-MVP by product decision (2026-07-14)
- [x] Next.js + TS + Tailwind + shadcn-style UI primitives scaffold
- [x] Prisma schema + initial migration file
- [x] Supabase project + environment variables (initial migration applied 2026-05-08)
- [~] Auth UI/routes transitioned to Google OAuth via Supabase; dashboard provider setup and end-to-end verification remain pending
- [x] Marketing landing page aligned to current web-MVP boundaries and visual direction
- [x] CI: GitHub Actions running typecheck + tests + Prisma generate

### Phase 1 — Manual onboarding (week 2)
- [x] Body composition form: five required measurements plus optional weight (RHF + Zod) (completed 2026-05-14)
- [x] Backend body measurement validation for the same five-required/one-optional contract (Zod) (completed 2026-05-14)
- [x] Body shape classifier with unit tests (completed 2026-05-14)
- [x] Manual colouring form (8 skin / 4 undertone / 6 eye / 8 hair selectors as labelled visual swatch grids) (completed 2026-05-14)
- [x] Backend colouring options + validation schema for the same 8 / 4 / 6 / 8 contract (Zod) (completed 2026-05-14)
- [x] Colour season mapper with unit tests (completed 2026-05-14)
- [x] Cinematic loading UI wired to classification, season mapping, avatar preload, and profile persistence (completed 2026-05-14)
- [x] Backend style-profile derivation + authenticated create/update/read API (`/api/profile`) (completed 2026-05-14)
- [x] Profile page rendering avatar + shape + season (completed 2026-05-14)
- [x] Hydration guard for resumable body/colouring/analysing drafts (completed 2026-05-21)
- [x] Align Vitest integration fixtures with the v3 draft key and current skin-tone/undertone schema; add required dependencies and run pure/integration suites from `npm test`/CI (completed 2026-07-14)
- [x] Complete route behavior: malformed profile JSON returns 400, auth callback failures return to sign-in, successful re-analysis increments `analysisVersion`, and the live authenticated flow retains one current profile (completed 2026-07-14)

**Phase 1 exit gate:** CI runs the pure and integration suites; a real authenticated user can complete, refresh, resume, retry, and re-run onboarding against the development Supabase project. The later Phase 3 recommendation integration now completes the analysing sequence with a stable weekly edit.

### Phase 2 — Photo detection (week 3)
- [x] MediaPipe Face Landmarker integration (client, lazy-loaded; completed 2026-05-21)
- [x] Region-sampling + Lab clustering pipeline (`lib/colour-detection`, pure/unit-tested; completed 2026-05-21)
- [x] ΔE-based mapping to preset options, including explicit undertone pre-fill (CIEDE2000; completed 2026-05-22)
- [x] Pre-fill manual screen with detected values + "we detected these — change anything?" UX (completed 2026-05-21)
- [x] Self-hosted server fallback route (`/api/analysis`; completed 2026-05-21)
- [x] Quality gate (face count, brightness, size) (completed 2026-05-21)
- [~] Calibration harness scaffolded (`/calibration`, `npm run calibrate`); Hugging Face bootstrap import/predict workflow added and run 2026-05-22 (247 proxy-labelled samples). **Production threshold tuning still deferred pending self-identified 50+ labelled samples per skin tone.**
- [x] Verify Phase 2 from a clean dependency install: `npm ci`, Prisma generation before typecheck, typecheck, lint, 32-test suite, adversarial bounded-fallback tests, and production build pass; CI keeps Prisma generation before typecheck (completed 2026-07-14, Luna QA: GO)

> **Fallback decision (2026-05-21):** The server fallback uses the same self-hosted Lab/ΔE matching code, not an external vision API. When in-browser landmarking is unavailable, the client decodes/downscales locally and POSTs a bounded RGBA buffer to `/api/analysis`, which samples heuristic regions in memory. Manual selection remains the canonical fallback for low-quality results.

**Phase 2 exit gate:** the implemented client and server paths pass clean-install typecheck/build plus their unit/quality tests, and always produce editable suggestions or fall back to manual. Production accuracy remains gated on the self-identified calibration task in Phase 5; proxy-labelled bootstrap results are not a launch-quality claim.

### Phase 3 — Catalogue + recommendations (week 4; completed)
- [x] Replace the existing `WeeklyEdit.productIds` array with `WeeklyEditItem` via a forward migration before recommendation data is populated (completed 2026-07-14)
- [x] Centralise profile/catalogue/weekly-edit Prisma access in server-only service modules used by pages and API routes (completed 2026-07-14)
- [x] Admin role enforcement and audit log for catalogue create/edit/deactivate actions (completed 2026-07-14)
- [x] Admin UI: create/edit products, multi-select tag fields, HTTPS URL validation, and per-bucket coverage indicator (completed 2026-07-14)
- [x] Deterministic weekly edit picker with eight-week history exclusion, brand diversity, fallback rules, and transaction-safe caching (completed 2026-07-14)
- [x] Authenticated `/api/recs/weekly` route with ownership checks (completed 2026-07-14)
- [x] Recommendation cards + avatar-overlay rendering (completed 2026-07-14)
- [x] Hand-curate first 60-80 items so the recommendation flow can be tested before full catalogue completion (64 live direct-link products; completed 2026-07-14)
- [x] Replace the cinematic "Curating silhouettes" placeholder with the real weekly-edit request and make minimum step timing concurrent with work (completed 2026-07-14)

- [x] Verify Phase 3: relational migration deployed; 64 unique live HTTPS product URLs with minimum bucket coverage 36; authenticated admin create/edit/deactivate produced attributed audit entries; authenticated 390px browser flow rendered three live product cards without overflow; two live users (`hourglass`/`warm_spring` and `pear`/`cool_winter`) each received a distinct, eligible, stable three-product edit through the normal Supabase transaction pooler after automatic Prisma PgBouncer-mode normalization; targeted 31-test suite and typecheck pass; Luna QA GO after four reported edge cases were fixed and regression-tested (completed 2026-07-14)

**Phase 3 exit gate:** two users with different profiles receive stable, eligible three-product edits; refreshes and concurrent retries return the same edit; eight-week history and thin-catalogue fallbacks are covered by tests; non-admin catalogue writes are rejected.

### Phase 4 — Web security + messaging (week 5)
- [~] Welcome and weekly-edit emails remain deferred until explicit provider/cost approval; no Resend dependency or silent paid integration was added (decision retained 2026-07-14)
- [x] Supabase RLS policies for user-owned tables, verified with two authenticated application-role sessions plus the anonymous role (completed 2026-07-14)
- [x] Server-side ownership checks on protected API routes and shared services (completed 2026-07-14)
- [x] Explicit, optional server-fallback consent plus authentication and durable per-user rate limiting for `/api/analysis`; payload limits and no-pixel-logging guarantees retained (completed 2026-07-14)
- [x] Observability redaction rules for full profiles, individual measurements, pixel arrays/typed buffers, emails, cookies, and auth tokens (completed 2026-07-14)

- [x] Verify Phase 4: live migration history is current; two authenticated Supabase roles can read only their own account/subscription/profile/edit/items and cannot mutate them; anonymous access sees only active products; audit and rate-limit metadata remain server-only; a signed-in user with no local profile can use the fallback, missing consent returns 400, the sixth per-minute attempt returns 429, and unauthenticated requests return 401; a live pooled-database boundary regression proves stale requests cannot move the limiter window backward; 64-test suite, lint, typecheck, and production build pass; Luna QA GO after stale-window concurrency and error-message redaction findings were fixed and regression-tested (completed 2026-07-14)

**Phase 4 exit gate:** authenticated users can access only their own profile and weekly edit; admin catalogue actions require an admin role and are audited; optional web/email views resolve the same weekly edit; and the photo fallback rejects unauthenticated or abusive traffic without logging pixel data.

### Phase 5 — Catalogue curation + pre-launch hardening (week 6)
- [x] Curate 150 distinct live M&S base SKUs with item-specific shape/season/occasion metadata: six garment categories contain 25 items each, all 20 shape/season buckets contain at least 15 items, every product page and displayed colour was browser-checked, links remain direct HTTPS/non-affiliate, and stable `curated-seed` provenance reconciles legacy variants without retiring admin-created rows; targeted 5-test contract, typecheck, live migration/reseed, and Luna QA GO pass (completed 2026-07-14)
- [~] Self-identified photo calibration cannot be completed without consented ground truth (0 samples available); no accuracy/coverage or production-threshold claim is made, proxy results remain bootstrap-only, and the photo UI now labels suggestions experimental and requires manual review while keeping server fallback optional; targeted 9-test onboarding suite, typecheck, authenticated 390px browser smoke, and Luna QA GO pass (decision retained 2026-07-14)
- [~] Body-shape threshold calibration is data-blocked: the reviewed FFIT and BSAS sources use incompatible measurements, labels, and/or expert scan ratings, and no agreed per-subject bust/waist/hip circumference plus shoulder-width set exists; the existing precedence, 5%/0.75/0.95 heuristics, and provisional 2.25 shoulder-width conversion remain frozen and explicitly provisional with citations, measurement copy now states weight is unused and shoulders are measured shoulder-to-shoulder, and the profile says “Your silhouette today” / styling guidance rather than a verdict; canonical five-output tests, targeted 11-test UI suite, typecheck, and 390px measurement-copy browser smoke pass (decision retained 2026-07-14)
- [x] Responsive web polish across the public, onboarding, profile, recommendations, account, and admin surfaces: all 10 route families render without horizontal overflow at 320px, 390px, and 1440px in Chromium, Firefox, and WebKit (90 route/engine/viewport checks); representative landing/profile/edit/admin pages were visually checked; long account emails now wrap within the profile heading; native mobile UI remains post-MVP; targeted profile test and typecheck pass; Luna QA GO (completed 2026-07-14)
- [x] Accessibility pass: form and photo controls have programmatic labels, validation errors are described, swatch groups retain visible names plus keyboard-operable `aria-pressed` state, focus rings and at least 44px targets cover actionable controls, low-contrast metadata was corrected, and admin coverage thresholds now include visible pass/fail text instead of colour alone; axe-core found zero violations across 10 route families at 390px and 1440px, keyboard/error/target/browser smokes pass, targeted 15-test suite, lint, and typecheck pass; Luna QA GO (completed 2026-07-14)
- [x] Align product, marketing, account, onboarding, roadmap, and planning copy with the implemented web MVP: five required measurements plus optional classifier-unused weight, explicit undertone, provisional silhouette, experimental photo suggestions with manual review, three direct-linked products with documented fallbacks, and no virtual try-on; payments/providers/pricing, native mobile, affiliates/live ingestion, alerts, social tools, and share images are clearly deferred; processor/server-fallback privacy language no longer makes a “never shared” promise; 320px browser copy/link smoke, targeted 12-test suite, lint, typecheck, stale-claim scan, and Luna QA GO pass (completed 2026-07-14)
- [~] Privacy policy + terms now disclose actual profile/auth/weekly-edit/rate-limit data, Supabase and generic hosting processing, on-device and consented server pixel handling, automatic retailer-image/CDN requests, jsDelivr/Google MediaPipe asset requests, retention, cookies/sessionStorage, rights, security, retailer independence, current free preview boundaries, and mandatory consumer protections; landing, sign-in, and account link to the page; targeted lint/typecheck and 320/390/1440px axe/overflow/visual smokes pass; Luna QA GO for limited operator-supervised invited testing but NO-GO for public launch because the user deferred supplying a controller legal name, service address, monitored privacy contact, and actual deployment host (decision retained 2026-07-14)
- [x] GDPR account controls provide an authenticated, private/no-store JSON export of Supabase identity metadata plus account/profile/subscription/weekly-edit/audit/rate-limit records, and a confirmed deletion flow that transactionally removes database-owned data before Supabase Auth, explicitly deletes the unlinked rate-limit row, anonymises retained catalogue audit actors through `ON DELETE SET NULL`, and clears the server/browser auth session plus onboarding draft only after remote success. A deployed, server-only `AccountDeletionGuard` now retains only a SHA-256 pseudonymous tombstone; the deletion transaction and every profile, weekly-edit, funnel, rate-limit, and catalogue-actor mutation acquire the same per-user PostgreSQL advisory lock and check that tombstone before writing, so an in-flight write either commits before deletion and is removed or waits until deletion commits and is rejected. Focused lifecycle/route/service suites, full regression, schema/lint/typecheck/build checks, and an environment-enabled exact-lock-key live concurrency test pass. A disposable confirmed live account separately proved the full two-stage sequence with a profile, three-item weekly edit, two funnel events, linked catalogue audit, rate-limit row, and Auth identity present before deletion, then no account/profile/edit/items/events/rate-limit/Auth identity afterward, the retained audit actor set to `NULL`, all cookies and the draft cleared, and `/account` redirected to sign-in; all disposable product/audit/database artifacts were removed (completed 2026-07-14)
- [x] Browser photo-pipeline performance smoke uses the official MediaPipe portrait without making a calibration claim: cleared-cache Chromium first use completed with editable suggestions in 34.2s, dominated by remote jsDelivr WASM (13.2s) and Google model (19.1s) delivery rather than inference, so detecting UI now truthfully identifies first-time face-landmark downloads while leaving manual swatches enabled; on the initialized 390px page at 4× CPU, five runs took 112–120ms (115ms mean) with zero new external or server-analysis requests and no progressive JS-heap growth, while a 4032×3024/12.2MP web-photo stress run took 244ms with the same bounded/request-free result; consent is re-checked after fallback downscaling immediately before any pixel POST, late suggestions preserve manually selected swatches, targeted 16-test suite/lint/typecheck pass, and Luna QA gives final GO; low-end native/mobile optimisation remains post-MVP (completed 2026-07-14)
- [~] Third-party production error tracking is deferred until hosting/first external tester by explicit product decision; the built-in server reporter remains active and recursively redacts pixels/photos, measurements, profiles, emails, auth tokens, cookies, and user IDs, while adding a paid/free external processor, DSN, DPA, and policy disclosure before deployment requires separate approval (decision retained 2026-07-14)
- [x] Minimal first-party funnel records exactly one `signup_complete` at Supabase account creation after a successful callback, one `analysis_complete` at the persisted profile’s original creation time, and one true `first_edit_view` only from a post-mount client tracker after recommendation cards commit; the tracker calls a dedicated authenticated private/no-store endpoint, the sole `/edit` Link disables prefetch, and `(userId,name)` uniqueness plus duplicate-skipping inserts preserve first timestamps; an applied backfill covers pre-existing profiles, analytics failures are redacted/non-blocking, and the server-only RLS table stores no profile/pixel/page-view payload, cascades on deletion, and appears in the GDPR export; legal/account copy discloses fields, purpose, retention, deletion, export, and no third-party analytics; targeted service/page/client/route tests, live no-prefetch → mounted three-card → 204 POST/auth-boundary/export smoke, lint/typecheck/build, and Luna issue-driven review pass (completed 2026-07-14)
- [x] End-to-end web launch regression passes: both standalone classifier suites plus Vitest report 117 passed/2 environment-gated database tests skipped across 22 passing files, full ESLint/typecheck and the optimised 24-page Next production build pass, all 10 deployed migrations are current, 320px/1440px production browser matrices show no overflow or page errors, unauthenticated app routes redirect and protected APIs return 401, authenticated body → colouring → analysis-version-2 profile → three-card stable edit plus private/no-store export work end to end, retailer links remain direct HTTPS, and axe 4.12.1 reports zero violations across landing/legal/profile/edit/account and every onboarding state after removing a transient analysing-label opacity/contrast defect; production logs remain error-free, while live database/RLS/rate-limit, exact-key account-deletion concurrency, two-user ownership, deletion/export, catalogue, photo, and admin gates cover the environment-gated paths (completed 2026-07-14)
- [x] Final Luna QA re-read the completed Phase 5 contracts and issue-driven fixes and gives the implemented private web-preview scope GO with no remaining P0–P2 defects; the isolated live two-stage deletion/anonymisation/session-cleanup proof left no disposable artifacts. After the concurrency hardening, Luna independently re-ran 73 focused lifecycle/account/mutation tests plus the environment-enabled exact-key live race test, confirmed production deletion serialises against in-flight writes and blocks every post-delete recreation path, found no P0–P2 defects, and gives the live deletion-proof item GO. Public launch remains NO-GO only until real controller identity/service address and monitored privacy contact are supplied, the deployment host/processor/transfer details are published, and production secrets are provisioned outside source control. The local `.env.local` is ignored and untracked; no repository credential exposure was established (completed 2026-07-14)

**Phase 5 exit gate:** all MVP success criteria pass in a production-like environment; legal pages are no longer placeholders; the catalogue meets coverage rules; monitoring can diagnose failures without collecting sensitive profile or pixel data.

**Current status:** Phase 5 implementation and Luna QA are complete for the private invitation-only web preview, including the live account-deletion proof. Public launch remains prohibited until the external legal, hosting, and production-secret provisioning gates on the final Phase 5 item are closed. Manual colouring remains the canonical path while calibration awaits consented ground truth; payments, native mobile work, email, affiliate/live ingestion, and external monitoring remain explicitly deferred post-MVP decisions.

---

## 6. Open Refinement Points

These are decisions deferred to data, not avoided.

1. **Monetisation** — pricing, trials, subscriptions, provider choice, and affiliate partnerships are post-MVP decisions that require explicit approval before implementation.
2. **Photo storage** — the MVP processes pixel buffers in-memory and discards them. Revisit opt-in retention only with a defined product benefit, retention period, deletion path, and GDPR review.
3. **Catalogue coverage by bucket** — with hand curation, thin buckets need active filling. The admin UI surfaces per-bucket counts; weekly curation rota tops up the thinnest first. Once any bucket has <10 active items, that's the trigger to invest in live ingestion.
4. **Re-analysis limits/history** — the MVP permits re-analysis and keeps only the current version. Rate limits or profile history require evidence of abuse or user value.
5. **External-link monetisation** — use direct retailer links in the MVP; evaluate affiliate partners only after the recommendation loop is validated.
6. **Cinematic timing** — 5 steps × ~800 ms = 4 seconds. Long enough to feel ceremonial, short enough not to frustrate. Measure abandonment.
7. **Avatar fidelity** — the deck shows a deliberately abstract figure. Confirm we're not chasing realism — the abstraction is part of the brand.
8. **Skin-tone preset count** — 8 may be too coarse for accurate detection. Consider expanding to a Monk Skin Tone Scale (10) once we have detection data.

---

## 7. v1.1 Roadmap (Out of MVP Scope)

Listed so the MVP architecture leaves room.

- **Multi-brand equivalents** — introduce a garment-concept/offer model only if users demonstrate demand for comparing the same silhouette across brands and price tiers. Do not overload the MVP `Product` model prematurely.
- **Live catalogue ingestion** — the most important v1.1 workstream. Pluggable `IngestionSource` adapters writing to the same `Product` table: Shopify storefront APIs (`/products.json`) on ~30 indie womenswear brands, then Skimlinks once approved, then direct Awin programs for named brands. Adds an LLM auto-tagger (open-source VLM via Together / Fireworks) behind a `Tagger` interface and a review queue that gates auto-tagged items into the `active` set. Rough scope: 2 weeks. Trigger: any (shape, season) bucket falls below 10 active items, or curation overhead exceeds ~2 hours/week.
- **Sale alerts** — once live ingestion exists, snapshot price into a new `PriceHistory` table on each ingest. A daily diff job fans out push/email when a watched product drops below a threshold.
- **Shop with Friends** — share link generates a public read-only view of a recommendation; friends thumbs-up/down via a lightweight unauthed form. Notifications via email or push.
- **Wishlist / gift ideas** — adds a `Wishlist` model and a public gift-list URL.
- **Style preference tracking** — log thumbs-up/down on weekly edits, feed into ranking. Eventually replace deterministic catalogue filter with a learned ranker.

---

## 8. Mobile App (Post-MVP)

Ships after the web MVP is validated. The mobile interface may become an important surface later, but it does not shape the current delivery sequence beyond keeping pure domain modules portable.

### 8.1 Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **React Native + Expo (managed)** | Maximum code reuse with the web app's TypeScript logic. Expo Router mirrors Next.js App Router, so screen structure ports easily. |
| Language | **TypeScript** (same pure domain modules as web) | Body-shape, colour-season, colour-matching, and recommendation logic is shared verbatim. |
| Navigation | **Expo Router** | File-based, familiar to anyone on the web side. |
| Camera | **expo-camera** + **expo-image-picker** | Native camera with proper exposure control beats anything we can do on the web. |
| On-device ML | **react-native-fast-tflite** (or ONNX Runtime React Native) | Run the same face landmark + colour pipeline on-device. No server round-trip, works offline. |
| State / data | **TanStack Query** + Supabase JS SDK (RN-compatible) | Same data layer as web. |
| Styling | **NativeWind** (Tailwind for RN) | Reuse the design tokens, mostly. Some RN-specific work for layout. |
| Payments | **Unselected** | Store billing, entitlement, provider, pricing, and cross-platform account policy require separate product/legal approval. Do not assume RevenueCat, Stripe, or a subscription model. |
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
    core/         # pure domain modules — body shape, colour, recs, types
    ui-tokens/    # shared design tokens (colours, spacing, type scale)
```

Because the named domain modules stay platform-free in the MVP, this conversion is mostly targeted file moves plus a `package.json` per workspace. Web-only DB, auth, and service modules remain under `apps/web`; no domain-logic rewrite is required.

### 8.3 What Changes vs Web

- **Photo capture** is the camera, not a file picker. Live preview, autofocus, exposure lock on the face. Detection runs on the captured frame, not a streamed video feed (battery + UX).
- **On-device ML** uses TFLite/ONNX runtimes — we'll likely re-export the MediaPipe model to a TFLite-compatible format, or swap to a lighter face-landmark model that has first-class RN support.
- **Monetisation** remains undefined. If later approved, native purchases must use the selected store-compliant billing and entitlement architecture; no web or mobile provider is preselected.
- **Push notifications** become the primary channel for weekly edits and sale alerts (email becomes secondary).
- **Deep links** — `stylesoul://edit/this-week`, `stylesoul://item/<slug>` — for share-with-friends, email links, and notification taps.

### 8.4 Mobile Build Order (rough, ~6 weeks)

- **Week 1** — Monorepo conversion. Expo app scaffold. Auth via Supabase RN SDK. Marketing splash + sign-in flow. Onboarding screens reusing `lib/` classifiers.
- **Week 2** — Native camera flow. Frame capture → preset matcher (port the web pipeline).
- **Week 3** — On-device face landmarker + colour detection working at usable quality. Manual fallback path mirrors web exactly.
- **Week 4** — Profile, avatar, weekly edit, recommendation cards. Same `<Avatar>` component re-rendered with `react-native-svg`.
- **Week 5** — If monetisation has been approved, implement the selected store billing and entitlement design; otherwise use the week for release hardening.
- **Week 6** — Push notifications, deep links, App Store / Play Store submission, beta via TestFlight + internal testing.

### 8.5 Refinement Points for Mobile

1. **iOS-first or both at once** — TestFlight is faster and the affluent fashion-app demographic skews iOS, but Android can't be a year behind. Realistically: ship both via Expo from day one, prioritise iOS polish.
2. **Store economics** — assess platform fees, regional pricing, entitlement portability, and legal constraints only after the product approves a business model and price. No web/mobile parity assumption is locked.
3. **On-device model size** — bundling MediaPipe / TFLite models can balloon the binary past 50 MB. Use Expo's asset-on-demand mechanism so the model downloads on first open.
4. **Avatar parity** — `react-native-svg` supports nearly everything our web SVG does, but the pulse animation needs Reanimated rather than Framer Motion. One small fork in the codebase.
5. **Web → mobile handoff** — a user who signs up on web should get a clean Google OAuth sign-in on mobile. Test this end-to-end before launch.

---

## 9. Risks

| Risk | Mitigation |
|------|------------|
| Photo detection accuracy is mediocre | Manual selection is always available and pre-fills are clearly editable. Low-confidence detections fall through to manual. |
| 150-item catalogue feels thin | Track per-bucket coverage from day one; commit to topping up weekly until automated. |
| Body-shape thresholds insult users | Avoid showing the raw label as a verdict — frame it as "your silhouette today" and let the styling guidance do the work. |
| MediaPipe WASM bundle slows first load | Lazy-load on the colouring step; show a small "preparing analysis" spinner. |
| Womenswear-only is limiting | Acknowledged; revisit after evidence from active web users. |
| Hand-curation doesn't scale beyond ~500 items | Acknowledged — this is the explicit trigger for the v1.1 live-ingestion workstream. Track per-bucket coverage and weekly curation hours; pull the trigger when either signal degrades. |
| Stale prices in static catalogue | Item URLs link to live retailer pages, so the user always sees current price on click-through. The card price may briefly disagree with the retailer site mid-sale — acceptable for v1, fixed by live ingestion. |
| MediaPipe model doesn't port cleanly to TFLite/ONNX for React Native | Keep the colour-mapping logic (which is the part that took tuning) decoupled from the face-landmark model. Swap to a lighter RN-native landmark model if needed; the mapping stays. |
| Monorepo conversion is bigger than expected | Enforce a boundary on the domain modules (`lib/body-shape`, `lib/colour-season`, `lib/colour-detection`, `lib/recommendations`): no `next/*`, `react-dom`, Prisma, or browser globals. Server infrastructure under `lib/db`, `lib/supabase`, and `lib/server` is exempt and stays web-only. |

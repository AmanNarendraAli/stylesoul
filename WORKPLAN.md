# StyleSoul — Workplan

Web-first MVP: a user signs in, completes the 3-step analysis, sees their avatar and style guide, and receives a stable weekly edit of three products. The MVP is built and running as a private, invitation-only preview; public launch is blocked on the gates in §4.

`prisma/schema.prisma` is the canonical data model; `PRODUCT_SPEC.md` is the product spec.

## 1. Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) + React 19, TypeScript (strict) |
| Styling | Tailwind CSS 3 with local primitives in `components/ui` (class-variance-authority + tailwind-merge) |
| Animation | Framer Motion (analysing sequence, avatar pulse) |
| Forms / validation | React Hook Form + Zod 4; the same schemas validate on the server |
| Auth | Supabase Auth, Google OAuth only (`app/signin`, `app/auth/callback`) |
| Database | Supabase Postgres via Prisma 6; RLS policies live in migrations |
| Photo analysis | MediaPipe Tasks Vision Face Landmarker + hair segmenter in the browser (WASM from jsDelivr, models from Google storage) feeding a small logistic-regression classifier trained in `calibration/`; photos come only from the guided in-app camera and never leave the device |
| Analytics | First-party `FunnelEvent` rows only: `signup_complete`, `analysis_complete`, `first_edit_view` |
| Error reporting | Built-in redacting server reporter (`lib/observability/redact.ts`); no external service yet |
| Payments / email | None |
| Tests | Vitest + Testing Library (jsdom); DB tests gated on `RUN_DATABASE_TESTS=1` |
| CI | GitHub Actions: `npm ci` → `prisma generate` → typecheck → lint → test |
| Hosting | Not yet chosen (see §4) |

## 2. Repository layout

```
app/
  (marketing)/            # landing, pricing, legal
  (app)/
    onboarding/           # colouring (camera) → body (optional) → analysing; draft in sessionStorage
    profile/              # avatar, season, silhouette, style guidance
    products/             # weekly edit + full catalogue
    account/              # data export and deletion
    admin/catalogue/      # admin-only catalogue management
  api/
    profile/              # GET/POST current style profile
    recs/weekly/          # this week's edit (created on first request)
    account/, account/export/
    admin/products/       # catalogue CRUD with audit log
    funnel/first-edit/
  auth/callback/, signin/
components/               # avatar, onboarding, catalogue, recommendations, account, admin, ui
lib/
  body-shape/             # measurement schema + five-label classifier
  colour-season/          # colouring schema, 12-season mapper, swatch options
  colour-detection/       # landmark/hair-mask sampling, features, trained classifier, quality gate, camera guidance
  recommendations/        # deterministic weekly selection
  style-guidance/         # per-season and per-shape guidance copy
  style-profile/          # profile input schema + derivation
  catalogue/              # product schema and sorting
  labels.ts               # display labels for shapes and seasons
  server/                 # server-only services (auth, profile, weekly edit, catalogue, account, funnel)
  db/, supabase/, observability/
prisma/                   # schema, migrations, seed + curated catalogue data
calibration/              # photo-detection calibration harness (data is git-ignored)
tests/                    # db/, domain/, server/, ui/, shims/
```

Domain modules (`lib/body-shape`, `lib/colour-season`, `lib/colour-detection`, `lib/recommendations`) stay free of Next.js, Prisma and browser globals, and use relative `.ts` imports so `prisma/seed.ts` and the calibration scripts can run them with `node --experimental-strip-types`.

## 3. Key decisions

- **Manual colouring is canonical.** Photo detection only pre-fills swatches and every value stays editable. Photos come only from the guided in-app camera and are analysed on device; there is no upload or server fallback, so without a camera (or if the models can't load) the user picks swatches by hand.
- **Body shape** is a deterministic heuristic over bust/waist/hips/shoulders returning `hourglass`, `triangle`, `full_midsection`, `rectangle` or `inverted_triangle`. Thresholds are provisional (no compatible labelled dataset exists), so the UI presents it as "your silhouette today", not a verdict. Weight is optional and unused.
- **Colour season** is one of 12, derived entirely from the four colouring choices (photo-suggested or picked): `deriveDimensions` scores temperature, depth, clarity and contrast from swatch lightness and per-colour rules, and `mapColourSeason` applies the 12-season dominant-characteristic tree. These are practitioner conventions, not a validated model.
- **Avatar** is a parametric SVG component driven by shape proportions and season palette; no image generation.
- **Weekly edit**: a hand-curated catalogue in Postgres (150 direct-link products seeded from `prisma/catalogue.ts`, editable in the admin UI with an audit log). Selection is deterministic per `(userId, weekStart, productId)` hash, returns three distinct products, excludes items shown in the previous eight weeks, prefers distinct price tiers, and requires distinct brands until the last resort. When the pool is thin it relaxes history before eligibility, then widens from exact matches to same season family, to shape-or-season matches, to any active product. Each edit is stored once per `(userId, weekStart)`, so it stays stable all week.
- **Analysing screen** runs the real work (classify, map season, save profile, create edit, confirm profile) with an 800 ms minimum per step.
- **Re-analysis** overwrites the single current profile and bumps `analysisVersion`; no history is kept.
- **Links** go straight to retailers. No affiliate programmes, payments or subscriptions in the MVP.
- **Security and privacy**: RLS on user-owned tables plus server-side ownership checks; admin routes require the `admin` role claim; account export is private/no-store; deletion removes database data before the Supabase Auth user, and an `AccountDeletionGuard` tombstone plus a per-user advisory lock stops in-flight writes recreating data. The error reporter redacts photos, pixels, measurements, profiles, emails, cookies and tokens.

## 4. Open items and launch gates

1. **Google OAuth**: configure the Google provider in the Supabase dashboard for each environment and verify sign-in end to end.
2. **Legal (blocks public launch)**: supply the controller's legal name, service address and a monitored privacy contact; choose the deployment host and publish its processor and transfer details on the legal page; provision production secrets outside source control.
3. **Photo colour calibration**: the classifier is trained on ~1.9k labelled photos from a public face set and the owner's Photos library (see `calibration/README.md`), which under-represent deep skin tones (no `very_deep` samples). Needs consented, self-identified samples across all skin tones before any accuracy claim is made.
4. **Error tracking before beta**: add external error tracking (e.g. Sentry) before any non-operator tester uses the app. It must keep the existing redaction contract and needs approval, a DPA and a policy disclosure.
5. **Email**: welcome and weekly-edit emails are deferred until a provider and its cost are approved.

## 5. Catalogue upkeep

Retailer links go stale silently: off-sale M&S products either redirect to a category page or still return 200 with page data marking them off sale. `npm run catalogue:check` checks each product page and image (width ≥ 800) at ~1 request/second, prints one line per problem and exits non-zero if any are found.

- Before seeding, run `npm run catalogue:check -- --seed` to check `prisma/catalogue.ts` (no database needed).
- Periodically, run `npm run catalogue:check -- --apply` to set off-sale active products to `inactive`. `.github/workflows/catalogue-check.yml` does this weekly (and on manual dispatch) when the `DATABASE_URL` secret is set.

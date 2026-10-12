import Link from "next/link";

const EFFECTIVE_DATE = "14 July 2026";

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-sm text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          StyleSoul
        </Link>
        <p className="mt-8 text-sm uppercase tracking-[0.24em] text-gold">
          Privacy and terms
        </p>
        <h1 className="mt-3 font-display text-5xl">Legal</h1>
        <p className="mt-4 text-sm text-cream/65">
          Effective {EFFECTIVE_DATE} · Pre-launch web preview
        </p>

        <nav
          aria-label="Legal sections"
          className="mt-8 flex flex-wrap gap-3 border-y border-cream/15 py-4"
        >
          <a
            href="#privacy"
            className="inline-flex min-h-11 items-center rounded border border-cream/20 px-4 text-sm text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Privacy policy
          </a>
          <a
            href="#terms"
            className="inline-flex min-h-11 items-center rounded border border-cream/20 px-4 text-sm text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Terms of use
          </a>
        </nav>

        <section id="privacy" className="scroll-mt-6 pt-12">
          <h2 className="font-display text-4xl">Privacy policy</h2>
          <p className="mt-5 leading-7 text-cream/80">
            This policy explains how the StyleSoul web preview handles personal
            data. StyleSoul is a styling service, not a health, biometric
            identification, or virtual try-on service. We do not sell personal
            data or use it for advertising.
          </p>

          <LegalSection title="Controller and contact">
            <p>
              The legal name, service address, and monitored privacy contact for
              the controller of this deployment have not yet been supplied.
              Access must remain limited to operator-supervised pre-launch
              testing until those details are published. Existing invited
              testers can make a request through the same channel used by the
              operator to provide access.
            </p>
          </LegalSection>

          <LegalSection title="Data we process">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Account data: email address, internal user ID, authentication
                session cookies, and security metadata.
              </li>
              <li>
                Profile data: height, optional weight, bust, waist, hip and
                shoulder measurements; skin tone, undertone, eye and hair
                selections; derived silhouette, colour season, detection source,
                and analysis version.
              </li>
              <li>
                Service records: the three products in each weekly edit and the
                week it was created.
              </li>
              <li>
                Service-usage milestones: the Supabase account-creation
                timestamp, recorded only after a successful sign-in callback;
                the first completed analysis; and the first weekly-edit view.
                Each is stored once with its timestamp. StyleSoul does not
                record general page views.
              </li>
              <li>
                Security records: administrators create catalogue audit records.
              </li>
              <li>
                Optional photo data: a photo taken with the in-app camera is
                analysed on the user&apos;s device and is not sent to StyleSoul.
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="How and why we use it">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                To authenticate the user, save the current style profile, build
                the avatar, and provide a stable weekly edit at the user&apos;s
                request.
              </li>
              <li>
                To secure the service, enforce access controls,
                diagnose redacted failures, and audit administrator catalogue
                changes.
              </li>
              <li>
                To measure the three-stage signup, analysis, and first-edit
                funnel using the coarse first-party milestones above, so the
                operator can assess whether the preview is useful without a
                third-party analytics service.
              </li>
            </ul>
            <p className="mt-4">
              The service functions are performed to provide the preview the
              user requested. Security, administration, and coarse funnel
              measurement rely on the operator&apos;s legitimate interests in
              running a safe, reliable service and evaluating the preview while
              recording only one timestamp per milestone.
            </p>
          </LegalSection>

          <LegalSection title="Photo and pixel handling">
            <p>
              Photos are taken with the in-app camera and analysed only on the
              user&apos;s device. Live camera frames and the captured photo are
              never uploaded to StyleSoul, stored, or sent to an external vision
              provider. If on-device analysis is unavailable, the user picks
              their colouring from manual swatches.
            </p>
          </LegalSection>

          <LegalSection title="Processors and other recipients">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-cream">Supabase</strong> provides
                authentication and the hosted PostgreSQL database. It processes
                account, profile, weekly-edit, security, and administrator audit
                data for the operator.
              </li>
              <li>
                The deployment&apos;s web-hosting infrastructure serves the
                application and runs server routes.
              </li>
              <li>
                When the weekly edit is displayed, the browser automatically
                requests product images from retailer or product-image CDN
                hosts. Those hosts receive ordinary request data such as the IP
                address, user agent, referrer policy information, and requested
                image URL. StyleSoul does not add profile measurements or a
                StyleSoul user ID to those image requests.
              </li>
              <li>
                When the user starts optional photo matching, the browser loads
                MediaPipe runtime files from jsDelivr and the face-landmarker
                model from Google-hosted storage. Those providers receive
                ordinary asset-request data such as the IP address, user agent,
                and requested asset URL. StyleSoul does not send the photo,
                measurements, or style profile to either asset host.
              </li>
              <li>
                Retailers are independent controllers when a user follows a
                direct product link. StyleSoul does not send the user&apos;s
                profile to the retailer and does not use affiliate redirects or
                commission tracking in this MVP.
              </li>
            </ul>
            <p className="mt-4">
              StyleSoul has no advertising tracker, third-party product
              analytics service, payment provider, external error tracker, or
              email-marketing provider enabled in the current web MVP. If that
              changes, this policy must be updated before the service is enabled.
            </p>
          </LegalSection>

          <LegalSection title="International processing">
            <p>
              Supabase, the deployment&apos;s hosting infrastructure, jsDelivr,
              Google-hosted model storage, and product-image hosts may process
              request data outside the user&apos;s country. The operator must use
              the applicable provider terms and lawful transfer safeguards, such
              as an adequacy decision or standard contractual clauses, where
              required.
            </p>
          </LegalSection>

          <LegalSection title="Retention and deletion">
            <p>
              StyleSoul keeps the current profile, account record, weekly edits,
              and coarse funnel milestones until the account
              is deleted or the preview is retired. Account deletion removes
              those records and the
              Supabase sign-in identity. Catalogue audit records are retained
              for security and accountability while the preview operates, but
              their link to the deleted account is removed.
              A one-way hash of the former sign-in identifier is retained solely
              to prevent in-flight requests from recreating deleted records; it
              cannot be used to sign in or retrieve the account.
              Re-analysis replaces the current profile values; it does not keep
              profile-history versions.
            </p>
          </LegalSection>

          <LegalSection title="Cookies and local storage">
            <p>
              StyleSoul uses necessary Supabase authentication cookies to keep a
              user signed in. The onboarding draft is stored in browser
              sessionStorage so a refresh can resume the flow; it is cleared
              after successful analysis, account deletion, or when the browser
              session ends. Account deletion also clears the current local
              authentication session. StyleSoul does not use advertising or
              cross-site tracking cookies.
            </p>
          </LegalSection>

          <LegalSection title="Rights">
            <p>
              Depending on location, users may have rights to access, correct,
              erase, restrict, or receive a portable copy of personal data, and
              to object to processing or withdraw consent. A signed-in user can
              download a JSON copy or permanently delete their account from the{" "}
              <Link
                href="/account"
                className="text-gold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                account page
              </Link>
              . Other requests can be made through the controller
              contact described above. Identity may need to be verified before
              a request is fulfilled.
            </p>
            <p className="mt-4">
              UK users may also complain to the{" "}
              <a
                href="https://ico.org.uk/make-a-complaint/data-protection-complaints/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Information Commissioner&apos;s Office
              </a>
              . Users elsewhere may contact their local data-protection
              authority.
            </p>
          </LegalSection>

          <LegalSection title="Security and children">
            <p>
              StyleSoul uses authenticated access, row-level database policies,
              server-side ownership checks, HTTPS-only product URL validation,
              and sensitive-data
              redaction. No
              internet service can guarantee absolute security. The preview is
              intended for adults aged 18 or over and is not directed to
              children.
            </p>
          </LegalSection>
        </section>

        <section id="terms" className="scroll-mt-6 border-t border-cream/15 pt-12">
          <h2 className="font-display text-4xl">Terms of use</h2>
          <p className="mt-5 leading-7 text-cream/80">
            These terms apply to the pre-launch StyleSoul web preview from{" "}
            {EFFECTIVE_DATE}. By using the preview, the user agrees to them.
          </p>

          <LegalSection title="The preview">
            <p>
              StyleSoul currently provides Google authentication through
              Supabase, a current
              style profile, provisional silhouette and colour-season guidance,
              an abstract avatar, optional experimental photo suggestions, and a
              stable three-product weekly edit. The preview is available without
              charge. It has no checkout, trial, subscription, payment
              collection, native mobile app, sale alerts, social shopping, or
              virtual try-on.
            </p>
          </LegalSection>

          <LegalSection title="Accounts and acceptable use">
            <ul className="list-disc space-y-2 pl-5">
              <li>Users must be at least 18 and provide a Google account they control.</li>
              <li>
                Users must not probe, disrupt, overload, scrape, reverse
                engineer, or bypass the service&apos;s authentication, ownership,
                or administrator controls.
              </li>
              <li>
                A user may only photograph themselves, or another person with
                their permission.
              </li>
              <li>
                The operator may suspend access needed to protect users, data, or
                the service, or to end the preview.
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="Styling guidance">
            <p>
              Silhouette classifications, colour seasons, photo suggestions,
              avatars, and recommendations are subjective styling guidance.
              They are not medical, health, biometric-identification, sizing,
              safety, or professional advice. Photo matching and silhouette
              thresholds are not population-calibrated, and users should review
              every result.
            </p>
          </LegalSection>

          <LegalSection title="Retailer links and purchases">
            <p>
              Product cards link directly to third-party retailer pages. The
              retailer controls its product information, stock, sizing, price,
              delivery, returns, cookies, and purchase contract. StyleSoul does
              not guarantee that displayed information remains current and is
              not the seller. Links are not affiliate-wrapped in the current
              MVP.
            </p>
          </LegalSection>

          <LegalSection title="Intellectual property">
            <p>
              The StyleSoul software, visual design, branding, and original
              content remain the property of their respective owner. Retailer
              names, product images, descriptions, and trade marks belong to
              their respective owners and are shown only to identify linked
              products. These terms grant a personal, revocable,
              non-transferable right to use the preview.
            </p>
          </LegalSection>

          <LegalSection title="Availability and changes">
            <p>
              This is a pre-launch service. Features, catalogue items, and access
              may change, pause, or end. The operator will not silently introduce
              charges; any future paid plan requires separate terms and an
              explicit purchase flow. Material privacy or terms changes will be
              dated on this page and, where required, brought to users&apos;
              attention.
            </p>
          </LegalSection>

          <LegalSection title="Responsibility">
            <p>
              The preview is provided with reasonable care but without a promise
              that it will be uninterrupted, error-free, or suitable for a
              particular wardrobe or purchase. Nothing in these terms excludes
              liability that cannot lawfully be excluded, including liability
              for fraud, fraudulent misrepresentation, or death or personal
              injury caused by negligence, and nothing limits mandatory consumer
              rights.
            </p>
          </LegalSection>

          <LegalSection title="Ending use and contact">
            <p>
              A user may stop using the preview at any time and request account
              deletion. The operator may end the preview or terminate access for
              misuse, security risk, or operational reasons. Until the
              controller&apos;s public legal identity and monitored contact are
              supplied, invited testers must use their existing operator contact
              channel. The preview must not open to the public without those
              details.
            </p>
          </LegalSection>
        </section>
      </article>
    </main>
  );
}

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-9">
      <h3 className="font-display text-2xl">{title}</h3>
      <div className="mt-3 space-y-4 leading-7 text-cream/80">{children}</div>
    </section>
  );
}

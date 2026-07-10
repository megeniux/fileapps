import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { buildStaticMetadata } from "@/lib/static-metadata";

export const metadata: Metadata = buildStaticMetadata({
  title: "Advertising Disclosure",
  description: `${SITE.name} advertising disclosure explaining where ads may appear and how they are separated from the tool experience.`,
  path: "/ads-disclosure",
});

export default function AdsDisclosurePage() {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Advertising Disclosure</h1>
          <p className="text-lg text-muted-foreground">
            This page explains how {SITE.name} may use advertising while trying to keep the tool experience clear, trustworthy, and privacy-conscious.
          </p>
        </header>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">1. Where ads may appear</h2>
          <p className="text-muted-foreground">
            Ads may appear on content-driven surfaces such as the homepage, category pages, educational sections, and other informational pages.
          </p>
          <p className="text-muted-foreground">
            We aim to avoid cluttering the core processing workflow with aggressive placements that confuse the difference between tool actions and advertising.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">2. Separation from tool actions</h2>
          <p className="text-muted-foreground">
            Paid placements should be visually distinct from buttons, export actions, upload zones, and processing controls. Ads should never imitate primary tool controls.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">3. Third-party ad providers</h2>
          <p className="text-muted-foreground">
            If third-party advertising providers are used, they may rely on their own policies, cookies, or contextual systems subject to applicable law and browser behavior.
          </p>
          <p className="text-muted-foreground">
            Any such usage should remain consistent with our published privacy practices and should not override the privacy-first approach of the tools themselves.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">4. Editorial independence</h2>
          <p className="text-muted-foreground">
            Advertising does not determine how we describe tool capabilities, limitations, or recommendations. Product and content decisions should remain based on usefulness and accuracy.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">5. Future monetization updates</h2>
          <p className="text-muted-foreground">
            If monetization practices expand materially, this page and related site policies should be updated along with any required public artifacts such as `ads.txt`.
          </p>
        </section>
      </div>
    </div>
  );
}

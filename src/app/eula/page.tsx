import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { buildStaticMetadata } from "@/lib/static-metadata";

export const metadata: Metadata = buildStaticMetadata({
  title: "End User License Agreement",
  description: `${SITE.name} EULA covering your license to use the browser-based tools, restrictions, and ownership terms.`,
  path: "/eula",
});

export default function EulaPage() {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">End User License Agreement</h1>
          <p className="text-lg text-muted-foreground">Last updated: July 2026</p>
        </header>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">1. License grant</h2>
          <p className="text-muted-foreground">
            {SITE.name} grants you a limited, non-exclusive, revocable license to access and use the website and its browser-based tools for lawful personal, educational, and commercial file-processing tasks.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">2. What this license allows</h2>
          <p className="text-muted-foreground">
            You may use the tools to convert, compress, edit, merge, and export files through the public interface, subject to your own responsibility for the files and rights involved.
          </p>
          <p className="text-muted-foreground">
            This license does not transfer ownership of the software, design, code, branding, or documentation behind {SITE.name}.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">3. Restrictions</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>You may not resell, rehost, or mirror the service as your own product without permission.</li>
            <li>You may not remove branding or legal notices where they apply.</li>
            <li>You may not use the service for unlawful, abusive, or infringing purposes.</li>
            <li>You may not attempt to interfere with site operation, security, or availability.</li>
          </ul>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">4. Ownership and feedback</h2>
          <p className="text-muted-foreground">
            All site software, layout, content, and branding remain the property of {SITE.name} or its licensors.
          </p>
          <p className="text-muted-foreground">
            If you submit suggestions, feedback, or feature ideas, you allow us to use them without compensation or attribution requirements unless separately agreed in writing.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">5. No warranty</h2>
          <p className="text-muted-foreground">
            The tools are provided as-is and as-available. Browser support, codec support, file limits, and output quality can vary by device and browser.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">6. Termination</h2>
          <p className="text-muted-foreground">
            We may suspend or terminate access for misuse, abuse, or violations of these terms or related site policies.
          </p>
        </section>
      </div>
    </div>
  );
}

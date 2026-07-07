import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `${SITE.name} disclaimer covering accuracy, browser limitations, and user responsibility when using the tools.`,
  alternates: {
    canonical: `${SITE.url}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Disclaimer</h1>
          <p className="text-lg text-muted-foreground">
            These tools are provided to help with common file-processing tasks, but you are responsible for how you use them and for checking the outputs before relying on them.
          </p>
        </header>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">No guarantees</h2>
          <p className="text-muted-foreground">
            {SITE.name} is provided on an as-is basis. We do not guarantee that every file type, browser, device, codec, or export setting will work perfectly in every situation.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">Check important outputs</h2>
          <p className="text-muted-foreground">
            If you are processing files for work, legal, academic, archival, or commercial use, review the results carefully before publishing, sharing, or deleting the originals.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">User responsibility</h2>
          <p className="text-muted-foreground">
            You are responsible for making sure you have the right to edit, convert, merge, compress, or redistribute the files you use with these tools.
          </p>
          <p className="text-muted-foreground">
            You should also keep backups of important files. Browser-based processing can still be affected by crashes, unsupported formats, or limited device memory.
          </p>
        </section>
      </div>
    </div>
  );
}

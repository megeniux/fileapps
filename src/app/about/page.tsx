import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { buildStaticMetadata } from "@/lib/static-metadata";

export const metadata: Metadata = buildStaticMetadata({
  title: "About",
  description: `Learn what ${SITE.name} is, how it works, and why it keeps file processing inside your browser.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">About {SITE.name}</h1>
          <p className="text-lg text-muted-foreground">
            {SITE.name} is a privacy-first collection of browser-based file tools for video, audio, image, and PDF workflows.
          </p>
        </header>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">What we are building</h2>
          <p className="text-muted-foreground">
            The goal is simple: give people practical file tools that feel fast, trustworthy, and useful without forcing uploads for every task.
          </p>
          <p className="text-muted-foreground">
            Many tools on the web solve simple jobs, but they often trade away privacy or hide good features behind limits. {SITE.name} is designed to keep processing local whenever possible and make the controls clear enough for real work.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <p className="text-muted-foreground">
            Most tools run directly in your browser using web APIs, Canvas, PDF libraries, and FFmpeg compiled for the web. That means your files usually stay on your device instead of being uploaded to a remote server for processing.
          </p>
          <p className="text-muted-foreground">
            Some workflows can still be limited by browser memory, device performance, or codec support. We try to make those limits visible before and during processing so the tools stay predictable.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">Our principles</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>Privacy first: keep file processing in the browser where practical.</li>
            <li>Clarity over gimmicks: explain settings, outputs, and tradeoffs.</li>
            <li>Useful defaults: tools should help even when users do not want expert-level setup.</li>
            <li>Honest product copy: public pages should match what the tool really does.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

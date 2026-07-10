import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { buildStaticMetadata } from "@/lib/static-metadata";

export const metadata: Metadata = buildStaticMetadata({
  title: "Terms of Service",
  description: `${SITE.name} terms of service. Understand the rules and guidelines for using our free online tools.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-3xl prose prose-gray dark:prose-invert">
        <h1>Terms of Service</h1>
        <p className="lead">Last updated: January 2025</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By using {SITE.name}, you agree to these terms of service. If you do not agree, please do not
          use our tools.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          {SITE.name} provides free online media processing tools that run entirely in your browser.
          We use FFmpeg compiled to WebAssembly for video, audio, and image manipulation.
        </p>

        <h2>3. User Responsibilities</h2>
        <p>
          You are responsible for the media files you process using our tools. You should only process
          files that you have the legal right to modify.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          All tools and technology on {SITE.name} are provided as-is. You may not reverse-engineer,
          copy, or redistribute our tools without permission.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          {SITE.name} is provided free of charge and without warranty. We are not responsible for any
          damages resulting from the use of our tools.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Changes will be posted on this page.
        </p>
      </div>
    </div>
  );
}

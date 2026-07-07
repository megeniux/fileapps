import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${SITE.name} privacy policy. Learn how we handle your data and protect your privacy.`,
  alternates: {
    canonical: `${SITE.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-3xl prose prose-gray dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="lead">Last updated: January 2025</p>

        <h2>1. Information We Collect</h2>
        <p>
          {SITE.name} is designed to process media files entirely in your browser. We do not collect, store,
          or transmit your media files to any server. All processing happens locally on your device using
          WebAssembly.
        </p>

        <h2>2. How We Use Information</h2>
        <p>
          We use standard web analytics to understand how our tools are used. This includes anonymous page
          views and feature usage. No personal identifying information is collected through our tools.
        </p>

        <h2>3. Data Storage</h2>
        <p>
          Your media files are never uploaded to our servers. They remain on your device throughout the
          processing pipeline and are only stored temporarily in your browser&apos;s memory. Once you close
          the page, all data is cleared.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>
          We use CDN services to deliver the FFmpeg WebAssembly engine. These services may log standard
          connection information such as IP address and browser type.
        </p>

        <h2>5. Cookies</h2>
        <p>
          We use minimal cookies for basic functionality such as theme preference (dark/light mode). No
          tracking cookies are used.
        </p>

        <h2>6. Contact</h2>
        <p>
          If you have questions about this privacy policy, please contact us through our contact page.
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { AudioEffectsClient } from "./client";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolSeoContent } from "@/components/tools/tool-seo-content";
import { seoDataMap } from "@/lib/seo-data";

const data = seoDataMap["audio-effects"];

export const metadata: Metadata = {
  title: "Audio effects editor",
  description: data?.metaDescription ?? "Free online audio effects editor — no upload required.",
  alternates: { canonical: "https://fileapps.click/tools/audio/effects" },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://fileapps.click" },
      { "@type": "ListItem", position: 2, name: "Audio tools", item: "https://fileapps.click/tools/audio" },
      { "@type": "ListItem", position: 3, name: "Audio effects editor", item: "https://fileapps.click/tools/audio/effects" },
    ],
  };

  const faqSchema = data ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <ToolHero toolId="audio-effects" />
      <AudioEffectsClient />
      <ToolSeoContent toolId="audio-effects" />
    </>
  );
}

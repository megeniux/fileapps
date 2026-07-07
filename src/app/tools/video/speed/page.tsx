import type { Metadata } from "next";
import { VideoSpeedClient } from "./client";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolSeoContent } from "@/components/tools/tool-seo-content";
import { seoDataMap } from "@/lib/seo-data";

const data = seoDataMap["video-speed"];

export const metadata: Metadata = {
  title: "Video speed changer",
  description: data?.metaDescription ?? "Free online video speed changer — no upload required.",
  alternates: { canonical: "https://fileapps.click/tools/video/speed" },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://fileapps.click" },
      { "@type": "ListItem", position: 2, name: "Video tools", item: "https://fileapps.click/tools/video" },
      { "@type": "ListItem", position: 3, name: "Video speed changer", item: "https://fileapps.click/tools/video/speed" },
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
      <ToolHero toolId="video-speed" />
      <VideoSpeedClient />
      <ToolSeoContent toolId="video-speed" />
    </>
  );
}

import type { Metadata } from "next";
import { seoDataMap } from "@/lib/seo-data";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolContentSection } from "@/components/tools/tool-content";
import { ToolSeoContent } from "@/components/tools/tool-seo-content";
import { VideoReverseClient } from "./client";

const data = seoDataMap["video-reverse"];

export const metadata: Metadata = {
  title: "Reverse Video Online — Free Browser Tool | FileApps",
  description: data?.metaDescription ?? "Reverse any video online for free. Play your video backwards in seconds — no upload, no watermark, works in browser.",
  alternates: { canonical: "https://fileapps.click/tools/video/reverse" },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://fileapps.click" },
      { "@type": "ListItem", position: 2, name: "Video Tools", item: "https://fileapps.click/tools/video" },
      { "@type": "ListItem", position: 3, name: "Reverse Video", item: "https://fileapps.click/tools/video/reverse" },
    ],
  };

  const howToSchema = data ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.howToTitle,
    step: data.howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  } : null;

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
      {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />}
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <ToolHero toolId="video-reverse" />
      <VideoReverseClient />
      <ToolContentSection toolId="video-reverse" />
      <ToolSeoContent toolId="video-reverse" />
    </>
  );
}

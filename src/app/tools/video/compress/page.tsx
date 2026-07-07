import type { Metadata } from "next";
import { VideoCompressClient } from "./client";
import { ToolContentSection } from "@/components/tools/tool-content";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolSeoContent } from "@/components/tools/tool-seo-content";
import { seoDataMap } from "@/lib/seo-data";

const data = seoDataMap["video-compress"];

export const metadata: Metadata = {
  title: "Video compressor",
  description: data?.metaDescription ?? "Free online video compressor — no upload required.",
  alternates: { canonical: "https://fileapps.click/tools/video/compress" },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://fileapps.click" },
      { "@type": "ListItem", position: 2, name: "Video tools", item: "https://fileapps.click/tools/video" },
      { "@type": "ListItem", position: 3, name: "Video compressor", item: "https://fileapps.click/tools/video/compress" },
    ],
  };

  const howToSchema = data ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.howToTitle,
    totalTime: "PT2M",
    tool: { "@type": "HowToTool", name: "FileApps Video compressor" },
    step: data.howToSteps.map((s) => ({
      "@type": "HowToStep",
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
      {howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <ToolHero toolId="video-compress" />
      <VideoCompressClient />
      <ToolContentSection toolId="video-compress" />
      <ToolSeoContent toolId="video-compress" />
    </>
  );
}

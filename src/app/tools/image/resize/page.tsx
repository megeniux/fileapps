import type { Metadata } from "next";
import { ImageResizeClient } from "./client";
import { ToolContentSection } from "@/components/tools/tool-content";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolSeoContent } from "@/components/tools/tool-seo-content";
import { seoDataMap } from "@/lib/seo-data";

const data = seoDataMap["image-resize"];

export const metadata: Metadata = {
  title: "Image resizer",
  description: data?.metaDescription ?? "Free online image resizer — no upload required.",
  alternates: { canonical: "https://fileapps.click/tools/image/resize" },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://fileapps.click" },
      { "@type": "ListItem", position: 2, name: "Image tools", item: "https://fileapps.click/tools/image" },
      { "@type": "ListItem", position: 3, name: "Image resizer", item: "https://fileapps.click/tools/image/resize" },
    ],
  };

  const howToSchema = data ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.howToTitle,
    totalTime: "PT2M",
    tool: { "@type": "HowToTool", name: "FileApps Image resizer" },
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
      <ToolHero toolId="image-resize" />
      <ImageResizeClient />
      <ToolContentSection toolId="image-resize" />
      <ToolSeoContent toolId="image-resize" />
    </>
  );
}

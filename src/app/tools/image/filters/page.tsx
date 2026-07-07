import type { Metadata } from "next";
import { seoDataMap } from "@/lib/seo-data";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolContentSection } from "@/components/tools/tool-content";
import { ToolSeoContent } from "@/components/tools/tool-seo-content";
import { ImageFiltersClient } from "./client";

const data = seoDataMap["image-filters"];

export const metadata: Metadata = {
  title: "Image Filters & Effects — Free Online Editor | FileApps",
  description: data?.metaDescription ?? "Apply filters and effects to images online. Adjust brightness, contrast, saturation, add grayscale, sepia, blur and more — free, no upload.",
  alternates: { canonical: "https://fileapps.click/tools/image/filters" },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://fileapps.click" },
      { "@type": "ListItem", position: 2, name: "Image Tools", item: "https://fileapps.click/tools/image" },
      { "@type": "ListItem", position: 3, name: "Image Filters", item: "https://fileapps.click/tools/image/filters" },
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
      <ToolHero toolId="image-filters" />
      <ImageFiltersClient />
      <ToolContentSection toolId="image-filters" />
      <ToolSeoContent toolId="image-filters" />
    </>
  );
}

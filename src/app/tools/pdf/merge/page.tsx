import type { Metadata } from "next";
import { seoDataMap } from "@/lib/seo-data";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolContentSection } from "@/components/tools/tool-content";
import { ToolSeoContent } from "@/components/tools/tool-seo-content";
import { PdfMergeClient } from "./client";

const data = seoDataMap["pdf-merge"];

export const metadata: Metadata = {
  title: "Merge PDF Files Online — Free Tool | FileApps",
  description: data?.metaDescription ?? "Combine multiple PDF files into one. Drag to reorder pages, merge instantly — free, no upload, works in your browser.",
  alternates: { canonical: "https://fileapps.click/tools/pdf/merge" },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://fileapps.click" },
      { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://fileapps.click/tools/pdf" },
      { "@type": "ListItem", position: 3, name: "Merge PDF", item: "https://fileapps.click/tools/pdf/merge" },
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
      <ToolHero toolId="pdf-merge" />
      <PdfMergeClient />
      <ToolContentSection toolId="pdf-merge" />
      <ToolSeoContent toolId="pdf-merge" />
    </>
  );
}

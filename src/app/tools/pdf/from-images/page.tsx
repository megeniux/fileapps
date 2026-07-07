import type { Metadata } from "next";
import { PdfFromImagesClient } from "./client";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolSeoContent } from "@/components/tools/tool-seo-content";
import { seoDataMap } from "@/lib/seo-data";

const data = seoDataMap["pdf-from-images"];

export const metadata: Metadata = {
  title: "Images to PDF",
  description: data?.metaDescription ?? "Free online images to pdf — no upload required.",
  alternates: { canonical: "https://fileapps.click/tools/pdf/from-images" },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://fileapps.click" },
      { "@type": "ListItem", position: 2, name: "PDF tools", item: "https://fileapps.click/tools/pdf" },
      { "@type": "ListItem", position: 3, name: "Images to PDF", item: "https://fileapps.click/tools/pdf/from-images" },
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
      <ToolHero toolId="pdf-from-images" />
      <PdfFromImagesClient />
      <ToolSeoContent toolId="pdf-from-images" />
    </>
  );
}

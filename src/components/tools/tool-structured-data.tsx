import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { getToolBreadcrumbs, toAbsoluteUrl } from "@/lib/breadcrumbs";
import { getToolSeoSummary, normalizeSeoText } from "@/lib/tool-seo";

export function ToolStructuredData({ toolId }: { toolId: string }) {
  const { tool, data, heroTitle, metaTitle, metaDescription, keywords } = getToolSeoSummary(toolId);
  if (!tool) return null;
  const breadcrumbs = getToolBreadcrumbs(toolId);

  const howToSchema = data
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: data.howToTitle,
        totalTime: "PT2M",
        tool: { "@type": "HowToTool", name: `FileApps ${normalizeSeoText(tool.title)}` },
        step: data.howToSteps.map((step) => ({
          "@type": "HowToStep",
          name: step.name,
          text: step.text,
        })),
      }
    : null;

  const faqSchema = data
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: heroTitle,
    alternateName: metaTitle,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    url: toAbsoluteUrl(tool.href),
    description: metaDescription,
    keywords: keywords.join(", "),
    featureList: tool.features.map(normalizeSeoText),
  };

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <JsonLd data={softwareSchema} />
      {howToSchema && <JsonLd data={howToSchema} />}
      {faqSchema && <JsonLd data={faqSchema} />}
    </>
  );
}

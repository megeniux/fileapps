import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { getToolBreadcrumbs, toAbsoluteUrl } from "@/lib/breadcrumbs";
import { seoDataMap } from "@/lib/seo-data";
import { getToolById } from "@/lib/tools";

export function ToolStructuredData({ toolId }: { toolId: string }) {
  const tool = getToolById(toolId);
  if (!tool) return null;

  const data = seoDataMap[toolId];
  const breadcrumbs = getToolBreadcrumbs(toolId);

  const howToSchema = data
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: data.howToTitle,
        totalTime: "PT2M",
        tool: { "@type": "HowToTool", name: `FileApps ${tool.title}` },
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
    name: tool.title,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    url: toAbsoluteUrl(tool.href),
    description: data?.metaDescription ?? tool.description,
    featureList: tool.features,
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

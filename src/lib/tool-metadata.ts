import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { getToolSeoSummary, normalizeSeoText } from "@/lib/tool-seo";

export function buildToolMetadata(toolId: string, fallback?: { title?: string; description?: string }): Metadata {
  const { tool, metaTitle, metaDescription, keywords } = getToolSeoSummary(toolId);
  const title = normalizeSeoText(fallback?.title ?? metaTitle);
  const description = normalizeSeoText(fallback?.description ?? metaDescription);
  const canonical = tool ? `${SITE.url}${tool.href}` : SITE.url;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      type: "website",
      images: [{ url: SITE.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SITE.ogImage],
    },
  };
}

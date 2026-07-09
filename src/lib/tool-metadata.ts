import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { seoDataMap } from "@/lib/seo-data";
import { getToolById } from "@/lib/tools";

export function buildToolMetadata(toolId: string, fallback?: { title?: string; description?: string }): Metadata {
  const tool = getToolById(toolId);
  const data = seoDataMap[toolId];
  const title = fallback?.title ?? tool?.title ?? "Tool";
  const description = fallback?.description ?? data?.metaDescription ?? tool?.description ?? SITE.description;
  const canonical = tool ? `${SITE.url}${tool.href}` : SITE.url;

  return {
    title,
    description,
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

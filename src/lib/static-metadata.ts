import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

interface StaticMetadataOptions {
  title: string;
  description: string;
  path: string;
}

export function buildStaticMetadata({
  title,
  description,
  path,
}: StaticMetadataOptions): Metadata {
  const canonical = `${SITE.url}${path}`;

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

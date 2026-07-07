import type { MetadataRoute } from "next";
import { tools, categories } from "@/lib/tools";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now  = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,          lastModified: now, changeFrequency: "weekly",  priority: 1.0  },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "weekly",  priority: 0.9  },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5  },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.4  },
    { url: `${base}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3  },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly",  priority: 0.3  },
    { url: `${base}/terms`,   lastModified: now, changeFrequency: "yearly",  priority: 0.3  },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url:             `${base}/tools/${cat.id}`,
    lastModified:    now,
    changeFrequency: "weekly",
    priority:        0.85,
  }));

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url:             `${base}${tool.href}`,
    lastModified:    now,
    changeFrequency: "monthly",
    priority:        0.8,
  }));

  return [...staticPages, ...categoryPages, ...toolPages];
}

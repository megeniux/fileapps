import { JsonLd } from "@/components/seo/json-ld";
import { toAbsoluteUrl, type BreadcrumbItem } from "@/lib/breadcrumbs";

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: toAbsoluteUrl(item.href),
        })),
      }}
    />
  );
}

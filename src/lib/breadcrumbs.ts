import { SITE } from "@/lib/constants";
import { getCategoryById, getToolById, type ToolCategory } from "@/lib/tools";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function toAbsoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${SITE.url}${path}`;
}

export function getToolsIndexBreadcrumbs(): BreadcrumbItem[] {
  return [
    { label: "Home", href: "/" },
    { label: "All tools", href: "/tools" },
  ];
}

export function getCategoryBreadcrumbs(categoryId: ToolCategory): BreadcrumbItem[] {
  const category = getCategoryById(categoryId);
  if (!category) {
    return getToolsIndexBreadcrumbs();
  }

  return [
    { label: "Home", href: "/" },
    { label: "All tools", href: "/tools" },
    { label: category.label, href: `/tools/${category.id}` },
  ];
}

export function getToolBreadcrumbs(toolId: string): BreadcrumbItem[] {
  const tool = getToolById(toolId);
  if (!tool) {
    return getToolsIndexBreadcrumbs();
  }

  const category = getCategoryById(tool.category);

  return [
    { label: "Home", href: "/" },
    { label: "All tools", href: "/tools" },
    {
      label: category?.label ?? "Tools",
      href: category ? `/tools/${category.id}` : "/tools",
    },
    { label: tool.title, href: tool.href },
  ];
}

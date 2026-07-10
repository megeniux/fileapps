import {
  AudioLines,
  Check,
  Combine,
  FileDown,
  Files,
  ImageIcon,
  Maximize,
  Scissors,
  Sparkles,
  Subtitles,
  Video,
  WandSparkles,
  FileText,
  Clapperboard,
  VolumeX,
  Gauge,
  Crop,
  RotateCw,
  RotateCcw,
  FileImage,
  Music,
  PenTool,
  FilePlus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav";
import { getToolBreadcrumbs } from "@/lib/breadcrumbs";
import { getToolHeroTitle, getToolSeoData, normalizeSeoText } from "@/lib/tool-seo";
import { cn } from "@/lib/utils";
import { categories, getToolById, type ToolCategory } from "@/lib/tools";

const toolIconMap: Record<string, React.ElementType> = {
  Video,
  FileDown,
  Scissors,
  Combine,
  Sparkles,
  Subtitles,
  AudioLines,
  ImageUp: ImageIcon,
  Maximize,
  Files,
  Clapperboard,
  VolumeX,
  Gauge,
  Crop,
  RotateCw,
  RotateCcw,
  FileImage,
  FileText,
  Music,
  PenTool,
  FilePlus,
};

const categoryIconMap: Record<ToolCategory, React.ElementType> = {
  video: Video,
  audio: AudioLines,
  image: ImageIcon,
  pdf: FileText,
};

export function ToolHero({ toolId }: { toolId: string }) {
  const tool = getToolById(toolId);
  if (!tool) return null;

  const category = categories.find((item) => item.id === tool.category);
  const breadcrumbs = getToolBreadcrumbs(toolId);
  const data = getToolSeoData(toolId);
  const ToolIcon = toolIconMap[tool.icon] || WandSparkles;
  const CategoryIcon = categoryIconMap[tool.category];
  const featureItems = tool.features.slice(0, 3);
  const heroTitle = getToolHeroTitle(toolId);
  const heroDescription = data?.metaDescription ?? normalizeSeoText(tool.description);

  return (
    <section className="border-b bg-gradient-to-b from-background to-muted/30">
      <div className="container py-10 md:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.25fr)_auto]">
          <div className="space-y-5">
            <BreadcrumbNav items={breadcrumbs} />

            <div className="flex flex-wrap items-center gap-3">
              {category && (
                <Badge
                  variant="secondary"
                  className={cn(
                    "rounded-full border-0 bg-gradient-to-r px-3 py-1 text-white",
                    category.gradient
                  )}
                >
                  <CategoryIcon className="mr-1.5 h-3.5 w-3.5" />
                  {category.label}
                </Badge>
              )}
              <Badge variant="outline" className="rounded-full">
                {tool.formats.length} formats supported
              </Badge>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {heroTitle}
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
                {heroDescription}
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-3">
              {featureItems.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 rounded-xl border bg-card/70 p-3 text-sm text-muted-foreground shadow-sm"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{normalizeSeoText(feature)}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Supported formats
              </p>
              <div className="flex flex-wrap gap-2">
                {tool.formats.map((format) => (
                  <Badge key={format} variant="secondary" className="rounded-full">
                    {format}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="rounded-2xl bg-muted/40 p-4 shadow-sm ring-1 ring-border/60">
              <div
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                  category?.gradient ?? "from-slate-600 to-slate-400"
                )}
              >
                <ToolIcon className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

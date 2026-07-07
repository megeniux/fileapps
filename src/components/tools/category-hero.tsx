import { AudioLines, ImageIcon, Video, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { categories, type ToolCategory } from "@/lib/tools";

const categoryIconMap: Record<ToolCategory, React.ElementType> = {
  video: Video,
  audio: AudioLines,
  image: ImageIcon,
  pdf: FileText,
};

export function CategoryHero({
  categoryId,
  toolCount,
}: {
  categoryId: ToolCategory;
  toolCount: number;
}) {
  const category = categories.find((item) => item.id === categoryId);
  if (!category) return null;

  const CategoryIcon = categoryIconMap[category.id];

  return (
    <section className="border-b bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container py-12 md:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_auto]">
          <div className="space-y-5 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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
              <Badge variant="outline" className="rounded-full">
                {toolCount} tools available
              </Badge>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                <span
                  className={cn(
                    "bg-gradient-to-r bg-clip-text text-transparent",
                    category.gradient
                  )}
                >
                  {category.label}
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg lg:mx-0">
                {category.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start">
              <span className="rounded-full border bg-card px-3 py-1 shadow-sm">
                100% browser-based
              </span>
              <span className="rounded-full border bg-card px-3 py-1 shadow-sm">
                No uploads
              </span>
              <span className="rounded-full border bg-card px-3 py-1 shadow-sm">
                Free forever
              </span>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="rounded-3xl bg-muted/40 p-4 shadow-sm ring-1 ring-border/60">
              <div
                className={cn(
                  "flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br text-white shadow-lg",
                  category.gradient
                )}
              >
                <CategoryIcon className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import {
  Activity,
  AudioWaveform,
  ArrowRight,
  Check,
  Clock,
  FileOutput,
  Gauge,
  ImageIcon,
  Maximize2,
  Monitor,
  Video,
  Volume2,
  Wand2,
  Waves,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { categories, getToolById, getToolsByCategory, type ToolDefinition } from "@/lib/tools";

const featureIconMatchers: Array<{ test: RegExp; icon: React.ElementType }> = [
  { test: /(format|convert|output)/i, icon: FileOutput },
  { test: /(quality|compress|size|crf|bitrate)/i, icon: Gauge },
  { test: /(time|trim|start|end|duration)/i, icon: Clock },
  { test: /(resolution|resize|dimension|scale)/i, icon: Monitor },
  { test: /(audio|sound|bitrate|channel)/i, icon: Volume2 },
  { test: /(effect|filter|caption|subtitle|watermark)/i, icon: Wand2 },
  { test: /(crop|aspect)/i, icon: Maximize2 },
  { test: /(sample rate|wave|waveform)/i, icon: Waves },
  { test: /(channels|stereo|mono)/i, icon: AudioWaveform },
  { test: /(speed|progress|percentage)/i, icon: Activity },
];

const relatedIconMap: Record<string, React.ElementType> = {
  Video,
  FileDown: Gauge,
  Scissors: Clock,
  Combine: ArrowRight,
  Sparkles: Wand2,
  Subtitles: Wand2,
  AudioLines: Volume2,
  ImageUp: ImageIcon,
  Maximize: Maximize2,
  Files: FileOutput,
};

function getFeatureIcon(feature: string) {
  return featureIconMatchers.find(({ test }) => test.test(feature))?.icon || Check;
}

function getCategoryLabel(categoryId: ToolDefinition["category"]) {
  return categories.find((category) => category.id === categoryId)?.label ?? "Tools";
}

function HowItWorks({ steps }: { steps: string[] }) {
  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">How It Works</h2>
        <p className="text-sm text-muted-foreground">A simple three-step flow from upload to download.</p>
      </div>
      <ol className="relative space-y-4 pl-1">
        {steps.map((step, i) => (
          <li key={i} className="relative flex gap-4">
            {i < steps.length - 1 && (
              <span className="absolute left-3 top-8 h-[calc(100%+1rem)] w-px bg-border" />
            )}
            <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-sm">
              {i + 1}
            </span>
            <div className="rounded-xl border bg-card/70 p-4 shadow-sm">
              <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Features({ items }: { items: string[] }) {
  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Features</h2>
        <p className="text-sm text-muted-foreground">Key capabilities surfaced as quick-scan cards.</p>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {items.map((item, i) => (
          <li key={i}>
            <Card className="h-full border-border/70 bg-background/60 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="flex items-start gap-3 p-4">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {(() => {
                    const Icon = getFeatureIcon(item);
                    return <Icon className="h-4 w-4" />;
                  })()}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RelatedTools({ tool }: { tool: ToolDefinition }) {
  const relatedTools = getToolsByCategory(tool.category)
    .filter((relatedTool) => relatedTool.id !== tool.id)
    .slice(0, 3);

  if (!relatedTools.length) return null;

  const categoryLabel = getCategoryLabel(tool.category);

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Related Tools</h2>
          <p className="text-sm text-muted-foreground">
            More {categoryLabel.toLowerCase()} you can use right now.
          </p>
        </div>
        <Badge variant="outline" className="hidden rounded-full md:inline-flex">
          {categoryLabel}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {relatedTools.map((relatedTool) => {
          const Icon = relatedIconMap[relatedTool.icon] || Video;
          return (
            <Card
              key={relatedTool.id}
              className="group border-border/70 bg-background/60 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="space-y-4 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{relatedTool.title}</p>
                    <p className="text-xs text-muted-foreground">{relatedTool.formats.slice(0, 3).join(" · ")}</p>
                  </div>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">{relatedTool.description}</p>
                <Link
                  href={relatedTool.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Open tool
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export function ToolContentSection({ toolId }: { toolId: string }) {
  const tool = getToolById(toolId);
  if (!tool) return null;

  return (
    <div className="container py-12 space-y-12">
      <HowItWorks steps={tool.howItWorks} />
      <Features items={tool.features} />
      <RelatedTools tool={tool} />
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Video, Music, ImageIcon, FileText, Crop, RotateCw, RotateCcw, Scissors, Combine,
  VolumeX, Clapperboard, ArrowRight, FileDown, FileImage, Files, Maximize,
  Sparkles, Gauge, AudioLines, PenTool, FilePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { tools, categories } from "@/lib/tools";
import { CategoryHero } from "@/components/tools/category-hero";

const iconMap: Record<string, React.ElementType> = {
  Video, FileDown, Scissors, Combine, Sparkles, Subtitles: Video,
  Clapperboard, VolumeX, Gauge, RotateCcw,
  AudioLines, Music,
  ImageIcon, ImageUp: ImageIcon, Maximize, Files, Crop, RotateCw,
  FileText, FileImage, PenTool, FilePlus,
};

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.id === category);
  if (!cat) return {};
  return {
    title: cat.label,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories.find((c) => c.id === category);
  if (!cat) notFound();

  const catTools = tools.filter((t) => t.category === cat.id);

  return (
    <>
      <CategoryHero categoryId={cat.id} toolCount={catTools.length} />

      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {catTools.map((tool) => {
              const Icon = iconMap[tool.icon] ?? Video;
              return (
                <Card key={tool.id} className="group hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary w-fit">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg mt-3">{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.formats.slice(0, 4).map((f) => (
                        <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
                      ))}
                      {tool.formats.length > 4 && (
                        <Badge variant="outline" className="text-xs">+{tool.formats.length - 4}</Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={tool.href}>
                        Open Tool <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import {
  Video,
  Music,
  ImageIcon,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { tools, categories } from "@/lib/tools";

export const metadata: Metadata = {
  title: "All Media Tools",
  description: `Browse all ${tools.length} free online media tools. Convert, compress, trim, merge, and edit video, audio, and image files directly in your browser.`,
};

const iconMap = {
  Video, FileDown: Video, Scissors: Video, Combine: Video,
  Sparkles: Video, Subtitles: Video, AudioLines: Music,
  ImageUp: ImageIcon, Maximize: ImageIcon, Files: ImageIcon,
} as Record<string, React.ElementType>;

const categoryIcons = { video: Video, audio: Music, image: ImageIcon } as Record<string, React.ElementType>;

export default function ToolsPage() {
  return (
    <>
      <section className="py-12 md:py-16 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container text-center">
          <Badge variant="secondary" className="mb-4">
            {tools.length} Free Tools
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Media Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional-grade video, audio, and image processing tools — all free, all in your browser.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          {categories.map((cat) => {
            const CatIcon = categoryIcons[cat.id];
            const catTools = tools.filter((t) => t.category === cat.id);
            return (
              <div key={cat.id} className="mb-16 last:mb-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg`}>
                    <CatIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{cat.label}</h2>
                    <p className="text-muted-foreground text-sm">{cat.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catTools.map((tool) => {
                    const Icon = iconMap[tool.icon] || Video;
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
            );
          })}
        </div>
      </section>
    </>
  );
}

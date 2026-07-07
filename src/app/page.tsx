import type { Metadata } from "next";
import Link from "next/link";
import {
  Video,
  Music,
  ImageIcon,
  FileText,
  Shield,
  Zap,
  Gift,
  WifiOff,
  Infinity,
  Lock,
  FileDown,
  Scissors,
  Combine,
  Sparkles,
  Subtitles,
  AudioLines,
  ImageUp,
  Maximize,
  Files,
  Clapperboard,
  VolumeX,
  Crop,
  RotateCw,
  RotateCcw,
  FileImage,
  Gauge,
  PenTool,
  FilePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { categories, tools } from "@/lib/tools";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy-First Browser File Tools",
  description: SITE.description,
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: SITE.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
  },
};

const categoryIcons = {
  video: Video,
  audio: Music,
  image: ImageIcon,
  pdf: FileText,
} as Record<string, React.ElementType>;

const categoryColors = {
  video: { bg: "bg-purple-100", text: "text-purple-700" },
  audio: { bg: "bg-green-100", text: "text-green-700" },
  image: { bg: "bg-amber-100", text: "text-amber-700" },
  pdf: { bg: "bg-red-100", text: "text-red-700" },
} as Record<string, { bg: string; text: string }>;

const toolIcons = {
  Video,
  FileDown,
  Scissors,
  Combine,
  Sparkles,
  Subtitles,
  AudioLines,
  ImageUp,
  Maximize,
  Files,
  Image: ImageIcon,
  Clapperboard,
  Music,
  VolumeX,
  Crop,
  RotateCw,
  RotateCcw,
  FileImage,
  FileText,
  Gauge,
  PenTool,
  FilePlus,
} as Record<string, React.ElementType>;

const features = [
  {
    icon: Shield,
    title: "100% Private",
    description: "Your files are processed entirely on your device. No uploads, no servers, no privacy risk.",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Browser-native FFmpeg means no upload queues. Your hardware does the work.",
  },
  {
    icon: Infinity,
    title: "No Limits",
    description: "Process as many files as you want. No daily caps, no file size restrictions.",
  },
  {
    icon: Gift,
    title: "Always Free",
    description: "Every tool is completely free with no watermarks, time limits, or paywalls.",
  },
];

const faqs = [
  {
    q: "Are these tools really free?",
    a: "Yes! All tools on FileApps are completely free with no hidden limits, watermarks, or locked features.",
  },
  {
    q: "Do my files ever leave my device?",
    a: "No. All processing runs fully in your browser using FFmpeg compiled to WebAssembly. Your media files never leave your computer.",
  },
  {
    q: "What browsers and devices are supported?",
    a: "Any modern browser works - Chrome, Edge, Firefox, Safari, and Opera on desktop or mobile.",
  },
  {
    q: "Are there any file size or usage limits?",
    a: "There are no artificial limits from us. The only constraint is your device's available memory and processing power.",
  },
  {
    q: "Can I use the tools offline?",
    a: "Yes! After the page has loaded once, all tools continue to work even without an internet connection.",
  },
  {
    q: "How does this compare to desktop software?",
    a: "FileApps uses the same FFmpeg engine that powers professional desktop editors, wrapped in a simple browser interface.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: SITE.name,
            description: SITE.description,
            applicationCategory: "Multimedia",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0" },
            featureList: tools.map((t) => t.title),
          }),
        }}
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700">
              <Lock className="h-3.5 w-3.5" />
              100% private - files stay on your device
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Media tools that work{" "}
              <span className="text-primary">in your browser</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {SITE.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <Button asChild size="lg">
                <Link href="/tools/video">
                  <Video className="mr-2 h-4 w-4" /> Video Tools
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/tools/image">
                  <ImageIcon className="mr-2 h-4 w-4" /> Image Tools
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/tools/audio">
                  <Music className="mr-2 h-4 w-4" /> Audio Tools
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-purple-500" /> No file uploads</span>
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-yellow-500" /> Browser-native FFmpeg</span>
              <span className="flex items-center gap-1.5"><Gift className="h-4 w-4 text-green-500" /> Free forever</span>
              <span className="flex items-center gap-1.5"><WifiOff className="h-4 w-4 text-blue-500" /> Works offline</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse tools</h2>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {[
                { label: "All", href: "/tools" },
                { label: "Video", href: "/tools/video" },
                { label: "Audio", href: "/tools/audio" },
                { label: "Image", href: "/tools/image" },
              ].map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="rounded-full border px-4 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id];
            const colors = categoryColors[cat.id] ?? { bg: "bg-gray-100", text: "text-gray-700" };
            const catTools = tools.filter((t) => t.category === cat.id);
            return (
              <div key={cat.id} className="mb-16 last:mb-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{cat.label}</h3>
                    <p className="text-muted-foreground text-sm">{cat.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catTools.map((tool) => {
                    const ToolIcon = toolIcons[tool.icon] || Video;
                    return (
                      <Link key={tool.id} href={tool.href} className="group block border rounded-xl hover:shadow-md transition-shadow p-4">
                        <div className="flex items-start gap-3">
                          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.bg} ${colors.text}`}>
                            <ToolIcon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <p className="font-bold text-sm leading-snug">{tool.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{tool.description}</p>
                          </div>
                        </div>
                        <div className="mt-3 text-xs font-medium text-primary group-hover:underline">
                          Open {"->"}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/40">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why {SITE.name}?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional FFmpeg processing with zero installations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border bg-background p-6 text-center">
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Common questions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about {SITE.name}
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-purple-700 text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Process Your Media?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Pick a category and start using professional tools instantly - no account required
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.id];
              return (
                <Button key={cat.id} asChild variant="secondary" size="lg">
                  <Link href={`/tools/${cat.id}`}>
                    <Icon className="mr-2 h-4 w-4" /> {cat.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

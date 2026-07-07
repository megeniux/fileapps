"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SITE } from "@/lib/constants";
import {
  Menu,
  Video,
  Music,
  ImageIcon,
  FileText,
  ChevronDown,
  ChevronRight,
  Lock,
} from "lucide-react";
import { tools, categories } from "@/lib/tools";

type CatId = "video" | "audio" | "image" | "pdf";

const categoryIcons: Record<CatId, React.ElementType> = {
  video: Video,
  audio: Music,
  image: ImageIcon,
  pdf: FileText,
};

const categoryColors: Record<CatId, { btn: string; icon: string }> = {
  video: { btn: "text-purple-700", icon: "bg-purple-100 text-purple-700" },
  audio: { btn: "text-green-700", icon: "bg-green-100 text-green-700" },
  image: { btn: "text-amber-700", icon: "bg-amber-100 text-amber-700" },
  pdf: { btn: "text-red-700", icon: "bg-red-100 text-red-700" },
};

const videoColumns = [
  {
    label: "Convert & Compress",
    ids: ["video-convert", "video-compress"],
  },
  {
    label: "Edit",
    ids: ["video-trim", "video-merge", "video-mute", "video-speed", "video-reverse", "video-crop"],
  },
  {
    label: "Export",
    ids: ["video-gif", "video-extract-audio"],
  },
];

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<null | CatId>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div ref={navRef} className="sticky top-0 z-50 w-full">
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/images/branding/logo-xl.svg" alt={SITE.name} className="h-8 w-auto" />
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {SITE.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {(["video", "audio", "image", "pdf"] as CatId[]).map((catId) => {
              const cat = categories.find((c) => c.id === catId);
              if (!cat) return null;
              const CatIcon = categoryIcons[catId];
              const isOpen = openMenu === catId;
              return (
                <Button
                  key={catId}
                  variant="ghost"
                  className={cn(
                    "gap-1.5 text-sm font-medium transition-colors",
                    isOpen ? categoryColors[catId].btn : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setOpenMenu(isOpen ? null : catId)}
                  aria-expanded={isOpen}
                >
                  <CatIcon className="h-4 w-4" />
                  {cat.label.replace(" Tools", "")}
                  <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
                </Button>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
              <Link href="/tools">All tools</Link>
            </Button>
            <ThemeToggle />
            <div className="md:hidden">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col gap-1 mt-8">
                    <Link
                      href="/tools"
                      onClick={() => setSheetOpen(false)}
                      className="flex items-center gap-2 px-2 py-2.5 text-base font-semibold rounded-md hover:bg-muted transition-colors"
                    >
                      All Tools
                    </Link>

                    {categories.map((cat) => {
                      const CatIcon = categoryIcons[cat.id as CatId];
                      const catTools = tools.filter((t) => t.category === cat.id);
                      const open = mobileSection === cat.id;
                      const colors = categoryColors[cat.id as CatId];
                      return (
                        <div key={cat.id}>
                          <button
                            type="button"
                            onClick={() => setMobileSection(open ? null : cat.id)}
                            className={cn(
                              "w-full flex items-center justify-between px-2 py-2.5 text-base font-medium rounded-md hover:bg-muted transition-colors",
                              colors.btn
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <CatIcon className="h-5 w-5" />
                              {cat.label}
                            </span>
                            <ChevronRight
                              className={cn(
                                "h-4 w-4 transition-transform",
                                open && "rotate-90"
                              )}
                            />
                          </button>
                          {open && (
                            <div className="ml-7 flex flex-col gap-0.5 mb-1">
                              {catTools.map((tool) => (
                                <Link
                                  key={tool.id}
                                  href={tool.href}
                                  onClick={() => setSheetOpen(false)}
                                  className={cn(
                                    "px-2 py-1.5 text-sm rounded-md hover:bg-muted transition-colors",
                                    pathname === tool.href
                                      ? "text-primary font-medium"
                                      : "text-muted-foreground"
                                  )}
                                >
                                  {tool.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    <div className="border-t mt-2 pt-2">
                      <Link
                        href="/contact"
                        onClick={() => setSheetOpen(false)}
                        className="flex items-center gap-2 px-2 py-2.5 text-base font-medium rounded-md hover:bg-muted transition-colors text-muted-foreground"
                      >
                        Contact
                      </Link>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>

        </div>
      </header>

      {/* Mega-menu panels */}
      {openMenu && (
        <div className="absolute left-0 w-full bg-background border-b shadow-lg z-40">
          <div className="container py-6">

            {openMenu === "video" && (
              <div className="grid grid-cols-3 gap-8">
                {videoColumns.map((col) => (
                  <div key={col.label}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      {col.label}
                    </p>
                    <div className="space-y-1">
                      {col.ids.map((id) => {
                        const tool = tools.find((t) => t.id === id);
                        if (!tool) return null;
                        return (
                          <Link
                            key={id}
                            href={tool.href}
                            onClick={() => setOpenMenu(null)}
                            className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted transition-colors"
                          >
                            <span className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md", categoryColors.video.icon)}>
                              <Video className="h-4 w-4" />
                            </span>
                            <span>
                              <span className="block text-sm font-semibold">{tool.title}</span>
                              <span className="block text-xs text-muted-foreground leading-snug">{tool.description}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {openMenu === "audio" && (
              <div className="grid grid-cols-3 gap-4">
                {tools.filter((t) => t.category === "audio").map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    onClick={() => setOpenMenu(null)}
                    className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted transition-colors"
                  >
                    <span className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md", categoryColors.audio.icon)}>
                      <Music className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{tool.title}</span>
                      <span className="block text-xs text-muted-foreground leading-snug">{tool.description}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {openMenu === "image" && (
              <div className="grid grid-cols-3 gap-4">
                {tools.filter((t) => t.category === "image").map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    onClick={() => setOpenMenu(null)}
                    className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted transition-colors"
                  >
                    <span className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md", categoryColors.image.icon)}>
                      <ImageIcon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{tool.title}</span>
                      <span className="block text-xs text-muted-foreground leading-snug">{tool.description}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {openMenu === "pdf" && (
              <div className="grid grid-cols-3 gap-4">
                {tools.filter((t) => t.category === "pdf").map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    onClick={() => setOpenMenu(null)}
                    className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted transition-colors"
                  >
                    <span className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md", categoryColors.pdf.icon)}>
                      <FileText className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{tool.title}</span>
                      <span className="block text-xs text-muted-foreground leading-snug">{tool.description}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

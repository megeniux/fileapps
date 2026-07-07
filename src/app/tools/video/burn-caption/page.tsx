import type { Metadata } from "next";
import { BurnCaptionClient } from "./client";
import { ToolContentSection } from "@/components/tools/tool-content";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolSeoContent } from "@/components/tools/tool-seo-content";

export const metadata: Metadata = {
  title: "Burn Captions into Video",
  description: "Permanently burn SRT/VTT subtitles or custom text captions into your videos online for free.",
};

export default function Page() {
  return (
    <>
      <ToolHero toolId="video-burn-caption" />
      <BurnCaptionClient />
      <ToolContentSection toolId="video-burn-caption" />
      <ToolSeoContent toolId="video-burn-caption" />
    </>
  );
}

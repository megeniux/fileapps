import type { Metadata } from "next";
import { VideoEffectsClient } from "./client";
import { ToolContentSection } from "@/components/tools/tool-content";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolSeoContent } from "@/components/tools/tool-seo-content";

export const metadata: Metadata = {
  title: "Video Effects",
  description: "Apply filters, speed changes, reverse, and rotation to your videos online for free.",
};

export default function Page() {
  return (
    <>
      <ToolHero toolId="video-effects" />
      <VideoEffectsClient />
      <ToolContentSection toolId="video-effects" />
      <ToolSeoContent toolId="video-effects" />
    </>
  );
}

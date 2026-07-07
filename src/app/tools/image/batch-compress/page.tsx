import type { Metadata } from "next";
import { BatchCompressClient } from "./client";
import { ToolContentSection } from "@/components/tools/tool-content";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolSeoContent } from "@/components/tools/tool-seo-content";

export const metadata: Metadata = {
  title: "Batch Image Compressor",
  description: "Compress multiple images at once online for free. Batch optimize JPG, PNG, and WebP files.",
};

export default function Page() {
  return (
    <>
      <ToolHero toolId="image-batch-compress" />
      <BatchCompressClient />
      <ToolContentSection toolId="image-batch-compress" />
      <ToolSeoContent toolId="image-batch-compress" />
    </>
  );
}

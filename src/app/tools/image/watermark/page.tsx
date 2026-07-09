import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { ImageWatermarkClient } from "./client";

export const metadata = buildToolMetadata("image-watermark");

export default function Page() {
  return (
    <ToolPageScaffold toolId="image-watermark">
      <ImageWatermarkClient />
    </ToolPageScaffold>
  );
}

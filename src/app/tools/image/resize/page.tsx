import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { ImageResizeClient } from "./client";

export const metadata = buildToolMetadata("image-resize");

export default function Page() {
  return (
    <ToolPageScaffold toolId="image-resize">
      <ImageResizeClient />
    </ToolPageScaffold>
  );
}

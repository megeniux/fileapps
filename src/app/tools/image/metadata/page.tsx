import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { ImageMetadataClient } from "./client";

export const metadata = buildToolMetadata("image-metadata");

export default function Page() {
  return (
    <ToolPageScaffold toolId="image-metadata">
      <ImageMetadataClient />
    </ToolPageScaffold>
  );
}

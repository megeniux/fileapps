import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { ImageThumbnailClient } from "./client";

export const metadata = buildToolMetadata("image-thumbnail");

export default function Page() {
  return (
    <ToolPageScaffold toolId="image-thumbnail">
      <ImageThumbnailClient />
    </ToolPageScaffold>
  );
}

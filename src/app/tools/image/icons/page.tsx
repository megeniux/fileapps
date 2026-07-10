import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { ImageIconsClient } from "./client";

export const metadata = buildToolMetadata("image-icons");

export default function Page() {
  return (
    <ToolPageScaffold toolId="image-icons">
      <ImageIconsClient />
    </ToolPageScaffold>
  );
}

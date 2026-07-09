import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { ImageCompressClient } from "./client";

export const metadata = buildToolMetadata("image-compress");

export default function Page() {
  return (
    <ToolPageScaffold toolId="image-compress">
      <ImageCompressClient />
    </ToolPageScaffold>
  );
}

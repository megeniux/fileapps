import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { ImageConvertClient } from "./client";

export const metadata = buildToolMetadata("image-convert");

export default function Page() {
  return (
    <ToolPageScaffold toolId="image-convert">
      <ImageConvertClient />
    </ToolPageScaffold>
  );
}

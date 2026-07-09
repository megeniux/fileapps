import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { ImageCropClient } from "./client";

export const metadata = buildToolMetadata("image-crop");

export default function Page() {
  return (
    <ToolPageScaffold toolId="image-crop">
      <ImageCropClient />
    </ToolPageScaffold>
  );
}

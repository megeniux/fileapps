import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { PdfFromImagesClient } from "./client";

export const metadata = buildToolMetadata("pdf-from-images");

export default function Page() {
  return (
    <ToolPageScaffold toolId="pdf-from-images">
      <PdfFromImagesClient />
    </ToolPageScaffold>
  );
}

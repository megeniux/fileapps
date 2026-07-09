import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { PdfToImagesClient } from "./client";

export const metadata = buildToolMetadata("pdf-to-images");

export default function Page() {
  return (
    <ToolPageScaffold toolId="pdf-to-images">
      <PdfToImagesClient />
    </ToolPageScaffold>
  );
}

import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { PdfCompressClient } from "./client";

export const metadata = buildToolMetadata("pdf-compress");

export default function Page() {
  return (
    <ToolPageScaffold toolId="pdf-compress">
      <PdfCompressClient />
    </ToolPageScaffold>
  );
}

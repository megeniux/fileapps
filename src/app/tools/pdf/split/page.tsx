import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { PdfSplitClient } from "./client";

export const metadata = buildToolMetadata("pdf-split");

export default function Page() {
  return (
    <ToolPageScaffold toolId="pdf-split">
      <PdfSplitClient />
    </ToolPageScaffold>
  );
}

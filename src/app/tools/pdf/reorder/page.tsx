import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { PdfReorderClient } from "./client";

export const metadata = buildToolMetadata("pdf-reorder");

export default function Page() {
  return (
    <ToolPageScaffold toolId="pdf-reorder">
      <PdfReorderClient />
    </ToolPageScaffold>
  );
}

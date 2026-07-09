import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { PdfMergeClient } from "./client";

export const metadata = buildToolMetadata("pdf-merge");

export default function Page() {
  return (
    <ToolPageScaffold toolId="pdf-merge">
      <PdfMergeClient />
    </ToolPageScaffold>
  );
}

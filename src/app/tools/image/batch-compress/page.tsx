import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { BatchCompressClient } from "./client";

export const metadata = buildToolMetadata("image-batch-compress");

export default function Page() {
  return (
    <ToolPageScaffold toolId="image-batch-compress">
      <BatchCompressClient />
    </ToolPageScaffold>
  );
}

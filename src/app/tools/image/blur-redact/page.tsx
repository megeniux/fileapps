import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { ImageBlurRedactClient } from "./client";

export const metadata = buildToolMetadata("image-blur-redact");

export default function Page() {
  return (
    <ToolPageScaffold toolId="image-blur-redact">
      <ImageBlurRedactClient />
    </ToolPageScaffold>
  );
}

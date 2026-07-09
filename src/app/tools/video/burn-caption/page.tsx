import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { BurnCaptionClient } from "./client";

export const metadata = buildToolMetadata("video-burn-caption");

export default function Page() {
  return (
    <ToolPageScaffold toolId="video-burn-caption">
      <BurnCaptionClient />
    </ToolPageScaffold>
  );
}

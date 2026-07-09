import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { VideoEffectsClient } from "./client";

export const metadata = buildToolMetadata("video-effects");

export default function Page() {
  return (
    <ToolPageScaffold toolId="video-effects">
      <VideoEffectsClient />
    </ToolPageScaffold>
  );
}

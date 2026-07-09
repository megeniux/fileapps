import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { VideoMergeClient } from "./client";

export const metadata = buildToolMetadata("video-merge");

export default function Page() {
  return (
    <ToolPageScaffold toolId="video-merge">
      <VideoMergeClient />
    </ToolPageScaffold>
  );
}

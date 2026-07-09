import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { VideoTrimClient } from "./client";

export const metadata = buildToolMetadata("video-trim");

export default function Page() {
  return (
    <ToolPageScaffold toolId="video-trim">
      <VideoTrimClient />
    </ToolPageScaffold>
  );
}

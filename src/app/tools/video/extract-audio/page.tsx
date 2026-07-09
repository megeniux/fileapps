import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { VideoExtractAudioClient } from "./client";

export const metadata = buildToolMetadata("video-extract-audio");

export default function Page() {
  return (
    <ToolPageScaffold toolId="video-extract-audio">
      <VideoExtractAudioClient />
    </ToolPageScaffold>
  );
}

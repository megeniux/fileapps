import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { VideoGifClient } from "./client";

export const metadata = buildToolMetadata("video-gif");

export default function Page() {
  return (
    <ToolPageScaffold toolId="video-gif">
      <VideoGifClient />
    </ToolPageScaffold>
  );
}

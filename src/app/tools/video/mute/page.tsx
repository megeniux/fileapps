import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { VideoMuteClient } from "./client";

export const metadata = buildToolMetadata("video-mute");

export default function Page() {
  return (
    <ToolPageScaffold toolId="video-mute">
      <VideoMuteClient />
    </ToolPageScaffold>
  );
}

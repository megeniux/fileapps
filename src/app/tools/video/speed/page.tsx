import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { VideoSpeedClient } from "./client";

export const metadata = buildToolMetadata("video-speed");

export default function Page() {
  return (
    <ToolPageScaffold toolId="video-speed">
      <VideoSpeedClient />
    </ToolPageScaffold>
  );
}

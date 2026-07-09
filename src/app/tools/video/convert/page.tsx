import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { VideoConvertClient } from "./client";

export const metadata = buildToolMetadata("video-convert");

export default function Page() {
  return (
    <ToolPageScaffold toolId="video-convert">
      <VideoConvertClient />
    </ToolPageScaffold>
  );
}

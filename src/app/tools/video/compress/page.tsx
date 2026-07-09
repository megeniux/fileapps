import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { VideoCompressClient } from "./client";

export const metadata = buildToolMetadata("video-compress");

export default function Page() {
  return (
    <ToolPageScaffold toolId="video-compress">
      <VideoCompressClient />
    </ToolPageScaffold>
  );
}

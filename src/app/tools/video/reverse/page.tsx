import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { VideoReverseClient } from "./client";

export const metadata = buildToolMetadata("video-reverse");

export default function Page() {
  return (
    <ToolPageScaffold toolId="video-reverse">
      <VideoReverseClient />
    </ToolPageScaffold>
  );
}

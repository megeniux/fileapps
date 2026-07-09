import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { VideoCropClient } from "./client";

export const metadata = buildToolMetadata("video-crop");

export default function Page() {
  return (
    <ToolPageScaffold toolId="video-crop">
      <VideoCropClient />
    </ToolPageScaffold>
  );
}

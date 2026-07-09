import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { AudioMergeClient } from "./client";

export const metadata = buildToolMetadata("audio-merge");

export default function Page() {
  return (
    <ToolPageScaffold toolId="audio-merge">
      <AudioMergeClient />
    </ToolPageScaffold>
  );
}

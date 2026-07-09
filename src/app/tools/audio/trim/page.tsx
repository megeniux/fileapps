import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { AudioTrimClient } from "./client";

export const metadata = buildToolMetadata("audio-trim");

export default function Page() {
  return (
    <ToolPageScaffold toolId="audio-trim">
      <AudioTrimClient />
    </ToolPageScaffold>
  );
}

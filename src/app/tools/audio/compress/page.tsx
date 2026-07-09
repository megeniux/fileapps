import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { AudioCompressClient } from "./client";

export const metadata = buildToolMetadata("audio-compress");

export default function Page() {
  return (
    <ToolPageScaffold toolId="audio-compress">
      <AudioCompressClient />
    </ToolPageScaffold>
  );
}

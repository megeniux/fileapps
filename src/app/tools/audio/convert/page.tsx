import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { AudioConvertClient } from "./client";

export const metadata = buildToolMetadata("audio-convert");

export default function Page() {
  return (
    <ToolPageScaffold toolId="audio-convert">
      <AudioConvertClient />
    </ToolPageScaffold>
  );
}

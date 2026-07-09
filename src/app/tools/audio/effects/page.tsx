import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { AudioEffectsClient } from "./client";

export const metadata = buildToolMetadata("audio-effects");

export default function Page() {
  return (
    <ToolPageScaffold toolId="audio-effects">
      <AudioEffectsClient />
    </ToolPageScaffold>
  );
}

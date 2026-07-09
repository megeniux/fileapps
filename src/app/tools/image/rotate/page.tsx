import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { ImageRotateClient } from "./client";

export const metadata = buildToolMetadata("image-rotate");

export default function Page() {
  return (
    <ToolPageScaffold toolId="image-rotate">
      <ImageRotateClient />
    </ToolPageScaffold>
  );
}

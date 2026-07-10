import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { ImageSocialResizeClient } from "./client";

export const metadata = buildToolMetadata("image-social-resize");

export default function Page() {
  return (
    <ToolPageScaffold toolId="image-social-resize">
      <ImageSocialResizeClient />
    </ToolPageScaffold>
  );
}

import { ToolPageScaffold } from "@/components/tools/tool-page-scaffold";
import { buildToolMetadata } from "@/lib/tool-metadata";
import { ImageFiltersClient } from "./client";

export const metadata = buildToolMetadata("image-filters");

export default function Page() {
  return (
    <ToolPageScaffold toolId="image-filters">
      <ImageFiltersClient />
    </ToolPageScaffold>
  );
}

"use client";

import { ToolPageGenerator } from "@/components/tools/tool-page-generator";
import type { ToolPageConfig } from "@/lib/tool-types";

export function ToolPageClient({ config }: { config: ToolPageConfig }) {
  return <ToolPageGenerator config={config} />;
}

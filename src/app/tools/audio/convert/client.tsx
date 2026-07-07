"use client";

import { ToolPageGenerator } from "@/components/tools/tool-page-generator";
import { audioConvertConfig } from "@/lib/tool-configs";

export function AudioConvertClient() {
  return <ToolPageGenerator config={audioConvertConfig} />;
}

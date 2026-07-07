"use client";

import { ToolPageGenerator } from "@/components/tools/tool-page-generator";
import { videoConvertConfig } from "@/lib/tool-configs";

export function VideoConvertClient() {
  return <ToolPageGenerator config={videoConvertConfig} />;
}

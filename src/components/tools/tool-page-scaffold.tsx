import { ToolContentSection } from "@/components/tools/tool-content";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolSeoContent } from "@/components/tools/tool-seo-content";
import { ToolStructuredData } from "@/components/tools/tool-structured-data";

export function ToolPageScaffold({
  toolId,
  children,
  includeContentSection = true,
}: {
  toolId: string;
  children: React.ReactNode;
  includeContentSection?: boolean;
}) {
  return (
    <>
      <ToolStructuredData toolId={toolId} />
      <ToolHero toolId={toolId} />
      {children}
      {includeContentSection && <ToolContentSection toolId={toolId} />}
      <ToolSeoContent toolId={toolId} />
    </>
  );
}

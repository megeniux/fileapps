"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { getToolSeoData, normalizeSeoText, normalizeToolSeoData } from "@/lib/tool-seo";
import { toolSeoExtensions } from "@/lib/tool-seo-extensions";
import { getToolById } from "@/lib/tools";

function buildPrivacyNote(toolId: string, explicitNote?: string) {
  if (explicitNote) return explicitNote;

  const tool = getToolById(toolId);
  if (!tool) return null;

  if (tool.runtime.engines.includes("browser-image")) {
    return "This tool keeps image work on your device using browser-native processing where possible, which is useful for screenshots, photos, and design assets that you do not want to upload to an external server.";
  }

  if (tool.runtime.engines.includes("document")) {
    return "This document workflow runs in the browser, which is helpful when you are handling scans, forms, invoices, or PDFs that may contain private or business-sensitive information.";
  }

  return "This media job runs locally in your browser, which is useful for personal recordings, internal assets, and other files you would rather not send through a remote upload service for a routine edit.";
}

function buildCompatibilityNotes(
  toolId: string,
  explicitNotes?: Array<{ title: string; body: string }>
) {
  if (explicitNotes && explicitNotes.length > 0) return explicitNotes;

  const tool = getToolById(toolId);
  if (!tool) return [];

  return [
    {
      title: "Browser and device support",
      body: "These tools are designed for modern browsers. Actual speed and maximum practical file size depend on device memory, processor speed, and how much media your browser can safely keep in memory during processing.",
    },
    {
      title: "Format safety",
      body: `If you are unsure which output to choose, start with broadly compatible formats such as ${tool.formats.slice(0, 3).join(", ")}${tool.formats.length > 3 ? ", and similar mainstream formats" : ""}. They are usually the safest fallback for everyday sharing and playback.`,
    },
  ];
}

function buildLimitations(toolId: string, explicitLimitations?: string[]) {
  if (explicitLimitations && explicitLimitations.length > 0) return explicitLimitations;

  const tool = getToolById(toolId);
  if (!tool) return [];

  const limitations = [
    "Very large files can take longer to inspect and process because browsers have less memory headroom than native desktop editors.",
  ];

  if (tool.runtime.engines.includes("ffmpeg")) {
    limitations.push("FFmpeg-based browser processing is flexible, but long or high-resolution media can still be slower than a native desktop workflow.");
  }

  if ((tool.runtime.input.maxCount ?? 1) > 1) {
    limitations.push("Batch and multi-file jobs depend on total file size as well as per-file size, so large runs may need to be split into smaller batches.");
  }

  return limitations;
}

export function ToolSeoContent({ toolId }: { toolId: string }) {
  const baseData = getToolSeoData(toolId);
  if (!baseData) return null;
  const data = normalizeToolSeoData({ ...baseData, ...toolSeoExtensions[toolId] });
  if (!data) return null;

  const privacyNote = data.privacyNote
    ? normalizeSeoText(data.privacyNote)
    : normalizeSeoText(buildPrivacyNote(toolId, data.privacyNote) ?? "");
  const compatibilityNotes = buildCompatibilityNotes(toolId, data.compatibilityNotes).map((note) => ({
    title: normalizeSeoText(note.title),
    body: normalizeSeoText(note.body),
  }));
  const limitations = buildLimitations(toolId, data.limitations).map(normalizeSeoText);

  return (
    <div className="border-t bg-muted/20">
      <div className="container max-w-3xl space-y-14 py-12">
        <section>
          <h2 className="mb-6 text-2xl font-bold">{data.howToTitle}</h2>
          <ol className="space-y-4">
            {data.howToSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <div className="pt-0.5">
                  <p className="mb-0.5 text-sm font-medium">{step.name}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold">Understanding the settings</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{data.settingsGuide}</p>
        </section>

        {data.bestSettings && data.bestSettings.length > 0 && (
          <section>
            <h2 className="mb-4 text-2xl font-bold">Best settings for common goals</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {data.bestSettings.map((item) => (
                <Card key={item.label} className="border-border/70 bg-background/70 shadow-sm">
                  <CardContent className="space-y-2 p-4">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-sm text-foreground">{item.recommendation}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.why}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {data.formatTable && data.formatTable.length > 0 && (
          <section>
            <h2 className="mb-4 text-2xl font-bold">Format comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 pr-4 text-left font-medium text-muted-foreground">Format</th>
                    <th className="py-2 pr-4 text-left font-medium text-muted-foreground">Best for</th>
                    <th className="py-2 pr-4 text-left font-medium text-muted-foreground">File size</th>
                    <th className="py-2 text-left font-medium text-muted-foreground">Quality</th>
                  </tr>
                </thead>
                <tbody>
                  {data.formatTable.map((row, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2.5 pr-4 font-medium">{row.format}</td>
                      <td className="py-2.5 pr-4 text-muted-foreground">{row.useCase}</td>
                      <td className="py-2.5 pr-4 text-muted-foreground">{row.size}</td>
                      <td className="py-2.5 text-muted-foreground">{row.quality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {data.editorialSections && data.editorialSections.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Practical guidance</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {data.editorialSections.map((section) => (
                <Card key={section.title} className="border-border/70 bg-background/70 shadow-sm">
                  <CardContent className="space-y-3 p-4">
                    <p className="text-sm font-semibold">{section.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{section.body}</p>
                    {section.points && section.points.length > 0 && (
                      <ul className="space-y-2">
                        {section.points.map((point) => (
                          <li key={point} className="text-sm leading-relaxed text-muted-foreground">
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {(compatibilityNotes.length > 0 || limitations.length > 0 || privacyNote) && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Compatibility, privacy, and limitations</h2>

            {compatibilityNotes.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {compatibilityNotes.map((note) => (
                  <Card key={note.title} className="border-border/70 bg-background/70 shadow-sm">
                    <CardContent className="space-y-2 p-4">
                      <p className="text-sm font-semibold">{note.title}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{note.body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {privacyNote && (
              <Card className="border-border/70 bg-background/70 shadow-sm">
                <CardContent className="space-y-2 p-4">
                  <p className="text-sm font-semibold">Privacy explanation</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{privacyNote}</p>
                </CardContent>
              </Card>
            )}

            {limitations.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-semibold">Things to keep in mind</p>
                <ul className="space-y-2">
                  {limitations.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        <section>
          <h2 className="mb-6 text-2xl font-bold">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {data.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-sm font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
}

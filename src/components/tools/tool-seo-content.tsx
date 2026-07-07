"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { seoDataMap } from "@/lib/seo-data";

export function ToolSeoContent({ toolId }: { toolId: string }) {
  const data = seoDataMap[toolId];
  if (!data) return null;

  return (
    <div className="border-t bg-muted/20">
      <div className="container py-12 max-w-3xl space-y-14">

        {/* How-to section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{data.howToTitle}</h2>
          <ol className="space-y-4">
            {data.howToSteps.map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="pt-0.5">
                  <p className="font-medium text-sm mb-0.5">{step.name}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Settings guide */}
        <section>
          <h2 className="text-2xl font-bold mb-3">Understanding the settings</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{data.settingsGuide}</p>
        </section>

        {/* Format comparison table — only when data present */}
        {data.formatTable && data.formatTable.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Format comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Format</th>
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Best for</th>
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">File size</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Quality</th>
                  </tr>
                </thead>
                <tbody>
                  {data.formatTable.map((row, i) => (
                    <tr key={i} className="border-b last:border-0">
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

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {data.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

      </div>
    </div>
  );
}

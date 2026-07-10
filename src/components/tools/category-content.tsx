import { ShieldCheck, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { categorySeoDataMap } from "@/lib/category-seo-data";
import type { ToolCategory } from "@/lib/tool-types";

export function CategoryContent({ categoryId }: { categoryId: ToolCategory }) {
  const data = categorySeoDataMap[categoryId];
  if (!data) return null;

  return (
    <section className="border-t bg-muted/20">
      <div className="container max-w-5xl space-y-14 py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">What you can do here</h2>
              {data.intro.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">{data.howToTitle}</h3>
              <ol className="space-y-3">
                {data.howToSteps.map((step, index) => (
                  <li key={step} className="flex gap-3 rounded-xl border bg-background/70 p-4 shadow-sm">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-border/70 bg-background/70 shadow-sm">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">{data.bestForTitle}</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {data.bestForPoints.map((point) => (
                    <li key={point} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-background/70 shadow-sm">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">{data.privacyTitle}</h3>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">{data.privacyBody}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Common use cases</h2>
            <p className="text-sm text-muted-foreground">
              These are the most common jobs people handle with this category.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {data.useCases.map((item) => (
              <Card key={item} className="border-border/70 bg-background/70 shadow-sm">
                <CardContent className="p-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/70 bg-background/70 shadow-sm">
            <CardContent className="space-y-4 p-5">
              <h2 className="text-2xl font-bold">{data.decisionGuideTitle}</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {data.decisionGuide.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-background/70 shadow-sm">
            <CardContent className="space-y-4 p-5">
              <h2 className="text-2xl font-bold">{data.comparisonTitle}</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {data.comparisonPoints.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Frequently asked questions</h2>
            <p className="text-sm text-muted-foreground">
              Helpful context before you choose a tool and start processing files.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {data.faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

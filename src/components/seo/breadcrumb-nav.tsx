import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";

export function BreadcrumbNav({
  items,
  className,
  muted = false,
}: {
  items: BreadcrumbItem[];
  className?: string;
  muted?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.href}-${item.label}`} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5",
                    muted ? "text-white/60" : "text-muted-foreground"
                  )}
                />
              )}
              {isLast ? (
                <span
                  className={cn(
                    "font-medium",
                    muted ? "text-white" : "text-foreground"
                  )}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors hover:underline",
                    muted ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {SITE.name}
              </span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              {SITE.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools/video" className="hover:text-primary transition-colors">Video Tools</Link></li>
              <li><Link href="/tools/audio" className="hover:text-primary transition-colors">Audio Tools</Link></li>
              <li><Link href="/tools/image" className="hover:text-primary transition-colors">Image Tools</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link href="/eula" className="hover:text-primary transition-colors">EULA</Link></li>
              <li><Link href="/ads-disclosure" className="hover:text-primary transition-colors">Ads Disclosure</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

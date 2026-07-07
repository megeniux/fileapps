import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { FFmpegProvider } from "@/contexts/ffmpeg-context";
import { SITE } from "@/lib/constants";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fontHeading = localFont({
  src: "../../public/fonts/NataSans/NataSans-SemiBold.ttf",
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FileApps",
  url: "https://fileapps.click",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any (browser-based)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Free online tools to convert, compress, trim, and edit video, audio, and image files — 100% in your browser, no upload required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        fontSans.variable,
        fontMono.variable,
        fontHeading.variable
      )}
    >
      <head>
        <link rel="icon" href="/images/branding/logo-small.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FFmpegProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </FFmpegProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

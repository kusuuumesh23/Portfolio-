import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { ThemeProvider, ThemeScript } from "@/components/ui/ThemeProvider";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://kusumesh.dev"
  ),
  title: {
    default: siteConfig.seo.title,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  authors: [{ name: siteConfig.name, url: siteConfig.seo.siteUrl }],
  creator: siteConfig.name,
  keywords: [
    "Kusumesh",
    "Portfolio",
    "Frontend Engineer",
    "Motion Designer",
    "Newton School of Technology",
    "Creative Developer",
    "Next.js",
    "React",
    "TypeScript",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.seo.siteUrl,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: ["/og"],
    creator: "@kusumesh",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F7F5" },
    { media: "(prefers-color-scheme: dark)", color: "#101010" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-bg text-text transition-colors duration-150">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-bg focus:text-text focus:border focus:border-border text-sm font-medium"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <GrainOverlay />
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

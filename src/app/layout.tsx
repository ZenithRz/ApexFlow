import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ApexFlow — Streamline Your Workflow",
    template: "%s | ApexFlow",
  },
  description:
    "ApexFlow is the modern workflow automation platform that helps teams ship faster, collaborate better, and scale with confidence.",
  keywords: [
    "workflow automation",
    "team collaboration",
    "project management",
    "SaaS platform",
    "productivity tools",
  ],
  authors: [{ name: "ApexFlow" }],
  creator: "ApexFlow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://apexflow.com",
    siteName: "ApexFlow",
    title: "ApexFlow — Streamline Your Workflow",
    description:
      "The modern workflow automation platform that helps teams ship faster, collaborate better, and scale with confidence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ApexFlow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ApexFlow — Streamline Your Workflow",
    description:
      "The modern workflow automation platform that helps teams ship faster, collaborate better, and scale with confidence.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-body antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

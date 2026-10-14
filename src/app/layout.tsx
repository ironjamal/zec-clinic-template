import type { Metadata, Viewport } from "next";
import type { CSSProperties, ReactNode } from "react";
import { siteConfig } from "@/config/site";
import "./globals.css";

const { brand, colors } = siteConfig;

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} | Dental, Dermatology & Physiotherapy`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  openGraph: {
    title: brand.name,
    description: brand.description,
    url: brand.url,
    siteName: brand.name,
    locale: brand.locale,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: colors.navy,
};

/** Maps the brand palette from config onto CSS custom properties. */
const brandVariables = {
  "--brand-navy": colors.navy,
  "--brand-teal": colors.teal,
  "--brand-white": colors.white,
  "--brand-cool": colors.cool,
  "--brand-body": colors.body,
} as CSSProperties;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={brand.lang} dir={brand.dir} className="h-full" style={brandVariables}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bourra Multiservices | Enseignes, Signalétique et Fermetures",
    template: "%s | Bourra Multiservices",
  },
  description:
    "Découvrez Bourra Multiservices : enseignes, signalétique, agencement de magasins, stores bannes, rideaux métalliques et portes sectionnelles. Contactez-nous pour votre projet.",
  applicationName: site.name,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    images: [
      {
        url: "/images/og-bms.jpg",
        width: 1200,
        height: 630,
        alt: "Façade et enseigne de Bourra Multiservices",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-bms.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#171E2C",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}>
      <body className="font-sans">
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

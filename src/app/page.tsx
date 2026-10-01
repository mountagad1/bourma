import type { Metadata } from "next";
import { About } from "@/components/About";
import { ContactSection } from "@/components/ContactSection";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { ServiceDeck } from "@/components/ServiceDeck";
import { ServicesIndex } from "@/components/ServicesIndex";
import { services } from "@/content/services";
import { absoluteUrl, jsonLd, site } from "@/lib/site";

const title = "Bourra Multiservices | Enseignes, Signalétique et Fermetures";
const description =
  "Découvrez Bourra Multiservices : enseignes, signalétique, agencement de magasins, stores bannes, rideaux métalliques et portes sectionnelles. Contactez-nous pour votre projet.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/" },
  twitter: { title, description },
};

/**
 * Données structurées : uniquement des informations vérifiées.
 * Aucune adresse, coordonnée GPS, horaire ni avis n'est déclaré.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organisation`,
      name: site.name,
      alternateName: site.shortName,
      url: site.url,
      logo: absoluteUrl("/icon.svg"),
      image: absoluteUrl("/images/facade-bms.jpg"),
      telephone: site.phone.international,
      email: site.email.display,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: site.phone.international,
        email: site.email.display,
        availableLanguage: "French",
      },
      makesOffer: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.card.title, url: absoluteUrl(`/${s.slug}`) },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#site`,
      url: site.url,
      name: site.name,
      inLanguage: "fr-FR",
      publisher: { "@id": `${site.url}/#organisation` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <Hero />
      <ServicesIndex />
      <ServiceDeck />
      <About />
      <Gallery />
      <ContactSection />
    </>
  );
}

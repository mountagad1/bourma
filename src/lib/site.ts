/**
 * Données de l'entreprise — source unique pour tout le site.
 * N'ajoutez ici que des informations vérifiées.
 */
export const site = {
  name: "Boura Multiservices",
  shortName: "BMS",
  signature: "BOURA MULTISERVICES",
  tagline: "Donnez de la visibilité à votre image.",
  phone: {
    display: "02 85 05 89 63",
    href: "tel:+33285058963",
    international: "+33285058963",
  },
  email: {
    display: "metalibourra@gmail.com",
    href: "mailto:metalibourra@gmail.com",
  },
  /**
   * URL publique du site, utilisée pour les URL canoniques, le sitemap et
   * Open Graph. À définir en production via NEXT_PUBLIC_SITE_URL.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.boura-multiservices.fr").replace(/\/$/, ""),
  locale: "fr_FR",
  /** Adresse du siège (avis de situation Insee / extrait RNE). */
  address: {
    street: "62 rue de la Pelouse",
    postalCode: "72000",
    city: "Le Mans",
    country: "FR",
  },
  /** Informations légales (avis de situation Insee, extrait RNE). */
  legal: {
    denomination: "BOURA MULTISERVICES",
    form: "Société à responsabilité limitée (SARL)",
    siren: "102 985 322",
    siret: "102 985 322 00019",
    vat: "FR17 102 985 322",
    naf: "43.29B — Autres travaux d'installation n.c.a.",
    registration: "Immatriculée au Registre national des entreprises (RNE) le 22/04/2026",
    createdAt: "01/03/2026",
    /** Non communiqués : à renseigner avant la mise en ligne. */
    capital: null as string | null,
    publicationDirector: null as string | null,
    host: {
      name: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
      website: "https://vercel.com",
    } as { name: string; address: string; phone?: string; website?: string } | null,
  },
} as const;

export const formattedAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

export function absoluteUrl(path = "/") {
  return `${site.url}${path}`;
}

/** Sérialise un objet JSON-LD en échappant les caractères sensibles. */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

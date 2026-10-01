/**
 * Données de l'entreprise — source unique pour tout le site.
 * N'ajoutez ici que des informations vérifiées.
 */
export const site = {
  name: "Bourra Multiservices",
  shortName: "BMS",
  signature: "BOURRA MULTISERVICES",
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
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bourra-multiservices.fr").replace(/\/$/, ""),
  locale: "fr_FR",
} as const;

export function absoluteUrl(path = "/") {
  return `${site.url}${path}`;
}

/** Sérialise un objet JSON-LD en échappant les caractères sensibles. */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

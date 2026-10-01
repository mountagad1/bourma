import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowIcon, CheckIcon, PhoneIcon } from "@/components/icons";
import { ServiceVisual } from "@/components/ServiceVisual";
import { getService, services } from "@/content/services";
import { absoluteUrl, jsonLd, site } from "@/lib/site";

// Seules les pages services connues existent : toute autre URL renvoie une 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[service]">): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const path = `/${service.slug}`;
  return {
    title: service.meta.title,
    description: service.meta.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${service.meta.title} | ${site.name}`,
      description: service.meta.description,
      url: path,
    },
    twitter: { title: `${service.meta.title} | ${site.name}`, description: service.meta.description },
  };
}

export default async function ServicePage({ params }: PageProps<"/[service]">) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = services.indexOf(service);
  const related = service.related.map(getService).filter((s) => s !== undefined);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.page.h1,
    serviceType: service.card.title,
    description: service.meta.description,
    url: absoluteUrl(`/${service.slug}`),
    inLanguage: "fr-FR",
    provider: {
      "@type": "Organization",
      "@id": `${site.url}/#organisation`,
      name: site.name,
      telephone: site.phone.international,
      email: site.email.display,
      url: site.url,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      <section aria-labelledby="titre-service" className="pt-[var(--header-h)]">
        <div className="container-site grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <Breadcrumbs
              items={[
                { name: "Accueil", path: "/" },
                { name: service.label, path: `/${service.slug}` },
              ]}
            />
            <p className="hero-in eyebrow mt-10">
              Service {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </p>
            <h1
              id="titre-service"
              className="hero-in mt-3 font-display text-[clamp(2.6rem,6.5vw,5.25rem)] font-bold uppercase leading-[0.92]"
              style={{ ["--i" as string]: 1 }}
            >
              {service.page.h1}
            </h1>
            <div className="hero-in mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted" style={{ ["--i" as string]: 2 }}>
              {service.page.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ ["--i" as string]: 3 }}>
              <Link href="/#contact" className="btn btn-primary">
                Demander un devis
                <ArrowIcon className="btn-arrow" />
              </Link>
              <a href={site.phone.href} className="btn btn-ghost">
                <PhoneIcon />
                {site.phone.display}
              </a>
            </div>
          </div>
          <div className="hero-media relative">
            <ServiceVisual
              visual={service.visual}
              preload
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3] rounded-[var(--radius)] lg:aspect-[4/5]"
            />
            <span aria-hidden="true" className="absolute -right-3 -top-3 h-14 w-14 border-r-[5px] border-t-[5px] border-lime" />
          </div>
        </div>
      </section>

      <section aria-labelledby="offre" className="blueprint py-16 sm:py-24">
        <div className="container-site">
          <h2 id="offre" className="reveal font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95]">
            Ce que nous <span className="text-lime">proposons</span>
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {service.page.offer.map((item) => (
              <li key={item.title} className="reveal rounded-[var(--radius)] border border-white/10 bg-navy p-6 sm:p-8">
                <h3 className="flex items-start gap-3 font-display text-2xl font-bold uppercase leading-tight tracking-[0.02em]">
                  <CheckIcon className="mt-0.5 h-6 w-6 shrink-0 text-lime" />
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="demarche" className="py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <h2 id="demarche" className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95]">
              Notre <span className="text-lime">démarche</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{service.page.approach}</p>
          </div>
          <div>
            <h2 className="reveal font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95]">
              Questions <span className="text-lime">fréquentes</span>
            </h2>
            <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {service.page.questions.map((item) => (
                <details key={item.q} className="reveal group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                    <h3>{item.q}</h3>
                    <span aria-hidden="true" className="mt-0.5 text-2xl leading-none text-lime transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="services-lies" className="border-t border-white/[0.08] bg-navy-deep py-16 sm:py-20">
          <div className="container-site">
            <h2 id="services-lies" className="eyebrow">
              Services associés
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}`}
                    className="group flex h-full flex-col justify-between gap-6 rounded-[var(--radius)] border border-white/10 bg-surface p-6 transition-colors hover:border-lime"
                  >
                    <span>
                      <span className="block font-display text-2xl font-bold uppercase leading-tight">{r.card.title}</span>
                      <span className="mt-2 block text-muted">{r.card.description}</span>
                    </span>
                    <ArrowIcon className="text-lime transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="cta-final" className="py-16 sm:py-24">
        <div className="container-site">
          <div className="reveal flex flex-col items-start justify-between gap-8 rounded-[var(--radius)] bg-lime p-8 text-lime-ink sm:p-12 lg:flex-row lg:items-center">
            <h2 id="cta-final" className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95]">
              Parlons de votre projet.
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/#contact" className="btn bg-navy text-white hover:bg-surface">
                Demander un devis
              </Link>
              <a href={site.phone.href} className="btn border border-lime-ink/40 hover:bg-lime-ink/10">
                <PhoneIcon />
                {site.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

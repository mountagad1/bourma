import { ContactForm } from "@/components/ContactForm";
import { LocationMap } from "@/components/LocationMap";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { site } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-navy-deep py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-lime" />
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="eyebrow reveal">Contact &amp; devis</p>
          <h2
            id="contact-title"
            className="reveal mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-[0.92]"
          >
            Parlons de <span className="text-lime">votre projet.</span>
          </h2>
          <p className="reveal mt-6 max-w-md text-lg leading-relaxed text-muted">
            Décrivez votre besoin&nbsp;: enseigne, signalétique, agencement, store, rideau métallique ou porte
            sectionnelle. Nous revenons vers vous pour en discuter et établir un devis.
          </p>

          <ul className="reveal mt-10 grid gap-4">
            <li>
              <a
                href={site.phone.href}
                className="group flex items-center gap-4 rounded-[var(--radius)] border border-white/10 bg-navy p-5 transition-colors hover:border-lime"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[var(--radius)] bg-lime text-lime-ink">
                  <PhoneIcon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm text-muted">Téléphone</span>
                  <span className="font-display text-2xl font-bold tracking-[0.04em] group-hover:text-lime">
                    {site.phone.display}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.email.href}
                className="group flex items-center gap-4 rounded-[var(--radius)] border border-white/10 bg-navy p-5 transition-colors hover:border-lime"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[var(--radius)] border border-lime text-lime">
                  <MailIcon className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted">E-mail</span>
                  <span className="block break-all text-lg font-semibold group-hover:text-lime">{site.email.display}</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4 rounded-[var(--radius)] border border-white/10 bg-navy p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[var(--radius)] border border-white/20 text-lime">
                <PinIcon className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm text-muted">Adresse</span>
                <address className="not-italic text-lg font-semibold">
                  {site.address.street}, {site.address.postalCode} {site.address.city}
                </address>
              </span>
            </li>
          </ul>
        </div>

        <div className="reveal rounded-[var(--radius)] border border-white/10 bg-surface p-5 sm:p-8 lg:p-10">
          <h3 className="font-display text-2xl font-bold uppercase tracking-[0.03em]">Demande de devis</h3>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </div>
      <div className="container-site mt-14 sm:mt-20">
        <div className="reveal grid gap-6 lg:grid-cols-[0.9fr_2.1fr] lg:items-end lg:gap-20">
          <div>
            <h3 className="eyebrow">Nous trouver</h3>
            <p className="mt-3 font-display text-3xl font-bold uppercase leading-tight">
              {site.address.street}
              <br />
              <span className="text-lime">
                {site.address.postalCode} {site.address.city}
              </span>
            </p>
            <p className="mt-3 text-muted">Accueil sur rendez-vous, par téléphone ou par e-mail.</p>
          </div>
          <LocationMap />
        </div>
      </div>
    </section>
  );
}

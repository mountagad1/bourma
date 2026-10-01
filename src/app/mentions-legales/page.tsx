import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { formattedAddress, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${site.name} : éditeur, immatriculation, hébergement et données personnelles.`,
  alternates: { canonical: "/mentions-legales" },
};

/** Valeur non encore communiquée : affichée explicitement plutôt qu'inventée. */
function Missing() {
  return (
    <span className="rounded-sm border border-dashed border-lime/50 px-1.5 py-0.5 text-sm text-lime">
      à compléter
    </span>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-white/10 py-3 sm:grid-cols-[16rem_1fr] sm:gap-6">
      <dt className="text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-14">
      <h2 id={id} className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-bold uppercase leading-tight">
        {title}
      </h2>
      <div className="mt-5 space-y-4 leading-relaxed text-white/85">{children}</div>
    </section>
  );
}

export default function MentionsLegales() {
  const { legal } = site;
  return (
    <div className="container-site max-w-4xl pb-24 pt-[calc(var(--header-h)+2.5rem)]">
      <Breadcrumbs
        items={[
          { name: "Accueil", path: "/" },
          { name: "Mentions légales", path: "/mentions-legales" },
        ]}
      />
      <h1 className="mt-8 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-[0.95]">
        Mentions <span className="text-lime">légales</span>
      </h1>

      <Section id="editeur" title="Éditeur du site">
        <dl>
          <Row label="Dénomination">{legal.denomination}</Row>
          <Row label="Nom commercial">
            {site.name} ({site.shortName})
          </Row>
          <Row label="Forme juridique">{legal.form}</Row>
          <Row label="Capital social">{legal.capital ?? <Missing />}</Row>
          <Row label="Siège social">{formattedAddress}</Row>
          <Row label="SIREN">{legal.siren}</Row>
          <Row label="SIRET (siège)">{legal.siret}</Row>
          <Row label="Immatriculation">{legal.registration}</Row>
          <Row label="N° TVA intracommunautaire">{legal.vat}</Row>
          <Row label="Activité principale (NAF/APE)">{legal.naf}</Row>
          <Row label="Téléphone">
            <a href={site.phone.href} className="hover:text-lime">
              {site.phone.display}
            </a>
          </Row>
          <Row label="E-mail">
            <a href={site.email.href} className="break-all hover:text-lime">
              {site.email.display}
            </a>
          </Row>
          <Row label="Directeur de la publication">{legal.publicationDirector ?? <Missing />}</Row>
        </dl>
      </Section>

      <Section id="hebergeur" title="Hébergement">
        <dl>
          <Row label="Hébergeur">{legal.host?.name ?? <Missing />}</Row>
          <Row label="Adresse">{legal.host?.address ?? <Missing />}</Row>
          {legal.host?.phone && <Row label="Téléphone">{legal.host.phone}</Row>}
          {legal.host?.website && (
            <Row label="Site web">
              <a href={legal.host.website} rel="noopener" className="hover:text-lime">
                {legal.host.website.replace("https://", "")}
              </a>
            </Row>
          )}
        </dl>
      </Section>

      <Section id="propriete" title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus de ce site (textes, logo, photographies, illustrations) est la propriété de{" "}
          {legal.denomination}, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle,
          sans autorisation préalable est interdite.
        </p>
      </Section>

      <Section id="donnees" title="Données personnelles">
        <p>
          Les informations transmises via le formulaire de contact (nom, e-mail, téléphone, description du projet)
          sont utilisées uniquement pour répondre à votre demande et établir un devis. Elles ne sont ni cédées ni
          vendues à des tiers.
        </p>
        <p>
          Conformément au Règlement général sur la protection des données (RGPD) et à la loi « Informatique et
          libertés », vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et
          d&apos;opposition concernant vos données. Pour l&apos;exercer, écrivez à{" "}
          <a href={site.email.href} className="break-all text-lime hover:underline">
            {site.email.display}
          </a>
          . Vous pouvez également adresser une réclamation à la CNIL (cnil.fr).
        </p>
      </Section>

      <Section id="cookies" title="Cookies">
        <p>Ce site ne dépose aucun cookie de mesure d&apos;audience ni de publicité.</p>
      </Section>
    </div>
  );
}

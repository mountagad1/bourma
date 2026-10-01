import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70svh] flex-col items-start justify-center pt-[var(--header-h)]">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-[0.95]">
        Cette page <span className="text-lime">n&apos;existe pas</span>
      </h1>
      <p className="mt-5 max-w-lg text-lg text-muted">L&apos;adresse a peut-être changé. Revenez à l&apos;accueil pour découvrir nos services.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}

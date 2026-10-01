"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/Logo";
import { PhoneIcon } from "@/components/icons";
import { services } from "@/content/services";
import { site } from "@/lib/site";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#entreprise", label: "L'entreprise" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  // Ferme le menu à chaque changement de page
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-navy/85 backdrop-blur-md">
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Boura Multiservices — accueil">
          <Logo decorative className="h-10 w-auto" />
          <span className="hidden font-display text-[0.8rem] font-semibold uppercase leading-tight tracking-[0.12em] text-muted sm:block">
            Boura
            <br />
            <span className="text-lime">M</span>ulti<span className="text-lime">s</span>ervices
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-8 font-display text-[1.0625rem] font-medium uppercase tracking-[0.06em]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-line text-white/90 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phone.href}
            className="btn btn-primary !min-h-11 !px-3.5 sm:!px-4"
            aria-label={`Appeler le ${site.phone.display}`}
          >
            <PhoneIcon />
            <span className="hidden sm:inline">{site.phone.display}</span>
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius)] border border-white/20 lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <span aria-hidden="true" className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-white transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-lime transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-white transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-white/[0.07] bg-navy lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="container-site py-6">
          <ul className="grid gap-1 font-display text-2xl font-semibold uppercase tracking-[0.04em]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="block py-2.5 hover:text-lime">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-8">Nos services</p>
          <ul className="mt-3 grid gap-1 text-lg text-muted">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} onClick={() => setOpen(false)} className="block py-2 hover:text-white">
                  {s.card.title}
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.email.href} className="mt-8 block break-all text-lime">
            {site.email.display}
          </a>
        </nav>
      </div>
    </header>
  );
}

"use client";

import { useId, useState, type FormEvent } from "react";
import { services } from "@/content/services";
import { site } from "@/lib/site";

type Field = "nom" | "email" | "telephone" | "service" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = { kind: "idle" | "sending" | "sent" | "mailto" | "error"; text?: string };

/**
 * Point d'envoi optionnel (ex. Formspree, Getform, API interne) acceptant
 * un POST JSON. Sans configuration, le formulaire prépare un e-mail dans la
 * messagerie du visiteur : aucun envoi n'est simulé.
 */
const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s.\-()]{10,20}$/;

function validate(data: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (data.nom.trim().length < 2) errors.nom = "Indiquez votre nom.";
  if (!data.email.trim()) errors.email = "Indiquez votre adresse e-mail.";
  else if (!EMAIL_RE.test(data.email.trim()))
    errors.email = "L'adresse e-mail semble incorrecte (exemple : nom@domaine.fr).";
  if (data.telephone.trim() && !PHONE_RE.test(data.telephone.trim()))
    errors.telephone = "Le numéro de téléphone semble incorrect (exemple : 06 12 34 56 78).";
  if (!data.service) errors.service = "Choisissez le service concerné.";
  if (data.message.trim().length < 15)
    errors.message = "Décrivez votre projet en quelques mots (15 caractères minimum).";
  return errors;
}

const labels: Record<Field, string> = {
  nom: "Nom",
  email: "E-mail",
  telephone: "Téléphone",
  service: "Service souhaité",
  message: "Description du projet",
};

export function ContactForm() {
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const id = (f: Field) => `${uid}-${f}`;
  const errId = (f: Field) => `${uid}-${f}-erreur`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(
      (Object.keys(labels) as Field[]).map((f) => [f, String(fd.get(f) ?? "")]),
    ) as Record<Field, string>;

    const found = validate(data);
    setErrors(found);
    const first = (Object.keys(labels) as Field[]).find((f) => found[f]);
    if (first) {
      setStatus({ kind: "idle" });
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const serviceLabel = services.find((s) => s.slug === data.service)?.card.title ?? "Autre demande";

    if (endpoint) {
      if (fd.get("site_web")) return; // pot de miel anti-spam
      setStatus({ kind: "sending" });
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, service: serviceLabel }),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus({ kind: "sent", text: "Merci, votre demande a bien été envoyée. Nous revenons vers vous rapidement." });
      } catch {
        setStatus({
          kind: "error",
          text: `L'envoi n'a pas abouti. Réessayez ou contactez-nous directement au ${site.phone.display} ou à ${site.email.display}.`,
        });
      }
      return;
    }

    // Repli sans serveur : ouverture de la messagerie avec la demande pré-remplie
    const body = [
      `Nom : ${data.nom}`,
      `E-mail : ${data.email}`,
      data.telephone && `Téléphone : ${data.telephone}`,
      `Service : ${serviceLabel}`,
      "",
      data.message,
    ]
      .filter((l) => l !== "")
      .join("\n");
    const subject = `Demande de devis – ${serviceLabel}`;
    window.open(`${site.email.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_self");
    setStatus({
      kind: "mailto",
      text: `Votre messagerie s'ouvre avec votre demande pré-remplie : il ne vous reste qu'à l'envoyer. Si rien ne s'ouvre, écrivez-nous à ${site.email.display}.`,
    });
  }

  const inputCls =
    "mt-2 block w-full rounded-[var(--radius)] border bg-navy px-4 py-3 text-base text-white placeholder:text-white/35 transition-colors focus:border-lime focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime";
  const border = (f: Field) => (errors[f] ? "border-[#ff8a7a]" : "border-white/15 hover:border-white/30");

  const describedBy = (f: Field, hint?: string) =>
    [hint, errors[f] ? errId(f) : undefined].filter(Boolean).join(" ") || undefined;

  const errorText = (f: Field) =>
    errors[f] ? (
      <p id={errId(f)} className="mt-2 text-sm font-medium text-[#ff9f92]">
        {errors[f]}
      </p>
    ) : null;

  const errorCount = Object.keys(errors).length;

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5" aria-describedby={`${uid}-aide`}>
      <p id={`${uid}-aide`} className="text-sm text-muted">
        Les champs marqués d&apos;un <span className="text-lime">*</span> sont obligatoires.
      </p>

      <div role="alert" aria-live="assertive" className={errorCount ? "rounded-[var(--radius)] border border-[#ff8a7a]/50 bg-[#ff8a7a]/10 p-4 text-sm" : "sr-only"}>
        {errorCount > 0 &&
          `Le formulaire contient ${errorCount} erreur${errorCount > 1 ? "s" : ""}. Corrigez les champs indiqués.`}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("nom")} className="font-medium">
            {labels.nom} <span className="text-lime">*</span>
          </label>
          <input
            id={id("nom")}
            name="nom"
            type="text"
            autoComplete="name"
            required
            aria-invalid={!!errors.nom}
            aria-describedby={describedBy("nom")}
            className={`${inputCls} ${border("nom")}`}
          />
          {errorText("nom")}
        </div>
        <div>
          <label htmlFor={id("email")} className="font-medium">
            {labels.email} <span className="text-lime">*</span>
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={`${inputCls} ${border("email")}`}
          />
          {errorText("email")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("telephone")} className="font-medium">
            {labels.telephone} <span className="text-sm font-normal text-muted">(facultatif)</span>
          </label>
          <input
            id={id("telephone")}
            name="telephone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={!!errors.telephone}
            aria-describedby={describedBy("telephone")}
            className={`${inputCls} ${border("telephone")}`}
          />
          {errorText("telephone")}
        </div>
        <div>
          <label htmlFor={id("service")} className="font-medium">
            {labels.service} <span className="text-lime">*</span>
          </label>
          <select
            id={id("service")}
            name="service"
            required
            defaultValue=""
            aria-invalid={!!errors.service}
            aria-describedby={describedBy("service")}
            className={`${inputCls} ${border("service")} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2375D52F%22 stroke-width=%222.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value="" disabled>
              Sélectionnez un service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.card.title}
              </option>
            ))}
            <option value="autre">Autre demande</option>
          </select>
          {errorText("service")}
        </div>
      </div>

      <div>
        <label htmlFor={id("message")} className="font-medium">
          {labels.message} <span className="text-lime">*</span>
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={5}
          required
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message", `${uid}-message-aide`)}
          className={`${inputCls} ${border("message")} resize-y`}
        />
        <p id={`${uid}-message-aide`} className="mt-2 text-sm text-muted">
          Type de projet, dimensions approximatives, délai souhaité…
        </p>
        {errorText("message")}
      </div>

      {endpoint && (
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Site web
            <input name="site_web" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary disabled:opacity-60" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Envoi en cours…" : endpoint ? "Envoyer ma demande" : "Préparer ma demande par e-mail"}
        </button>
        {!endpoint && (
          <p className="text-sm text-muted">Votre messagerie s&apos;ouvrira avec le message pré-rempli.</p>
        )}
      </div>

      <p role="status" aria-live="polite" className={status.text ? `rounded-[var(--radius)] border p-4 text-sm ${status.kind === "error" ? "border-[#ff8a7a]/50 bg-[#ff8a7a]/10" : "border-lime/40 bg-lime/10"}` : "sr-only"}>
        {status.text}
      </p>
    </form>
  );
}

# Bourra Multiservices (BMS) — site vitrine

Site Next.js (App Router, TypeScript, Tailwind CSS v4) pour Bourra Multiservices :
enseignes, signalétique, agencement de magasins, stores bannes, rideaux métalliques,
portes sectionnelles, pose et maintenance.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build && npm start
```

## Structure

| Emplacement | Rôle |
| --- | --- |
| `src/lib/site.ts` | Coordonnées de l'entreprise (source unique) et helpers URL / JSON-LD |
| `src/content/services.ts` | Contenu des 7 services (cartes, pages, métadonnées, visuels) |
| `src/app/page.tsx` | Page d'accueil + JSON-LD `Organization` / `WebSite` |
| `src/app/[service]/page.tsx` | Pages services statiques (`/enseignes`, `/signaletique`, …), 404 pour toute autre URL |
| `src/app/sitemap.ts`, `src/app/robots.ts` | `sitemap.xml` et `robots.txt` générés |
| `src/components/ServiceDeck.tsx` + `DeckMotion.tsx` | Présentation des services en cartes empilées (sticky) |
| `src/app/globals.css` | Jetons de couleur, typographie, styles de la pile et animations |
| `public/images/` | Recadrages de la photo de façade |

## Pile de cartes (sticky scroll)

* Chaque `<li>` de la liste est en `position: sticky` avec un `top` croissant
  (`--deck-top + index × --deck-step`). Le `<ol>` étant le bloc conteneur, la pile
  entière se libère quand la liste se termine.
* `DeckMotion` (≈1 ko) mesure, dans une seule frame `requestAnimationFrame`, la
  progression d'arrivée de chaque carte et écrit une variable CSS `--depth` sur les
  cartes précédentes. Le CSS en déduit un léger recul (`translateY`), une réduction
  d'échelle et un voile sombre. Aucun état React n'est mis à jour au défilement ; le
  calcul ne tourne que lorsque la pile est visible (`IntersectionObserver`).
* Mobile : décalages et échelle réduits, hauteur de carte calculée sur `100svh`.
* `prefers-reduced-motion: reduce` ou écran de moins de 540 px de haut : simple pile
  verticale, sans sticky ni transformation.

## Configuration de production

Copier `.env.example` en `.env.local` (ou définir les variables chez l'hébergeur) :

* `NEXT_PUBLIC_SITE_URL` — **obligatoire** : domaine définitif (URL canoniques,
  sitemap, Open Graph). La valeur par défaut est provisoire.
* `NEXT_PUBLIC_FORM_ENDPOINT` — facultatif : URL acceptant un `POST` JSON
  (`nom`, `email`, `telephone`, `service`, `message`). Sans elle, le formulaire
  prépare un e-mail dans la messagerie du visiteur vers l'adresse de l'entreprise.

## Informations à compléter

* Photos réelles de réalisations (galerie et services agencement, stores bannes,
  portes sectionnelles, maintenance — actuellement des illustrations signalées
  « photo à venir »).
* Adresse postale, zone d'intervention et horaires vérifiés (non publiés pour
  l'instant ; à ajouter avant de passer le JSON-LD en `LocalBusiness`).
* Mentions légales (SIRET, hébergeur, responsable de publication) et politique de
  confidentialité si un service d'envoi de formulaire est branché.

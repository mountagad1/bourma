/**
 * Contenu des services. Chaque entrée alimente :
 * - la carte de la présentation empilée (page d'accueil),
 * - la page dédiée /[slug],
 * - le sitemap et les métadonnées.
 *
 * Le contenu décrit les prestations affichées sur la façade de l'entreprise.
 * Il ne contient volontairement aucune référence client, chiffre ou
 * certification non vérifiés.
 */

export type ServiceVisual =
  | {
      kind: "photo";
      src: string;
      width: number;
      height: number;
      alt: string;
      /** Cadrage CSS (object-position) pour garder le sujet visible. */
      position?: string;
      /** Image d'illustration (pas une réalisation BMS) : un badge l'indique. */
      illustrative?: boolean;
    }
  | {
      kind: "illustration";
      motif: "agencement" | "store" | "porte" | "maintenance";
      alt: string;
    };

export type Service = {
  slug: string;
  /** Libellé court (navigation, fil d'Ariane). */
  label: string;
  card: { title: string; description: string };
  meta: { title: string; description: string };
  page: {
    h1: string;
    intro: string[];
    offer: { title: string; text: string }[];
    approach: string;
    questions: { q: string; a: string }[];
  };
  visual: ServiceVisual;
  related: string[];
};


export const services: Service[] = [
  {
    slug: "enseignes",
    label: "Enseignes",
    card: {
      title: "Enseignes professionnelles",
      description:
        "Des enseignes lumineuses et non lumineuses pour renforcer votre identité et rendre votre établissement visible.",
    },
    meta: {
      title: "Enseignes lumineuses et non lumineuses",
      description:
        "Enseignes lumineuses et non lumineuses pour commerces et locaux professionnels : conception, fabrication et pose par Boura Multiservices. Demandez un devis.",
    },
    page: {
      h1: "Enseignes lumineuses et non lumineuses",
      intro: [
        "L'enseigne est souvent le premier contact entre votre établissement et vos clients. Elle doit être lisible de loin, fidèle à votre identité visuelle et adaptée à votre façade.",
        "Boura Multiservices réalise des enseignes lumineuses et non lumineuses pour les commerces, bureaux et locaux professionnels, de l'étude du projet jusqu'à la pose.",
      ],
      offer: [
        {
          title: "Enseignes lumineuses",
          text: "Lettres ou caissons éclairés pour rester visibles en soirée et renforcer la présence de votre établissement dans la rue.",
        },
        {
          title: "Enseignes non lumineuses",
          text: "Lettres découpées, panneaux ou bandeaux de façade : des solutions sobres et durables pour afficher votre nom et votre activité.",
        },
        {
          title: "Habillage de façade",
          text: "Bandeaux, panneaux latéraux et vitrophanie pour présenter vos services, vos coordonnées ou vos horaires de manière cohérente.",
        },
        {
          title: "Pose et remplacement",
          text: "Installation de la nouvelle enseigne et, si nécessaire, dépose de l'ancienne.",
        },
      ],
      approach:
        "Nous partons de votre identité visuelle (logo, couleurs, typographie) et des dimensions de votre façade pour proposer une enseigne lisible et proportionnée. Les démarches d'autorisation auprès de votre commune restent à prévoir selon votre emplacement : nous en parlons dès le premier échange.",
      questions: [
        {
          q: "Faut-il une autorisation pour installer une enseigne ?",
          a: "Dans la plupart des communes, l'installation d'une enseigne est soumise à une déclaration ou une autorisation préalable auprès de la mairie. Les règles varient selon les villes : renseignez-vous auprès de votre commune avant la pose.",
        },
        {
          q: "Pouvez-vous reprendre mon logo existant ?",
          a: "Oui. Transmettez-nous vos fichiers (de préférence en format vectoriel) afin que l'enseigne respecte fidèlement votre identité visuelle.",
        },
      ],
    },
    visual: {
      kind: "photo",
      src: "/images/services/enseignes.webp",
      width: 1254,
      height: 1254,
      position: "60% 40%",
      illustrative: true,
      alt: "Enseigne lumineuse en lettres découpées rétroéclairées sur une façade noire, avec enseigne drapeau ronde et store banne",
    },
    related: ["signaletique", "agencement-magasin", "maintenance"],
  },
  {
    slug: "signaletique",
    label: "Signalétique",
    card: {
      title: "Signalétique intérieure et extérieure",
      description:
        "Des solutions de signalétique pour guider vos visiteurs et valoriser vos espaces professionnels.",
    },
    meta: {
      title: "Signalétique intérieure et extérieure",
      description:
        "Signalétique intérieure et extérieure pour locaux professionnels : orientation, information et identification de vos espaces. Contactez Boura Multiservices.",
    },
    page: {
      h1: "Signalétique intérieure et extérieure",
      intro: [
        "Une bonne signalétique permet à vos visiteurs de trouver rapidement leur chemin et donne une image ordonnée de vos locaux.",
        "Boura Multiservices conçoit et installe des éléments de signalétique pour l'intérieur comme pour l'extérieur de vos bâtiments professionnels.",
      ],
      offer: [
        {
          title: "Signalétique extérieure",
          text: "Panneaux d'identification, plaques, totems ou panneaux directionnels pour signaler votre établissement et ses accès.",
        },
        {
          title: "Signalétique intérieure",
          text: "Plaques de portes, panneaux d'orientation et repérage des espaces pour faciliter les déplacements de vos visiteurs.",
        },
        {
          title: "Panneaux d'information",
          text: "Présentation de vos services, coordonnées ou horaires sur des supports cohérents avec votre identité.",
        },
        {
          title: "Adhésifs et vitrophanie",
          text: "Marquage de vitrines et de portes vitrées pour informer tout en conservant la luminosité.",
        },
      ],
      approach:
        "Nous étudions le parcours de vos visiteurs et les contraintes de vos locaux pour définir les emplacements, les formats et les messages. Les supports sont choisis en fonction de leur exposition (intérieur, extérieur, passage).",
      questions: [
        {
          q: "La signalétique peut-elle reprendre ma charte graphique ?",
          a: "Oui, les couleurs, typographies et logos de votre entreprise peuvent être repris pour une signalétique homogène avec votre enseigne.",
        },
        {
          q: "Intervenez-vous sur des locaux déjà occupés ?",
          a: "Oui. L'intervention est organisée avec vous afin de limiter la gêne pour votre activité.",
        },
      ],
    },
    visual: {
      kind: "photo",
      src: "/images/services/signaletique.webp",
      width: 1254,
      height: 1254,
      position: "30% 50%",
      illustrative: true,
      alt: "Totem d'entrée rétroéclairé et panneaux directionnels intérieurs suspendus et muraux à pictogrammes",
    },
    related: ["enseignes", "agencement-magasin"],
  },
  {
    slug: "agencement-magasin",
    label: "Agencement",
    card: {
      title: "Agencement de magasins",
      description:
        "Des aménagements adaptés à vos espaces commerciaux et à l'expérience de vos clients.",
    },
    meta: {
      title: "Agencement de magasins et locaux commerciaux",
      description:
        "Agencement de magasins : aménagement de vos espaces commerciaux pour mettre en valeur vos produits et accueillir vos clients. Demandez un devis à BMS.",
    },
    page: {
      h1: "Agencement de magasins",
      intro: [
        "L'aménagement d'un point de vente influence directement la circulation des clients et la mise en valeur de vos produits.",
        "Boura Multiservices vous accompagne dans l'agencement de vos espaces commerciaux, en cohérence avec votre activité et votre identité visuelle.",
      ],
      offer: [
        {
          title: "Aménagement de l'espace de vente",
          text: "Organisation des zones de présentation, d'accueil et de circulation selon la configuration de votre local.",
        },
        {
          title: "Mobilier et présentoirs",
          text: "Installation d'éléments de présentation adaptés à vos produits et à votre surface.",
        },
        {
          title: "Habillage et identité",
          text: "Intégration de votre identité visuelle dans l'espace : panneaux, marquages, signalétique intérieure.",
        },
      ],
      approach:
        "Chaque agencement commence par une visite ou un échange sur vos besoins : surface disponible, type de produits, flux de clients et contraintes techniques. Nous vous proposons ensuite une solution adaptée.",
      questions: [
        {
          q: "Peut-on combiner agencement, enseigne et signalétique ?",
          a: "Oui. Regrouper ces prestations permet d'obtenir un ensemble cohérent, de la façade jusqu'à l'intérieur du magasin.",
        },
      ],
    },
    visual: {
      kind: "photo",
      src: "/images/services/agencement-magasin.webp",
      width: 1254,
      height: 1254,
      position: "50% 50%",
      illustrative: true,
      alt: "Boutique agencée avec étagères en bois éclairées, portants métalliques noirs et comptoir en tasseaux rétroéclairé",
    },
    related: ["enseignes", "signaletique", "stores-bannes"],
  },
  {
    slug: "stores-bannes",
    label: "Stores bannes",
    card: {
      title: "Stores bannes",
      description:
        "Des solutions de protection solaire pour améliorer le confort et l'apparence de vos espaces.",
    },
    meta: {
      title: "Stores bannes pour commerces et professionnels",
      description:
        "Pose et maintenance de stores bannes pour vitrines, terrasses et façades professionnelles. Protection solaire et confort : contactez Boura Multiservices.",
    },
    page: {
      h1: "Stores bannes",
      intro: [
        "Un store banne protège votre vitrine, votre terrasse ou vos espaces extérieurs du soleil, tout en participant à l'apparence de votre façade.",
        "Boura Multiservices assure la pose et la maintenance de stores bannes pour les commerces et locaux professionnels.",
      ],
      offer: [
        {
          title: "Pose de stores bannes",
          text: "Installation de stores adaptés à la largeur de votre façade, à son exposition et à son usage.",
        },
        {
          title: "Remplacement de toile",
          text: "Changement d'une toile usée ou décolorée pour redonner un aspect soigné à votre devanture.",
        },
        {
          title: "Entretien et dépannage",
          text: "Contrôle et réglage des mécanismes pour un fonctionnement fiable dans le temps.",
        },
      ],
      approach:
        "Nous prenons en compte les dimensions de la façade, son orientation, la nature du support de fixation et l'usage prévu pour vous orienter vers la solution la plus adaptée.",
      questions: [
        {
          q: "Un store banne peut-il afficher le nom de mon commerce ?",
          a: "Oui, le lambrequin (la bande qui retombe à l'avant du store) peut porter votre nom ou votre logo, en complément de votre enseigne.",
        },
      ],
    },
    visual: {
      kind: "illustration",
      motif: "store",
      alt: "Illustration technique d'un store banne déployé au-dessus d'une vitrine",
    },
    related: ["enseignes", "rideaux-metalliques", "maintenance"],
  },
  {
    slug: "rideaux-metalliques",
    label: "Rideaux métalliques",
    card: {
      title: "Rideaux métalliques",
      description:
        "Des solutions de fermeture pour vos locaux professionnels, adaptées à vos besoins.",
    },
    meta: {
      title: "Rideaux métalliques : pose et maintenance",
      description:
        "Rideaux métalliques pour commerces et locaux professionnels : installation, maintenance et dépannage. Sécurisez votre devanture avec Boura Multiservices.",
    },
    page: {
      h1: "Rideaux métalliques",
      intro: [
        "Le rideau métallique protège votre vitrine et vos locaux en dehors des heures d'ouverture. Son bon fonctionnement est essentiel au quotidien.",
        "Boura Multiservices intervient pour la pose, l'entretien et la réparation de rideaux métalliques sur les locaux professionnels.",
      ],
      offer: [
        {
          title: "Installation",
          text: "Pose de rideaux métalliques adaptés à l'ouverture, au niveau de sécurité souhaité et à l'aspect de votre devanture.",
        },
        {
          title: "Maintenance",
          text: "Vérification des lames, des coulisses, de l'axe et de la motorisation pour prévenir les pannes.",
        },
        {
          title: "Dépannage",
          text: "Intervention sur un rideau bloqué, bruyant ou endommagé.",
        },
      ],
      approach:
        "Nous évaluons l'ouverture à protéger, le mode de manœuvre (manuel ou motorisé) et l'état de l'existant avant de vous proposer une installation ou une intervention.",
      questions: [
        {
          q: "Que faire si mon rideau métallique est bloqué ?",
          a: "Évitez de forcer le mécanisme et contactez-nous par téléphone en décrivant le problème : nous vous indiquerons la marche à suivre.",
        },
      ],
    },
    visual: {
      kind: "photo",
      src: "/images/services/rideaux-metalliques.webp",
      width: 1254,
      height: 1254,
      position: "60% 50%",
      illustrative: true,
      alt: "Rideaux métalliques à lames gris anthracite sur la façade d'un local d'activité éclairé",
    },
    related: ["portes-sectionnelles", "maintenance", "stores-bannes"],
  },
  {
    slug: "portes-sectionnelles",
    label: "Portes sectionnelles",
    card: {
      title: "Portes sectionnelles",
      description:
        "Des équipements de fermeture pour vos bâtiments et espaces professionnels.",
    },
    meta: {
      title: "Portes sectionnelles pour bâtiments professionnels",
      description:
        "Portes sectionnelles pour entrepôts, ateliers et garages professionnels : installation et maintenance par Boura Multiservices. Demandez un devis.",
    },
    page: {
      h1: "Portes sectionnelles",
      intro: [
        "La porte sectionnelle s'ouvre verticalement en remontant sous le plafond : elle libère l'espace devant l'ouverture, ce qui en fait une solution pratique pour les ateliers, entrepôts et garages.",
        "Boura Multiservices assure l'installation et la maintenance de portes sectionnelles pour vos bâtiments professionnels.",
      ],
      offer: [
        {
          title: "Installation",
          text: "Pose de portes sectionnelles adaptées aux dimensions de l'ouverture et à l'usage du bâtiment.",
        },
        {
          title: "Motorisation",
          text: "Manœuvre motorisée pour faciliter les ouvertures fréquentes.",
        },
        {
          title: "Entretien et réparation",
          text: "Contrôle des panneaux, des rails, des ressorts et de la motorisation pour un fonctionnement sûr.",
        },
      ],
      approach:
        "Nous relevons les dimensions de l'ouverture, l'espace disponible sous plafond et la fréquence d'utilisation afin de déterminer l'équipement adapté.",
      questions: [
        {
          q: "Une porte sectionnelle nécessite-t-elle un entretien régulier ?",
          a: "Oui. Un entretien périodique des ressorts, rails et organes de sécurité contribue à la fiabilité de la porte et à la sécurité de ses utilisateurs.",
        },
      ],
    },
    visual: {
      kind: "photo",
      src: "/images/services/portes-sectionnelles.webp",
      width: 1254,
      height: 1254,
      position: "65% 50%",
      illustrative: true,
      alt: "Portes sectionnelles grises à hublots sur un bâtiment industriel, protégées par des bornes jaunes",
    },
    related: ["rideaux-metalliques", "maintenance"],
  },
  {
    slug: "maintenance",
    label: "Pose et maintenance",
    card: {
      title: "Pose et maintenance",
      description: "Des prestations d'installation et de maintenance pour vos équipements.",
    },
    meta: {
      title: "Pose et maintenance d'équipements professionnels",
      description:
        "Pose et maintenance d'enseignes, stores bannes, rideaux métalliques et portes sectionnelles. Boura Multiservices intervient sur vos équipements professionnels.",
    },
    page: {
      h1: "Pose et maintenance de vos équipements",
      intro: [
        "Un équipement bien installé et régulièrement entretenu dure plus longtemps et vous évite des interruptions d'activité.",
        "Boura Multiservices assure la pose et la maintenance des équipements qui font fonctionner votre devanture et vos locaux : enseignes, stores, rideaux métalliques et portes sectionnelles.",
      ],
      offer: [
        {
          title: "Pose",
          text: "Installation de vos enseignes, éléments de signalétique, stores bannes et fermetures.",
        },
        {
          title: "Maintenance préventive",
          text: "Contrôles et réglages pour anticiper l'usure et limiter les pannes.",
        },
        {
          title: "Dépannage",
          text: "Intervention en cas de dysfonctionnement d'un équipement.",
        },
      ],
      approach:
        "Décrivez-nous l'équipement concerné, son état et le problème rencontré. Nous vous proposons ensuite une intervention adaptée.",
      questions: [
        {
          q: "Intervenez-vous sur des équipements que vous n'avez pas installés ?",
          a: "Contactez-nous en précisant le type et la marque de l'équipement : nous vous dirons si nous pouvons intervenir.",
        },
      ],
    },
    visual: {
      kind: "photo",
      src: "/images/services/maintenance.webp",
      width: 1254,
      height: 1254,
      position: "60% 30%",
      illustrative: true,
      alt: "Techniciens en intervention : réglage d'un store banne, d'une porte sectionnelle et d'un caisson d'enseigne lumineuse",
    },
    related: ["rideaux-metalliques", "portes-sectionnelles", "stores-bannes"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

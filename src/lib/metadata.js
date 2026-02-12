// lib/metadata.js
export const metadataByLocale = {
  fr: {
    home: {
      title: "Vincent André - Portfolio",
      description: "Portfolio de Vincent André, développeur full-stack...",
      openGraph: {
        title: "Vincent André - Portfolio",
        description: "Découvrez mes projets et compétences en développement web full-stack.",
        images: [
          {
            url: "/opengraph-image-v2.png", // Chemin relatif (Next.js 16 gère ça automatiquement)
            width: 1200,
            height: 630,
            alt: "Portfolio de Vincent André",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Vincent André - Portfolio",
        description: "Développeur Full-Stack | Node.js, React",
        images: ["/opengraph-image-v2.png"],
      },
    },
    projects: {
      title: "Vincent André - Projets",
      description: "Mes projets récents...",
      openGraph: {
        title: "Vincent André - Projets",
        description: "Explorez mes projets récents en développement full-stack.",
        images: [
          {
            url: "/opengraph-image-v2.png",
            width: 1200,
            height: 630,
            alt: "Projets de Vincent André",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Vincent André - Projets",
        description: "Découvrez mes projets full-stack.",
        images: ["/opengraph-image-v2.png"],
      },
    },
  },
  en: {
    home: {
      title: "Vincent André - Portfolio",
      description: "Vincent André's portfolio...",
      openGraph: {
        title: "Vincent André - Portfolio",
        description: "Discover my projects and full-stack development skills.",
        images: [
          {
            url: "/opengraph-image-v2.png",
            width: 1200,
            height: 630,
            alt: "Vincent André's Portfolio",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Vincent André - Portfolio",
        description: "Full-Stack Developer | Node.js, React",
        images: ["/opengraph-image-v2.png"],
      },
    },
    projects: {
      title: "Vincent André - Projects",
      description: "My recent projects...",
      openGraph: {
        title: "Vincent André - Projects",
        description: "Browse my recent full-stack development projects.",
        images: [
          {
            url: "/opengraph-image-v2.png",
            width: 1200,
            height: 630,
            alt: "Vincent André's Projects",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Vincent André - Projects",
        description: "Explore my full-stack projects.",
        images: ["/opengraph-image-v2.png"],
      },
    },
  },
};

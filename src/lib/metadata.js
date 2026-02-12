// lib/metadata.js
export const metadataByLocale = {
  fr: {
    home: {
      title: "Vincent André - Portfolio",
      description: "Portfolio de Vincent André, développeur full-stack spécialisé en Node.js et React. Découvrez mes projets, compétences et expériences en développement web moderne.",
      openGraph: {
        title: "Vincent André - Portfolio",
        description: "Découvrez mes projets et compétences en développement web full-stack.",
        images: [
          {
            url: "/opengraph-image.png", // Chemin relatif (Next.js 16 gère ça automatiquement)
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
        images: ["/opengraph-image.png"],
      },
    },
    projects: {
      title: "Vincent André - Projets",
      description: "Explorez mes projets full-stack : applications web, APIs et solutions techniques combinant backend et frontend pour des expériences utilisateur fluides.",
      openGraph: {
        title: "Vincent André - Projets",
        description: "Explorez mes projets récents en développement full-stack.",
        images: [
          {
            url: "/opengraph-image.png",
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
        images: ["/opengraph-image.png"],
      },
    },
  },
  en: {
    home: {
      title: "Vincent André - Portfolio",
      description: "Portfolio of Vincent André, full-stack developer specializing in Node.js and React. Discover my projects, skills, and experience in modern web development.",
      openGraph: {
        title: "Vincent André - Portfolio",
        description: "Discover my projects and full-stack development skills.",
        images: [
          {
            url: "/opengraph-image.png",
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
        images: ["/opengraph-image.png"],
      },
    },
    projects: {
      title: "Vincent André - Projects",
      description: "Explore my full-stack projects: web applications, APIs, and technical solutions combining backend and frontend for seamless user experiences.",
      openGraph: {
        title: "Vincent André - Projects",
        description: "Browse my recent full-stack development projects.",
        images: [
          {
            url: "/opengraph-image.png",
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
        images: ["/opengraph-image.png"],
      },
    },
  },
};

export const metadataByLocale = {
    fr: {
        home: {
            title: "Vincent André - Portfolio",
            description: "Portfolio de Vincent André, développeur full-stack. Création d'applications web modernes avec Node.js, React et des bases de données optimisées.",
        },
        projects: {
            title: "Vincent André - Projets",
            description: "Mes projets récents : applications web, APIs et solutions full-stack. Approche rigoureuse et créative pour des expériences utilisateur fluides.",
        },
    },
    en: {
        home: {
            title: "Vincent André - Portfolio",
            description: "Vincent André's portfolio: full-stack developer building modern web applications with Node.js, React, and optimized databases.",
        },
        projects: {
            title: "Vincent André - Projects",
            description: "My recent projects: web apps, APIs, and full-stack solutions. Rigorous and creative approach for seamless user experiences.",
        },
    },
    openGraph: {
        title: "Vincent André - Portfolio | Développeur Full-Stack",
        description: "Découvrez mes projets et compétences en développement web full-stack.",
        images: [
            {
                url: "/og-image.png", // Place ton image dans public/
                width: 1200,
                height: 630,
                alt: "Portfolio de Vincent André",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Vincent André - Portfolio",
        description: "Développeur Full-Stack | Node.js, React, Bases de données",
        images: ["/og-image.png"],
    },
};

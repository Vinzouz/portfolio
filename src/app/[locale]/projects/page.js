import { getTranslations } from "next-intl/server"
import { metadataByLocale } from "@/lib/metadata"
import { AnimatedProjectCard, ProjectCard } from "@/components/ProjectCard"

export async function generateMetadata({ params }) {
  const { locale } = await params
  return metadataByLocale[locale].projects
}

export default async function Projects({ params }) {
  const { locale } = await params
  const t = await getTranslations("pages.projects")

  // Charger les données en fonction de la locale
  let projects = []
  try {
    if (locale === "fr") {
      projects = (await import("@/data/projects.fr.json")).default
    } else {
      projects = (await import("@/data/projects.en.json")).default
    }
  } catch (e) {
    // fallback : empty
    projects = []
  }

  return (
    <div className="container mx-auto px-4 pt-28">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center relative">{t("title")}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 xl:px-40 mb-20">
          {projects.map((project, index) => (
            <AnimatedProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}


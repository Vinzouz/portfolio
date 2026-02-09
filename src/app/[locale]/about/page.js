import { getTranslations } from "next-intl/server"
import { metadataByLocale } from "@/lib/metadata"

export async function generateMetadata({ params }) {
  const { locale } = await params
  return metadataByLocale[locale].about
}

export default async function About() {
  const t = await getTranslations("pages.about")
  
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-muted-foreground text-lg">
          {t("description")}
        </p>
      </div>
    </div>
  )
}


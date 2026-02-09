import { metadataByLocale } from "@/lib/metadata"
import PresentationDiv from "@/components/PresentationDiv"
import AboutDiv from "@/components/AboutDiv"

export async function generateMetadata({ params }) {
  const { locale } = await params
  return metadataByLocale[locale].home
}

export default async function Home() {

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero */}
      <PresentationDiv />

      {/* About */}
      <AboutDiv />
    </div>
  )
}


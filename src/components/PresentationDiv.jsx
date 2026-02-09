'use client'
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default async function PresentationDiv() {
    const t = await useTranslations("pages.home")

    return (
        <section className="flex items-center justify-center mt-40">
            <motion.div
                className="glass-card max-w-3xl text-center px-8 py-10"
                initial={{ x: -100, opacity: 0 }} // Position initiale : 100px à gauche et invisible
                animate={{ x: 0, opacity: 1 }} // Animation : revient à sa position et devient visible
                transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }} // Effet "spring" pour un mouvement naturel
            >
                
                    {/* Conteneur principal en colonne */}
                    <div className="mb-4 flex flex-col items-center"> {/* items-center pour centrer horizontalement */}
                        {/* Ligne pour "title" */}
                        <div className="text-xl mb-1">
                            {t("title")}
                        </div>
                        {/* Ligne pour "title2" + emoji */}
                        <div className="flex items-center">
                            <div className="text-4xl font-semibold">
                                {t("title2")}
                            </div>
                            <div className="text-xl ml-2">
                                👋
                            </div>
                        </div>
                    </div>
                    {/* Rôle en bleu pour ajouter une touche de couleur */}
                    <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                        {t("role")}
                    </div>
                    {/* Description centrée avec un espacement généreux */}
                    <div className="text-xl tracking-tight max-w-xl mx-auto"> {/* max-w-xl et mx-auto pour limiter la largeur et centrer */}
                        {t("description")
                            .replace(/modernes/g, '<span class="text-blue-400">modernes</span>')
                            .replace(/performantes/g, '<span class="text-blue-400">performantes</span>')
                            .replace(/modern/g, '<span class="text-blue-400">modern</span>')
                            .replace(/high-performance/g, '<span class="text-blue-400">high-performance</span>')
                            .split('\n').map((line, index) => (
                                <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
                            ))}

                        {t("description2").replace(/backend/g, '<span class="text-purple-400">backend</span>')
                            .replace(/frontend/g, '<span class="text-purple-400">frontend</span>')
                            .split('\n').map((line, index) => (
                                <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
                            ))}
                    </div>
                
            </motion.div>
        </section>
    )
}


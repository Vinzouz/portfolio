'use client'
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CodeXml } from "lucide-react"
import Link from "next/link";
import { Button } from "./ui/button";

export default async function AboutDiv() {
    const tAbout = await useTranslations("pages.about");

    return (
        <motion.div
            className="mt-40"
            initial={{ x: -100, opacity: 0 }} // Position initiale : 100px à gauche et invisible
            animate={{ x: 0, opacity: 1 }} // Animation : revient à sa position et devient visible
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }} // Effet "spring" pour un mouvement naturel
            id="about"
        >
            <h2 className="text-3xl font-semibold tracking-tight mb-5 text-center relative">
                {tAbout("title")}
            </h2>
            <section className="glass-cardHome max-w-5xl flex justify-center m-auto mb-24">
                <div className="px-8 py-10 space-y-6">
                    <div className="md:flex md:space-x-8">
                        {/* Texte à gauche */}
                        <div className="md:w-[55%] content-center space-y-4">
                            <p>
                                {tAbout('description')}
                            </p>
                            <p>
                                {tAbout('description2')}
                            </p>
                            <p>
                                {tAbout('description3')}
                            </p>
                            <p>
                                {tAbout('description4')}
                            </p>
                        </div>

                        {/* Compétences à droite */}
                        <div className="md:w-[45%] space-y-4 mt-10 md:mt-0">

                            <h3 className="text-2xl font-semibold flex">
                                <CodeXml className="text-indigo-600" size={35} />
                                &nbsp; {tAbout('skills')}
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {['Node.js', 'Express', 'REST APIs', 'MySQL', 'MongoDB', 'NoSQL'].map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-md font-medium rounded-full text-white shadow-sm hover:scale-105 transition-all"
                                        style={{
                                            background: "linear-gradient(to right, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8))",
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {['React', 'Next.js', 'Javascript (ES6+)', 'Tailwind', 'Shadcn'].map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-md font-medium rounded-full text-white shadow-sm hover:scale-105 transition-all"
                                        style={{
                                            background: "linear-gradient(to right, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8))",
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {['Ionic'].map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-md font-medium rounded-full text-white shadow-sm hover:scale-105 transition-all"
                                        style={{
                                            background: "linear-gradient(to right, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8))",
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {['Git / Github', tAbout('agile')].map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-md font-medium rounded-full text-white shadow-sm hover:scale-105 transition-all"
                                        style={{
                                            background: "linear-gradient(to right, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8))",
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>


                        </div>

                    </div>
                    <div className="flex justify-center">
                        <Link href="/projects">
                            <Button
                                className="w-[250px] bg-gradient-to-r from-indigo-500 to-violet-500 hover:brightness-125 transition-all text-white py-2 px-4 rounded-lg transition-colors mt-4 border-none font-semibold"
                            >
                                {tAbout('seeProjects')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}
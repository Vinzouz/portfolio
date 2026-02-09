"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ProjectModal } from "./ProjectModal"
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"
import { motion } from "framer-motion";

const cardVariants = {
  hidden: (index) => ({
    x: index % 2 === 0 ? -100 : 100, // Gauche pour les paires, droite pour les impaires
    opacity: 0,
  }),
  visible: (index) => ({
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: index * 0.2
    },
  }),
};

// Composant pour envelopper chaque carte individuellement
export const AnimatedProjectCard = ({ project, index }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={cardVariants}
    custom={index}
  >
    <ProjectCard project={project} />
  </motion.div>
);

export function ProjectCard({ project, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("pages.projects");

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = 'hidden';
    }
    else {
      document.documentElement.style.overflow = 'visible';
    }
  }, [isModalOpen])

  return (
    <>
      <CardContainer containerClassName="py-0">
        <CardBody className="glass-card2 p-6 rounded-lg shadow-lg relative" >
          <CardItem translateZ={80} className="relative h-48 w-full overflow-hidden rounded-t-lg mb-4">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain"
            />
          </CardItem>

          <div className="space-y-4">
            <CardItem translateZ={60}>
              <h3 className="text-2xl font-bold text-foreground min-h-[64px] content-center">
                {project.title}
              </h3>
            </CardItem>

            <CardItem translateZ={50}>
              <div className="flex flex-col gap-2">
                {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Layers className="text-indigo-600 content-center"/>
                  <span className="flex font-semibold text-lg text-foreground">{t("technical stack")}</span>
                </div> */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium rounded-full text-white shadow-sm hover:scale-105"
                      style={{
                        background: "linear-gradient(to right, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8))",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </CardItem>

            <CardItem translateZ={40}>
              <p className="text-muted-foreground">
                {project.description}
              </p>
            </CardItem>

            <CardItem translateZ={60} className="w-full mt-4">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full mx-auto block py-2 text-sm font-medium rounded-lg text-white"
                style={{
                  background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                  border: "none"
                }}
              >
                {t("viewMore")}
              </Button>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={project}
      />
    </>
  );
}


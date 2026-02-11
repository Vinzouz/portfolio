"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ProjectModal } from "./ProjectModal"
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

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
    <ProjectCard project={project} index={index} />
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
        <CardBody className="glass-card2 p-6 rounded-lg shadow-lg relative w-[350px]" >
          <CardItem translateZ={80} className="relative h-40 w-full overflow-hidden rounded-t-lg mb-4">
            <Swiper
              modules={[Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              className="w-full h-40"
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
              }}
              onClick={() => setIsModalOpen(true)}
            >
              {project.modalImages?.map((img, index) => (
                <SwiperSlide key={index} className="w-full h-64">
                  <div className="relative w-full h-full">
                    <Image
                      src={img}
                      alt={`${project.title} - Screenshot ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </CardItem>

          <div className="space-y-4">
            <CardItem translateZ={60}>
              <h3 className="text-2xl font-bold text-foreground ">
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
                      className="px-3 py-1 text-xs font-medium rounded-full text-white shadow-sm hover:scale-105 transition-all"
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
                className="w-full mx-auto block py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:brightness-125 transition-all"
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


"use client"

import { useEffect } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Layers } from "lucide-react";

export function ProjectModal({ isOpen, onClose, project }) {
  const t = useTranslations("pages.projects")
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="glass-card backgroundModal w-[95vw] md:w-[50vw] h-[90vh] md:h-auto overflow-hidden flex flex-col relative mx-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/80 hover:bg-background flex items-center justify-center text-foreground">
          ✕
        </button>

        <div className="relative w-full h-64 flex-shrink-0">
          <Swiper
            modules={[Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            className="w-full h-64"
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            direction="vertical"
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
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">{project.title}</h2>

          <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Layers className="text-indigo-600 content-center" />
              <span className="font-semibold text-lg text-white">{t("technical stack")} :</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium rounded-full text-white hover:scale-105"
                  style={{
                    background: "linear-gradient(to right, rgba(99, 102, 241, 0.7), rgba(139, 92, 246, 0.7))",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>


          <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
            {project.description}
          </p>


          {project.details.map((section, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">{section.section}</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {section.content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}


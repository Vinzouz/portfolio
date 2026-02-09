"use client"

import React, { useState } from "react"
import { ProjectCard } from "@/components/ProjectCard"
import { ProjectModal } from "@/components/ProjectModal"

export default function ProjectsList({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null)

  function openModal(project) {
    setSelectedProject(project)
  }

  function closeModal() {
    setSelectedProject(null)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onViewMore={() => openModal(project)} />
        ))}
      </div>

      <ProjectModal isOpen={!!selectedProject} onClose={closeModal} project={selectedProject || {}} />
    </>
  )
}



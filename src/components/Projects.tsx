import { projects } from "../data/profile";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./Typography";

export function Projects() {
  return (
    <section id="projects" className="section-block section-divider" aria-labelledby="projects-heading">
      <SectionHeader
        id="projects-heading"
        label="Selected work"
        title="Projects"
        intro="Engineering case studies with technologies, challenges, and measurable outcomes — consensus systems, RPC infrastructure, and applied ML."
      />

      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard key={project.repo} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

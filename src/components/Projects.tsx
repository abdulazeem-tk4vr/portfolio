import { projects } from "../data/profile";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./Typography";

export function Projects() {
  return (
    <section id="projects" className="section-block section-divider" aria-labelledby="projects-heading">
      <SectionHeader
        id="projects-heading"
        label="05 / Selected work"
        title="Projects"
        intro="Fault-tolerant AI decisions, forecasting deployed with farmer cooperatives, and trading strategies evaluated out of sample against buy-and-hold."
      />

      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

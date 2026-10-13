import { BrandLogo } from "./BrandLogo";
import type { RepoEntry } from "../data/profile";

export function ProjectCard({ project, index }: { project: RepoEntry; index: number }) {
  return (
    <article
      className={`project-card${index === 0 ? " project-card-featured" : ""}`}
      itemScope
      itemType={project.repo ? "https://schema.org/SoftwareSourceCode" : "https://schema.org/CreativeWork"}
    >
      {project.visual && (
        <figure className="project-visual">
          <img src={project.visual} alt={project.visualDescription ?? `${project.name} workflow diagram`} className="project-visual-image" width={800} height={450} loading="lazy" decoding="async" />
        </figure>
      )}
      <div className="project-content">
        <header className="project-card-header">
          <p className="project-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
          <div className="logo-name"><BrandLogo src={project.logo} /><h3 className="project-card-title" itemProp="name">{project.name}</h3></div>
          {(project.org || project.period) && <p className="project-meta">{[project.org, project.period].filter(Boolean).join(" · ")}</p>}
        </header>
        <p className="project-lead" itemProp="description">{project.description}</p>
        <div className="project-tags" aria-label="Technologies">
          {project.tags.map((tag) => <span key={tag} className="project-tag" itemProp="keywords">{tag}</span>)}
        </div>
        {(project.repo || project.paperUrl || project.demoUrl) && (
          <footer className="project-card-footer">
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-link" itemProp="codeRepository" aria-label={`View code for ${project.name}`}>
                Code
              </a>
            )}
            {project.paperUrl && (
              <a href={project.paperUrl} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={`Read the paper for ${project.name}`}>
                Paper
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={`Open the demo for ${project.name}`}>
                Live demo
              </a>
            )}
          </footer>
        )}
      </div>
    </article>
  );
}

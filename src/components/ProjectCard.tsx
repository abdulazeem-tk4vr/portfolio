import type { ReactNode } from "react";
import type { RepoEntry } from "../data/profile";

function ProjectSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="project-section">
      <p className="project-section-label">{label}</p>
      <div className="project-section-body">{children}</div>
    </div>
  );
}

export function ProjectCard({
  project,
  index,
}: {
  project: RepoEntry;
  index: number;
}) {
  return (
    <article
      className="project-card"
      itemScope
      itemType="https://schema.org/SoftwareSourceCode"
    >
      <header className="project-card-header">
        <div className="min-w-0 flex-1">
          <p className="project-index" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="project-card-title" itemProp="name">
            {project.name}
          </h3>
        </div>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card-icon-link"
          aria-label={`View ${project.name} on GitHub`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </header>

      <div className="project-card-body">
        <ProjectSection label="Overview">
          <p className="project-text" itemProp="description">
            {project.description}
          </p>
        </ProjectSection>

        {project.bullets && project.bullets.length > 0 && (
          <ProjectSection label="Details">
            <ul className="project-detail-list">
              {project.bullets.map((item) => (
                <li key={item.slice(0, 48)}>{item}</li>
              ))}
            </ul>
          </ProjectSection>
        )}

        {project.challenge && (
          <ProjectSection label="Key challenge">
            <p className="project-text">{project.challenge}</p>
          </ProjectSection>
        )}

        {project.result && (
          <ProjectSection label="Result">
            <p className="project-text project-result">{project.result}</p>
          </ProjectSection>
        )}

        <ProjectSection label="Technologies">
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag" itemProp="programmingLanguage">
                {tag}
              </span>
            ))}
          </div>
        </ProjectSection>
      </div>

      <footer className="project-card-footer">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
          itemProp="codeRepository"
        >
          GitHub
          <span aria-hidden>→</span>
        </a>
        {project.paperUrl && (
          <a
            href={project.paperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            Paper
            <span aria-hidden>→</span>
          </a>
        )}
      </footer>
    </article>
  );
}

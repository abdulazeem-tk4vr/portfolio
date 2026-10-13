import type { RepoEntry } from "../data/profile";

export function RepoList({ items }: { items: RepoEntry[] }) {
  return (
    <div className="repo-list">
      {items.map((project) => (
        <article key={project.repo ?? project.name} className="repo-card" itemScope itemType="https://schema.org/SoftwareSourceCode">
          <div className="repo-card-header">
            <h4 className="repo-card-title" itemProp="name">{project.name}</h4>
            {project.repo && (
              <a href={project.prUrl ?? project.repo} target="_blank" rel="noopener noreferrer" className="repo-github-link" aria-label={project.prUrl ? `View merged PRs for ${project.name}` : `View ${project.name} on GitHub`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.4-1.22.72-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.78 10.78 0 0 1 5.63 0c2.15-1.46 3.1-1.15 3.1-1.15.6 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.15 5.55.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
                </svg>
                <span className="repo-github-label">{project.prUrl ? "View PRs" : "GitHub"}</span>
              </a>
            )}
          </div>
          <p className="repo-card-description" itemProp="description">{project.description}</p>
          <div className="repo-card-tags" aria-label="Technologies">
            {project.tags.map((tag) => <span key={tag} className="repo-tag" itemProp="keywords">{tag}</span>)}
          </div>
        </article>
      ))}
    </div>
  );
}

export type { RepoEntry };

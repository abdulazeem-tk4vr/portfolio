import type { RepoEntry } from "../data/profile";

function RepoCard({
  project,
  cardClass = "",
  tagClass = "",
}: {
  project: RepoEntry;
  cardClass?: string;
  tagClass?: string;
}) {
  return (
    <article
      className={`repo-card ${cardClass}`.trim()}
      itemScope
      itemType="https://schema.org/SoftwareSourceCode"
    >
      <div className="repo-card-header">
        <h3 className="repo-card-title" itemProp="name">
          {project.name}
        </h3>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-card-icon-link"
          aria-label={`View ${project.name} on GitHub`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <p className="repo-card-description" itemProp="description">
        {project.description}
      </p>

      <div className="repo-card-tags">
        {project.tags.map((tag) => (
          <span key={tag} className={`repo-tag ${tagClass}`.trim()} itemProp="programmingLanguage">
            {tag}
          </span>
        ))}
      </div>

      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="repo-card-link"
        itemProp="codeRepository"
      >
        {project.repo.replace("https://github.com/", "")}
        <span aria-hidden>→</span>
      </a>
    </article>
  );
}

function gridClass(columns: 1 | 2 | 3) {
  switch (columns) {
    case 3:
      return "card-grid-3";
    case 2:
      return "card-grid";
    case 1:
      return "space-y-4";
  }
}

export function RepoList({
  items,
  columns = 1,
  repoCardClass = "",
  tagClass = "",
}: {
  items: RepoEntry[];
  columns?: 1 | 2 | 3;
  staggerMs?: number;
  baseDelay?: number;
  repoCardClass?: string;
  tagClass?: string;
}) {
  return (
    <div className={gridClass(columns)}>
      {items.map((project) => (
        <RepoCard
          key={project.repo}
          project={project}
          cardClass={repoCardClass}
          tagClass={tagClass}
        />
      ))}
    </div>
  );
}

export type { RepoEntry };

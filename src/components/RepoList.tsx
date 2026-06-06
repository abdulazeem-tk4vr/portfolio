import { Reveal } from "./Reveal";

export type RepoEntry = {
  name: string;
  repo: string;
  description: string;
  tags: string[];
};

function RepoCard({ project }: { project: RepoEntry }) {
  return (
    <article
      className="content-card shine-card flex h-full flex-col"
      itemScope
      itemType="https://schema.org/SoftwareSourceCode"
    >
      <div className="card-header !pb-4">
        <h3 className="card-title" itemProp="name">
          {project.name}
        </h3>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg p-2 text-ink-muted transition-all duration-200 hover:bg-accent-wash hover:text-accent-blue"
          aria-label={`View ${project.name} on GitHub`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <p className="flex-1 text-[15px] leading-[1.72] text-ink-muted" itemProp="description">
        {project.description}
      </p>

      <div className="card-footer !mt-6">
        {project.tags.map((tag) => (
          <span key={tag} className="tag" itemProp="programmingLanguage">
            {tag}
          </span>
        ))}
      </div>

      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-navy underline decoration-accent-blue/30 underline-offset-[3px] transition-all hover:translate-x-0.5 hover:text-accent-blue hover:decoration-accent-blue/60"
        itemProp="codeRepository"
      >
        {project.repo.replace("https://", "")}
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
      return "space-y-6";
  }
}

export function RepoList({
  items,
  columns = 1,
  staggerMs = 80,
  baseDelay = 0,
}: {
  items: RepoEntry[];
  columns?: 1 | 2 | 3;
  staggerMs?: number;
  baseDelay?: number;
}) {
  return (
    <div className={gridClass(columns)}>
      {items.map((project, index) => (
        <Reveal key={project.repo} delay={baseDelay + index * staggerMs}>
          <RepoCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}

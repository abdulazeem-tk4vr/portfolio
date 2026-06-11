import { useState } from "react";
import type { experience } from "../data/profile";
import { BulletList, PeriodBadge } from "./Typography";

const VISIBLE_HIGHLIGHTS = 5;

type ExperienceEntry = (typeof experience)[number];

export function ExperienceCard({ job }: { job: ExperienceEntry }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = job.highlights.length > VISIBLE_HIGHLIGHTS;
  const visibleHighlights = expanded
    ? job.highlights
    : job.highlights.slice(0, VISIBLE_HIGHLIGHTS);
  const hiddenCount = job.highlights.length - VISIBLE_HIGHLIGHTS;

  return (
    <article className="content-card flex h-full flex-col" itemScope itemType="https://schema.org/OrganizationRole">
      <div className="card-header">
        <div className="min-w-0 flex-1">
          <h3 className="card-title" itemProp="roleName">
            {job.role}
          </h3>
          <p className="card-subtitle">
            {"url" in job && job.url ? (
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-link"
                itemProp="worksFor"
              >
                {job.company}
              </a>
            ) : (
              <span itemProp="worksFor">{job.company}</span>
            )}
            <span className="text-ink-faint"> · {job.location}</span>
          </p>
          {job.org && <p className="mt-1 text-xs leading-relaxed text-ink-faint">{job.org}</p>}
        </div>
        <PeriodBadge>{job.period}</PeriodBadge>
      </div>

      <div className="card-body flex-1">
        <BulletList items={visibleHighlights} itemProp="description" twoColumn />
        {hasMore && (
          <button
            type="button"
            className="expand-toggle"
            aria-expanded={expanded ? "true" : "false"}
            onClick={() => setExpanded((open) => !open)}
          >
            {expanded ? "Show less" : `Show ${hiddenCount} more`}
          </button>
        )}
      </div>

      <div className="card-footer">
        {job.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

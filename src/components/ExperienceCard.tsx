import { BrandLogo } from "./BrandLogo";
import type { experience } from "../data/profile";

type ExperienceEntry = (typeof experience)[number];

export function ExperienceCard({ job }: { job: ExperienceEntry }) {
  return (
    <article className="experience-card" itemScope itemType="https://schema.org/OrganizationRole">
      <details>
      <summary className="experience-toggle">
      <div className="experience-identity">
        <BrandLogo src={job.logo} />
        <div className="experience-identity-text">
          <h3 className="card-title" itemProp="roleName">{job.role}</h3>
          <p className="experience-company" itemProp="worksFor">
            {"url" in job && job.url ? (
              <a href={job.url} target="_blank" rel="noopener noreferrer" className="company-link">{job.company}</a>
            ) : job.company}
          </p>
          <p className="card-subtitle">{job.location}</p>
          {job.org && <p className="card-subtitle">{job.org}</p>}
        </div>
      </div>
      <svg className="experience-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </summary>

      <p className="job-summary" itemProp="description">{job.summary}</p>
      {job.researchAnchor && <a href={`#${job.researchAnchor}`} className="inline-link research-details-link">Research details</a>}

      <div className="card-footer">
        {job.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      </details>
    </article>
  );
}

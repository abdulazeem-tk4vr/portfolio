import { experience } from "../data/profile";
import { Reveal } from "./Reveal";
import { BulletList, PeriodBadge, SectionHeader } from "./Typography";

export function Experience() {
  return (
    <section id="experience" className="section-block section-divider" aria-labelledby="experience-heading">
      <Reveal>
        <SectionHeader
          id="experience-heading"
          label="Work"
          title="Experience"
          intro="3+ years building production distributed systems — from blockchain mainnet launches to cross-chain bridges and AI security research."
        />
      </Reveal>

      <div className="card-grid">
        {experience.map((job, index) => (
          <Reveal key={`${job.company}-${job.period}`} delay={index * 80}>
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
                  {job.org && (
                    <p className="mt-1 text-xs leading-relaxed text-ink-faint">{job.org}</p>
                  )}
                </div>
                <PeriodBadge>{job.period}</PeriodBadge>
              </div>

              <div className="card-body flex-1">
                <BulletList items={job.highlights} itemProp="description" twoColumn />
              </div>

              <div className="card-footer">
                {job.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { BrandLogo } from "./BrandLogo";
import { profile, research } from "../data/profile";
import { PeriodBadge, SectionHeader } from "./Typography";

export function Research() {
  return (
    <section id="research" className="section-block section-divider" aria-labelledby="research-heading">
      <div className="research-header">
      <SectionHeader
        id="research-heading"
        label="03 / Research"
        title="Research"
        intro="Published work and research in applied AI, cybersecurity, and computing for social impact."
      />
      <a href={profile.links.scholar} target="_blank" rel="noopener noreferrer" className="inline-link scholar-link">Google Scholar</a>
      </div>

      <div className="research-list">
        {research.map((item) => (
          <article
            id={item.id}
            key={item.title}
            className={`research-card ${item.featured ? "research-featured" : ""}`}
            itemScope
            itemType="https://schema.org/ScholarlyArticle"
          >
            <div className="card-header !items-start">
              <div className="min-w-0 flex-1">
                {item.featured && (
                  <p className="section-eyebrow !mb-2">Featured · ACM JCSS</p>
                )}
                <h3 className="card-title leading-snug" itemProp="name">
                  {item.title}
                </h3>
                <p className="card-subtitle research-org" itemProp="publisher">
                  <BrandLogo src={item.logo} />
                  {item.org}
                </p>
                <p className="research-date"><PeriodBadge>{item.period}</PeriodBadge></p>
              </div>
            </div>
            <div className="card-body flex-1">
              <div className="research-description" itemProp="description">
                {item.description.split("\n\n").map((paragraph) => <p key={paragraph} className="body-text text-[18px]">{paragraph}</p>)}
              </div>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-navy underline decoration-accent-blue/30 underline-offset-[3px] transition-colors hover:text-accent-blue"
                  itemProp="url"
                >
                  Read publication
                  <span aria-hidden>→</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

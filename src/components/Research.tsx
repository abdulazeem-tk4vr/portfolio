import { research } from "../data/profile";
import { PeriodBadge, SectionHeader } from "./Typography";

export function Research() {
  return (
    <section id="research" className="section-block section-divider" aria-labelledby="research-heading">
      <SectionHeader
        id="research-heading"
        label="Publications"
        title="Research"
        intro="ACM-published work and in-progress research in AI security, applied ML for social impact, federated learning, and mobile security."
      />

      <div className="card-grid">
        {research.map((item) => (
          <article
            key={item.title}
            className={`content-card flex h-full flex-col ${item.featured ? "border-accent-blue/30 ring-1 ring-accent-blue/10" : ""}`}
            itemScope
            itemType="https://schema.org/ScholarlyArticle"
          >
            <div className="card-header !items-start">
              <div className="min-w-0 flex-1 pr-4">
                {item.featured && (
                  <p className="section-eyebrow !mb-2">Featured · ACM JCSS</p>
                )}
                <h3 className="card-title leading-snug" itemProp="name">
                  {item.title}
                </h3>
                <p className="card-subtitle" itemProp="publisher">
                  {item.org}
                </p>
              </div>
              <PeriodBadge>{item.period}</PeriodBadge>
            </div>
            <p className="text-[15px] leading-[1.72] text-ink-muted" itemProp="description">
              {item.description}
            </p>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-navy underline decoration-accent-blue/30 underline-offset-[3px] transition-colors hover:text-accent-blue"
                itemProp="url"
              >
                Read paper
                <span aria-hidden>→</span>
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

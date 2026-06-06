import { research } from "../data/profile";
import { Reveal } from "./Reveal";
import { PeriodBadge, SectionHeader } from "./Typography";

export function Research() {
  return (
    <section id="research" className="section-block section-divider" aria-labelledby="research-heading">
      <Reveal>
        <SectionHeader
          id="research-heading"
          label="Publications"
          title="Research"
          intro="Published work spanning AI security, HCI, federated learning, and mobile device security — funded by Google AI for Social Good."
        />
      </Reveal>

      <div className="card-grid">
        {research.map((item, index) => (
          <Reveal key={item.title} delay={index * 80}>
            <article
              className="content-card flex h-full flex-col"
              itemScope
              itemType="https://schema.org/ScholarlyArticle"
            >
              <div className="card-header !items-start">
                <div className="min-w-0 flex-1 pr-4">
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
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

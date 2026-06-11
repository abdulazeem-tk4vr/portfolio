import { experience } from "../data/profile";
import { ExperienceCard } from "./ExperienceCard";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Typography";

export function Experience() {
  return (
    <section id="experience" className="section-block section-divider" aria-labelledby="experience-heading">
      <Reveal>
        <SectionHeader
          id="experience-heading"
          label="Work"
          title="Experience"
          intro="4+ years building production distributed systems — from blockchain mainnet launches to cross-chain bridges and AI security research."
        />
      </Reveal>

      <div className="card-grid">
        {experience.map((job, index) => (
          <Reveal key={`${job.company}-${job.period}`} delay={index * 80}>
            <ExperienceCard job={job} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { experience } from "../data/profile";
import { ExperienceCard } from "./ExperienceCard";
import { SectionHeader } from "./Typography";

export function Experience() {
  return (
    <section id="experience" className="section-block section-divider" aria-labelledby="experience-heading">
        <SectionHeader
          id="experience-heading"
          label="02 / Career path"
          title="Experience"
        />
      <ol className="career-timeline" aria-label="Work and research experience">
        {experience.map((job, index) => (
          <li id={`career-${index}`} key={`${job.company}-${job.period}`} className="career-entry">
            <span className="career-dot" aria-hidden="true" />
            <p className="career-date">{job.period}{index === 0 && <span className="current-label">Current</span>}</p>
            <ExperienceCard job={job} />
          </li>
        ))}
      </ol>
    </section>
  );
}

import {
  certifications,
  education,
  profile,
  skillGroups,
} from "../data/profile";
import { Reveal } from "./Reveal";
import { SectionHeader, SubsectionTitle } from "./Typography";

const currently = [
  {
    title: "M.S. Computer Science",
    org: "Georgia Tech",
    detail: "AI specialization",
  },
  {
    title: "AI Security Researcher",
    org: "School of Cybersecurity and Privacy",
    detail: "Adversarial multi-agentic SOC workflows",
  },
  {
    title: "Software Engineer",
    org: "Liberdus",
    detail: "Cross-chain infrastructure · TSS · DevSecOps",
  },
];

export function About() {
  return (
    <section id="about" className="section-block section-divider" aria-labelledby="about-heading">
      <Reveal>
        <SectionHeader
          id="about-heading"
          label="Background"
          title="About"
          intro="Distributed systems engineer and AI security researcher — 3+ years shipping production infrastructure from blockchain mainnets to cross-chain bridges."
        />
      </Reveal>

      <Reveal delay={80}>
        <div className="content-card">
          <SubsectionTitle>Currently</SubsectionTitle>
          <ul className="currently-grid mt-6">
            {currently.map((item) => (
              <li key={item.title} className="currently-item">
                <p className="text-[15px] font-semibold leading-snug text-ink">{item.title}</p>
                <p className="mt-1 text-sm text-accent-navy">{item.org}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-5 text-sm text-ink-muted">
            {profile.location}
            <span className="mx-2 text-ink-faint">·</span>
            {profile.workAuth}
          </p>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div className="content-card mt-6">
          <SubsectionTitle>Skills</SubsectionTitle>
          <dl className="skills-matrix mt-6">
            {skillGroups.map((group) => (
              <div key={group.label} className="skills-row">
                <dt>{group.label}</dt>
                <dd>
                  {group.skills.map((skill) => (
                    <span key={skill} className="tag">
                      {skill}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Reveal delay={100}>
          <div className="content-card h-full">
            <SubsectionTitle>Education</SubsectionTitle>
            <ul className="mt-5 space-y-5">
              {education.map((edu) => (
                <li key={edu.school} className="border-b border-line pb-5 last:border-0 last:pb-0">
                  <p className="text-[15px] font-semibold leading-snug text-ink">{edu.degree}</p>
                  <p className="mt-1 text-sm text-ink-muted">{edu.school}</p>
                  {edu.detail && (
                    <p className="mt-1 text-xs leading-relaxed text-ink-faint">{edu.detail}</p>
                  )}
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                    {edu.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="content-card h-full">
            <SubsectionTitle>Certifications</SubsectionTitle>
            <ul className="mt-5 space-y-3">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="flex gap-3 border-b border-line pb-3 text-[14px] leading-relaxed text-ink-muted last:border-0 last:pb-0"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue/60" aria-hidden />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

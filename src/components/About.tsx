import { BrandLogo } from "./BrandLogo";
import { education, profile, skillGroups } from "../data/profile";
import { SectionHeader, SubsectionTitle } from "./Typography";

export function About() {
  return (
    <section id="about" className="section-block section-divider" aria-labelledby="about-heading">
      <SectionHeader id="about-heading" label="01 / Background" title="Background" />
      <div className="about-copy">
        {profile.intro.map((paragraph) => <p key={paragraph} className="about-bio">{paragraph}</p>)}
      </div>
      <div className="background-grid">
        <div>
          <SubsectionTitle>Education</SubsectionTitle>
          <ul className="education-list">
            {education.map((edu) => (
              <li key={edu.school} className="education-entry">
                <BrandLogo src={edu.logo} />
                <div className="education-copy">
                  <h4 className="education-degree">{edu.degree}</h4>
                  <p className="education-school">{edu.school}</p>
                  <div className="education-details">
                    {edu.detail.split(" · ").map((detail) => <p key={detail} className="education-detail">{detail}</p>)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SubsectionTitle>Technical Skills</SubsectionTitle>
          <dl className="skills-matrix">
            {skillGroups.map((group) => (
              <div key={group.label} className="skills-row">
                <dt>{group.label}</dt>
                <dd className="skills-list">{group.skills.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

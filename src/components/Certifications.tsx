import { BrandLogo } from "./BrandLogo";
import { certifications } from "../data/profile";
import { SectionHeader } from "./Typography";

export function Certifications() {
  return (
    <section id="certifications" className="section-block section-divider" aria-labelledby="certifications-heading">
      <SectionHeader id="certifications-heading" label="06 / Credentials" title="Certifications" />
      <div className="certifications-grid">
        {certifications.map((certification) => (
          <article key={certification.name} className="certification-card">
            <div className="certification-card-header">
            <div className="certification-copy">
            <div className="logo-name"><BrandLogo src={certification.logo} /><h3 className="certification-name">{certification.name}</h3></div>
            {certification.detail && <p className="certification-detail">{certification.detail}</p>}
            </div>
            {certification.url && (
              <a href={certification.url} target="_blank" rel="noopener noreferrer" className="certification-link" aria-label={`View credential for ${certification.name}`}>
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7 .2l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7-.2l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
                </svg>
              </a>
            )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

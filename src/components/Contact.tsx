import { profile } from "../data/profile";
import { Reveal } from "./Reveal";
import { SectionHeader, SubsectionTitle } from "./Typography";

type ContactItemProps = {
  label: string;
  value: string;
  href: string;
  rel?: string;
};

function ContactItem({ label, value, href, rel }: ContactItemProps) {
  const external = href.startsWith("http");

  return (
    <div className="contact-item">
      <span className="meta-label">{label}</span>
      <a
        href={href}
        className="meta-link mt-2 block break-words text-[18px] leading-snug"
        target={external || label === "CV" ? "_blank" : undefined}
        rel={rel ?? (external ? "noopener noreferrer" : undefined)}
      >
        {value}
      </a>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section-block section-divider" aria-labelledby="contact-heading">
      <Reveal>
        <SectionHeader
          id="contact-heading"
          label="07 / Contact"
          title="Let's build something useful"
          intro={`Open to roles in AI engineering, distributed systems, and infrastructure. Based in ${profile.location} and open to relocation.`}
        />
      </Reveal>

      <Reveal delay={100}>
        <address className="not-italic">
          <div className="content-card">
            <p className="contact-intro body-text">
              Email and LinkedIn are the fastest ways to get in touch. Happy to chat about
              new ideas, systems design, or research.
            </p>
            <div className="contact-grid">
              <ContactItem
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
                rel="me"
              />
              <ContactItem
                label="LinkedIn"
                value="linkedin.com/in/abdulazeem-shaik"
                href={profile.links.linkedin}
                rel="me noopener noreferrer"
              />
              <ContactItem
                label="GitHub"
                value="github.com/abdulazeem-tk4vr"
                href={profile.links.github}
                rel="me noopener noreferrer"
              />
              <ContactItem label="CV" value="View résumé PDF" href={profile.links.cv} />
            </div>
          </div>
        </address>
      </Reveal>

      <Reveal delay={180}>
        <div className="mt-10">
          <SubsectionTitle>References</SubsectionTitle>
          <p className="body-text mt-3">Available on request.</p>
        </div>
      </Reveal>


    </section>
  );
}

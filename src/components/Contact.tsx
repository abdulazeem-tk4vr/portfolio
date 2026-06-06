import { profile, references } from "../data/profile";
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
        className="meta-link mt-2 block break-words text-[15px] leading-snug"
        target={external ? "_blank" : undefined}
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
          label="Get in touch"
          title="Contact"
          intro="Open to roles in distributed systems, AI/ML engineering, and security. Based in the Bay Area — open to relocation."
        />
      </Reveal>

      <Reveal delay={100}>
        <address className="not-italic">
          <div className="content-card">
            <p className="max-w-2xl text-[15px] leading-[1.72] text-ink-muted">
              The fastest way to reach me is email or LinkedIn. Happy to chat about
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
              <ContactItem label="CV" value="Download PDF" href={profile.links.cv} />
            </div>
          </div>
        </address>
      </Reveal>

      <Reveal delay={180}>
        <div className="mt-10">
          <SubsectionTitle>References</SubsectionTitle>
          <div className="card-grid mt-5">
            {references.map((ref) => (
              <a
                key={ref.name}
                href={ref.link}
                target="_blank"
                rel="noopener noreferrer"
                className="content-card block h-full hover:translate-y-0"
              >
                <p className="text-[15px] font-semibold text-ink">{ref.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{ref.title}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-faint">{ref.note}</p>
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={240}>
        <p className="mt-10 text-[15px] leading-relaxed text-ink-muted lg:mt-12">
          Reach out by{" "}
          <a href={`mailto:${profile.email}`} className="inline-link" rel="me">
            mailing me
          </a>{" "}
          or{" "}
          <a
            href={profile.links.linkedin}
            className="inline-link"
            target="_blank"
            rel="me noopener noreferrer"
          >
            texting me on LinkedIn
          </a>
          .
        </p>
      </Reveal>
    </section>
  );
}

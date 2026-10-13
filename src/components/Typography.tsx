import type { ReactNode } from "react";

type SectionHeaderProps = {
  id: string;
  label: string;
  title: string;
  intro?: string;
};

const sectionIcons: Record<string, string> = {
  "about-heading": "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM5 21a7 7 0 0 1 14 0",
  "experience-heading": "M8 6V4h8v2M3 6h18v14H3V6Zm0 6a24 24 0 0 0 18 0M12 10v4",
  "projects-heading": "M3 6h7l2 2h9v12H3V6Z",
  "research-heading": "M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1m0-15c3-2 6-2 9-1v15c-3-1-6-1-9 1V5Z",
  "certifications-heading": "M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM8 12l-2 9 6-3 6 3-2-9",
  "opensource-heading": "M7 7v10m0-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0v3a5 5 0 0 1-5 5H7",
  "contact-heading": "M3 5h18v14H3V5Zm0 0 9 7 9-7",
};

export function SectionHeader({ id, label, title, intro }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <p className="section-eyebrow">{label}</p>
      <div className="section-title-row">
      <span className="section-mark" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={sectionIcons[id]} /></svg></span>
      <h2 id={id} className="section-heading">
        <span className="section-heading-accent">{title}</span>
      </h2>
      </div>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  );
}

export function SubsectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="subsection-title">{children}</h3>;
}

export function MetaRow({
  label,
  value,
  href,
  rel,
}: {
  label: string;
  value: string;
  href?: string;
  rel?: string;
}) {
  const content = href ? (
    <a
      href={href}
      className="meta-link"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={rel ?? (href.startsWith("http") ? "noopener noreferrer" : undefined)}
    >
      {value}
    </a>
  ) : (
    <span className="text-ink">{value}</span>
  );

  return (
    <div className="meta-row">
      <span className="meta-label">{label}</span>
      <div className="meta-value">{content}</div>
    </div>
  );
}

export function PeriodBadge({ children }: { children: ReactNode }) {
  return (
    <span className="period-badge">
      {children}
    </span>
  );
}

import type { ReactNode } from "react";

type SectionHeaderProps = {
  id: string;
  label: string;
  title: string;
  intro?: string;
};

export function SectionHeader({ id, label, title, intro }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <p className="section-eyebrow">{label}</p>
      <div className="accent-bar" aria-hidden />
      <h2 id={id} className="section-heading mt-4">
        <span className="section-heading-accent">{title}</span>
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  );
}

export function SubsectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="subsection-title">{children}</h3>;
}

export function BulletList({
  items,
  className = "",
  itemProp,
  twoColumn = false,
}: {
  items: string[];
  className?: string;
  itemProp?: string;
  twoColumn?: boolean;
}) {
  return (
    <ul className={`bullet-list ${twoColumn ? "bullet-list-2col" : ""} ${className}`}>
      {items.map((item) => (
        <li key={item.slice(0, 56)} itemProp={itemProp}>
          {item}
        </li>
      ))}
    </ul>
  );
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
    <time className="period-badge" dateTime={String(children)}>
      {children}
    </time>
  );
}

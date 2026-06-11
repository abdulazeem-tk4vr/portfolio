import { Link } from "react-router-dom";
import { featuredHighlight, impactHighlights, profile } from "../data/profile";

function FeaturedPublication() {
  return (
    <article className="content-card mt-10">
      <p className="section-eyebrow">{featuredHighlight.label}</p>
      <h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.02em] text-ink">
        {featuredHighlight.title}
      </h3>
      <p className="mt-2 text-[15px] leading-[1.72] text-ink-muted">{featuredHighlight.description}</p>
      <div className="mt-4 flex flex-wrap gap-4">
        <a
          href={featuredHighlight.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-link text-sm font-semibold"
        >
          {featuredHighlight.cta} →
        </a>
        <a href="#research" className="inline-link text-sm font-semibold">
          All publications →
        </a>
      </div>
    </article>
  );
}

export function Hero() {
  return (
    <section id="home" className="section-block relative pt-6 lg:pt-16" aria-labelledby="hero-heading">
      <div className="hero-content-grid">
        <div className="hero-content-main">
          <h1 id="hero-heading" className="hero-title">
            {profile.name}
          </h1>

          <p className="hero-subtitle mt-3" role="doc-subtitle">
            {profile.title}
          </p>

          <p className="hero-focus mt-2 text-[17px] font-medium leading-relaxed text-accent-navy">
            {profile.heroFocus}
          </p>

          <p className="hero-lead mt-6 max-w-3xl">{profile.oneLineSummary}</p>

          <div className="hero-actions mt-8">
            <a href={profile.links.cv} className="btn-primary">
              Resume
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="me noopener noreferrer"
              className="hero-action-btn"
            >
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="me noopener noreferrer"
              className="hero-action-btn"
            >
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="hero-action-btn">
              Email
            </a>
          </div>
        </div>

        <aside className="hero-galaxy-aside" aria-label="Galaxy Mode demo">
          <Link to="/galaxy" className="galaxy-mode-hero-cta">
            <span className="galaxy-mode-hero-stars" aria-hidden />
            <span className="galaxy-mode-hero-scanlines" aria-hidden />
            <span className="galaxy-mode-hero-inner">
              <span className="galaxy-mode-hero-eyebrow">Stellar recon · Scout class</span>
              <span className="galaxy-mode-hero-title">Galaxy Mode</span>
              <span className="galaxy-mode-hero-copy">
                Pilot a starship through the portfolio node network. Auto-scan planets, hold Space for
                pew pew lasers.
              </span>
              <span className="galaxy-mode-hero-launch">
                Launch starship
                <span aria-hidden>→</span>
              </span>
            </span>
          </Link>
        </aside>
      </div>

      <div className="highlight-grid mt-10">
        {impactHighlights.map((item) => (
          <article key={item.title} className="highlight-card">
            <h3 className="highlight-card-title">{item.title}</h3>
            <p className="highlight-card-detail">{item.detail}</p>
          </article>
        ))}
      </div>

      <FeaturedPublication />
    </section>
  );
}

import { useEffect, useRef } from "react";
import { startGalaxyLightning } from "./galaxyLightning";
import { Link } from "react-router-dom";
import { impactHighlights, profile } from "../data/profile";

export function Hero() {
  const galaxyCard = useRef<HTMLAnchorElement>(null);
  const lightning = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (galaxyCard.current && lightning.current) return startGalaxyLightning(galaxyCard.current, lightning.current);
  }, []);
  return (
    <section id="home" className="hero section-block" aria-labelledby="hero-heading">
      <div className="hero-content-main">
          <h1 id="hero-heading" className="hero-title">{profile.name}</h1>
          <p className="hero-subtitle">{profile.title}</p>
          <ul className="hero-highlights" aria-label="Selected impact">
            {impactHighlights.map((win) => (
              <li key={win.title}><p className="hero-win">{win.title}</p><p>{win.detail}</p></li>
            ))}
          </ul>
          <div className="hero-actions">
            <a href={profile.links.cv} target="_blank" rel="noopener noreferrer" className="btn-primary" aria-label="Open résumé PDF in a new tab">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h6" /></svg>
              Résumé </a>
            <a href={profile.links.github} target="_blank" rel="me noopener noreferrer" className="hero-action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.4-1.22.72-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.78 10.78 0 0 1 5.63 0c2.15-1.46 3.1-1.15 3.1-1.15.6 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.15 5.55.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" /></svg>
              GitHub </a>
            <a href={profile.links.linkedin} target="_blank" rel="me noopener noreferrer" className="hero-action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.52V3.52C22 2.68 21.31 2 20.45 2ZM7.93 18.75H4.98V9.2h2.95ZM6.46 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42ZM19 18.75h-2.95V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.76V9.2h2.83v1.3h.04c.39-.75 1.36-1.54 2.8-1.54 2.99 0 3.57 1.97 3.57 4.53Z" /></svg>
              LinkedIn </a>
            <a href={`mailto:${profile.email}`} className="hero-action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              Email </a>
          </div>
          <p className="hero-location">{profile.location}</p>
          <p className="hero-badges">{profile.workAuth}</p>
        </div>
      <div className="hero-panel-grid">
        <Link ref={galaxyCard} to="/galaxy" className="galaxy-mode-hero-cta" aria-label="Launch Galaxy Mode, a portfolio game demo">
          <span className="galaxy-mode-hero-stars" aria-hidden="true" />
          <svg ref={lightning} className="galaxy-mode-hero-lightning" viewBox="0 0 100 160" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="1" />
            <path pathLength="1" />
          </svg>
          <span className="galaxy-mode-hero-scanlines" aria-hidden="true" />
          <span className="galaxy-mode-hero-inner">
            <span className="galaxy-mode-hero-description">
            <span className="galaxy-mode-hero-eyebrow">Stellar recon</span>
            <span className="galaxy-mode-hero-title">Galaxy Mode</span>
            <span className="galaxy-mode-hero-copy">Pilot a starship, scan planets, and fire lasers. A small game inspired by the portfolio.</span>
            </span>
            <span className="galaxy-mode-hero-launch">Launch starship <span aria-hidden="true">→</span></span>
          </span>
        </Link>
      </div>

      <div className="hero-bottom">
        <a href="#experience" className="inline-link">Explore the career timeline <span aria-hidden="true">&#8595;</span></a>
      </div>
    </section>
  );
}

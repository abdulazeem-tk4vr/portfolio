import { useEffect, useState } from "react";
import { navLinks, profile } from "../data/profile";

export function Navigation() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const update = () => {
      const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
      const section = navLinks.reduce((current, link) => {
        const element = document.getElementById(link.id);
        return element && element.getBoundingClientRect().top <= headerBottom + 64 ? link.id : current;
      }, "home");
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? navLinks[navLinks.length - 1].id : section);
    };
    update();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <>
    <header className="site-header">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="site-header-inner">
        <div className="site-header-brand">
          <a href="#home" className="site-name" onClick={() => setMobileOpen(false)}>{profile.firstName}<span className="text-accent-blue">.</span></a>
          <button type="button" className="mobile-menu-toggle" aria-label={mobileOpen ? "Close section menu" : "Open section menu"} aria-expanded={mobileOpen} aria-controls="section-navigation" onClick={() => setMobileOpen(open => !open)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path strokeLinecap="round" d={mobileOpen ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        <nav id="section-navigation" aria-label="Primary" className={`section-nav${mobileOpen ? " mobile-open" : ""}`}>
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? "location" : undefined} className="section-nav-link" onClick={() => setMobileOpen(false)}>{link.label}</a>
          ))}
        </nav>
      </div>
    </header>
    <nav className="section-path" aria-label="Section path">
      <p className="section-path-label">On this page</p>
      <ol>
        {navLinks.map((link) => (
          <li key={link.id}>
            <a href={`#${link.id}`} aria-current={active === link.id ? "location" : undefined}>
              <span className="section-path-dot" aria-hidden="true" />{link.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
    </>
  );
}

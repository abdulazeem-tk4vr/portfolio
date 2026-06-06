import { useEffect, useState } from "react";
import type { NavLink } from "../data/profile";
import { profile } from "../data/profile";

function NavIcon({ icon }: { icon: NavLink["icon"] }) {
  const className = "h-4 w-4 shrink-0";

  switch (icon) {
    case "home":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case "experience":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "projects":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
    case "opensource":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case "research":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case "about":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case "contact":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
  }
}

type SidebarProps = {
  navLinks: NavLink[];
  socialLinks: { label: string; href: string }[];
  activeSection: string;
  onNavigate: (id: string) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
};

export function Sidebar({
  navLinks,
  socialLinks,
  activeSection,
  onNavigate,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full avatar-gradient transition-transform duration-300 hover:scale-105">
          AA
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold leading-tight tracking-[-0.01em] text-ink">
            {profile.firstName}
          </p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-ink-muted">{profile.title}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Primary">
        {navLinks.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => onNavigate(link.id)}
            aria-current={activeSection === link.id ? "page" : undefined}
            className={`nav-pill ${
              activeSection === link.id
                ? "nav-pill-active scale-[1.02]"
                : "hover:translate-x-0.5"
            }`}
          >
            <NavIcon icon={link.icon} />
            {link.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-accent-blue/10 px-5 py-5">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-accent-blue/70">
          Connect
        </p>
        <div className="space-y-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="block text-sm text-ink-muted transition hover:text-accent-blue"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-56 shrink-0 border-r border-accent-blue/10 bg-canvas-sidebar lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col">
        {content}
      </aside>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-accent-blue/10 bg-canvas-sidebar transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {content}
      </aside>
    </>
  );
}

export function MobileTopBar({
  onMenuOpen,
}: {
  onMenuOpen: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-accent-blue/10 bg-canvas/95 px-4 py-3 backdrop-blur lg:hidden">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full avatar-gradient text-xs font-semibold">
          AA
        </div>
        <span className="text-sm font-semibold">{profile.firstName}</span>
      </div>
      <button
        type="button"
        aria-label="Open menu"
        onClick={onMenuOpen}
        className="rounded-lg p-2 hover:bg-accent-wash hover:text-accent-navy"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
}

export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? "home");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}

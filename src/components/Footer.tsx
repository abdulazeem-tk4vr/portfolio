import { profile } from "../data/profile";
import { Reveal } from "./Reveal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Reveal>
      <footer className="mt-4 section-divider py-10">
        <p className="text-sm tracking-[-0.01em] text-ink-muted">
          Made by {profile.shortName}
          <span className="mx-2 text-ink-faint">·</span>
          © {year}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ink-faint">
          <a href="/llms.txt" className="inline-link">
            llms.txt
          </a>
          {" "}— AI-readable site summary
        </p>
      </footer>
    </Reveal>
  );
}

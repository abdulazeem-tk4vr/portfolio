import { featuredHighlight, profile } from "../data/profile";
import { Reveal } from "./Reveal";

const highlights = [
  {
    label: "Research",
    title: "Georgia Tech",
    detail: "AI security · adversarial multi-agent SOC workflows",
  },
  {
    label: "Engineering",
    title: "Liberdus",
    detail: "Cross-chain bridge · TSS signing · DevSecOps",
  },
  {
    label: "Previously",
    title: "Shardeum mainnet",
    detail: "80M+ transactions · 150K+ validators · Proof of Quorum",
  },
];

function FeaturedCard() {
  return (
    <a
      href={featuredHighlight.href}
      className="shine-card group flex flex-col overflow-hidden rounded-2xl border border-accent-blue/15 bg-canvas transition-all duration-300 hover:border-accent-blue/30 hover:shadow-glow md:flex-row"
    >
      <div className="flex items-center gap-4 border-b border-accent-blue/10 bg-blue-gradient-soft px-6 py-5 md:w-52 md:shrink-0 md:flex-col md:justify-center md:border-b-0 md:border-r md:py-8">
        <div className="font-mono text-3xl font-bold tracking-tight text-accent-navy">ACM</div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
          JCSS · 2023
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 py-6 md:px-8">
        <p className="section-eyebrow">{featuredHighlight.label}</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-accent-blue">
          {featuredHighlight.title}
        </h3>
        <p className="mt-2 text-[15px] leading-[1.72] text-ink-muted">
          {featuredHighlight.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-navy transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-blue">
          {featuredHighlight.cta}
          <span aria-hidden>→</span>
        </span>
      </div>
    </a>
  );
}

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="section-block relative pt-6 lg:pt-16" aria-labelledby="hero-heading">
      <div className="hero-blob -left-24 top-0 h-72 w-72 bg-accent-sky/40" aria-hidden />
      <div className="hero-blob right-0 top-24 h-64 w-64 bg-accent-bright/30 [animation-delay:2s]" aria-hidden />

      <Reveal>
        <p className="section-eyebrow">{profile.tagline}</p>
        <h1 id="hero-heading" className="hero-title mt-4">
          Hey, I&apos;m{" "}
          <span className="gradient-text">{profile.firstName}</span>
          <span className="ml-0.5 inline-block h-[0.9em] w-0.5 animate-cursor-blink bg-accent-blue align-middle" aria-hidden />
        </h1>
      </Reveal>

      <Reveal delay={100}>
        <p className="hero-subtitle mt-4" role="doc-subtitle">
          {profile.title}
        </p>
      </Reveal>

      <Reveal delay={180}>
        <p className="hero-lead mt-8 max-w-3xl">
          {profile.intro} Full-stack systems builder with a security research edge.{" "}
          {profile.siteDescription}
        </p>
      </Reveal>

      <Reveal delay={240}>
        <p className="mt-5 max-w-3xl text-[16px] leading-[1.8] text-ink-muted">
          Currently at{" "}
          <a href="https://www.gatech.edu" target="_blank" rel="noopener noreferrer" className="inline-link">
            Georgia Tech
          </a>{" "}
          and{" "}
          <a href="https://liberdus.com" target="_blank" rel="noopener noreferrer" className="inline-link">
            Liberdus
          </a>
          . Previously helped launch{" "}
          <a href="https://shardeum.org" target="_blank" rel="noopener noreferrer" className="inline-link">
            Shardeum mainnet
          </a>{" "}
          and published research funded by{" "}
          <strong className="font-semibold text-ink">Google AI for Social Good</strong>. Open to chat about{" "}
          <button type="button" onClick={() => scrollTo("research")} className="inline-link">
            AI security
          </button>
          , distributed systems, or anything else.
        </p>
      </Reveal>

      <Reveal delay={300}>
        <div className="hero-actions">
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="me noopener noreferrer"
            className="btn-primary"
          >
            Connect on LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="hero-action-btn">
            Email
          </a>
          <a href={profile.links.github} target="_blank" rel="me noopener noreferrer" className="hero-action-btn">
            GitHub
          </a>
          <a href={profile.links.cv} className="hero-action-btn">
            Download CV
          </a>
        </div>
      </Reveal>

      <Reveal delay={360}>
        <div className="highlight-grid">
          {highlights.map((item) => (
            <div key={item.title} className="highlight-card">
              <p className="highlight-card-label">{item.label}</p>
              <p className="highlight-card-title">{item.title}</p>
              <p className="highlight-card-detail">{item.detail}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={420}>
        <div className="mt-10">
          <FeaturedCard />
        </div>
      </Reveal>
    </section>
  );
}

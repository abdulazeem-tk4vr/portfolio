import {
  education,
  experience,
  openSourceGroups,
  profile,
  projects,
  research,
  skillGroups,
} from "../data/profile";

export type GalaxyNodeData = {
  id: string;
  label: string;
  planetLabel: string;
  planetDetail: string;
  summary: string;
  highlights: string[];
  tags?: string[];
  href: string;
  color: number;
  position: [number, number, number];
  isCore?: boolean;
};

const summaries: Record<string, string> = {
  home: `${profile.intro} Fly the orbit to explore experience, projects, open-source contributions, research publications, background, and contact — each planet maps to a section of this portfolio.`,
  experience:
    "Three-plus years shipping production distributed systems — from Shardeum mainnet (80M+ transactions, 150K+ validators) to Liberdus cross-chain messaging and Georgia Tech AI security research on adversarial multi-agent SOC workflows.",
  projects:
    "Hands-on builds spanning AI security, blockchain infra, and applied ML — a BFT evaluation framework for agentic systems, an RPC reverse proxy for sharded validator networks, and a Google AI–funded Android app for farmer price forecasting.",
  opensource:
    "Core contributions across Shardeum's sharded L1 (consensus, RPC, lib-net), Farcaster Snapchain protocol APIs, and Liberdus threshold-signature signing — infrastructure that has processed 80M+ mainnet transactions.",
  research:
    "Published and in-progress work in AI security, HCI, and federated learning — from adversarial attacks on multi-agent SOC pipelines at Georgia Tech to Google AI–funded market intelligence for farmer collectives (ACM JCSS, COMPASS '23).",
  about:
    "M.S. Computer Science at Georgia Tech (AI specialization), B.E. from BITS Pilani. Deep in Rust, TypeScript, consensus protocols, cryptography, and AI security — with certifications in Rust, AWS ML, and cloud.",
  contact:
    "Open to software engineering roles in distributed systems, AI/ML, and security. Based in the Bay Area, US citizen, available immediately and open to relocation. Reach out by email or LinkedIn.",
};

const nodeContent: Record<
  string,
  Pick<GalaxyNodeData, "label" | "planetLabel" | "planetDetail" | "summary" | "highlights" | "tags" | "href">
> = {
  home: {
    label: profile.name,
    planetLabel: "Core Node",
    planetDetail: `${profile.title} · ${profile.subtitle}`,
    summary: summaries.home,
    highlights: [
      profile.tagline,
      "Shardeum mainnet · 80M+ transactions · 150K+ validators",
      profile.workAuth,
    ],
    tags: [profile.title, profile.location],
    href: "/",
  },
  experience: {
    label: "Experience",
    planetLabel: "Experience",
    planetDetail: "Georgia Tech · Liberdus · Shardeum · BITS",
    summary: summaries.experience,
    highlights: experience.map(
      (job) =>
        `${job.role} at ${job.company} (${job.period}) — ${job.highlights[0]}`,
    ),
    tags: ["Distributed Systems", "AI Security", "Rust", "Consensus"],
    href: "/#experience",
  },
  projects: {
    label: "Projects",
    planetLabel: "Projects",
    planetDetail: "BFT · RPC Proxy · Farmers Collective",
    summary: summaries.projects,
    highlights: projects.map((project) => `${project.name} — ${project.description}`),
    tags: projects.flatMap((project) => project.tags).slice(0, 5),
    href: "/#projects",
  },
  opensource: {
    label: "Open Source",
    planetLabel: "Open Source",
    planetDetail: "Shardeum · Farcaster · Liberdus",
    summary: summaries.opensource,
    highlights: openSourceGroups.map(
      (group) => `${group.org} (${group.stage}) — ${group.context}`,
    ),
    tags: ["Shardeum", "Farcaster", "Liberdus", "Rust", "TypeScript"],
    href: "/#opensource",
  },
  research: {
    label: "Research",
    planetLabel: "Research",
    planetDetail: "AI Security · ACM JCSS · Federated Learning",
    summary: summaries.research,
    highlights: research.map(
      (entry) => `${entry.title} (${entry.period}) — ${entry.description}`,
    ),
    tags: ["AI Security", "ACM JCSS", "Google AI", "HCI", "Federated Learning"],
    href: "/#research",
  },
  about: {
    label: "About",
    planetLabel: "About",
    planetDetail: "Georgia Tech M.S. · BITS Pilani · Rust & TypeScript",
    summary: summaries.about,
    highlights: [
      ...education.map(
        (entry) =>
          `${entry.degree} at ${entry.school}${entry.detail ? ` — ${entry.detail}` : ""} (${entry.period})`,
      ),
      `Core stack: ${skillGroups[1].skills.join(", ")}`,
      `Also: ${skillGroups[0].skills.join(", ")} · ${skillGroups[2].skills.slice(0, 4).join(", ")}`,
    ],
    tags: skillGroups.flatMap((group) => group.skills).slice(0, 6),
    href: "/#about",
  },
  contact: {
    label: "Contact",
    planetLabel: "Contact",
    planetDetail: "Email · LinkedIn · Open to roles",
    summary: summaries.contact,
    highlights: [
      `${profile.email} — fastest way to reach me`,
      "LinkedIn — abdulazeem-shaik (networking & referrals welcome)",
      profile.workAuth,
      `Based in ${profile.location}`,
    ],
    tags: ["Open to roles", "Distributed Systems", "AI/ML", profile.location],
    href: "/#contact",
  },
};

const colors: Record<string, number> = {
  home: 0x60a5fa,
  experience: 0x2563eb,
  projects: 0x38bdf8,
  opensource: 0x818cf8,
  research: 0x22d3ee,
  about: 0x3b82f6,
  contact: 0x93c5fd,
};

const orbitIds = [
  "experience",
  "projects",
  "opensource",
  "research",
  "about",
  "contact",
] as const;

const radius = 5.5;

function buildNode(id: string, position: [number, number, number], isCore?: boolean): GalaxyNodeData {
  const content = nodeContent[id];
  return {
    id,
    ...content,
    color: colors[id],
    position,
    isCore,
  };
}

const orbitNodes: GalaxyNodeData[] = orbitIds.map((id, index) => {
  const angle = (index / orbitIds.length) * Math.PI * 2 - Math.PI / 2;
  const y = Math.sin(index * 1.35) * 1.4;

  return buildNode(id, [Math.cos(angle) * radius, y, Math.sin(angle) * radius]);
});

export const galaxyNodes: GalaxyNodeData[] = [
  buildNode("home", [0, 0, 0], true),
  ...orbitNodes,
];

import {
  education,
  experience,
  openSource,
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
  highlights: (string | { title: string; description: string })[];
  tags?: string[];
  href: string;
  color: number;
  position: [number, number, number];
  isCore?: boolean;
};

const summaries: Record<string, string> = {
  home: "",
  experience:
    "Current engineering work at Liberdus follows Shardeum infrastructure work and completed cybersecurity research at Georgia Tech. Visit the standard site for the full career timeline.",
  projects:
    "Three selected projects explore agent consensus, market intelligence for farmers, and trading strategy evaluation.",
  opensource: "",
  research:
    "Research includes completed cybersecurity work at Georgia Tech, published farmer market intelligence in ACM JCSS, and federated learning.",
  about:
    "Software Engineer with 4+ YOE in Distributed Systems, Applied AI & AI Infrastructure and Cybersecurity",
  contact:
    "Reach out by email or LinkedIn to discuss AI systems, distributed infrastructure, and security. The standard site has all contact links.",
};

const nodeContent: Record<
  string,
  Pick<GalaxyNodeData, "label" | "planetLabel" | "planetDetail" | "summary" | "highlights" | "tags" | "href">
> = {
  home: {
    label: profile.name,
    planetLabel: "Core Node",
    planetDetail: `${profile.title} · Demo only`,
    summary: summaries.home,
    highlights: [
      profile.tagline,
      "Current work at Liberdus. Recent cybersecurity research at Georgia Tech.",
      profile.workAuth,
    ],
    tags: [profile.title, profile.location],
    href: "/",
  },
  experience: {
    label: "Experience",
    planetLabel: "Experience",
    planetDetail: "Liberdus · Georgia Tech · Shardeum · BITS",
    summary: summaries.experience,
    highlights: experience.map(
      (job) =>
        `${job.company} · ${job.role} · ${job.period}`,
    ),
    tags: ["Distributed Systems", "Cybersecurity", "Rust", "Consensus"],
    href: "/#experience",
  },
  projects: {
    label: "Projects",
    planetLabel: "Projects",
    planetDetail: "Agent Consensus · Farmer AI · Trading ML",
    summary: summaries.projects,
    highlights: projects.map((project) => ({ title: project.name, description: project.description })),
    tags: projects.flatMap((project) => project.tags).slice(0, 5),
    href: "/#projects",
  },
  opensource: {
    label: "Open Source",
    planetLabel: "Open Source",
    planetDetail: "Networking · Protocol APIs · Secure signing",
    summary: summaries.opensource,
    highlights: openSource
      .filter((repo) => repo.name !== "Blockscout" && repo.name !== "JSON-RPC Server")
      .map((repo) => ({ title: repo.name, description: repo.description })),
    href: "/#opensource",
  },
  research: {
    label: "Research",
    planetLabel: "Research",
    planetDetail: "Cybersecurity · ACM JCSS · Federated Learning",
    summary: summaries.research,
    highlights: research.map(
      (entry) => `${entry.title} · ${entry.period}`,
    ),
    tags: ["Cybersecurity", "ACM JCSS", "Google AI", "HCI", "Federated Learning"],
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
          `${entry.degree} at ${entry.school} · ${entry.period}`,
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
      `${profile.email} · Email`,
      "LinkedIn · abdulazeem-shaik",
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
  "research",
  "opensource",
  "about",
  "projects",
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

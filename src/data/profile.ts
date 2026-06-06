export const profile = {
  name: "Abdul Azeem Shaik",
  firstName: "Abdul Azeem",
  shortName: "Abdul Azeem",
  title: "Software Engineer",
  subtitle: "Distributed Systems · AI Security",
  tagline: "Distributed systems · AI security · Blockchain infrastructure",
  location: "Fremont, California",
  email: "sabdulazeem01@gmail.com",
  workAuth: "US Citizen · Open to relocation · Available immediately",
  links: {
    github: "https://github.com/abdulazeem-tk4vr",
    linkedin: "https://www.linkedin.com/in/abdulazeem-shaik",
    cv: "/AbdulAzeemShaik_CV.pdf",
  },
  intro:
    "I turn complex infrastructure problems into production systems — distributed systems engineer with a research background in AI security.",
  siteDescription:
    "This is my personal site where I share projects, open source work, and notes on building secure, high-performance systems.",
  summary:
    "Software Engineer with 3+ years building scalable distributed systems and published researcher (Google AI funded, ACM JCSS). Currently researching adversarial attacks on multi-agentic AI systems in cybersecurity workflows at Georgia Tech. Contributed to the mainnet launch of Shardeum — the world's first sharded autoscaling EVM-compatible L1 blockchain (80M+ transactions, 150K+ validators).",
};

export const featuredHighlight = {
  label: "Featured research",
  title: "AI-based Market Intelligence for Farmer Collectives",
  description:
    "Google AI for Social Good funded project — integrated forecasting models into a production Android app for farmers. Published in ACM JCSS and presented at ACM COMPASS '23.",
  href: "#research",
  cta: "Read more",
};

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdulazeem-shaik" },
  { label: "GitHub", href: "https://github.com/abdulazeem-tk4vr" },
  { label: "Email", href: "mailto:sabdulazeem01@gmail.com" },
];

export const experience = [
  {
    company: "Georgia Institute of Technology",
    role: "Researcher — AI Security",
    location: "USA",
    period: "Apr 2026 – Present",
    org: "School of Cybersecurity and Privacy",
    highlights: [
      "Investigating adversarial attacks on multi-agentic AI systems in cybersecurity workflows, targeting SOC pipelines with agentic orchestration and generative AI threat surfaces.",
      "Building evaluation pipelines to assess robustness of AI-driven SOC workflows against prompt injection, tool misuse, and inter-agent manipulation.",
    ],
    tags: ["AI Security", "Multi-Agent Systems", "SOC"],
  },
  {
    company: "Liberdus",
    role: "Software Engineer — Distributed Systems",
    location: "Remote",
    period: "Jan 2026 – Present",
    highlights: [
      "Built the Liberdus BSC bridge and cross-chain payment platform, enabling asset transfers within a unified messaging and payments interface.",
      "Reduced transaction time to finality by 85% by resolving TSS signer deadlocks via entry synchronization fixes across signing parties.",
      "Cut historical data sync latency by 63% with transaction gossip protocols; reduced heap memory usage by 50% through RPC response caching.",
      "Improved transaction latency by 38% via smarter RPC request routing; built horizontally scalable blockchain indexing microservice.",
      "Implemented cryptographic libraries in Rust for identity verification and threshold signatures; led DevSecOps as primary security maintainer.",
    ],
    tags: ["Rust", "TypeScript", "Node.js", "Python"],
    url: "https://liberdus.com",
  },
  {
    company: "Shardeum",
    role: "Senior Software Engineer",
    location: "Remote",
    period: "Aug 2022 – Jan 2026",
    highlights: [
      "Built horizontally scalable monitoring handling 10,000+ req/sec with shared global state and real-time dashboards.",
      "Reduced communication latency by 34% (82 ms → 54 ms); boosted RPC throughput 60% with WebSocket distribution.",
      "Achieved 14× speedup on ECDSA verification (10 ms → 700 μs); reduced cryptographic latency 29% via libsodium migration.",
      "Discovered and fixed critical bugs in Proof of Quorum consensus; hardened transaction authorization end-to-end.",
      "Contributed to mainnet launch scaling to 80M+ transactions and 150K+ validators on the world's first sharded autoscaling L1.",
    ],
    tags: ["Rust", "TypeScript", "Node.js", "Consensus"],
    url: "https://shardeum.org",
  },
  {
    company: "BITS Pilani Hyderabad",
    role: "Researcher — HCI & Applied AI",
    location: "India",
    period: "Aug 2021 – Jul 2022",
    highlights: [
      "Published \"AI-based Market Intelligence Systems for Farmer Collectives\" — funded by Google AI for Social Good, ACM JCSS.",
      "Deployed production Android app with integrated forecasting models; validated with real market data and farmer feedback.",
    ],
    tags: ["Android", "ML", "HCI"],
  },
];

export type RepoEntry = {
  name: string;
  repo: string;
  description: string;
  tags: string[];
};

export const projects: RepoEntry[] = [
  {
    name: "Multi-Agentic BFT",
    repo: "https://github.com/abdulazeem-tk4vr/multi-agentic-bft",
    description:
      "Research framework for evaluating Byzantine fault tolerance in multi-agentic AI systems — probing adversarial coordination, tool misuse, and consensus safety in agent orchestration pipelines.",
    tags: ["AI Security", "Multi-Agent Systems", "Python"],
  },
  {
    name: "Reverse Proxy",
    repo: "https://github.com/abdulazeem-tk4vr/reverse-proxy",
    description:
      "RPC reverse proxy with integrated node discovery and load balancing for sharded validator networks, improving request distribution and network resilience under high throughput.",
    tags: ["TypeScript", "Node.js", "RPC", "Load Balancing"],
  },
  {
    name: "Farmers Collective",
    repo: "https://github.com/abdulazeem-tk4vr/farmers_collective",
    description:
      "Production Android app integrating time-series forecasting models for crop price predictions. Google AI for Social Good funded; published in ACM JCSS and presented at ACM COMPASS '23.",
    tags: ["Android", "Kotlin", "ML", "Firebase"],
  },
];

export type OpenSourceGroup = {
  org: string;
  url: string;
  stage: string;
  context: string;
  repos: RepoEntry[];
};

export const openSourceGroups: OpenSourceGroup[] = [
  {
    org: "Shardeum",
    url: "https://shardeum.org",
    stage: "Mainnet L1",
    context:
      "Autoscaling EVM blockchain with dynamic state sharding. ~$24M raised (Jane Street, Spartan Group, CoinGecko Ventures). Mainnet live since 2025 — scaled to 80M+ transactions and 150K+ validators during my tenure.",
    repos: [
      {
        name: "Shardeum Core",
        repo: "https://github.com/shardeum/core",
        description:
          "Shardus Core — the distributed ledger engine powering Shardeum's sharded consensus, state management, and validator coordination across the network.",
        tags: ["TypeScript", "Node.js", "Consensus", "DLT"],
      },
      {
        name: "Shardeum Archiver",
        repo: "https://github.com/shardeum/archiver",
        description:
          "Archiver node for the Shardus network that stores the complete cycle chain and historical state data, enabling network recovery and auditability.",
        tags: ["TypeScript", "Node.js", "Distributed Systems"],
      },
      {
        name: "Shardeum",
        repo: "https://github.com/shardeum/shardeum",
        description:
          "EVM-compatible autoscaling L1 node software — the application layer running on Shardus Core for validator participation and smart contract execution.",
        tags: ["TypeScript", "EVM", "Blockchain", "Sharding"],
      },
      {
        name: "JSON-RPC Server",
        repo: "https://github.com/shardeum/json-rpc-server",
        description:
          "JSON-RPC gateway for Shardeum validator nodes. Upgraded with WebSocket-based data distribution, boosting RPC throughput by 60%.",
        tags: ["TypeScript", "Node.js", "JSON-RPC", "WebSockets"],
      },
      {
        name: "lib-net",
        repo: "https://github.com/shardeum/lib-net",
        description:
          "High-performance TCP library for JSON messaging across validator nodes. Reduced communication latency by 34% (82 ms → 54 ms) via Rust-accelerated crypto and protocol optimizations.",
        tags: ["Rust", "TypeScript", "TCP", "P2P"],
      },
      {
        name: "Blockscout",
        repo: "https://github.com/shardeum/blockscout",
        description:
          "Shardeum fork of Blockscout — open-source block explorer for searching transactions, accounts, and smart contracts on the Shardeum network.",
        tags: ["Elixir", "Blockchain Explorer", "EVM"],
      },
    ],
  },
  {
    org: "Farcaster",
    url: "https://farcaster.xyz",
    stage: "Protocol · Dev infra",
    context:
      "Decentralized social protocol for onchain identity and feeds. $180M raised from Paradigm and a16z (~$1B valuation). ~250K monthly active users and 100K+ funded wallets; acquired by Neynar in 2026 with a developer-first pivot.",
    repos: [
      {
        name: "Farcaster Snapchain",
        repo: "https://github.com/farcasterxyz/snapchain",
        description:
          "Enhanced event filtering and querying APIs with timestamp and block-based filters; designed efficient serialization for network and database performance.",
        tags: ["Rust", "RocksDB", "gRPC", "Protocol Buffers"],
      },
    ],
  },
  {
    org: "Liberdus",
    url: "https://liberdus.com",
    stage: "Mainnet · Messaging",
    context:
      "Quantum-secure decentralized messaging and payments on Shardus — send encrypted messages and crypto in one transaction. Community-funded model with no VC or pre-mine (210M LIB fixed supply). Cross-chain bridge and TSS signing infrastructure live.",
    repos: [
      {
        name: "Liberdus TSS Signer",
        repo: "https://github.com/Liberdus/tss-signer",
        description:
          "Multi-network threshold signature signer with configurable routing, gas estimation, adaptive batch sizing, and Ed25519 signing/verification in Rust.",
        tags: ["Rust", "TypeScript", "Node.js", "Cryptography"],
      },
    ],
  },
];

export const openSource = openSourceGroups.flatMap((group) => group.repos);

export const research = [
  {
    title: "Agentic AI Security",
    org: "Georgia Tech — School of Cybersecurity and Privacy",
    period: "2026 – Present",
    description:
      "Building multi-agentic AI systems to secure organizations against adversarial cybersecurity attacks and generative AI threats.",
  },
  {
    title: "AI-based Market Intelligence for Farmer Collectives",
    org: "BITS Pilani · Google AI for Social Good",
    period: "2021 – 2022",
    description:
      "Integrated time-series forecasting into a native Android app for crop price predictions. Published in ACM JCSS; presented at ACM COMPASS '23.",
  },
  {
    title: "Federated Learning in IoT",
    org: "BITS Pilani",
    period: "2022",
    description:
      "Surveyed ML optimization for resource-constrained IoT with LoRA and federated learning. Configured testbeds with Arduino Uno and Raspberry Pi.",
  },
  {
    title: "Security of Low-Cost Android Devices",
    org: "BITS Pilani",
    period: "2021 – 2022",
    description:
      "Static/dynamic analysis and Wireshark PCAP traffic analysis identifying insecure cross-border communications and permission misuse.",
  },
];

export const education = [
  {
    school: "Georgia Institute of Technology",
    degree: "M.S. in Computer Science",
    detail: "Specialization: Artificial Intelligence",
    period: "Present",
    location: "USA",
  },
  {
    school: "BITS Pilani Hyderabad",
    degree: "B.E. in Electronics and Communication Engineering",
    period: "2023",
    location: "India",
  },
];

export const skillGroups = [
  {
    label: "Languages",
    skills: ["Rust", "TypeScript", "Python", "C++", "Java"],
  },
  {
    label: "Core Expertise",
    skills: [
      "Distributed Systems",
      "Performance Optimization",
      "Consensus Protocols",
      "Cryptography",
      "AI Security",
    ],
  },
  {
    label: "Backend & APIs",
    skills: [
      "Node.js",
      "Express.js",
      "REST",
      "JWT",
      "WebSockets",
      "JSON-RPC",
      "gRPC",
    ],
  },
  {
    label: "Frontend",
    skills: ["React.js", "Vue.js", "Nuxt.js", "JavaScript"],
  },
  {
    label: "Infrastructure",
    skills: [
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "PostgreSQL",
      "SQLite",
      "Firebase",
    ],
  },
  {
    label: "ML & Data",
    skills: ["XGBoost", "Pandas", "NumPy", "Matplotlib"],
  },
];

export const certifications = [
  "Ultimate Rust 2: Intermediate & Advanced Concepts",
  "Ultimate Rust Crash Course",
  "AWS & Udacity Machine Learning Scholarship",
  "Google Cloud — Create and Manage Cloud Resources",
  "Duke University — Java Programming",
];

export const references = [
  {
    name: "Omar Syed",
    title: "CTO, Shardus & Liberdus",
    link: "https://linkedin.com/in/omarsyed1",
    note: "Co-Founder of ARIMAA & Shardeum; Principal Architect at Zynga & Yahoo",
  },
  {
    name: "Marc Hanson",
    title: "Co-Founder & Partner, Super Mega Lab",
    link: "https://linkedin.com/in/marc-hanson-579469a",
    note: "Former VP Engineering at Shardeum; CTO at BossFight; Director at Zynga",
  },
];

export type NavLink = {
  id: string;
  label: string;
  icon: "home" | "experience" | "projects" | "opensource" | "research" | "about" | "contact";
};

export const navLinks: NavLink[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "experience", label: "Experience", icon: "experience" },
  { id: "projects", label: "Projects", icon: "projects" },
  { id: "opensource", label: "Open Source", icon: "opensource" },
  { id: "research", label: "Research", icon: "research" },
  { id: "about", label: "About", icon: "about" },
  { id: "contact", label: "Contact", icon: "contact" },
];

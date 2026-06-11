export const profile = {
  name: "Abdul Azeem Shaik",
  firstName: "Abdul Azeem",
  shortName: "Abdul Azeem",
  title: "Software Engineer",
  heroFocus: "Distributed Systems · Rust · TypeScript · AI Systems",
  subtitle: "Georgia Tech OMSCS · Shardeum · Liberdus",
  tagline: "Distributed systems · AI security · Blockchain infrastructure",
  location: "Fremont, California",
  email: "sabdulazeem01@gmail.com",
  workAuth:
    "Open to relocation (Qatar, Saudi Arabia, UAE · valid GCC ID) · Remote · Hybrid · On-site",
  links: {
    github: "https://github.com/abdulazeem-tk4vr",
    linkedin: "https://www.linkedin.com/in/abdulazeem-shaik",
    cv: "/AbdulAzeemShaik_CV.pdf",
  },
  oneLineSummary:
    "Software engineer specializing in distributed systems, scalable infrastructure, and AI security. Experience building blockchain protocols, async networking, and research-driven software — with interests in consensus, RPC systems, and high-performance backends.",
  intro:
    "Software engineer with 4+ years of production experience in Python, TypeScript, Rust, and C++ — building and securing distributed systems at scale with decentralized nodes, AI models, and autonomous cryptographic agents.",
  siteDescription:
    "This is my personal site where I share projects, open source work, and notes on building secure, high-performance systems.",
  summary:
    "Software Engineer with 4+ years of production experience in Python, TypeScript, Rust, and C++. Built and secured distributed systems at scale with decentralized nodes, AI models, and autonomous cryptographic agents. AI Security Researcher at Georgia Tech's School of Cybersecurity and Privacy, focusing on adversarial attacks on agentic AI systems. ACM-published research funded by Google AI for Social Good. Contributed to Shardeum mainnet — the world's first sharded autoscaling EVM-compatible L1 (80M+ transactions, 150K+ validators).",
};

export const impactHighlights = [
  {
    title: "Shardeum & Liberdus",
    detail:
      "Senior SWE on sharded L1 mainnet (80M+ transactions, 150K+ validators) and cross-chain TSS infrastructure — #2 technical hire at Shardeum seed stage.",
  },
  {
    title: "ACM JCSS Publication",
    detail:
      "Google AI for Social Good · AI market intelligence for farmer collectives · presented at ACM COMPASS '23.",
  },
  {
    title: "Georgia Tech OMSCS",
    detail:
      "M.S. Computer Science (4.0 GPA) · AI Security research on adversarial multi-agentic systems and SOC workflows.",
  },
];

export const featuredHighlight = {
  label: "Featured publication",
  title: "AI-based Market Intelligence for Farmer Collectives",
  description:
    "ACM Journal on Computing and Sustainable Societies (JCSS) · funded by Google AI for Social Good. Time-series forecasting deployed in a production Android app for farmer cooperatives in India.",
  href: "https://dl.acm.org/doi/10.1145/3600217",
  cta: "Read paper",
};

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdulazeem-shaik" },
  { label: "GitHub", href: "https://github.com/abdulazeem-tk4vr" },
  { label: "Email", href: "mailto:sabdulazeem01@gmail.com" },
];

export const experience = [
  {
    company: "Liberdus",
    role: "Senior Software Engineer — Distributed Systems",
    location: "San Francisco Bay Area",
    period: "Jan 2026 – Present",
    highlights: [
      "Built the Liberdus cross-chain payment platform and BSC bridge, enabling asset transfers within a unified messaging and payments interface.",
      "Building the distributed backend infrastructure for the Liberdus governance system.",
      "Reduced transaction time to finality by 85% by resolving TSS signer deadlocks through entry synchronization fixes across signing parties.",
      "Cut historical data sync latency by 63% by introducing transaction gossip protocols into the sync pipeline.",
      "Reduced heap memory usage by 50% and eliminated OOM crashes through RPC response caching.",
      "Improved transaction latency by 38% via smarter RPC request routing across validator nodes.",
      "Built a blockchain indexing microservice to make historical transaction sync horizontally scalable.",
      "Built a quorum-based validator response mechanism in Rust for Byzantine-resilient consensus queries.",
      "Resolved database contention in SQLite-backed components by applying betterSQLite concurrency best practices.",
      "Added forward gateway functionality for TSS signers in Rust to enable bridge client communication.",
      "Led DevSecOps across Liberdus open-source repositories as the primary maintainer for security practices in SDLC.",
      "Discovered and fixed multiple critical CVEs in the TSS Signer, Reverse Proxy, and Frontend client.",
      "Audited bridge smart contracts across chains, identifying and remediating security vulnerabilities.",
      "Implemented cryptographic libraries in Rust for identity verification and threshold signature support.",
      "Improved API architecture to protect systems against DDoS attacks and secret leaks.",
    ],
    tags: ["TypeScript", "Node.js", "Rust", "Python", "Blockchain Security"],
    url: "https://liberdus.com",
  },
  {
    company: "Georgia Institute of Technology",
    role: "Research — Agentic AI Security",
    location: "Remote",
    period: "Apr 2026 – Present",
    org: "School of Cybersecurity and Privacy",
    highlights: [
      "Investigating adversarial threats and cybersecurity attacks in LLMs and multi-agentic AI systems with Dr. Vijay Madisetti.",
      "Multi-agentic AI consensus protocol enforced by deterministic schemas; extending to quorum on non-deterministic outputs with multi-turn communication (Blue Team).",
      "Wazuh SIEM workflows with agentic AI systems to increase SOC triage efficiency (Blue Team).",
      "Probe generation pipelines to test robustness against agentic AI attacks and generative AI threats using cyber defense benchmarks (Red Team).",
    ],
    tags: ["AI Security", "TypeScript", "Multi-Agent Systems", "SOC", "Wazuh"],
  },
  {
    company: "Shardeum",
    role: "Senior Software Engineer — Distributed Systems",
    location: "Remote",
    period: "Jul 2025 – Jan 2026",
    highlights: [
      "Launched Shardeum's Cosmos-based EVM smart contract platform and delivered core onboarding features for the world's first sharded autoscaling L1 blockchain, scaling testnet to 80M+ transactions and 150K+ validators.",
      "Improved the contract storage account architecture on Shardus DLT, reducing memory footprint and improving shard-boundary scalability.",
      "Led development of a checkpoint-aware patching system in the network explorer, making it fault-tolerant across chain reorganizations and unplanned restarts.",
      "Built an RPC reverse proxy with integrated node discovery and load balancing, improving request distribution and validator network resilience.",
      "Built the network data explorer and payment platform to onboard users across EVM-compatible networks.",
      "Redesigned the authorization and verification logic in the Shardus consensus algorithm, improving throughput, security, and data integrity.",
      "Owned security engineering responsibilities across attack-tolerant system design, Byzantine fault-tolerant architecture, and web security practices.",
      "Implemented production monitoring and DevSecOps workflows using AWS CloudWatch, Lambda, Jenkins, and Slack-integrated alerting.",
    ],
    tags: ["Rust", "TypeScript", "Node.js", "Cryptography", "Consensus"],
    url: "https://shardeum.org",
  },
  {
    company: "Shardeum",
    role: "Software Engineer",
    location: "Remote",
    period: "Aug 2022 – Jul 2025",
    highlights: [
      "Designed and developed a scalable node monitoring system handling 10,000 requests per second.",
      "Improved validator networking latency by 34% (82 ms → 54 ms) in the TCP-based async communication library.",
      "Upgraded the cryptographic library to Rust-based libsodium, reducing latency by 29%.",
      "Upgraded the JSON RPC server with a WebSocket-based data distribution protocol, boosting TPS by 60%.",
      "Improved ecrecover address recovery latency by 14× (10 ms → 700 µs) by migrating to Rust.",
      "Boosted gossip protocol throughput with a custom data serialization library for secure P2P communication.",
      "Improved network data access by implementing distributed bytecode caching across the sharded network.",
      "Enhanced load distribution with variable EVM storage account partitioning across shards.",
      "Discovered and fixed multiple bounty bugs covering consensus vulnerabilities, DDoS, MITM, and replay attacks.",
      "Discovered critical vulnerabilities preventing loss of funds and double-spend exploits on the live network.",
      "Developed a multi-sig authentication service for executing network transactions and DAO proposals.",
      "Conducted smart contract security audits for decentralized applications deployed on Shardeum.",
      "Worked directly with CTO Omar Syed as the #2 technical hire during Shardeum's seed round.",
    ],
    tags: ["Rust", "TypeScript", "Node.js", "GCP", "Consensus"],
    url: "https://shardeum.org",
  },
  {
    company: "BITS Pilani Hyderabad",
    role: "Research — HCI & Applied AI",
    location: "India",
    period: "Aug 2021 – Jul 2022",
    highlights: [
      "Published \"AI-based Market Intelligence Systems for Farmer Collectives\" — funded by Google AI for Social Good, ACM JCSS.",
      "Integrated time-series forecasting models into a native Android application, translating model outputs into actionable crop price trend predictions for farmers, village officers, and local businesses.",
      "Conducted field research in Adilabad, running user interviews and iterating on the product based on direct feedback as a deployed engineer on field.",
      "Invited to present at ACM COMPASS '23.",
    ],
    tags: ["Android", "Java", "Machine Learning", "HCI"],
  },
  {
    company: "BITS Pilani Hyderabad",
    role: "Research — IoT & ML",
    location: "India",
    period: "Jan 2022 – May 2022",
    highlights: [
      "Worked with Prof. Nikumani Choudhary on \"Utilizing LoRA in IoT using Federated Learning\" — surveying ML optimization techniques for resource-constrained IoT with a focus on data privacy through distributed training.",
      "Set up IoT testbeds using Arduino Uno, Raspberry Pi, and Python scripts to reproduce experiments from existing literature on edge ML deployment.",
    ],
    tags: ["AI Engineering", "IoT", "Federated Learning"],
  },
  {
    company: "BITS Pilani Hyderabad",
    role: "Research — HCI & Network Security",
    location: "India",
    period: "Dec 2021 – May 2022",
    highlights: [
      "Worked with Prof. Dipanjan Chakraborty on \"User Experience of Low Cost Android Devices\" — studying bloatware and third-party applications using network packet capture, Battery Historian, and user studies.",
      "Analyzed response speeds, network availability, and traffic patterns between foreign data centers and low-cost devices using Wireshark PCAP tracing environments.",
    ],
    tags: ["Network Security", "Application Security", "HCI"],
  },
  {
    company: "Mazo Solutions",
    role: "Software Engineer Intern",
    location: "Virginia, United States",
    period: "May 2021 – Jul 2021",
    highlights: [
      "Built a COVID-19 Android and iOS application for vaccine alerts and reminders in Flutter.",
    ],
    tags: ["Flutter", "Android", "iOS"],
  },
];

export type RepoEntry = {
  name: string;
  repo: string;
  description: string;
  tags: string[];
  bullets?: string[];
  challenge?: string;
  result?: string;
  paperUrl?: string;
};

export const projects: RepoEntry[] = [
  {
    name: "Multi-Agentic BFT Consensus",
    repo: "https://github.com/abdulazeem-tk4vr/multi-agentic-bft",
    description:
      "Byzantine fault-tolerant consensus library for multi-agent AI systems based on the Aegean Protocol.",
    bullets: [
      "Language: Python · async HTTP workers · event bus for session observability",
      "Leader election, quorum voting, Solution/Refinement rounds with configurable commit rules",
      "Semantic equivalence checks for LLM output stability across non-deterministic agents",
      "Fault tolerance when agents disagree, compromise, or produce inconsistent tool outputs",
    ],
    challenge:
      "Coordinate 3+ autonomous agents without a central authority when LLM outputs are non-deterministic and adversarial manipulation is possible.",
    result:
      "Production-ready library with local and distributed workers; structured consensus rounds detect and resolve agent disagreement.",
    tags: [
      "Python",
      "Consensus",
      "Distributed Systems",
      "Byzantine Fault Tolerance",
      "Leader Election",
      "AI Security",
    ],
  },
  {
    name: "RPC Reverse Proxy",
    repo: "https://github.com/abdulazeem-tk4vr/reverse-proxy",
    description:
      "JSON-RPC reverse proxy with integrated node discovery and load balancing for sharded validator networks.",
    bullets: [
      "TypeScript · Node.js · JSON-RPC · WebSockets · TCP networking",
      "Automatic validator node discovery and request routing across shards",
      "Load balancing under high-throughput validator traffic",
      "Deployed on Shardeum mainnet infrastructure for network resilience",
    ],
    challenge:
      "Route RPC traffic across a dynamically sharded validator network without single points of failure or hot shards.",
    result:
      "Improved request distribution and validator network resilience; used in production sharded L1 deployment.",
    tags: ["TypeScript", "Node.js", "JSON-RPC", "Load Balancing", "Networking", "Async"],
  },
  {
    name: "Farmers Collective — Applied ML",
    repo: "https://github.com/abdulazeem-tk4vr/farmers_collective",
    description:
      "Production Android app integrating time-series forecasting for crop price predictions in rural India.",
    bullets: [
      "Android · Kotlin · Firebase · field-deployed with farmer cooperatives",
      "Prospect-theory-based sales recommendations from ML price forecasts",
      "Validated with real market data and user studies in Adilabad, India",
      "Published in ACM JCSS · Google AI for Social Good funded",
    ],
    challenge:
      "Translate research-grade forecasting models into actionable predictions for low-literacy end users in low-resource environments.",
    result:
      "Published in ACM JCSS; presented at ACM COMPASS '23; positive field feedback from farmer cooperatives.",
    tags: ["Android", "Kotlin", "Machine Learning", "Firebase", "HCI"],
    paperUrl: "https://dl.acm.org/doi/10.1145/3600217",
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
        name: "Liberdus Proxy",
        repo: "https://github.com/Liberdus/liberdus-proxy",
        description:
          "Load-aware Rust proxy server that routes HTTP and WebSocket payloads from clients to the appropriate Liberdus validator — clients no longer need to track the node set themselves.",
        tags: ["Rust", "HTTP", "WebSockets", "Load Balancing", "Proxy"],
      },
      {
        name: "Liberdus Bridge UI",
        repo: "https://github.com/Liberdus/liberdus-bridge-ui",
        description:
          "Next.js frontend for the Liberdus cross-chain bridge and BSC asset transfers within the unified messaging and payments interface.",
        tags: ["TypeScript", "Next.js", "React", "Bridge"],
      },
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
    title: "AI-based Market Intelligence for Farmer Collectives",
    org: "ACM JCSS · Google AI for Social Good · BITS Pilani",
    period: "2021 – 2023",
    description:
      "Machine learning price forecasting and sales recommendations for soyabean farmer cooperatives in India. Built and field-tested a production Android application; experiments on historical data show modest income gains for farmers.",
    url: "https://dl.acm.org/doi/10.1145/3600217",
    featured: true,
  },
  {
    title: "Agentic AI Security",
    org: "Georgia Tech — School of Cybersecurity and Privacy",
    period: "2026 – Present",
    description:
      "Investigating adversarial threats in LLMs and multi-agentic AI systems. Blue-team work on deterministic-schema consensus protocols and Wazuh SIEM workflows; red-team probe generation pipelines using cyber defense benchmarks.",
  },
  {
    title: "Federated Learning in IoT",
    org: "BITS Pilani",
    period: "2022",
    description:
      "Surveyed ML optimization for resource-constrained IoT with LoRA and federated learning. Configured testbeds with Arduino Uno, Raspberry Pi, and Python scripts.",
  },
  {
    title: "Security of Low-Cost Android Devices",
    org: "BITS Pilani",
    period: "2021 – 2022",
    description:
      "Studied bloatware and third-party apps on low-cost Android devices using Wireshark PCAP analysis, Battery Historian, and user studies on network traffic and response speeds.",
  },
];

export const education = [
  {
    school: "Georgia Institute of Technology",
    degree: "M.S. in Computer Science",
    detail:
      "Grade: 4.0/4.0 · Specialization: Machine Learning / AI with focus on Computing Systems · Research: AI Security for Multi-Agentic Systems",
    period: "Present",
    location: "USA",
  },
  {
    school: "BITS Pilani Hyderabad",
    degree: "B.E. in Electronics and Communication Engineering",
    detail:
      "Merit scholarships each semester (ISA program) · Thesis: horizontally scalable service to monitor nodes in decentralized communication systems",
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
  { id: "research", label: "Research", icon: "research" },
  { id: "projects", label: "Projects", icon: "projects" },
  { id: "opensource", label: "Open Source", icon: "opensource" },
  { id: "about", label: "About", icon: "about" },
  { id: "contact", label: "Contact", icon: "contact" },
];

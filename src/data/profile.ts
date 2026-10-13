const organizationLogos: Record<string, string> = {
  "Liberdus": "/logos/liberdus.png",
  "Shardeum": "/logos/shardeum.svg",
  "Farcaster": "/logos/farcaster.svg",
  "Red Hat": "/logos/redhat.svg",
  "Georgia Institute of Technology": "/logos/georgia-tech-mark.png",
  "BITS Pilani": "/logos/bits-pilani.png",
  "Mazo Solutions": "/logos/mazo.png",
};

export const profile = {
  name: "Abdul Azeem Shaik",
  firstName: "Abdul Azeem",
  shortName: "Abdul Azeem",
  title: "Software Engineer - AI and Distributed Systems",
  heroFocus: "Distributed Systems · Rust · TypeScript · AI Systems",
  subtitle: "Georgia Tech OMSCS · Shardeum · Liberdus",
  tagline: "Distributed systems · cybersecurity · Blockchain infrastructure",
  location: "California, USA",
  email: "sabdulazeem01@gmail.com",
  workAuth:
    "US citizen · Clearance Eligible · Open to relocation",
  links: {
    github: "https://github.com/abdulazeem-tk4vr",
    linkedin: "https://www.linkedin.com/in/abdulazeem-shaik",
    cv: "/AbdulAzeemShaik_Resume.pdf",
    scholar: "https://scholar.google.com/citations?user=rCE6Z28AAAAJ&hl=en",
  },
  currentFocus:
    "Building payment products, reliable distributed infrastructure, and AI workflows for security.",
  intro: [
    "Software engineer with 4+ years in AI infrastructure and distributed systems. Researched applied AI for cybersecurity at Georgia Tech.",
    "Early technical hire at Shardeum and Liberdus. Built sharded storage, fault tolerant consensus, and peer-to-peer networking, bringing research prototypes into production.",
    "Helped develop AI market intelligence for farmer cooperatives through research with IIT Delhi. Published in ACM JCSS with Google AI for Social Good funding.",
    "Seeking roles in AI engineering, distributed systems, and infrastructure. No sponsorship needed; open to relocation.",
  ],
  siteDescription:
    "Projects, research, and open source work in secure AI and distributed systems.",
  summary:
    "AI and systems engineer with 4+ years of production experience in Python, TypeScript, Rust, and C++. Building payments and infrastructure at Liberdus. Researched agentic AI for cybersecurity at Georgia Tech from April to September 2026. Published research in ACM JCSS with funding from Google AI for Social Good. Contributed to Shardeum mainnet and testnet, supporting 80M+ transactions and 150K+ validator registrations.",
};

export const impactHighlights = [
  {
    title: "80M+ transactions",
    detail:
      "Supported by Shardeum mainnet and testnet infrastructure",
  },
  {
    title: "Applied AI CyberSec",
    detail:
      "Systems beat frontier LLMs on SecOps benchmarks",
  },
  {
    title: "10,000 requests/second",
    detail:
      "Handled by a purpose-built distributed node monitoring service",
  },
];

export const featuredHighlight = {
  label: "Featured publication",
  title: "AI-based Market Intelligence for Farmer Collectives",
  description:
    "ACM Journal on Computing and Sustainable Societies (JCSS) · funded by Google AI for Social Good. Time-series forecasting deployed in a production Android app for farmer cooperatives in India.",
  href: "https://dl.acm.org/doi/10.1145/3609262",
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
    logo: organizationLogos["Liberdus"],
    role: "Software Engineer, Distributed Systems and Payments",
    location: "San Francisco Bay Area",
    period: "Jan 2026 – Present",
    summary: "Builds payment flows and distributed services in TypeScript and Rust. Fixing TSS deadlocks cut transaction finality time by 85%, gossip protocols reduced historical sync latency by 63%, and RPC caching reduced heap use by 50%, stopping OOM crashes. Work also spans quorum queries, API hardening, and contract security reviews.",
    highlights: [
      "Built bridge dashboards and payment flows in React and Node.js, with scalable indexing and backend services for governance.",
      "Cut transaction finality time by 85% through TSS deadlock fixes and historical sync latency by 63% through gossip protocols.",
      "Reduced heap use by 50% with RPC caching, stopped OOM crashes, improved transaction latency by 38%, and resolved SQLite contention.",
      "Built Rust quorum queries, identity verification, threshold signatures, and signer gateways for reliable communication across distributed nodes.",
      "Owned DevSecOps and contract audits, fixed critical CVEs, hardened APIs against DDoS and secret leaks, and used AI for incident response.",
    ],
    tags: ["Rust", "TypeScript", "Distributed Systems"],
    url: "https://liberdus.com",
  },
  {
    company: "Georgia Institute of Technology",
    logo: organizationLogos["Georgia Institute of Technology"],
    role: "AI Researcher, Applied AI for Cybersecurity",
    location: "Remote",
    period: "Apr 2026 – Sep 2026",
    org: "School of Cybersecurity and Privacy",
    summary: "Built multi agent systems for autonomous SOC investigations under Prof. Vijay Madisetti, using SecureBERT RAG, a LoRA tuned Qwen2.5 14B and Byzantine fault tolerant quorum voting. Invited to TA an agentic AI course and recommended for research with an industry defense partner.",
    researchAnchor: "soc-research",
    tags: ["Python", "Applied AI", "Cybersecurity"],
  },
  {
    company: "Shardeum",
    logo: organizationLogos["Shardeum"],
    role: "Software Engineer → Senior Software Engineer, Distributed Systems",
    location: "Remote",
    period: "Aug 2022 – Dec 2025",
    summary: "Helped launch mainnet and testnet infrastructure supporting 80M+ transactions and 150K+ validator registrations. Built payment APIs with about 30 ms P99 latency and a node monitoring service handling 10K requests per second. Rust and TypeScript work covered validator networking, shard state sync, crash recovery and consensus security, including a 34% cut in TCP latency.",
    highlights: [
      "Helped launch mainnet and testnet features supporting 80M+ transactions and 150K+ validator registrations, with payment APIs reaching approximately 30 ms P99 latency.",
      "Built payment interfaces, network dashboards, and an MCP server connecting autonomous agents to payment workflows through JSON-RPC.",
      "Reduced storage memory use and built state sync across shards, with checkpoint recovery for rollbacks and unexpected restarts.",
      "Improved network resilience through RPC load balancing, node discovery, and stronger transaction authorization and verification in the consensus layer.",
      "Set up AWS monitoring and Jenkins deployment workflows, and helped leadership model network governance and incentives.",
      "Built a distributed node monitoring service handling 10,000 requests per second, working directly with CTO Omar Syed as an early technical hire.",
      "Accelerated ECDSA recovery 14× in Rust, cut TCP networking latency by 34%, and reduced signing latency by 29% with libsodium.",
      "Reduced API response delay by 78% through JSON-RPC and GraphQL services, with WebSocket streaming and distributed bytecode caching.",
      "Improved P2P gossip with custom serialization and shard storage partitioning, and built multisig authentication for network transactions and DAO proposals.",
      "Fixed consensus, DDoS, MITM, and replay vulnerabilities to prevent fund loss, while improving lost node detection and auditing smart contracts.",
    ],
    tags: ["Rust", "TypeScript", "Consensus"],
    url: "https://shardeum.org",
  },
  {
    company: "BITS Pilani",
    logo: organizationLogos["BITS Pilani"],
    role: "Research, HCI & Applied AI",
    location: "India",
    period: "Aug 2021 – Jul 2022",
    summary: "Turned ARIMA and temporal convolutional forecasts into sales guidance in an Android app for farmer cooperatives. Field testing with farmers in Adilabad shaped the product, and the research was published in ACM JCSS with Google AI for Social Good funding.",
    highlights: [
      "Brought crop price forecasts into an Android app for farmer cooperatives, with research funded by Google AI for Social Good.",
      "Tested the app with farmers in Adilabad and improved features through interviews, helping turn research predictions into practical sales guidance.",
      "Published the work in ACM JCSS and was invited to present at ACM COMPASS '23.",
    ],
    tags: ["Android", "Machine Learning", "HCI"],
  },
  {
    company: "Mazo Solutions",
    logo: organizationLogos["Mazo Solutions"],
    role: "Software Developer, Product Intern",
    location: "Virginia, United States",
    period: "May 2021 – Jul 2021",
    summary: "Built a scheduling app with Spring Boot, JPA, and MySQL, added overbooking controls, and improved the interface with React.",
    highlights: [
      "Built a scheduling app with Spring Boot, JPA, MySQL, and Thymeleaf, adding overbooking controls and improving the interface with React and Bootstrap.",
    ],
    tags: ["Java", "Spring Boot", "MySQL"],
  },
];

export type RepoEntry = {
  name: string;
  repo?: string;
  prUrl?: string;
  description: string;
  highlights?: string[];
  tags: string[];
  org?: string;
  period?: string;
  paperUrl?: string;
  logo?: string;
  visual?: string;
  visualDescription?: string;
  demoUrl?: string;
};

export const projects: RepoEntry[] = [
  {
    name: "Multi agent AI Consensus System",
    logo: "/logos/python.svg",
    repo: "https://github.com/abdulazeem-tk4vr/multi-agentic-bft",
    period: "May 2026 – Aug 2026",
    visual: "/projects/consensus.svg",
    visualDescription: "Diagram of agents proposing solutions, voting, and reaching quorum.",
    description:
      "A Python library that helps AI agents reach reliable decisions through Byzantine fault-tolerant consensus.",
    highlights: [
      "Coordinates 3+ agents through leader election, quorum voting, and Solution/Refinement rounds with configurable α/β commit rules.",
      "Local and distributed HTTP workers, session event bus, and semantic equivalence checks for LLM output stability.",
    ],
    tags: ["Python", "Multi agent Systems", "BFT"],
  },
  {
    name: "AI Market Intelligence for Farmer Collectives",
    logo: organizationLogos["BITS Pilani"],
    visual: "/projects/farmers.svg",
    visualDescription: "Diagram showing market data becoming price forecasts and farmer sales recommendations.",
    repo: "https://github.com/abdulazeem-tk4vr/farmers_collective",
    org: "BITS Pilani · Google AI for Social Good",
    description:
      "Turned crop price forecasts into sales recommendations for farmer cooperatives in India.",
    highlights: [
      "ARIMA and temporal convolutional networks delivered through a field-deployed Android app for rural use.",
      "Published in ACM JCSS; validated with real market data and farmer feedback in Adilabad.",
    ],
    tags: ["Machine Learning", "Android", "Time Series"],
    paperUrl: "https://dl.acm.org/doi/10.1145/3609262",
  },
  {
    name: "AI Trading Strategy Evaluator",
    logo: organizationLogos["Georgia Institute of Technology"],
    visual: "/projects/trading.svg",
    visualDescription: "Diagram of market indicators, trading strategies, and performance evaluation.",
    org: "Georgia Institute of Technology",
    description:
      "Evaluated a rule-based trading strategy against a Random Forest model using JPMorgan Chase stock data.",
    highlights: [
      "Rule-based signals from SMA, Bollinger Bands, RSI, and MACD; Random Forest trained on 2008–2009 data and evaluated out-of-sample on 2010–2011 vs. buy-and-hold.",
      "Measured cumulative return, volatility, transaction costs, and market impact across regimes.",
    ],
    tags: ["Machine Learning", "Random Forest", "Algorithmic Trading"],
  },
];

export type OpenSourceGroup = {
  org: string;
  url: string;
  stage: string;
  logo: string;
  repos: RepoEntry[];
};

export const openSourceGroups: OpenSourceGroup[] = [
  {
    org: "Red Hat",
    logo: organizationLogos["Red Hat"],
    url: "https://www.redhat.com/en/about",
    stage: "Cloud provisioning",
    repos: [
      {
        name: "MAPT",
        repo: "https://github.com/redhat-developer/mapt",
        prUrl: "https://github.com/redhat-developer/mapt/pulls?q=is%3Apr%20is%3Amerged%20author%3Aabdulazeem-tk4vr",
        description: "Strengthened AWS and Azure environment provisioning by normalizing host and username values in secrets, eliminating failures caused by embedded newline characters.",
        tags: ["Cloud Infrastructure", "Kubernetes", "AWS"],
      },
    ],
  },
  {
    org: "Shardeum",
    logo: organizationLogos["Shardeum"],
    url: "https://shardeum.org",
    stage: "Mainnet L1",
    repos: [
      {
        name: "lib-net",
        repo: "https://github.com/shardeum/lib-net",
        prUrl: "https://github.com/shardeum/lib-net/pulls?q=is%3Apr%20is%3Amerged%20author%3Aabdulazeem-tk4vr",
        description: "Improved TCP messaging between validators, cutting latency by 34% from 82 ms to 54 ms.",
        tags: ["Rust", "TypeScript", "TCP"],
      },
      {
        name: "JSON-RPC Server",
        repo: "https://github.com/shardeum/json-rpc-server",
        prUrl: "https://github.com/shardeum/json-rpc-server/pulls?q=is%3Apr%20is%3Amerged%20author%3Aabdulazeem-tk4vr",
        description: "Added WebSocket data streaming to the validator gateway, increasing RPC throughput by 60%.",
        tags: ["TypeScript", "JSON-RPC", "WebSockets"],
      },
      {
        name: "Shardeum Core & Node",
        repo: "https://github.com/shardeum/core",
        prUrl: "https://github.com/pulls?q=is%3Apr%20is%3Amerged%20author%3Aabdulazeem-tk4vr%20repo%3Ashardeum/core%20repo%3Ashardeum/shardeum",
        description: "Hardened consensus endpoints against replay and front running attacks, added state sync validation, and fixed null handling that could crash nodes.",
        tags: ["TypeScript", "EVM", "Consensus"],
      },
      {
        name: "Shardeum Archiver",
        repo: "https://github.com/shardeum/archiver",
        prUrl: "https://github.com/shardeum/archiver/pulls?q=is%3Apr%20is%3Amerged%20author%3Aabdulazeem-tk4vr",
        description: "Fixed receipt overwrites and hardened restoration requests, preserving successful transaction history and preventing denial of service during recovery.",
        tags: ["TypeScript", "Node.js", "Distributed Systems"],
      },
    ],
  },
  {
    org: "Farcaster",
    logo: organizationLogos["Farcaster"],
    url: "https://farcaster.xyz",
    stage: "Protocol \u00b7 Dev infra",
    repos: [
      {
        name: "Farcaster Snapchain",
        repo: "https://github.com/farcasterxyz/snapchain",
        prUrl: "https://github.com/farcasterxyz/snapchain/pulls?q=is%3Apr%20is%3Amerged%20author%3Aabdulazeem-tk4vr",
        description: "Added BLOCK_CONFIRMED events and filtered GetEvents queries so developers can observe and query chain sync.",
        tags: ["Rust", "RocksDB", "gRPC"],
      },
    ],
  },
  {
    org: "Liberdus",
    logo: organizationLogos["Liberdus"],
    url: "https://liberdus.com",
    stage: "Mainnet \u00b7 Messaging",
    repos: [
      {
        name: "Liberdus TSS Signer",
        repo: "https://github.com/Liberdus/tss-signer",
        prUrl: "https://github.com/Liberdus/tss-signer/pulls?q=is%3Apr%20is%3Amerged%20author%3Aabdulazeem-tk4vr",
        description: "Fixed signing deadlocks and added adaptive batching, cutting transaction finality time by 85%.",
        tags: ["Rust", "TypeScript", "Cryptography"],
      },
      {
        name: "Liberdus Proxy",
        repo: "https://github.com/Liberdus/liberdus-proxy",
        prUrl: "https://github.com/Liberdus/liberdus-proxy/pulls?q=is%3Apr%20is%3Amerged%20author%3Aabdulazeem-tk4vr",
        description: "Added observer and bridge-out gateways with transaction queries, making bridge status available to clients.",
        tags: ["Rust", "WebSockets", "Load Balancing"],
      },
      {
        name: "Liberdus Bridge UI",
        repo: "https://github.com/Liberdus/liberdus-bridge-ui",
        prUrl: "https://github.com/Liberdus/liberdus-bridge-ui/pulls?q=is%3Apr%20is%3Amerged%20author%3Aabdulazeem-tk4vr",
        description: "Built bridge transaction views and streamlined data fetching, improving the flow for transferring assets.",
        tags: ["TypeScript", "React", "Bridge"],
      },
    ],
  },
];

export const openSource = openSourceGroups.flatMap((group) => group.repos);

export const research = [
  {
    title: "AI-based Market Intelligence for Farmer Collectives",
    logo: organizationLogos["BITS Pilani"],
    org: "ACM JCSS · Google AI for Social Good · BITS Pilani",
    period: "Research: Aug 2021 – Jul 2022 · Published: 2023",
    description:
      "Machine learning price forecasting and sales recommendations for soyabean farmer cooperatives in India. Built and field-tested a production Android application; experiments on historical data show modest income gains for farmers.",
    url: "https://dl.acm.org/doi/10.1145/3609262",
    featured: true,
  },
  {
    title: "Agentic AI for Cybersecurity",
    id: "soc-research",
    logo: organizationLogos["Georgia Institute of Technology"],
    org: "Georgia Tech, School of Cybersecurity and Privacy",
    period: "Apr 2026 – Sep 2026",
    description:
      "Built multi agent systems for autonomous SOC investigations under Prof. Vijay Madisetti.\n\nAgents retrieve evidence with SecureBERT RAG over MITRE ATT&CK, D3FEND, CWE and Sigma rules, then cross check conclusions with Byzantine fault tolerant quorum voting.\n\nFine tuned Qwen2.5 14B with LoRA, built XGBoost and HDBSCAN log injection detectors, and benchmarked on ExCyTIn and OpenSec.",
  },
  {
    title: "Federated Learning in IoT",
    logo: organizationLogos["BITS Pilani"],
    org: "BITS Pilani",
    period: "2022",
    description:
      "Surveyed ML optimization for resource constrained IoT with federated learning, and built testbeds with Arduino Uno, Raspberry Pi and Python.",
  },
  {
    title: "Security of Low Cost Android Devices",
    logo: organizationLogos["BITS Pilani"],
    org: "BITS Pilani",
    period: "2021 – 2022",
    description:
      "Analyzed bloatware and third party apps on budget Android phones using Wireshark PCAP captures, Battery Historian and user studies.",
  },
];

export const education = [
  {
    school: "Georgia Institute of Technology",
    logo: organizationLogos["Georgia Institute of Technology"],
    degree: "M.S. in Computer Science",
    detail:
      "GPA: 4.0/4.0 · Specialization: Machine Learning",
    period: "Completed",
    location: "USA",
  },
  {
    school: "BITS Pilani",
    logo: organizationLogos["BITS Pilani"],
    degree: "B.E. in Electronics and Communication Engineering",
    detail:
      "Merit scholarships each semester (ISA program) · Thesis: horizontally scalable service to monitor nodes in decentralized communication systems",
    period: "Completed",
    location: "India",
  },
];

export const skillGroups = [
  {
    label: "Core Expertise",
    skills: [
      "Distributed Systems",
      "Applied AI",
      "AI Infrastructure",
      "Cybersecurity",
    ],
  },
  {
    label: "AI & ML",
    skills: ["PyTorch", "Hugging Face", "LangGraph", "RAG", "Qdrant", "XGBoost"],
  },
  {
    label: "Infrastructure",
    skills: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "PostgreSQL", "SQLite"],
  },
  {
    label: "Languages",
    skills: ["Python", "TypeScript", "Rust", "C++"],
  },
  {
    label: "Backend & APIs",
    skills: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST",
      "JWT",
      "WebSockets",
      "JSON-RPC",
      "gRPC",
    ],
  },
  {
    label: "Frontend",
    skills: ["React", "TypeScript"],
  },
];

export const certifications: { name: string; detail?: string; url?: string; logo: string }[] = [
  { name: "AWS Certified AI Practitioner", logo: "/logos/aws.svg", detail: "Issued Sep 2026 · Valid through Sep 2029", url: "https://www.credly.com/badges/759e09a5-030c-4137-af18-6237a8611eec/public_url" },
  { name: "Ultimate Rust 2: Intermediate & Advanced Concepts", logo: "/logos/rust.svg", detail: "Udemy · Issued Oct 2023", url: "https://www.udemy.com/certificate/UC-4a15290c-ab2c-41d7-9192-5d4284611821/" },
  { name: "Ultimate Rust Crash Course", logo: "/logos/rust.svg", detail: "Udemy · Issued Sep 2023", url: "https://www.udemy.com/certificate/UC-cf845bdf-a1ce-4039-99f0-82b43b6830f4/" },
  { name: "UC San Diego: Algorithmic Toolbox", logo: "/logos/uc-san-diego.ico", detail: "Coursera · Issued Sep 2021", url: "https://www.coursera.org/account/accomplishments/certificate/SLFWSQ3WPY5H" },
  { name: "Google Cloud: Create and Manage Cloud Resources", logo: "/logos/google-g.png", detail: "Google Cloud Education · Issued Sep 2021", url: "https://www.skills.google/public_profiles/d141f890-59b4-4933-a937-df23c53efcaf/badges/1233454" },
  { name: "Java Programming: Solving Problems with Software", logo: "/logos/duke.png", detail: "Duke University · Coursera · Issued Sep 2021", url: "https://www.coursera.org/account/accomplishments/certificate/H5GTZJ3SGBTB" },
];

export type NavLink = {
  id: string;
  label: string;
  icon: "home" | "experience" | "projects" | "opensource" | "research" | "certifications" | "about" | "contact";
};

export const navLinks: NavLink[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "about", label: "About", icon: "about" },
  { id: "experience", label: "Experience", icon: "experience" },
  { id: "research", label: "Research", icon: "research" },
  { id: "opensource", label: "Open Source", icon: "opensource" },
  { id: "projects", label: "Projects", icon: "projects" },
  { id: "certifications", label: "Certifications", icon: "certifications" },
  { id: "contact", label: "Contact", icon: "contact" },
];

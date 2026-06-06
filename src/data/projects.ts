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
      "Research framework exploring Byzantine fault-tolerant multi-agent AI systems for cybersecurity workflows — evaluating robustness against adversarial coordination and inter-agent manipulation.",
    tags: ["Python", "AI Security", "Multi-Agent Systems"],
  },
  {
    name: "RPC Reverse Proxy",
    repo: "https://github.com/abdulazeem-tk4vr/reverse-proxy",
    description:
      "Load-balancing reverse proxy for JSON-RPC validator networks with integrated node discovery, improving request distribution and resilience across sharded blockchain nodes.",
    tags: ["TypeScript", "Node.js", "JSON-RPC", "Load Balancing"],
  },
  {
    name: "Farmers Collective",
    repo: "https://github.com/abdulazeem-tk4vr/farmers_collective",
    description:
      "Google AI for Social Good project — production Android app integrating time-series forecasting models to deliver crop price predictions for farmer collectives. Published in ACM JCSS.",
    tags: ["Android", "Kotlin", "ML", "Firebase"],
  },
];

export const openSource: RepoEntry[] = [
  {
    name: "Shardeum Core",
    repo: "https://github.com/shardeum/core",
    description:
      "Shardus Core — the distributed ledger engine powering Shardeum's sharded consensus network, handling validator coordination, state management, and cycle chain operations.",
    tags: ["TypeScript", "Node.js", "Consensus", "Shardus"],
  },
  {
    name: "Shardeum",
    repo: "https://github.com/shardeum/shardeum",
    description:
      "EVM-compliant autoscaling L1 blockchain using dynamic state sharding — scaled mainnet to 80M+ transactions and 150K+ validators.",
    tags: ["TypeScript", "EVM", "Blockchain", "Sharding"],
  },
  {
    name: "Shardeum Archiver",
    repo: "https://github.com/shardeum/archiver",
    description:
      "Archiver node for the Shardus network — stores the complete cycle chain and historical state data, enabling network recovery and auditability.",
    tags: ["TypeScript", "Node.js", "Distributed Systems"],
  },
  {
    name: "Shardeum JSON-RPC Server",
    repo: "https://github.com/shardeum/json-rpc-server",
    description:
      "JSON-RPC server for Shardeum validator networks — upgraded with WebSocket-based data distribution, boosting RPC throughput by 60%.",
    tags: ["TypeScript", "JSON-RPC", "WebSockets"],
  },
  {
    name: "Shardeum lib-net",
    repo: "https://github.com/shardeum/lib-net",
    description:
      "Rust and TypeScript TCP networking library for validator communication — reduced networking latency by 34% (82 ms → 54 ms) via profiling and crypto optimizations.",
    tags: ["Rust", "TypeScript", "TCP", "P2P"],
  },
  {
    name: "Shardeum Blockscout",
    repo: "https://github.com/shardeum/blockscout",
    description:
      "Block explorer fork for Shardeum — indexes and visualizes on-chain transactions, accounts, and smart contracts across the EVM-compatible network.",
    tags: ["Elixir", "Blockchain Explorer", "EVM"],
  },
  {
    name: "Farcaster Snapchain",
    repo: "https://github.com/farcasterxyz/snapchain",
    description:
      "Enhanced event filtering and querying APIs with timestamp and block-based filters; designed efficient serialization for network and database performance.",
    tags: ["Rust", "RocksDB", "gRPC", "Protocol Buffers"],
  },
  {
    name: "Liberdus TSS Signer",
    repo: "https://github.com/Liberdus/tss-signer",
    description:
      "Multi-network event processing with configurable routing, gas estimation, adaptive batch sizing, and block-state persistence. Ed25519 signing/verification in Rust.",
    tags: ["Rust", "TypeScript", "Node.js"],
  },
];

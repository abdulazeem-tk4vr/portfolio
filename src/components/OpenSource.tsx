import { openSourceGroups } from "../data/profile";
import { RepoList } from "./RepoList";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Typography";

function OrgContextCard({
  org,
  url,
  stage,
  context,
}: {
  org: string;
  url: string;
  stage: string;
  context: string;
}) {
  return (
    <div className="org-context-card lg:flex lg:items-start lg:justify-between lg:gap-8">
      <div className="min-w-0 shrink-0 lg:max-w-xs">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold tracking-[-0.02em] text-accent-navy underline decoration-accent-blue/25 underline-offset-2 transition hover:text-accent-blue hover:decoration-accent-blue/60"
          >
            {org}
          </a>
          <span className="period-badge">{stage}</span>
        </div>
      </div>
      <p className="mt-3 text-[14px] leading-[1.72] text-ink-muted lg:mt-0 lg:flex-1 lg:text-right">{context}</p>
    </div>
  );
}

export function OpenSource() {
  return (
    <section id="opensource" className="section-block section-divider" aria-labelledby="opensource-heading">
      <Reveal>
        <SectionHeader
          id="opensource-heading"
          label="Contributions"
          title="Open Source"
          intro="Contributions across blockchain mainnet infrastructure, decentralized social protocols, and cross-chain messaging systems."
        />
      </Reveal>

      <div className="space-y-14">
        {openSourceGroups.map((group, groupIndex) => (
          <div key={group.org}>
            <Reveal delay={groupIndex * 40}>
              <OrgContextCard
                org={group.org}
                url={group.url}
                stage={group.stage}
                context={group.context}
              />
            </Reveal>
            <div className="mt-6">
              <RepoList
                items={group.repos}
                columns={group.repos.length > 2 ? 3 : group.repos.length === 2 ? 2 : 1}
                staggerMs={50}
                baseDelay={groupIndex * 20}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

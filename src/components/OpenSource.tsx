import { openSourceGroups } from "../data/profile";
import { RepoList } from "./RepoList";
import { SectionHeader } from "./Typography";

type OrgTheme = {
  orgCard: string;
  orgName: string;
  orgBadge: string;
  repoCard: string;
  repoTag: string;
};

const ORG_THEMES: Record<string, OrgTheme> = {
  Shardeum: {
    orgCard: "org-theme-shardeum",
    orgName: "org-name-shardeum",
    orgBadge: "org-badge-shardeum",
    repoCard: "repo-theme-shardeum",
    repoTag: "repo-tag-shardeum",
  },
  Farcaster: {
    orgCard: "org-theme-farcaster",
    orgName: "org-name-farcaster",
    orgBadge: "org-badge-farcaster",
    repoCard: "repo-theme-farcaster",
    repoTag: "repo-tag-farcaster",
  },
  Liberdus: {
    orgCard: "org-theme-liberdus",
    orgName: "org-name-liberdus",
    orgBadge: "org-badge-liberdus",
    repoCard: "repo-theme-liberdus",
    repoTag: "repo-tag-liberdus",
  },
};

const DEFAULT_THEME: OrgTheme = {
  orgCard: "org-theme-default",
  orgName: "org-name-default",
  orgBadge: "org-badge-default",
  repoCard: "repo-theme-default",
  repoTag: "repo-tag-default",
};

function OrgContextCard({
  org,
  url,
  stage,
  context,
  theme,
}: {
  org: string;
  url: string;
  stage: string;
  context: string;
  theme: OrgTheme;
}) {
  return (
    <div className={`org-context-card ${theme.orgCard}`}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`org-context-name ${theme.orgName}`}
        >
          {org}
        </a>
        <span className={`org-stage-badge ${theme.orgBadge}`}>{stage}</span>
      </div>
      <p className="org-context-copy">{context}</p>
    </div>
  );
}

export function OpenSource() {
  return (
    <section id="opensource" className="section-block section-divider" aria-labelledby="opensource-heading">
      <SectionHeader
        id="opensource-heading"
        label="Contributions"
        title="Open Source"
        intro="Contributions across blockchain mainnet infrastructure, decentralized social protocols, and cross-chain messaging systems."
      />

      <div className="opensource-groups">
        {openSourceGroups.map((group) => {
          const theme = ORG_THEMES[group.org] ?? DEFAULT_THEME;

          return (
            <div key={group.org} className="opensource-group">
              <OrgContextCard
                org={group.org}
                url={group.url}
                stage={group.stage}
                context={group.context}
                theme={theme}
              />
              <div className="opensource-repos">
                <RepoList
                  items={group.repos}
                  columns={group.repos.length > 2 ? 3 : group.repos.length === 2 ? 2 : 1}
                  repoCardClass={theme.repoCard}
                  tagClass={theme.repoTag}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

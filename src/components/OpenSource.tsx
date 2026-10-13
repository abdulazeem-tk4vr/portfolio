import { BrandLogo } from "./BrandLogo";
import { openSourceGroups } from "../data/profile";
import { RepoList } from "./RepoList";
import { SectionHeader } from "./Typography";

export function OpenSource() {
  return (
    <section id="opensource" className="section-block section-divider" aria-labelledby="opensource-heading">
      <SectionHeader id="opensource-heading" label="04 / Contributions" title="Open Source" intro="Contributions to cloud infrastructure, distributed networks, and open source tools." />
      <div className="opensource-groups">
        {openSourceGroups.map((group) => (
          <section key={group.org} className="opensource-group" aria-label={`${group.org} contributions`}>
            <header className="org-context-card">
              <div className="flex flex-wrap items-center gap-3">
                <BrandLogo src={group.logo} />
                <h3><a href={group.url} target="_blank" rel="noopener noreferrer" className="org-context-name">{group.org} </a></h3>
                <span className="contributor-label">{group.org === "Liberdus" ? "Core team" : "Contributor"}</span>
                <span className="org-stage-badge">{group.stage}</span>
              </div>
            </header>
            <RepoList items={group.repos} />
          </section>
        ))}
      </div>
    </section>
  );
}

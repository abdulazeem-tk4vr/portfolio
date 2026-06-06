import { projects } from "../data/profile";
import { RepoList } from "./RepoList";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Typography";

export function Projects() {
  return (
    <section id="projects" className="section-block section-divider" aria-labelledby="projects-heading">
      <Reveal>
        <SectionHeader
          id="projects-heading"
          label="Personal"
          title="Projects"
          intro="Independent work spanning AI security research, distributed systems tooling, and applied ML for social impact."
        />
      </Reveal>

      <RepoList items={projects} columns={3} />
    </section>
  );
}

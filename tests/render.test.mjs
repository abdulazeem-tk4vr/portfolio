import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";
import { build } from "esbuild";

test("portfolio renders complete navigation, current facts, and accessible project links", async () => {
  const bundle = await build({
    stdin: {
      contents: `
        import { createElement } from "react";
        import { renderToStaticMarkup } from "react-dom/server";
        import { MemoryRouter } from "react-router-dom";
        import App from "./src/App";
        import { ExperienceCard } from "./src/components/ExperienceCard";
        import { ProjectCard } from "./src/components/ProjectCard";
        import { RepoList } from "./src/components/RepoList";
        import { experience, projects, research, education, skillGroups, openSource, openSourceGroups, navLinks, profile } from "./src/data/profile";
        const render = (component, props) => renderToStaticMarkup(createElement(component, props));
        export const page = renderToStaticMarkup(createElement(MemoryRouter, null, createElement(App)));
        export const firstRole = render(ExperienceCard, {job: experience[0]});
        export const noLinkProject = render(ProjectCard, {project: {name: "Offline research", description: "A study", tags: []}, index: 2});
        export const noLinkRepo = render(RepoList, {items: [{name: "Unpublished", description: "A study", tags: []}]});
        export { experience, projects, research, education, skillGroups, openSource, openSourceGroups, navLinks, profile };
      `,
      resolveDir: process.cwd(),
      loader: "tsx",
    },
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    jsx: "automatic",
    external: ["react", "react-dom/server", "react-router-dom"],
  });
  // Resolve installed React from this workspace while keeping the test bundle in memory.
  const code = bundle.outputFiles[0].text.replace(/from "(react(?:\/[^\"]+)?|react-dom\/server|react-router-dom)"/g,
    (_, name) => `from "${import.meta.resolve(name)}"`);
  const result = await import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
  const {page, experience, projects, research, education, skillGroups, openSource, openSourceGroups, navLinks, profile} = result;
  assert.equal((page.match(/<h1\b/g) ?? []).length, 1);
  assert.match(page, /Software Engineer - AI and Distributed Systems/);
  assert.doesNotMatch(page, /Software, systems &amp; applied AI|class="hero-lead"|class="focus-grid"/);
  assert.match(page, /Apr 2026.*Sep 2026/);
  assert.doesNotMatch(page, /education-status/);
  assert.match(page, /Launch starship/);
  assert.match(page, /class="galaxy-mode-hero-eyebrow">Stellar recon<\/span>/);
  assert.doesNotMatch(page, /What I&#x27;m doing now|Recent work|Explore my work/);
  assert.match(page, /id="certifications"/);
  assert.match(page, /aria-label="Open section menu" aria-expanded="false" aria-controls="section-navigation"/);
  assert.match(page, /href="https:\/\/www.credly.com\/badges\/759e09a5-030c-4137-af18-6237a8611eec\/public_url"/);
  assert.match(page, /aria-label="View credential for UC San Diego: Algorithmic Toolbox"/);
  assert.match(page, /href="https:\/\/www.udemy.com\/certificate\/UC-4a15290c-ab2c-41d7-9192-5d4284611821\/"/);
  assert.match(page, /FastAPI/);
  const languages = page.match(/<dt>Languages<\/dt><dd[^>]*>(.*?)<\/dd>/)[1];
  assert.equal(languages, "Python, TypeScript, Rust, C++");
  const tools = page.slice(page.indexOf("Technical Skills"), page.indexOf('<section id="experience"'));
  assert.doesNotMatch(tools, /<img/);
  assert.doesNotMatch(tools, /class="skill-item"/);
  for (const match of page.matchAll(/src="(\/logos\/[^"]+)"/g)) assert.ok(existsSync(`public${match[1]}`), match[1]);
  const about = page.slice(page.indexOf('<section id="about"'), page.indexOf('<section id="experience"'));
  assert.doesNotMatch(about, /2023/);
  assert.equal((about.match(/class="education-entry"/g) ?? []).length, 2);
  assert.match(about, /<h4 class="education-degree">M\.S\. in Computer Science<\/h4>/);
  assert.match(about, /<p class="education-detail">GPA: 4\.0\/4\.0<\/p>/);
  assert.match(about, /<p class="education-detail">Specialization: Machine Learning<\/p>/);
  const shardeum = experience.filter(job => job.company === "Shardeum");
  assert.equal(shardeum.length, 1);
  assert.equal(shardeum[0].period, "Aug 2022 – Dec 2025");
  assert.match(shardeum[0].role, /Software Engineer → Senior Software Engineer/);
  assert.match(result.firstRole, /85%.*63%.*50%/);
  assert.match(experience.find(job => job.company === "Shardeum").summary, /80M\+.*30 ms P99.*10K requests per second/);
  assert.doesNotMatch(page, /career-overview|Career milestones|project-visual-caption|outperformed frontier|Excytin|Multi.Agentic|Open to anything interesting/);
  assert.equal((page.match(/class="career-entry"/g) ?? []).length, experience.length);
  assert.equal((about.match(/class="about-bio"/g) ?? []).length, 4);
  assert.doesNotMatch(about, /My background includes|I contribute to open source infrastructure/);
  assert.match(about, /applied AI for cybersecurity/);
  assert.doesNotMatch(about, /US citizen|SOC|Qwen|ExCyTIn|OpenSec/);
  assert.match(page, /class="hero-badges">US citizen/);
  assert.match(page, /Clearance Eligible/);
  assert.doesNotMatch(page, /Remote · Hybrid · On site/);
  assert.equal((page.match(/class="experience-toggle"/g) ?? []).length, experience.length);
  assert.equal((page.match(/<details>/g) ?? []).length, experience.length + openSourceGroups.length);
  assert.equal((page.match(/class="org-context-card experience-toggle"/g) ?? []).length, openSourceGroups.length);
  assert.doesNotMatch(page, /<details open/);
  assert.doesNotMatch(page, /theme-toggle|Switch to dark mode/);
  assert.equal(profile.location, "California, USA");
  assert.match(page, /Based in California, USA/);
  assert.match(page, /class="hero-location">California, USA/);
  for (const decoration of ["stars", "scanlines", "lightning"]) assert.match(page, new RegExp(`class="galaxy-mode-hero-${decoration}"[^>]*aria-hidden="true"`));
  const hero = page.slice(page.indexOf('<section id="home"'), page.indexOf('<section id="about"'));
  const actions = hero.match(/<div class="hero-actions">([\s\S]*?)<\/div>/)[1];
  assert.equal((actions.match(/<svg /g) ?? []).length, 4);
  assert.equal((actions.match(/aria-hidden="true"/g) ?? []).length, 4);
  assert.match(hero, /80M\+ transactions/);
  assert.doesNotMatch(hero, /150K|validator registrations/);
  assert.doesNotMatch(hero, /85% shorter finality|Reduction in transaction finality time at Liberdus/);
  assert.match(hero, /Applied AI CyberSec/);
  assert.match(hero, /Agentic systems beat frontier LLMs on Security-Ops benchmarks from Microsoft AI/);
  assert.match(hero, /10,000 requests\/second/);
  const soc = research.find(item => item.id === "soc-research");
  assert.equal(soc.description.split("\n\n").length, 3);
  const socCard = page.slice(page.indexOf('<article id="soc-research"'), page.indexOf("</article>", page.indexOf('<article id="soc-research"')));
  assert.equal((socCard.match(/class="body-text text-\[18px\]"/g) ?? []).length, 3);
  assert.ok(openSource.every(repo => !/\b(I|My|my)\b/.test(repo.description)));
  for (const text of [...profile.intro, ...experience.map(job => job.summary)]) assert.doesNotMatch(text, /\b(I|My|my)\b/);
  const shardeumRepos = openSource.filter(repo => repo.repo?.includes("github.com/shardeum/"));
  assert.equal(shardeumRepos.length, 4);
  assert.deepEqual(shardeumRepos.slice(0, 2).map(repo => repo.name), ["lib-net", "JSON-RPC Server"]);
  for (const repo of openSource) assert.ok(repo.prUrl.includes("is%3Amerged"));
  assert.match(soc.description, /Fine tuned Qwen2\.5 14B.*ExCyTIn.*OpenSec/);
  assert.equal((page.match(/ExCyTIn/g) ?? []).length, 1);
  assert.match(page, /href="#soc-research"/);
  assert.ok(page.indexOf("Google Scholar") < page.indexOf('class="research-list"'));
  assert.match(page, /class="research-date"><span class="period-badge">Research: Aug 2021 – Jul 2022 · Published: 2023/);
  assert.match(page, /class="contributor-label">Contributor/);
  assert.match(page, /class="contributor-label">Core team/);
  assert.doesNotMatch(page, /Red Hat develops open source|A block explorer for searching|AI Engineer \/ Researcher/);
  assert.match(page, /View merged PRs for Shardeum Archiver/);
  assert.match(page, /Available on request/);
  assert.doesNotMatch(page, /linkedin.com\/in\/(omarsyed1|marc-hanson)|reference-card/);
  for (const entry of [...experience, ...projects, ...openSource]) assert.ok(entry.tags.length <= 3, entry.name ?? entry.company);
  assert.deepEqual(skillGroups.find(group => group.label === "Frontend").skills, ["React", "TypeScript"]);
  assert.equal(skillGroups[0].label, "Core Expertise");
  assert.ok(!skillGroups.find(group => group.label === "Core Expertise").skills.includes("Consensus Protocols"));
  for (const edu of education) assert.doesNotMatch(edu.period, /\d{4}/);
  assert.ok(!experience.some(job => ["Research, IoT & ML", "Research, HCI & Network Security"].includes(job.role)));
  assert.doesNotMatch(page, /BITS Pilani Hyderabad/);
  assert.doesNotMatch(page, /AI Security/i);
  assert.doesNotMatch(page, /AWS &amp; Udacity Machine Learning Scholarship/);
  assert.equal(projects.length, 3);
  const ids = new Set([...page.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const match of page.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(match[1]), `Missing target ${match[1]}`);
  assert.deepEqual([...page.matchAll(/<section id="([^"]+)"/g)].map(match => match[1]), navLinks.map(link => link.id));
  experience.forEach((job, index) => assert.ok(ids.has(`career-${index}`), job.company));
  assert.match(result.firstRole, /class="job-summary" itemProp="description"/);
  assert.doesNotMatch(result.firstRole, /<(ul|li|strong|button)\b/);
  assert.ok(result.firstRole.includes(experience[0].summary));
  for (const job of experience) assert.ok(job.summary.split(/\s+/).length <= 75);
  assert.doesNotMatch(result.noLinkProject, /class="project-link"/);
  assert.doesNotMatch(result.noLinkRepo, /<a\b/);
  for (const project of projects) {
    assert.ok(existsSync(`public${project.visual}`));
    assert.ok(project.visualDescription);
  }
  assert.deepEqual(readFileSync(`public${profile.links.cv}`), readFileSync("AbdulAzeem_Resume.pdf"));
  const resumeLinks = [...page.matchAll(/<a\b[^>]*href="\/AbdulAzeemShaik_Resume.pdf"[^>]*>/g)];
  assert.equal(resumeLinks.length, 2);
  for (const [link] of resumeLinks) {
    assert.match(link, /target="_blank"/);
    assert.doesNotMatch(link, /\bdownload\b/);
  }
  assert.ok(existsSync("public/og-image.png"));
  const summary = readFileSync("public/llms.txt", "utf8").replaceAll("\r\n", "\n");
  for (const paragraph of profile.intro) {
    assert.ok(page.includes(paragraph), paragraph);
    assert.ok(summary.includes(paragraph), paragraph);
  }
  assert.doesNotMatch(summary, /outperformed frontier|Excytin|Multi.Agentic|Open to anything interesting|linkedin.com\/in\/marc-hanson/);
  assert.ok(summary.includes(profile.workAuth));
  assert.match(summary, /Applied AI CyberSec: Agentic systems beat frontier LLMs on Security-Ops benchmarks from Microsoft AI/);
  assert.doesNotMatch(summary, /My background includes|I contribute to open source infrastructure/);
  assert.ok(summary.includes(`- Location: ${profile.location}`));
  assert.doesNotMatch(summary, /AWS & Udacity Machine Learning Scholarship/);
  for (const item of research) assert.ok(summary.includes(item.description), item.title);
  assert.doesNotMatch(readFileSync("public/projects/trading.svg", "utf8"), /not performance data/);
  for (const job of experience) {
    assert.ok(summary.includes(job.period), job.period);
    assert.ok(summary.includes(job.summary), job.company);
  }
  assert.doesNotMatch(page, /r\?sum\?|\? demo only|aria-hidden="true">\?/);
});

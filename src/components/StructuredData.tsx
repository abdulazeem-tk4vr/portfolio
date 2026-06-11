import { useEffect } from "react";
import {
  education,
  experience,
  openSource,
  profile,
  projects,
  research,
  skillGroups,
} from "../data/profile";

function getSiteUrl() {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }
  return "";
}

function buildStructuredData(siteUrl: string) {
  const pageUrl = siteUrl || undefined;
  const allSkills = skillGroups.flatMap((group) => group.skills);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": pageUrl ? `${pageUrl}/#person` : undefined,
    name: profile.name,
    givenName: profile.firstName,
    jobTitle: profile.title,
    description: profile.summary,
    email: profile.email,
    url: pageUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fremont",
      addressRegion: "CA",
      addressCountry: "US",
    },
    sameAs: [profile.links.github, profile.links.linkedin],
    knowsAbout: allSkills,
    alumniOf: education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.school,
    })),
    worksFor: [
      {
        "@type": "Organization",
        name: "Georgia Institute of Technology",
      },
      {
        "@type": "Organization",
        name: "Liberdus",
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": pageUrl ? `${pageUrl}/#website` : undefined,
    name: `${profile.name} — Portfolio`,
    description: profile.summary,
    url: pageUrl,
    author: pageUrl ? { "@id": `${pageUrl}/#person` } : undefined,
    inLanguage: "en-US",
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": pageUrl ? `${pageUrl}/#profilepage` : undefined,
    name: `${profile.name} | ${profile.title}`,
    description: profile.summary,
    url: pageUrl,
    mainEntity: pageUrl ? { "@id": `${pageUrl}/#person` } : person,
    inLanguage: "en-US",
  };

  const workHistory = experience.map((job) => ({
    "@type": "OrganizationRole",
    roleName: job.role,
    startDate: job.period.split("–")[0]?.trim(),
    worksFor: {
      "@type": "Organization",
      name: job.company,
    },
    description: job.highlights.join(" "),
  }));

  const creativeWorks = [...projects, ...openSource].map((project) => ({
    "@type": "SoftwareSourceCode",
    name: project.name,
    codeRepository: project.repo,
    description: project.description,
    programmingLanguage: project.tags,
  }));

  const scholarlyArticles = research.map((item) => ({
    "@type": "ScholarlyArticle",
    name: item.title,
    description: item.description,
    author: { "@type": "Person", name: profile.name },
    publisher: { "@type": "Organization", name: item.org },
    ...(item.url ? { url: item.url } : {}),
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      website,
      profilePage,
      ...workHistory,
      ...creativeWorks,
      ...scholarlyArticles,
    ],
  };
}

export function StructuredData() {
  useEffect(() => {
    const siteUrl = getSiteUrl();
    const data = buildStructuredData(siteUrl);
    const scriptId = "portfolio-jsonld";

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }, []);

  return null;
}

const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");

test("standard site has one fixed palette without theme storage or detection", () => {
  const css = fs.readFileSync("src/index.css", "utf8");
  const header = fs.readFileSync("src/components/Sidebar.tsx", "utf8");
  const html = fs.readFileSync("index.html", "utf8");
  assert.match(css, /--canvas: #f7f5ef;/);
  assert.match(css, /--surface: #ffffff;/);
  assert.doesNotMatch(css + header + html, /data-theme|theme-toggle|portfolio-theme|prefers-color-scheme|localStorage/);
  const address = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]).address;
  assert.deepEqual(address, {"@type": "PostalAddress", addressRegion: "California", addressCountry: "US"});
  const metadata = fs.readFileSync("src/components/StructuredData.tsx", "utf8");
  assert.match(metadata, /addressRegion: "California"/);
  assert.doesNotMatch(metadata, /Fremont/);
});

test("Galaxy decoration uses dark space colours, gold details and reduced motion", () => {
  const css = fs.readFileSync("src/index.css", "utf8");
  assert.match(css, /galaxy-mode-hero-cta \{[^}]*#0a0f1f/);
  assert.match(css, /galaxy-mode-hero-title \{[^}]*color: #ffe81f/);
  assert.match(css, /galaxy-mode-hero-cta:hover \{[^}]*box-shadow:/);
  assert.match(css, /galaxy-mode-hero-lightning.on path \{[^}]*animation: galaxy-draw 90ms/);
  assert.match(css, /galaxy-mode-hero-lightning \{ display: none;/);
  assert.match(css, /galaxy-mode-hero-stars \{[^}]*animation: galaxy-drift/);
  assert.match(css, /galaxy-mode-hero-scanlines \{[^}]*animation: galaxy-scan/);
  assert.match(css, /prefers-reduced-motion: reduce[\s\S]*animation-duration: \.01ms !important/);
});

test("card text stays left aligned and dates stay on one line", () => {
  const css = fs.readFileSync("src/index.css", "utf8");
  assert.doesNotMatch(css, /text-align: justify|hyphens: auto/);
  assert.match(css, /text-align: left;[^}]*hyphens: none/);
  assert.match(css, /career-date \{[^}]*white-space: nowrap/);
  assert.match(css, /:focus:not\(:focus-visible\) \{ outline: none;/);
  assert.match(css, /:focus-visible \{ outline: 3px/);
  assert.match(css, /repo-card-tags \{[^}]*margin-top: auto/);
  assert.match(css, /research-list \{[^}]*align-items: stretch/);
});

test("fixed palette meets AA contrast for body text and links", () => {
  const css = fs.readFileSync("src/index.css", "utf8");
  const luminance = hex => {
    const channels = hex.slice(1).match(/.{2}/g).map(value => parseInt(value, 16) / 255)
      .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  };
  for (const [text, background] of [
    ["#ffffff", "#2457e6"], ["#f8fafc", "#14243c"], ["#93c5fd", "#14243c"], ["#b8c7da", "#14243c"],
    ["#ffe81f", "#120a1a"], ["#67e8f9", "#120a1a"], ["#cbd5e1", "#120a1a"],
  ]) {
    const a = luminance(text), b = luminance(background);
    assert.ok((Math.max(a, b) + .05) / (Math.min(a, b) + .05) >= 4.5, `${text} on ${background}`);
  }
  for (const selector of ["tag", "project-tag", "repo-tag", "org-stage-badge"]) {
    const block = css.split("\n").find(line => line.trimStart().startsWith(`.${selector} {`)).split("{")[1];
    const text = block.match(/(?:^|;)\s*color: (#[a-f0-9]{6})/)[1];
    const background = block.match(/background: (#[a-f0-9]{6})/)[1];
    const a = luminance(text), b = luminance(background);
    assert.ok((Math.max(a, b) + .05) / (Math.min(a, b) + .05) >= 4.5, `${selector} contrast`);
  }
  for (const selector of [":root"]) {
    const block = css.slice(css.indexOf(`${selector} {`)).split("}")[0];
    const palette = Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[a-f0-9]+);/g)].map(match => [match[1], match[2] === "#fff" ? "#ffffff" : match[2]]));
    for (const text of ["ink", "muted", "faint", "link"]) {
      for (const surface of ["canvas", "surface", "wash", "wash-hover"]) {
        const a = luminance(palette[text]), b = luminance(palette[surface]);
        assert.ok((Math.max(a, b) + .05) / (Math.min(a, b) + .05) >= 4.5, `${selector}: ${text} on ${surface}`);
      }
    }
  }
});

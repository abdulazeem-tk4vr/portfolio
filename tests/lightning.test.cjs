const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const test = require("node:test");

test("lightning generates connected fresh bolts, pauses randomly, and cleans up on reduced motion", () => {
  const timers = new Map();
  let id = 0, change;
  const motion = {
    matches: false,
    addEventListener: (event, handler) => { assert.equal(event, "change"); change = handler; },
    removeEventListener: (event, handler) => { assert.equal(handler, change); change = undefined; },
  };
  const classes = () => {
    const values = new Set();
    return { add: value => values.add(value), remove: value => values.delete(value), contains: value => values.has(value) };
  };
  const paths = [{}, {}].map(() => ({ d: "", setAttribute(key, value) { assert.equal(key, "d"); this.d = value; } }));
  const card = {classList: classes()};
  const svg = {classList: classes(), querySelectorAll: () => paths};
  const module = {exports: {}};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync("src/components/galaxyLightning.ts", "utf8"), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022},
  }).outputText, {
    module, exports: module.exports,
    window: {matchMedia: query => { assert.equal(query, "(prefers-reduced-motion: reduce)"); return motion; }},
    setTimeout: (callback, delay) => { timers.set(++id, {callback, delay}); return id; },
    clearTimeout: key => timers.delete(key),
  });
  const run = delay => {
    const entry = [...timers].find(([, timer]) => timer.delay === delay);
    assert.ok(entry, `Missing timer ${delay}`);
    timers.delete(entry[0]); entry[1].callback();
  };
  const cleanup = module.exports.startGalaxyLightning(card, svg);
  run(1200);
  assert.ok(card.classList.contains("strike"));
  assert.ok(svg.classList.contains("on"));
  assert.match(paths[0].d, /^M50.0 0.0 L/);
  assert.match(paths[0].d, /160.0$/);
  const origin = paths[1].d.match(/^M([^ ]+) ([^ ]+)/);
  const vertices = [...paths[0].d.matchAll(/[ML]([^ ]+) ([^ ]+)/g)];
  assert.ok(vertices.some(point => Math.abs(Number(point[1]) - Number(origin[1])) < .1 && Math.abs(Number(point[2]) - Number(origin[2])) < .1));
  const first = paths[0].d;
  run(220);
  assert.ok(!card.classList.contains("strike"));
  const pause = [...timers.values()][0].delay;
  assert.ok(pause >= 3000 && pause <= 7000);
  run(pause);
  assert.notEqual(paths[0].d, first);
  motion.matches = true; change();
  assert.equal(timers.size, 0);
  assert.ok(!svg.classList.contains("on"));
  motion.matches = false; change();
  assert.equal(timers.size, 1);
  cleanup();
  assert.equal(timers.size, 0);
  assert.equal(change, undefined);
  motion.matches = true;
  const reducedCleanup = module.exports.startGalaxyLightning(card, svg);
  assert.equal(timers.size, 0);
  reducedCleanup();
});

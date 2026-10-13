const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

const listeners = new Map();
const states = [];
let effect;
const windowMock = {
  scrollY: 0, innerHeight: 800,
  addEventListener: (name, handler) => listeners.set(name, handler),
  removeEventListener: (name, handler) => {
    assert.equal(listeners.get(name), handler);
    listeners.delete(name);
  },
};
const positions = {home: 0, experience: 900, contact: 2450};
const documentMock = {
  documentElement: {scrollHeight: 2600},
  querySelector: () => ({getBoundingClientRect: () => ({bottom: 80})}),
  getElementById: (id) => ({getBoundingClientRect: () => ({top: positions[id] - windowMock.scrollY})}),
};
const moduleMock = {exports: {}};
const code = ts.transpileModule(fs.readFileSync("src/components/Sidebar.tsx", "utf8"), {
  compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX},
}).outputText;
vm.runInNewContext(code, {
  module: moduleMock, exports: moduleMock.exports, window: windowMock, document: documentMock,
  require: (name) => {
    if (name === "react") return {
      useState: (initial) => [typeof initial === "function" ? initial() : initial, (state) => states.push(state)],
      useEffect: (callback) => { effect = callback; },
    };
    if (name === "react/jsx-runtime") return {jsx: (type, props) => ({type, props}), jsxs: (type, props) => ({type, props})};
    if (name === "../data/profile") return {
      navLinks: Object.keys(positions).map(id => ({id, label: id})),
      profile: {firstName: "Abdul Azeem"},
    };
    throw new Error(`Unexpected import ${name}`);
  },

});
const tree = moduleMock.exports.Navigation();
const cleanup = effect();
assert.equal(states.at(-1), "home");
windowMock.scrollY = 850;
listeners.get("scroll")();
assert.equal(states.at(-1), "experience", "Scrolling updates the section path");
windowMock.scrollY = 1800;
listeners.get("scroll")();
assert.equal(states.at(-1), "contact", "Bottom of the page selects the final section");
windowMock.scrollY = 0;
listeners.get("resize")();
assert.equal(states.at(-1), "home");
listeners.get("keydown")({key: "Escape"});
assert.equal(states.at(-1), false, "Escape closes the mobile menu");
cleanup();
assert.equal(listeners.size, 0, "Unmount removes both listeners");

function findThemeButton(node) {
  if (!node?.props) return;
  if (node?.props?.className === "theme-toggle") return node;
  const children = node?.props?.children;
  for (const child of Array.isArray(children) ? children : [children]) {
    const result = findThemeButton(child);
    if (result) return result;
  }
}
const themeButton = findThemeButton(tree);
assert.equal(themeButton, undefined, "Header has no theme toggle");

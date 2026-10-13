const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const THREE = require('three');

function load(relativePath, globals = {}, imports = {}) {
  const filename = path.resolve(relativePath);
  const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(output, {
    module, exports: module.exports,
    require: (name) => imports[name] ?? require(name),
    ...globals,
  }, { filename });
  return module.exports;
}

class AudioNode {
  constructor() {
    this.gain = this.frequency = { value: 0, setTargetAtTime() {}, setValueAtTime() {}, exponentialRampToValueAtTime() {} };
    this.Q = { value: 0 };
  }
  connect() {}
  start() {}
  stop() {}
}
const gains = [];
class AudioContextMock {
  state = 'running';
  sampleRate = 100;
  destination = {};
  createGain() { const gain = new AudioNode(); gains.push(gain); return gain; }
  createBiquadFilter() { return new AudioNode(); }
  createBufferSource() { return new AudioNode(); }
  createBuffer(_, length) { return { getChannelData: () => new Float32Array(length) }; }
  close() { return Promise.resolve(); }
}
const audio = load('src/galaxy/audio.ts', { AudioContext: AudioContextMock }).createGalaxyAudio();
audio.setSfxMuted(true);

class ElementMock extends EventTarget {
  clientWidth = 800;
  clientHeight = 600;
  classList = { add() {}, remove() {} };
  children = [];
  capture = null;
  appendChild(child) { this.children.push(child); }
  removeChild(child) { this.children.splice(this.children.indexOf(child), 1); }
  setPointerCapture(id) { this.capture = id; }
  hasPointerCapture(id) { return this.capture === id; }
  releasePointerCapture() { this.capture = null; }
  closest() { return null; }
}
const windowMock = new EventTarget();
windowMock.devicePixelRatio = 1;
let nextFrame;
let cancelled = false;
let disconnected = false;
let fired = false;
const ship = new THREE.Group();
let gameScene;
class SceneMock extends THREE.Scene {
  constructor() { super(); gameScene = this; }
}
class RendererMock {
  domElement = {};
  setPixelRatio() {}
  setSize() {}
  render() {}
  dispose() {}
}
class ClockMock {
  getDelta() { return 1 / 30; }
  getElapsedTime() { return 1; }
}
const nodes = [{ id: 'home', label: 'Core', position: [0, 0, 0], isCore: true },
  { id: 'one', label: 'One', position: [5, 0, 0] },
  { id: 'two', label: 'Two', position: [-5, 0, 0] }];
nodes.forEach((node) => { node.color = 0x2459be; });
const container = new ElementMock();
const sceneModule = load('src/galaxy/scene.ts', {
  window: windowMock, HTMLElement: ElementMock,
  requestAnimationFrame(callback) { nextFrame = callback; return 1; },
  cancelAnimationFrame() { cancelled = true; },
  ResizeObserver: class { observe() {} disconnect() { disconnected = true; } },
}, {
  three: { ...THREE, Scene: SceneMock, WebGLRenderer: RendererMock, Clock: ClockMock },
  './audio': { createGalaxyAudio: () => ({ resume: () => Promise.resolve(), startAmbient() {}, updateThrust() {}, dispose() {}, setSfxMuted() {}, isSfxMuted: () => false }) },
  './lasers': { createLaserSystem: () => ({ update: (_, __, ___, firing) => { fired = firing; }, getBoltPositions: () => [], dispose() {} }) },
  './enemies': { createEnemyField: () => ({ update() {}, checkLaserHits() {}, getDestroyedCount: () => 0, prime() {}, dispose() {} }) },
  './labels': { createPlanetLabel: () => ({ sprite: new THREE.Sprite(new THREE.SpriteMaterial()), aspect: 2, dispose() {} }) },
  './nodes': { galaxyNodes: nodes },
  './ship': { createStarship: () => ({ group: ship, engines: [], dispose() {} }), createEngineTrail: () => new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial()), updateEngineTrail() {} },
});
const scene = sceneModule.createGalaxyScene(container, { onStateChange() {}, onScan() {} });
function emit(target, type, properties = {}) {
  const event = new Event(type);
  Object.assign(event, properties);
  target.dispatchEvent(event);
}
function frame() { nextFrame(); }
scene.start();
scene.setFiring(true);
emit(windowMock, 'keydown', { key: ' ' });
frame();
assert.equal(fired, true);
emit(windowMock, 'blur');
frame();
assert.equal(fired, false, 'Blur releases keyboard and held button firing');
const button = new ElementMock();
button.closest = () => button;
const buttonSpace = new Event('keydown');
Object.defineProperty(buttonSpace, 'target', { value: button });
Object.assign(buttonSpace, { key: ' ' });
windowMock.dispatchEvent(buttonSpace);
frame();
assert.equal(fired, false, 'Keyboard activation of a focused control does not fire lasers');
emit(container, 'pointerdown', { button: 0, pointerId: 1, clientX: 100, clientY: 100 });
emit(container, 'pointermove', { pointerId: 1, clientX: 50, clientY: 100 });
frame();
const heading = ship.rotation.y;
emit(container, 'pointercancel', { pointerId: 2 });
assert.equal(container.capture, 1, 'Another touch cannot release the active drag');
emit(container, 'pointercancel', { pointerId: 1 });
frame();
assert.equal(ship.rotation.y, heading, 'Pointer cancellation stops turning');
for (const node of nodes.filter((node) => !node.isCore)) { ship.position.set(...node.position); frame(); }
assert.equal(scene.getState().discovered.length, 2);
assert.equal(scene.getState().complete, true, 'All orbit planets complete the map');
let disposedMaterials = 0;
gameScene.children.filter((object) => object instanceof THREE.Points || object instanceof THREE.LineSegments)
  .forEach((object) => object.material.addEventListener('dispose', () => { disposedMaterials += 1; }));
scene.dispose();
assert.equal(disposedMaterials, 2, 'Star and connection materials are released');
assert.equal(cancelled, true);
assert.equal(disconnected, true);
assert.equal(container.children.length, 0);

const portfolioData = load('src/data/profile.ts');
const previewNodes = load('src/galaxy/nodes.ts', {}, { '../data/profile': portfolioData }).galaxyNodes;
const openSourcePreview = previewNodes.find((node) => node.id === 'opensource').highlights;
assert.equal(openSourcePreview.filter((item) => item.title === 'Shardeum Core & Node').length, 1);
assert.ok(!openSourcePreview.some((item) => ['Blockscout', 'Shardeum Core', 'JSON-RPC Server'].includes(item.title)));
assert.ok(openSourcePreview.some((item) => item.title === 'Farcaster Snapchain'), 'Keep other repository previews');

// Run the route's metadata effect without mounting a WebGL canvas.
for (const existingGooglebot of [true, false]) {
  const effects = [];
  const tags = new Map();
  function meta(name, content) {
    const attributes = new Map([['name', name]]);
    if (content !== null) attributes.set('content', content);
    return {
      getAttribute: (key) => attributes.get(key) ?? null,
      setAttribute: (key, value) => attributes.set(key, value),
      removeAttribute: (key) => attributes.delete(key),
      remove: () => tags.delete(attributes.get('name')),
    };
  }
  tags.set('robots', meta('robots', ''));
  if (existingGooglebot) tags.set('googlebot', meta('googlebot', null));
  const documentMock = {
    title: existingGooglebot ? 'Original title' : '',
    querySelector: (selector) => tags.get(selector.match(/name="([^"]+)"/)[1]) ?? null,
    createElement: () => meta('', null),
    head: { appendChild: (element) => tags.set(element.getAttribute('name'), element) },
  };
  let stateIndex = 0;
  const page = load('src/pages/GalaxyPortfolio.tsx', { document: documentMock }, {
    react: {
      useEffect: (effect) => effects.push(effect), useRef: () => ({ current: null }),
      useState: (initial) => {
        let value = typeof initial === 'function' ? initial() : initial;
        if (stateIndex === 0) value = existingGooglebot;
        if (stateIndex === 1 && existingGooglebot) value = {
          ...value,
          activeNode: { ...nodes[1], summary: '', highlights: ['One achievement.', { title: 'Liberdus', description: 'Private messaging and digital payments.' }], tags: ['Rust'], href: '/#experience' },
        };
        stateIndex++;
        return [value, () => {}];
      },
      useCallback: (callback) => callback,
    },
    'react-router-dom': { Link: () => null },
    '../galaxy/scene': {}, '../galaxy/nodes': { galaxyNodes: nodes },
    '../data/profile': { profile: { name: 'Abdul Azeem Shaik', title: 'AI & Systems Engineer' } },
    '../galaxy/galaxy.css': {},
  });
  const markup = require('react-dom/server').renderToStaticMarkup(page.default());
  assert.match(markup, /<main class="galaxy-stage" aria-label="Space game">/);
  if (existingGooglebot) {
    assert.match(markup, /aria-label="Fire lasers"/);
    assert.match(markup, /aria-label="Close description"/);
    assert.doesNotMatch(markup, /Preview only|Open on standard site|galaxy-panel-actions/);
    assert.doesNotMatch(markup, /galaxy-profile-tags|galaxy-profile-tag/);
    assert.match(markup, /<strong class="galaxy-item-title">Liberdus<\/strong><p>Private messaging and digital payments\.<\/p>/);
    assert.doesNotMatch(markup, /class="galaxy-panel-copy"/);
    assert.doesNotMatch(markup, /Mission briefing/);
  } else {
    assert.match(markup, /<dt>Fly<\/dt><dd>Use WASD/);
    assert.match(markup, /Launch starship/);
    assert.doesNotMatch(markup, /aria-label="Flight controls"/);
  }
  const restore = effects[1]();
  assert.equal(tags.get('robots').getAttribute('content'), 'noindex, nofollow');
  assert.equal(tags.get('googlebot').getAttribute('content'), 'noindex, nofollow');
  restore();
  assert.equal(tags.get('robots').getAttribute('content'), '', 'Empty metadata is restored exactly');
  assert.equal(tags.has('googlebot'), existingGooglebot, 'Created metadata is removed');
  if (existingGooglebot) assert.equal(tags.get('googlebot').getAttribute('content'), null);
  assert.equal(documentMock.title, existingGooglebot ? 'Original title' : 'Abdul Azeem Shaik | AI & Systems Engineer');
}

(async () => {
  await audio.resume();
  assert.equal(gains[2].gain.value, 0, 'Mute applies when the audio context is first created');
  audio.dispose();
  console.log('Galaxy regression checks passed: saved mute, held input, pointer ownership, map completion, cleanup.');
})().catch((error) => { console.error(error); process.exitCode = 1; });

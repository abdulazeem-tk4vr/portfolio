import * as THREE from "three";
import { createGalaxyAudio } from "./audio";
import { createEnemyField } from "./enemies";
import { createLaserSystem } from "./lasers";
import { createPlanetLabel } from "./labels";
import { galaxyNodes, type GalaxyNodeData } from "./nodes";
import { createEngineTrail, createStarship, updateEngineTrail } from "./ship";

export type GameInput = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  fire: boolean;
};

export type GameState = {
  discovered: string[];
  activeNode: GalaxyNodeData | null;
  inRange: boolean;
  complete: boolean;
  navTarget: GalaxyNodeData | null;
  destroyed: number;
};

export type GalaxySceneHandle = {
  dispose: () => void;
  resize: () => void;
  start: () => void;
  setInput: (input: Partial<GameInput>) => void;
  goToNextPlanet: () => void;
  setFiring: (active: boolean) => void;
  setSfxMuted: (muted: boolean) => void;
  isSfxMuted: () => boolean;
  getState: () => GameState;
};

type CreateGalaxySceneOptions = {
  onStateChange: (state: GameState) => void;
  onScan: (node: GalaxyNodeData) => void;
};

const SCAN_RADIUS = 2.6;
const DISPLAY_RADIUS = 4.5;
const PLAY_RADIUS = 14;
const ORBIT_PLANETS = galaxyNodes.filter((node) => !node.isCore);
const AUTOPILOT_SPEED = 9;
const AUTOPILOT_ARRIVAL = 0.2;
const CLIMB_SPEED = 7;
const ALTITUDE_MIN = -2.8;
const ALTITUDE_MAX = 2.8;
const MOUSE_CLIMB_DEADZONE = 0.12;

const defaultInput: GameInput = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  fire: false,
};

export function createGalaxyScene(
  container: HTMLElement,
  { onStateChange, onScan }: CreateGalaxySceneOptions,
): GalaxySceneHandle {
  const width = Math.max(container.clientWidth, 1);
  const height = Math.max(container.clientHeight, 1);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0f1f);
  scene.fog = new THREE.FogExp2(0x120a1a, 0.02);

  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 140);
  camera.position.set(0, 8, 14);

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x4c1d95, 0.35));
  scene.add(new THREE.HemisphereLight(0xffedd5, 0x120a1a, 0.4));
  const sun = new THREE.PointLight(0xffcc66, 2.6, 60);
  sun.position.set(6, 10, 8);
  scene.add(sun);

  const audio = createGalaxyAudio();
  const laserSystem = createLaserSystem(scene, { onFire: () => audio.playPew() });
  const enemyField = createEnemyField(scene, { onDestroy: (kind) => audio.playBlast(kind) });

  const starsGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(1800 * 3);
  for (let i = 0; i < starPositions.length; i += 1) {
    starPositions[i] = (Math.random() - 0.5) * 100;
  }
  starsGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  const stars = new THREE.Points(
    starsGeo,
    new THREE.PointsMaterial({ color: 0xfff3c4, size: 0.08, transparent: true, opacity: 0.85 }),
  );
  scene.add(stars);

  type NodeVisual = {
    data: GalaxyNodeData;
    mesh: THREE.Mesh;
    glow: THREE.Mesh;
    ring: THREE.Mesh;
    label: ReturnType<typeof createPlanetLabel>;
  };

  const nodeVisuals: NodeVisual[] = [];
  const labelOffset = new THREE.Vector3();

  for (const node of galaxyNodes) {
    const size = node.isCore ? 0.7 : 0.5;
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(size, 16, 16),
      new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: node.isCore ? 0.9 : 0.45,
        metalness: 0.4,
        roughness: 0.2,
      }),
    );
    mesh.position.set(...node.position);
    scene.add(mesh);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(size * 2, 12, 12),
      new THREE.MeshBasicMaterial({ color: node.color, transparent: true, opacity: 0.1, depthWrite: false }),
    );
    glow.position.copy(mesh.position);
    scene.add(glow);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(size * 1.5, size * 1.75, 32),
      new THREE.MeshBasicMaterial({ color: 0xffe81f, transparent: true, opacity: 0, side: THREE.DoubleSide }),
    );
    ring.position.copy(mesh.position);
    ring.rotation.x = -Math.PI / 2;
    scene.add(ring);

    const label = createPlanetLabel(
      node.isCore ? "Core node" : "Orbital planet",
      node.label,
      node.planetDetail,
    );
    label.sprite.position.copy(mesh.position);
    label.sprite.position.y += size + 0.85;
    scene.add(label.sprite);

    nodeVisuals.push({ data: node, mesh, glow, ring, label });
  }

  const linePositions: number[] = [];
  const core = galaxyNodes[0];
  for (const node of galaxyNodes.slice(1)) {
    linePositions.push(...core.position, ...node.position);
  }
  for (let i = 1; i < galaxyNodes.length; i += 1) {
    const next = i === galaxyNodes.length - 1 ? 1 : i + 1;
    linePositions.push(...galaxyNodes[i].position, ...galaxyNodes[next].position);
  }
  const linesGeo = new THREE.BufferGeometry();
  linesGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
  const connections = new THREE.LineSegments(
    linesGeo,
    new THREE.LineBasicMaterial({ color: 0xffe81f, transparent: true, opacity: 0.16 }),
  );
  scene.add(connections);

  const starship = createStarship();
  const ship = starship.group;
  ship.position.set(0, 0, 8);
  scene.add(ship);

  const engineTrail = createEngineTrail(scene);

  const velocity = new THREE.Vector3();
  const keys = new Set<string>();
  let input = { ...defaultInput };
  let started = false;
  let frameId = 0;
  const clock = new THREE.Clock();
  const discovered = new Set<string>();
  let activeNode: GalaxyNodeData | null = null;
  let activeNodeDistance = Infinity;
  let complete = false;
  let navTarget: GalaxyNodeData | null = null;

  type AutopilotState = {
    target: THREE.Vector3;
    node: GalaxyNodeData;
  };

  let autopilot: AutopilotState | null = null;
  const lookAtHelper = new THREE.Object3D();
  const toTarget = new THREE.Vector3();
  let mouseClimb = 0;
  let mouseTurn = 0;
  let pointerDown = false;
  let activePointerId: number | null = null;
  let lastPointerX = 0;
  let lastPointerY = 0;

  function publishState() {
    onStateChange({
      discovered: [...discovered],
      activeNode,
      inRange: activeNode !== null && activeNodeDistance <= SCAN_RADIUS,
      complete,
      navTarget,
      destroyed: enemyField.getDestroyedCount(),
    });
  }

  function isFiring() {
    return input.fire || keys.has(" ");
  }

  function approachPointFor(node: GalaxyNodeData): THREE.Vector3 {
    const center = new THREE.Vector3(...node.position);
    toTarget.copy(ship.position).sub(center);
    if (toTarget.lengthSq() < 0.01) {
      toTarget.set(0, 0, 1);
    }
    toTarget.normalize().multiplyScalar(SCAN_RADIUS * 0.88);
    return center.add(toTarget);
  }

  function startAutopilot(node: GalaxyNodeData) {
    navTarget = node;
    autopilot = {
      target: approachPointFor(node),
      node,
    };
    velocity.set(0, 0, 0);
    publishState();
  }

  function goToNextPlanet() {
    if (!started) return;

    let nextIndex = 0;
    if (navTarget) {
      const target = navTarget;
      const currentIndex = ORBIT_PLANETS.findIndex((planet) => planet.id === target.id);
      nextIndex = (currentIndex + 1) % ORBIT_PLANETS.length;
    } else if (activeNode && !activeNode.isCore) {
      const node = activeNode;
      const currentIndex = ORBIT_PLANETS.findIndex((planet) => planet.id === node.id);
      nextIndex = (currentIndex + 1) % ORBIT_PLANETS.length;
    } else {
      const firstUndiscovered = ORBIT_PLANETS.find((planet) => !discovered.has(planet.id));
      nextIndex = firstUndiscovered
        ? ORBIT_PLANETS.findIndex((planet) => planet.id === firstUndiscovered.id)
        : 0;
    }

    startAutopilot(ORBIT_PLANETS[nextIndex]);
  }

  function updateAutopilot(dt: number): boolean {
    if (!autopilot) return false;

    toTarget.copy(autopilot.target).sub(ship.position);
    const dist = toTarget.length();

    if (dist <= AUTOPILOT_ARRIVAL) {
      autopilot = null;
      navTarget = null;
      velocity.set(0, 0, 0);
      publishState();
      return false;
    }

    lookAtHelper.position.copy(ship.position);
    lookAtHelper.lookAt(autopilot.target);
    ship.rotation.y = THREE.MathUtils.lerp(ship.rotation.y, lookAtHelper.rotation.y, 0.12);
    ship.rotation.z = THREE.MathUtils.lerp(ship.rotation.z, 0, 0.15);

    const step = Math.min(AUTOPILOT_SPEED * dt, dist);
    toTarget.normalize().multiplyScalar(step);
    ship.position.add(toTarget);
    velocity.copy(toTarget.clone().divideScalar(dt));

    return true;
  }

  function findActiveNode() {
    let closest: GalaxyNodeData | null = null;
    let closestDist = DISPLAY_RADIUS;

    for (const visual of nodeVisuals) {
      const dist = ship.position.distanceTo(visual.mesh.position);
      if (dist < closestDist) {
        closestDist = dist;
        closest = visual.data;
      }
    }

    return { node: closest, distance: closestDist };
  }

  function findScannableNode() {
    let closest: GalaxyNodeData | null = null;
    let closestDist = SCAN_RADIUS;

    for (const visual of nodeVisuals) {
      if (visual.data.isCore) continue;
      const dist = ship.position.distanceTo(visual.mesh.position);
      if (dist < closestDist) {
        closestDist = dist;
        closest = visual.data;
      }
    }

    return closest;
  }

  function autoScan() {
    if (!started) return;
    const target = findScannableNode();
    if (!target || discovered.has(target.id)) return;

    discovered.add(target.id);
    complete = discovered.size === ORBIT_PLANETS.length;
    onScan(target);
    publishState();
  }

  function applyVerticalMovement(dt: number) {
    if (Math.abs(mouseClimb) < MOUSE_CLIMB_DEADZONE) return;

    ship.position.y += mouseClimb * CLIMB_SPEED * dt;
    ship.position.y = THREE.MathUtils.clamp(ship.position.y, ALTITUDE_MIN, ALTITUDE_MAX);
    ship.rotation.x = THREE.MathUtils.lerp(ship.rotation.x, -mouseClimb * 0.28, 0.12);
  }

  function applyPointerTurn(dt: number) {
    if (!pointerDown || Math.abs(mouseTurn) < MOUSE_CLIMB_DEADZONE) return;

    ship.rotation.y -= mouseTurn * 2.8 * dt;
    ship.rotation.z = THREE.MathUtils.lerp(ship.rotation.z, -mouseTurn * 0.35, 0.12);
  }

  function onPointerDown(event: PointerEvent) {
    if (!started || event.button !== 0 || pointerDown) return;
    pointerDown = true;
    activePointerId = event.pointerId;
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    container.setPointerCapture(event.pointerId);
    container.classList.add("galaxy-canvas-dragging");
  }

  function onPointerMove(event: PointerEvent) {
    if (!started || !pointerDown || event.pointerId !== activePointerId) return;

    const deltaX = lastPointerX - event.clientX;
    const deltaY = lastPointerY - event.clientY;
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;

    mouseClimb = THREE.MathUtils.clamp(deltaY * 0.06, -1, 1);
    mouseTurn = THREE.MathUtils.clamp(deltaX * 0.06, -1, 1);
  }

  function onPointerUp(event: PointerEvent) {
    if (!pointerDown || event.pointerId !== activePointerId) return;
    pointerDown = false;
    activePointerId = null;
    mouseClimb = 0;
    mouseTurn = 0;
    if (container.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }
    container.classList.remove("galaxy-canvas-dragging");
  }

  function onWheel(event: WheelEvent) {
    if (!started) return;
    event.preventDefault();
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.target instanceof HTMLElement && event.target.closest("button, a, input, textarea, select, [contenteditable]")) return;
    if (event.key === " ") {
      keys.add(" ");
      if (started) event.preventDefault();
      return;
    }
    keys.add(event.key.toLowerCase());
    if (event.key.toLowerCase() === "n" && started) {
      event.preventDefault();
      if (event.repeat) return;
      goToNextPlanet();
    }
  }

  function onKeyUp(event: KeyboardEvent) {
    if (event.key === " ") {
      keys.delete(" ");
      return;
    }
    keys.delete(event.key.toLowerCase());
  }

  function resetInput() {
    keys.clear();
    input = { ...defaultInput };
    if (activePointerId !== null && container.hasPointerCapture(activePointerId)) {
      container.releasePointerCapture(activePointerId);
    }
    activePointerId = null;
    pointerDown = false;
    mouseClimb = 0;
    mouseTurn = 0;
    container.classList.remove("galaxy-canvas-dragging");
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", resetInput);
  container.addEventListener("pointerdown", onPointerDown);
  container.addEventListener("pointermove", onPointerMove);
  container.addEventListener("pointerup", onPointerUp);
  container.addEventListener("pointercancel", onPointerUp);
  container.addEventListener("lostpointercapture", onPointerUp);
  container.addEventListener("wheel", onWheel, { passive: false });

  function animate() {
    frameId = requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.033);
    const elapsed = clock.getElapsedTime();

    if (started) {
      const forward = input.forward || keys.has("arrowup") || keys.has("w");
      const backward = input.backward || keys.has("arrowdown") || keys.has("s");
      const left = input.left || keys.has("arrowleft") || keys.has("a");
      const right = input.right || keys.has("arrowright") || keys.has("d");
      const manualInput = forward || backward || left || right || pointerDown;

      if (manualInput && autopilot) {
        autopilot = null;
        navTarget = null;
        publishState();
      }

      const autopilotActive = updateAutopilot(dt);

      if (!autopilotActive) {
        const thrust = forward ? 14 : backward ? -8 : 0;
        const turn = (right ? 1 : 0) - (left ? 1 : 0);

        ship.rotation.y -= turn * 2.4 * dt;
        const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(ship.quaternion);
        velocity.add(direction.multiplyScalar(thrust * dt));
        velocity.multiplyScalar(0.985);

        if (velocity.length() > 10) {
          velocity.setLength(10);
        }

        ship.position.add(velocity.clone().multiplyScalar(dt));

        ship.rotation.z = THREE.MathUtils.lerp(ship.rotation.z, -turn * 0.35, 0.12);
        applyVerticalMovement(dt);
        applyPointerTurn(dt);
      } else {
        applyVerticalMovement(dt);
        applyPointerTurn(dt);
      }

      if (pointerDown) {
        mouseClimb *= 0.88;
        mouseTurn *= 0.88;
      }

      const distFromCenter = Math.hypot(ship.position.x, ship.position.z);
      if (distFromCenter > PLAY_RADIUS) {
        const push = distFromCenter - PLAY_RADIUS;
        ship.position.x -= (ship.position.x / distFromCenter) * push * dt * 3;
        ship.position.z -= (ship.position.z / distFromCenter) * push * dt * 3;
        velocity.multiplyScalar(0.9);
      }

      if (Math.abs(mouseClimb) < MOUSE_CLIMB_DEADZONE && Math.abs(mouseTurn) < MOUSE_CLIMB_DEADZONE) {
        ship.rotation.x = THREE.MathUtils.lerp(ship.rotation.x, 0, 0.1);
      }

      const speed = velocity.length();
      const firing = isFiring();
      const thrustActive =
        autopilotActive || forward || backward || Math.abs(mouseClimb) > MOUSE_CLIMB_DEADZONE || firing;
      starship.engines.forEach((engine, index) => {
        const pulse =
          1 +
          (thrustActive ? 0.45 : 0.1) +
          (firing ? 0.15 : 0) +
          Math.sin(elapsed * 22 + index) * 0.08;
        engine.scale.setScalar(pulse);
        (engine.material as THREE.MeshBasicMaterial).color.setHex(
          firing ? 0xffe81f : thrustActive ? 0xffcc66 : 0x67e8f9,
        );
      });
      updateEngineTrail(engineTrail, ship.position, ship.quaternion, speed);
      laserSystem.update(dt, ship.position, ship.quaternion, firing);
      enemyField.update(dt, ship.position);
      enemyField.checkLaserHits(laserSystem.getBoltPositions(), (index) => laserSystem.removeBolt(index));
      audio.updateThrust(speed, thrustActive, dt);

      autoScan();
    }

    if (started) {
      const proximity = findActiveNode();
      activeNode = proximity.node;
      activeNodeDistance = proximity.node ? proximity.distance : Infinity;
    } else {
      activeNode = null;
      activeNodeDistance = Infinity;
    }

    for (const visual of nodeVisuals) {
      const isDiscovered = discovered.has(visual.data.id);
      const isActive = activeNode?.id === visual.data.id;
      const material = visual.mesh.material as THREE.MeshStandardMaterial;

      const glowMaterial = visual.glow.material as THREE.MeshBasicMaterial;
      const ringMaterial = visual.ring.material as THREE.MeshBasicMaterial;
      const labelMaterial = visual.label.sprite.material as THREE.SpriteMaterial;

      if (visual.data.isCore) {
        visual.glow.scale.setScalar(1 + Math.sin(elapsed * 1.5) * 0.1);
        labelMaterial.opacity = isActive ? 1 : 0.85;
      } else if (isDiscovered) {
        material.emissiveIntensity = 0.95;
        glowMaterial.opacity = 0.22;
        ringMaterial.opacity = 0.35;
        labelMaterial.opacity = 1;
      } else if (isActive) {
        material.emissiveIntensity = 1.1;
        glowMaterial.opacity = 0.28;
        ringMaterial.opacity = 0.75 + Math.sin(elapsed * 6) * 0.2;
        labelMaterial.opacity = activeNodeDistance <= SCAN_RADIUS ? 1 : 0.72;
      } else {
        material.emissiveIntensity = 0.45;
        glowMaterial.opacity = 0.1;
        ringMaterial.opacity = 0;
        labelMaterial.opacity = 0.55;
      }

      visual.mesh.rotation.y = elapsed * 0.35;
      visual.glow.scale.setScalar(1 + Math.sin(elapsed * 2 + visual.data.position[0]) * 0.08);

      const size = visual.data.isCore ? 0.7 : 0.5;
      labelOffset.set(0, size + 0.85, 0);
      visual.label.sprite.position.copy(visual.mesh.position).add(labelOffset);

      const labelDist = camera.position.distanceTo(visual.label.sprite.position);
      const labelScale = THREE.MathUtils.clamp(labelDist * 0.055, 1.6, 3.4);
      visual.label.sprite.scale.set(labelScale, labelScale / visual.label.aspect, 1);
    }

    const camOffset = new THREE.Vector3(0, 4.2, 9.5).applyQuaternion(ship.quaternion);
    const camTarget = ship.position.clone().add(camOffset);
    camera.position.lerp(camTarget, 0.07);
    const lookAhead = ship.position.clone().add(new THREE.Vector3(0, 0, -4).applyQuaternion(ship.quaternion));
    camera.lookAt(lookAhead);

    stars.rotation.y = elapsed * 0.002;
    renderer.render(scene, camera);

    if (started) {
      publishState();
    }
  }

  animate();

  function resize() {
    const nextWidth = Math.max(container.clientWidth, 1);
    const nextHeight = Math.max(container.clientHeight, 1);
    camera.aspect = nextWidth / nextHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(nextWidth, nextHeight);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  function dispose() {
    cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("blur", resetInput);
    container.removeEventListener("pointerdown", onPointerDown);
    container.removeEventListener("pointermove", onPointerMove);
    container.removeEventListener("pointerup", onPointerUp);
    container.removeEventListener("pointercancel", onPointerUp);
    container.removeEventListener("lostpointercapture", onPointerUp);
    container.removeEventListener("wheel", onWheel);
    renderer.dispose();
    starsGeo.dispose();
    (stars.material as THREE.Material).dispose();
    linesGeo.dispose();
    connections.material.dispose();
    nodeVisuals.forEach(({ mesh, glow, ring, label }) => {
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
      glow.geometry.dispose();
      (glow.material as THREE.Material).dispose();
      ring.geometry.dispose();
      (ring.material as THREE.Material).dispose();
      label.dispose();
    });
    starship.dispose();
    engineTrail.geometry.dispose();
    (engineTrail.material as THREE.Material).dispose();
    laserSystem.dispose();
    enemyField.dispose();
    audio.dispose();
    container.removeChild(renderer.domElement);
  }

  return {
    dispose,
    resize,
    start: () => {
      started = true;
      enemyField.prime();
      // Audio support must not prevent the demo from running.
      void audio.resume().then(() => audio.startAmbient()).catch(() => {});
      publishState();
    },
    setInput: (partial) => {
      input = { ...input, ...partial };
    },
    goToNextPlanet,
    setFiring: (active: boolean) => {
      input = { ...input, fire: active };
    },
    setSfxMuted: (muted: boolean) => {
      audio.setSfxMuted(muted);
    },
    isSfxMuted: () => audio.isSfxMuted(),
    getState: () => ({
      discovered: [...discovered],
      activeNode,
      inRange: activeNode !== null && activeNodeDistance <= SCAN_RADIUS,
      complete,
      navTarget,
      destroyed: enemyField.getDestroyedCount(),
    }),
  };
}

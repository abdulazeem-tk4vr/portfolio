import * as THREE from "three";

export type StarshipParts = {
  group: THREE.Group;
  engines: THREE.Mesh[];
  dispose: () => void;
};

/** Lightweight X-wing-inspired scout fighter (original geometry, no IP assets). */
export function createStarship(): StarshipParts {
  const ship = new THREE.Group();
  const disposables: THREE.Material[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xcbd5e1,
    emissive: 0x1e3a5d,
    emissiveIntensity: 0.15,
    metalness: 0.75,
    roughness: 0.28,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: 0x2563eb,
    emissive: 0x2563eb,
    emissiveIntensity: 0.35,
    metalness: 0.6,
    roughness: 0.3,
  });
  const cockpitMat = new THREE.MeshStandardMaterial({
    color: 0x22d3ee,
    emissive: 0x0891b2,
    emissiveIntensity: 0.6,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.85,
  });
  disposables.push(hullMat, accentMat, cockpitMat);

  function addMesh(geometry: THREE.BufferGeometry, material: THREE.Material, position?: THREE.Vector3, rotation?: THREE.Euler) {
    geometries.push(geometry);
    const mesh = new THREE.Mesh(geometry, material);
    if (position) mesh.position.copy(position);
    if (rotation) mesh.rotation.copy(rotation);
    ship.add(mesh);
    return mesh;
  }

  // Fuselage — tapered body, nose points toward -Z (forward)
  const fuselage = addMesh(new THREE.CylinderGeometry(0.18, 0.28, 1.6, 10), hullMat);
  fuselage.rotation.x = Math.PI / 2;
  fuselage.position.z = -0.1;

  const nose = addMesh(new THREE.ConeGeometry(0.2, 0.55, 10), accentMat);
  nose.rotation.x = -Math.PI / 2;
  nose.position.z = -1.05;

  const cockpit = addMesh(new THREE.SphereGeometry(0.16, 10, 10), cockpitMat);
  cockpit.position.set(0, 0.14, -0.35);
  cockpit.scale.set(1.2, 0.65, 1.6);

  // X-wings — four s-foils
  const wingGeo = new THREE.BoxGeometry(0.95, 0.04, 0.28);
  geometries.push(wingGeo);

  const wingAngles = [Math.PI / 4, -Math.PI / 4, (3 * Math.PI) / 4, (-3 * Math.PI) / 4];
  for (const angle of wingAngles) {
    const wing = new THREE.Mesh(wingGeo, accentMat);
    wing.position.set(Math.sin(angle) * 0.55, 0, Math.cos(angle) * 0.1 - 0.15);
    wing.rotation.set(0, angle, 0);
    ship.add(wing);

    const tip = addMesh(new THREE.BoxGeometry(0.12, 0.06, 0.12), hullMat);
    tip.position.set(Math.sin(angle) * 1.05, 0, Math.cos(angle) * 0.1 - 0.2);
    tip.rotation.set(0, angle, 0);
  }

  // Rear stabilizer fins
  const finGeo = new THREE.BoxGeometry(0.08, 0.35, 0.22);
  geometries.push(finGeo);
  for (const side of [-1, 1]) {
    const fin = new THREE.Mesh(finGeo, hullMat);
    fin.position.set(side * 0.22, 0, 0.55);
    fin.rotation.z = side * 0.35;
    ship.add(fin);
  }

  // Twin ion engines
  const engines: THREE.Mesh[] = [];
  const engineMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  disposables.push(engineMat);

  for (const side of [-1, 1]) {
    const housing = addMesh(new THREE.CylinderGeometry(0.1, 0.12, 0.25, 8), hullMat);
    housing.rotation.x = Math.PI / 2;
    housing.position.set(side * 0.2, 0, 0.72);

    const glow = addMesh(new THREE.SphereGeometry(0.11, 8, 8), engineMat);
    glow.position.set(side * 0.2, 0, 0.88);
    engines.push(glow);
  }

  // Central deflector glow
  const deflector = addMesh(
    new THREE.RingGeometry(0.08, 0.14, 16),
    new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.55, side: THREE.DoubleSide }),
  );
  deflector.position.z = -0.95;
  disposables.push(deflector.material as THREE.Material);

  ship.scale.setScalar(1.15);

  return {
    group: ship,
    engines,
    dispose: () => {
      geometries.forEach((g) => g.dispose());
      disposables.forEach((m) => m.dispose());
    },
  };
}

export function createEngineTrail(parent: THREE.Object3D): THREE.Points {
  const count = 40;
  const positions = new Float32Array(count * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const trail = new THREE.Points(
    geo,
    new THREE.PointsMaterial({ color: 0xffe81f, size: 0.12, transparent: true, opacity: 0.65 }),
  );
  parent.add(trail);
  return trail;
}

export function updateEngineTrail(
  trail: THREE.Points,
  shipPosition: THREE.Vector3,
  shipQuaternion: THREE.Quaternion,
  speed: number,
) {
  if (speed < 0.5) {
    (trail.material as THREE.PointsMaterial).opacity = 0;
    return;
  }

  (trail.material as THREE.PointsMaterial).opacity = Math.min(0.75, speed * 0.08);
  const positions = trail.geometry.attributes.position as THREE.BufferAttribute;
  const back = new THREE.Vector3(0, 0, 1).applyQuaternion(shipQuaternion).multiplyScalar(0.9);
  const spread = new THREE.Vector3();

  for (let i = 0; i < positions.count; i += 1) {
    const t = i / positions.count;
    spread.set((Math.random() - 0.5) * 0.25, (Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.15);
    const point = shipPosition.clone().add(back).add(spread.multiplyScalar(t));
    positions.setXYZ(i, point.x, point.y, point.z);
  }
  positions.needsUpdate = true;
}

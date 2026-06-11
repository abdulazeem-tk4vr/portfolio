import * as THREE from "three";

const FIRE_INTERVAL = 0.07;
const BOLT_SPEED = 44;
const BOLT_LIFETIME = 1.1;
const MAX_BOLTS = 80;

type Bolt = {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
};

export type LaserSystem = {
  update: (dt: number, shipPosition: THREE.Vector3, shipQuaternion: THREE.Quaternion, firing: boolean) => void;
  getBoltPositions: () => THREE.Vector3[];
  removeBolt: (index: number) => void;
  dispose: () => void;
};

function createBoltMesh(color: number): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(0.06, 0.06, 0.75);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.95,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

export function createLaserSystem(
  scene: THREE.Scene,
  options?: { onFire?: () => void },
): LaserSystem {
  const bolts: Bolt[] = [];
  let cooldown = 0;
  let flashLife = 0;
  let burstToggle = false;

  const muzzleFlash = new THREE.PointLight(0xffe81f, 0, 4);
  scene.add(muzzleFlash);

  const forward = new THREE.Vector3();
  const leftOrigin = new THREE.Vector3();
  const rightOrigin = new THREE.Vector3();
  const leftOffset = new THREE.Vector3(-0.32, 0.02, -0.95);
  const rightOffset = new THREE.Vector3(0.32, 0.02, -0.95);

  function spawnBolt(origin: THREE.Vector3, direction: THREE.Vector3, color: number) {
    if (bolts.length >= MAX_BOLTS) {
      const oldest = bolts.shift();
      if (oldest) {
        scene.remove(oldest.mesh);
        oldest.mesh.geometry.dispose();
        (oldest.mesh.material as THREE.Material).dispose();
      }
    }

    const mesh = createBoltMesh(color);
    const normalized = direction.clone().normalize();
    mesh.position.copy(origin).add(normalized.clone().multiplyScalar(0.55));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), normalized);
    scene.add(mesh);

    bolts.push({
      mesh,
      velocity: normalized.multiplyScalar(BOLT_SPEED),
      life: BOLT_LIFETIME,
    });
  }

  function fireTwinBurst(shipPosition: THREE.Vector3, shipQuaternion: THREE.Quaternion) {
    forward.set(0, 0, -1).applyQuaternion(shipQuaternion);
    leftOrigin.copy(leftOffset).applyQuaternion(shipQuaternion).add(shipPosition);
    rightOrigin.copy(rightOffset).applyQuaternion(shipQuaternion).add(shipPosition);

    const primary = burstToggle ? 0xffe81f : 0x67e8f9;
    const secondary = burstToggle ? 0xfff3c4 : 0xffcc66;
    burstToggle = !burstToggle;

    spawnBolt(leftOrigin, forward, primary);
    spawnBolt(rightOrigin, forward, secondary);

    options?.onFire?.();

    muzzleFlash.position.copy(shipPosition).add(forward.clone().multiplyScalar(0.85));
    muzzleFlash.intensity = 2.4;
    flashLife = 0.06;
  }

  return {
    update(dt, shipPosition, shipQuaternion, firing) {
      if (firing) {
        cooldown -= dt;
        while (cooldown <= 0) {
          fireTwinBurst(shipPosition, shipQuaternion);
          cooldown += FIRE_INTERVAL;
        }
      }

      flashLife = Math.max(0, flashLife - dt);
      muzzleFlash.intensity = flashLife > 0 ? 1.8 + (flashLife / 0.06) * 1.2 : 0;

      for (let i = bolts.length - 1; i >= 0; i -= 1) {
        const bolt = bolts[i];
        bolt.life -= dt;
        bolt.mesh.position.add(bolt.velocity.clone().multiplyScalar(dt));
        (bolt.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0.15, bolt.life / BOLT_LIFETIME);

        if (bolt.life <= 0) {
          scene.remove(bolt.mesh);
          bolt.mesh.geometry.dispose();
          (bolt.mesh.material as THREE.Material).dispose();
          bolts.splice(i, 1);
        }
      }
    },
    getBoltPositions: () => bolts.map((bolt) => bolt.mesh.position.clone()),
    removeBolt(index: number) {
      const bolt = bolts[index];
      if (!bolt) return;
      scene.remove(bolt.mesh);
      bolt.mesh.geometry.dispose();
      (bolt.mesh.material as THREE.Material).dispose();
      bolts.splice(index, 1);
    },
    dispose() {
      bolts.forEach((bolt) => {
        scene.remove(bolt.mesh);
        bolt.mesh.geometry.dispose();
        (bolt.mesh.material as THREE.Material).dispose();
      });
      bolts.length = 0;
      scene.remove(muzzleFlash);
    },
  };
}

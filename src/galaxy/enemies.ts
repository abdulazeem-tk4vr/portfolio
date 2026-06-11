import * as THREE from "three";

const MAX_ASTEROIDS = 6;
const MAX_ALIENS = 4;
const SPAWN_ASTEROID_EVERY = [2.2, 4.5] as const;
const SPAWN_ALIEN_EVERY = [3.5, 6.5] as const;
const HIT_PADDING = 0.28;
const DESPAWN_RADIUS = 16;
const DEATH_DURATION = 0.55;

type EnemyKind = "asteroid" | "alien";

type AlienPalette = {
  skin: number;
  emissive: number;
  eyeEmissive: number;
  blast: number;
};

const ALIEN_PALETTES: AlienPalette[] = [
  { skin: 0x94a3b8, emissive: 0x334155, eyeEmissive: 0x67e8f9, blast: 0x7dd3fc },
  { skin: 0x4ade80, emissive: 0x14532d, eyeEmissive: 0xfacc15, blast: 0x22c55e },
  { skin: 0xa78bfa, emissive: 0x5b21b6, eyeEmissive: 0xf472b6, blast: 0xc084fc },
  { skin: 0x67e8f9, emissive: 0x0e7490, eyeEmissive: 0xffffff, blast: 0x22d3ee },
  { skin: 0xbef264, emissive: 0x4d7c0f, eyeEmissive: 0xfde047, blast: 0x84cc16 },
  { skin: 0xf472b6, emissive: 0x9d174d, eyeEmissive: 0xfde047, blast: 0xfb7185 },
  { skin: 0xfdba74, emissive: 0xc2410c, eyeEmissive: 0x7f1d1d, blast: 0xfb923c },
];

type Enemy = {
  kind: EnemyKind;
  group: THREE.Group;
  velocity: THREE.Vector3;
  spin: THREE.Vector3;
  radius: number;
  scale: number;
  glowColor?: number;
  alienPalette?: AlienPalette;
};

type Shard = {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  spin: THREE.Vector3;
};

type DeathEffect = {
  kind: EnemyKind;
  group: THREE.Group;
  shards: Shard[];
  elapsed: number;
  duration: number;
  spin: THREE.Vector3;
  drift: THREE.Vector3;
  startScale: number;
  flashLight?: THREE.PointLight;
  glowColor?: number;
};

type BlastRing = {
  mesh: THREE.Mesh;
  maxScale: number;
};

type BlastSpark = {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
};

type BlastEffect = {
  kind: EnemyKind;
  group: THREE.Group;
  core: THREE.Mesh;
  rings: BlastRing[];
  sparks: BlastSpark[];
  flashLight: THREE.PointLight;
  elapsed: number;
  duration: number;
};

export type EnemyField = {
  update: (dt: number, shipPosition: THREE.Vector3) => void;
  checkLaserHits: (boltPositions: THREE.Vector3[], removeBolt: (index: number) => void) => void;
  getDestroyedCount: () => number;
  prime: () => void;
  dispose: () => void;
};

function randomSpawnPoint(): THREE.Vector3 {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 7;
  const y = (Math.random() - 0.5) * 3.2;
  return new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
}

function randomBurstDirection(): THREE.Vector3 {
  return new THREE.Vector3(
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2,
  )
    .normalize()
    .multiplyScalar(1.2 + Math.random() * 2.8);
}

function createAsteroidMesh(): { group: THREE.Group; radius: number; scale: number } {
  const radius = 0.18 + Math.random() * 0.42;
  const scaleX = 0.7 + Math.random() * 0.8;
  const scaleY = 0.7 + Math.random() * 0.8;
  const scaleZ = 0.7 + Math.random() * 0.8;
  const visualScale = (scaleX + scaleY + scaleZ) / 3;

  const geometry = new THREE.DodecahedronGeometry(radius, 0);
  const material = new THREE.MeshStandardMaterial({
    color: 0x78716c,
    emissive: 0x78350f,
    emissiveIntensity: 0.2,
    metalness: 0.15,
    roughness: 0.9,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(scaleX, scaleY, scaleZ);
  mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

  const group = new THREE.Group();
  group.add(mesh);
  return { group, radius: radius * visualScale, scale: visualScale };
}

function createAlienMesh(): {
  group: THREE.Group;
  radius: number;
  scale: number;
  palette: AlienPalette;
} {
  const scale = 0.55 + Math.random() * 0.85;
  const palette = ALIEN_PALETTES[Math.floor(Math.random() * ALIEN_PALETTES.length)];
  const group = new THREE.Group();

  const skinMat = new THREE.MeshStandardMaterial({
    color: palette.skin,
    emissive: palette.emissive,
    emissiveIntensity: 0.35,
    metalness: 0.08,
    roughness: 0.62,
  });
  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    emissive: palette.eyeEmissive,
    emissiveIntensity: 0.55,
    metalness: 0.95,
    roughness: 0.08,
  });
  const eyeShineMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: palette.eyeEmissive,
    emissiveIntensity: 1,
  });

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12), skinMat);
  head.scale.set(0.82, 1.2, 0.72);
  head.position.set(0, 0.24, -0.04);
  group.add(head);

  const jaw = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 10), skinMat);
  jaw.scale.set(0.75, 0.45, 0.7);
  jaw.position.set(0, -0.02, -0.1);
  group.add(jaw);

  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), eyeMat);
    eye.scale.set(0.5, 1.25, 0.4);
    eye.position.set(side * 0.11, 0.28, -0.16);
    eye.rotation.z = side * 0.18;
    group.add(eye);

    const shine = new THREE.Mesh(new THREE.SphereGeometry(0.028, 6, 6), eyeShineMat);
    shine.position.set(side * 0.08, 0.33, -0.2);
    group.add(shine);
  }

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.11, 8), skinMat);
  neck.position.set(0, -0.05, -0.02);
  group.add(neck);

  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.055, 0.24, 8), skinMat);
  torso.position.set(0, -0.22, 0.02);
  group.add(torso);

  for (const side of [-1, 1]) {
    const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.02, 0.19, 6), skinMat);
    upperArm.position.set(side * 0.13, -0.1, -0.02);
    upperArm.rotation.z = side * 0.85;
    group.add(upperArm);

    const lowerArm = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.016, 0.21, 6), skinMat);
    lowerArm.position.set(side * 0.23, -0.29, -0.05);
    lowerArm.rotation.z = side * 0.55;
    group.add(lowerArm);

    for (let finger = 0; finger < 3; finger += 1) {
      const digit = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.005, 0.075, 4), skinMat);
      digit.position.set(side * (0.27 + finger * 0.012), -0.42, -0.04 + finger * 0.018);
      digit.rotation.z = side * 0.35;
      group.add(digit);
    }
  }

  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.02, 0.22, 6), skinMat);
    leg.position.set(side * 0.06, -0.4, 0.05);
    group.add(leg);

    const foot = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), skinMat);
    foot.scale.set(1.3, 0.55, 1.6);
    foot.position.set(side * 0.06, -0.52, 0.08);
    group.add(foot);
  }

  group.scale.setScalar(scale);
  group.rotation.y = Math.PI;
  group.userData.alienPalette = palette;

  return { group, radius: 0.5 * scale, scale, palette };
}

function disposeGroup(group: THREE.Group) {
  group.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose();
      const material = object.material;
      if (Array.isArray(material)) {
        material.forEach((entry) => entry.dispose());
      } else {
        material.dispose();
      }
    }
  });
}

function setGroupOpacity(group: THREE.Object3D, opacity: number) {
  group.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      const material = object.material;
      const materials = Array.isArray(material) ? material : [material];
      materials.forEach((entry) => {
        if (entry instanceof THREE.MeshStandardMaterial) {
          entry.transparent = true;
          entry.opacity = opacity;
        }
      });
    }
  });
}

function pulseGroupEmissive(group: THREE.Object3D, color: number, intensity: number) {
  group.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      const material = object.material;
      const materials = Array.isArray(material) ? material : [material];
      materials.forEach((entry) => {
        if (entry instanceof THREE.MeshStandardMaterial) {
          entry.emissive.setHex(color);
          entry.emissiveIntensity = intensity;
        }
      });
    }
  });
}

function createAsteroidShards(group: THREE.Group, baseRadius: number): Shard[] {
  const shards: Shard[] = [];
  const shardCount = 4 + Math.floor(Math.random() * 4);

  group.children.forEach((child) => {
    child.visible = false;
  });

  for (let i = 0; i < shardCount; i += 1) {
    const shardRadius = baseRadius * (0.18 + Math.random() * 0.42);
    const geometry = new THREE.DodecahedronGeometry(shardRadius, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0xa8a29e,
      emissive: 0xff6b00,
      emissiveIntensity: 0.85,
      metalness: 0.1,
      roughness: 0.85,
      transparent: true,
      opacity: 1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    group.add(mesh);

    shards.push({
      mesh,
      velocity: randomBurstDirection(),
      spin: new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
      ),
    });
  }

  return shards;
}

function createBlastBurst(
  scene: THREE.Scene,
  position: THREE.Vector3,
  kind: EnemyKind,
  radius: number,
  alienGlowColor?: number,
): BlastEffect {
  const group = new THREE.Group();
  group.position.copy(position);

  const coreColor = kind === "asteroid" ? 0xff4400 : (alienGlowColor ?? 0xff2244);
  const ringColor = kind === "asteroid" ? 0xffaa00 : (alienGlowColor ?? 0xff4466);
  const sparkColor = kind === "asteroid" ? 0xffcc44 : (alienGlowColor ?? 0xff6688);

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 0.55, 14, 14),
    new THREE.MeshBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  group.add(core);

  const rings: BlastRing[] = [];
  for (let i = 0; i < 3; i += 1) {
    const inner = radius * (0.35 + i * 0.08);
    const outer = radius * (0.55 + i * 0.1);
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(inner, outer, 28),
      new THREE.MeshBasicMaterial({
        color: ringColor,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    ring.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    );
    group.add(ring);
    rings.push({ mesh: ring, maxScale: 2.8 + i * 1.4 });
  }

  const sparks: BlastSpark[] = [];
  const sparkCount = kind === "asteroid" ? 10 : 8;
  for (let i = 0; i < sparkCount; i += 1) {
    const spark = new THREE.Mesh(
      new THREE.SphereGeometry(radius * (0.06 + Math.random() * 0.1), 6, 6),
      new THREE.MeshBasicMaterial({
        color: sparkColor,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    group.add(spark);
    sparks.push({
      mesh: spark,
      velocity: randomBurstDirection().multiplyScalar(2.5 + Math.random() * 3.5),
    });
  }

  const flashLight = new THREE.PointLight(
    kind === "asteroid" ? 0xff5500 : (alienGlowColor ?? 0xff2244),
    6,
    radius * 18,
  );
  group.add(flashLight);

  scene.add(group);

  return {
    kind,
    group,
    core,
    rings,
    sparks,
    flashLight,
    elapsed: 0,
    duration: 0.5,
  };
}

function disposeBlastEffect(fx: BlastEffect) {
  fx.core.geometry.dispose();
  (fx.core.material as THREE.Material).dispose();
  fx.rings.forEach((ring) => {
    ring.mesh.geometry.dispose();
    (ring.mesh.material as THREE.Material).dispose();
  });
  fx.sparks.forEach((spark) => {
    spark.mesh.geometry.dispose();
    (spark.mesh.material as THREE.Material).dispose();
  });
}

export function createEnemyField(
  scene: THREE.Scene,
  options?: { onDestroy?: (kind: EnemyKind) => void },
): EnemyField {
  const enemies: Enemy[] = [];
  const deathEffects: DeathEffect[] = [];
  const blastEffects: BlastEffect[] = [];
  let destroyedCount = 0;
  let asteroidTimer = 1;
  let alienTimer = 2.5;

  function countKind(kind: EnemyKind) {
    return enemies.filter((enemy) => enemy.kind === kind).length;
  }

  function spawnEnemy(kind: EnemyKind) {
    const max = kind === "asteroid" ? MAX_ASTEROIDS : MAX_ALIENS;
    if (countKind(kind) >= max) return;

    const speed = kind === "asteroid" ? 0.35 + Math.random() * 0.55 : 0.55 + Math.random() * 0.45;
    const drift = randomSpawnPoint().normalize().multiplyScalar(speed * 0.12);
    const spin = new THREE.Vector3(
      (Math.random() - 0.5) * (kind === "asteroid" ? 2.8 : 1.2),
      (Math.random() - 0.5) * (kind === "asteroid" ? 2.8 : 1.2),
      (Math.random() - 0.5) * (kind === "asteroid" ? 2.8 : 1.2),
    );

    if (kind === "asteroid") {
      const built = createAsteroidMesh();
      built.group.position.copy(randomSpawnPoint());
      scene.add(built.group);

      enemies.push({
        kind,
        group: built.group,
        velocity: drift,
        spin,
        radius: built.radius,
        scale: built.scale,
      });
      return;
    }

    const built = createAlienMesh();
    built.group.position.copy(randomSpawnPoint());
    scene.add(built.group);

    enemies.push({
      kind,
      group: built.group,
      velocity: drift,
      spin,
      radius: built.radius,
      scale: built.scale,
      glowColor: built.palette.blast,
      alienPalette: built.palette,
    });
  }

  function removeEnemy(index: number) {
    const enemy = enemies[index];
    scene.remove(enemy.group);
    disposeGroup(enemy.group);
    enemies.splice(index, 1);
  }

  function destroyEnemy(index: number) {
    const enemy = enemies[index];
    const blastPosition = enemy.group.position.clone();
    enemies.splice(index, 1);
    destroyedCount += 1;
    options?.onDestroy?.(enemy.kind);

    blastEffects.push(
      createBlastBurst(scene, blastPosition, enemy.kind, enemy.radius, enemy.glowColor),
    );

    const shards =
      enemy.kind === "asteroid" ? createAsteroidShards(enemy.group, enemy.radius) : [];

    const flashLight = new THREE.PointLight(
      enemy.kind === "asteroid" ? 0xff8844 : (enemy.glowColor ?? 0xff2244),
      enemy.kind === "asteroid" ? 2.5 : 3,
      enemy.radius * 10,
    );
    enemy.group.add(flashLight);

    deathEffects.push({
      kind: enemy.kind,
      group: enemy.group,
      shards,
      elapsed: 0,
      duration: DEATH_DURATION,
      spin: enemy.spin.clone().multiplyScalar(enemy.kind === "asteroid" ? 6 : 10),
      drift: randomBurstDirection().multiplyScalar(0.35),
      startScale: enemy.scale,
      flashLight,
      glowColor: enemy.glowColor ?? enemy.alienPalette?.skin,
    });
  }

  function updateBlastEffects(dt: number) {
    for (let i = blastEffects.length - 1; i >= 0; i -= 1) {
      const fx = blastEffects[i];
      fx.elapsed += dt;
      const t = Math.min(fx.elapsed / fx.duration, 1);
      const easeOut = 1 - (1 - t) * (1 - t);
      const flash = Math.sin(t * Math.PI);

      const coreScale = 0.4 + easeOut * 2.8;
      fx.core.scale.setScalar(coreScale);
      const coreMat = fx.core.material as THREE.MeshBasicMaterial;
      coreMat.opacity = flash * (1 - t * 0.35);

      fx.rings.forEach((ring, ringIndex) => {
        const ringScale = 0.5 + easeOut * ring.maxScale;
        ring.mesh.scale.setScalar(ringScale);
        const ringMat = ring.mesh.material as THREE.MeshBasicMaterial;
        ringMat.opacity = flash * (0.95 - ringIndex * 0.15) * (1 - t * 0.5);
      });

      for (const spark of fx.sparks) {
        spark.mesh.position.add(spark.velocity.clone().multiplyScalar(dt * (1 - t * 0.75)));
        const sparkMat = spark.mesh.material as THREE.MeshBasicMaterial;
        sparkMat.opacity = flash * (1 - easeOut);
        spark.mesh.scale.setScalar(Math.max(0.05, 1 - easeOut * 0.85));
      }

      fx.flashLight.intensity = 6 * flash * (1 - t);

      if (t >= 1) {
        scene.remove(fx.group);
        disposeBlastEffect(fx);
        blastEffects.splice(i, 1);
      }
    }
  }

  function updateDeathEffects(dt: number) {
    for (let i = deathEffects.length - 1; i >= 0; i -= 1) {
      const fx = deathEffects[i];
      fx.elapsed += dt;
      const t = Math.min(fx.elapsed / fx.duration, 1);
      const easeOut = 1 - (1 - t) * (1 - t);

      fx.group.position.add(fx.drift.clone().multiplyScalar(dt * (1 - t)));
      fx.group.rotation.x += fx.spin.x * dt;
      fx.group.rotation.y += fx.spin.y * dt;
      fx.group.rotation.z += fx.spin.z * dt;

      if (fx.kind === "alien") {
        const pop = 1 + Math.sin(t * Math.PI) * 0.55;
        const shrink = Math.max(0, 1 - easeOut);
        fx.group.scale.setScalar(fx.startScale * pop * shrink);
        pulseGroupEmissive(
          fx.group,
          fx.glowColor ?? 0x94a3b8,
          0.35 + Math.sin(t * Math.PI) * 2.2,
        );
      } else {
        fx.group.scale.setScalar(fx.startScale * Math.max(0, 1.15 - easeOut * 1.15));
        pulseGroupEmissive(fx.group, 0xff6600, 0.35 + Math.sin(t * Math.PI) * 1.6);
      }

      setGroupOpacity(fx.group, 1 - easeOut);

      if (fx.flashLight) {
        fx.flashLight.intensity = (fx.kind === "asteroid" ? 1.4 : 1.8) * (1 - t);
      }

      for (const shard of fx.shards) {
        shard.mesh.position.add(shard.velocity.clone().multiplyScalar(dt * (1 - t * 0.6)));
        shard.mesh.rotation.x += shard.spin.x * dt;
        shard.mesh.rotation.y += shard.spin.y * dt;
        shard.mesh.rotation.z += shard.spin.z * dt;
        const shardMat = shard.mesh.material;
        if (shardMat instanceof THREE.MeshStandardMaterial) {
          shardMat.opacity = 1 - easeOut;
          shardMat.emissiveIntensity = 0.85 * (1 - t * 0.5);
        }
      }

      if (t >= 1) {
        scene.remove(fx.group);
        disposeGroup(fx.group);
        deathEffects.splice(i, 1);
      }
    }
  }

  return {
    update(dt, shipPosition) {
      asteroidTimer -= dt;
      if (asteroidTimer <= 0) {
        spawnEnemy("asteroid");
        asteroidTimer =
          SPAWN_ASTEROID_EVERY[0] + Math.random() * (SPAWN_ASTEROID_EVERY[1] - SPAWN_ASTEROID_EVERY[0]);
      }

      alienTimer -= dt;
      if (alienTimer <= 0) {
        spawnEnemy("alien");
        alienTimer = SPAWN_ALIEN_EVERY[0] + Math.random() * (SPAWN_ALIEN_EVERY[1] - SPAWN_ALIEN_EVERY[0]);
      }

      for (let i = enemies.length - 1; i >= 0; i -= 1) {
        const enemy = enemies[i];
        enemy.group.position.add(enemy.velocity.clone().multiplyScalar(dt));
        enemy.group.rotation.x += enemy.spin.x * dt;
        enemy.group.rotation.y += enemy.spin.y * dt;
        enemy.group.rotation.z += enemy.spin.z * dt;

        if (enemy.kind === "alien") {
          const toShip = shipPosition.clone().sub(enemy.group.position);
          if (toShip.lengthSq() > 0.01) {
            toShip.normalize().multiplyScalar(0.45 * dt);
            enemy.group.position.add(toShip);
            enemy.group.rotation.y = THREE.MathUtils.lerp(
              enemy.group.rotation.y,
              Math.atan2(toShip.x, toShip.z),
              0.1,
            );
          }
          enemy.group.position.y += Math.sin(performance.now() * 0.004 + i) * 0.002;

          if (enemy.alienPalette) {
            const pulse = 0.28 + Math.sin(performance.now() * 0.004 + i * 1.7) * 0.18;
            enemy.group.traverse((object) => {
              if (!(object instanceof THREE.Mesh)) return;
              const material = object.material;
              const materials = Array.isArray(material) ? material : [material];
              materials.forEach((entry) => {
                if (!(entry instanceof THREE.MeshStandardMaterial)) return;
                if (entry.emissive.getHex() === enemy.alienPalette!.eyeEmissive) {
                  entry.emissiveIntensity = 0.55 + pulse * 1.1;
                } else {
                  entry.emissiveIntensity = 0.25 + pulse;
                }
              });
            });
          }
        }

        if (enemy.group.position.distanceTo(shipPosition) > DESPAWN_RADIUS) {
          removeEnemy(i);
        }
      }

      updateDeathEffects(dt);
      updateBlastEffects(dt);
    },
    checkLaserHits(boltPositions, removeBolt) {
      for (let b = boltPositions.length - 1; b >= 0; b -= 1) {
        const boltPos = boltPositions[b];
        for (let e = enemies.length - 1; e >= 0; e -= 1) {
          const enemy = enemies[e];
          const hitRadius = enemy.radius + HIT_PADDING;
          if (boltPos.distanceTo(enemy.group.position) <= hitRadius) {
            destroyEnemy(e);
            removeBolt(b);
            break;
          }
        }
      }
    },
    getDestroyedCount: () => destroyedCount,
    prime: () => {
      spawnEnemy("asteroid");
      spawnEnemy("asteroid");
      spawnEnemy("alien");
    },
    dispose: () => {
      enemies.forEach((enemy) => {
        scene.remove(enemy.group);
        disposeGroup(enemy.group);
      });
      enemies.length = 0;

      deathEffects.forEach((fx) => {
        scene.remove(fx.group);
        disposeGroup(fx.group);
      });
      deathEffects.length = 0;

      blastEffects.forEach((fx) => {
        scene.remove(fx.group);
        disposeBlastEffect(fx);
      });
      blastEffects.length = 0;
    },
  };
}

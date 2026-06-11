import * as THREE from "three";

type LabelStyle = {
  fontSize: number;
  color: string;
  fontWeight: string;
  maxWidth: number;
  letterSpacing?: number;
  uppercase?: boolean;
};

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function measureBlock(
  ctx: CanvasRenderingContext2D,
  text: string,
  style: LabelStyle,
): { lines: string[]; lineHeight: number } {
  ctx.font = `${style.fontWeight} ${style.fontSize}px Inter, system-ui, sans-serif`;
  const lines = wrapLines(ctx, style.uppercase ? text.toUpperCase() : text, style.maxWidth);
  return { lines, lineHeight: style.fontSize * (style.uppercase ? 1.35 : style.fontSize >= 30 ? 1.15 : 1.25) };
}

function drawBlock(
  ctx: CanvasRenderingContext2D,
  text: string,
  style: LabelStyle,
  centerX: number,
  y: number,
): number {
  ctx.font = `${style.fontWeight} ${style.fontSize}px Inter, system-ui, sans-serif`;
  ctx.fillStyle = style.color;
  if (style.letterSpacing) {
    ctx.letterSpacing = `${style.letterSpacing}px`;
  } else {
    ctx.letterSpacing = "0px";
  }

  const displayText = style.uppercase ? text.toUpperCase() : text;
  const lines = wrapLines(ctx, displayText, style.maxWidth);
  const lineHeight = style.fontSize * (style.uppercase ? 1.35 : style.fontSize >= 30 ? 1.15 : 1.25);

  for (const line of lines) {
    ctx.fillText(line, centerX, y);
    y += lineHeight;
  }

  return y;
}

function buildPlanetLabelTexture(
  eyebrow: string,
  header: string,
  detail: string,
): { texture: THREE.CanvasTexture; aspect: number } {
  const padding = 22;
  const gapSm = 6;
  const gapMd = 10;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const eyebrowStyle: LabelStyle = {
    fontSize: 18,
    color: "#67e8f9",
    fontWeight: "600",
    maxWidth: 300,
    letterSpacing: 2.5,
    uppercase: true,
  };
  const headerStyle: LabelStyle = {
    fontSize: 34,
    color: "#ffe81f",
    fontWeight: "700",
    maxWidth: 320,
  };
  const detailStyle: LabelStyle = {
    fontSize: 20,
    color: "#cbd5e1",
    fontWeight: "500",
    maxWidth: 320,
  };

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    return { texture: fallback, aspect: 2 };
  }

  const eyebrowBlock = measureBlock(ctx, eyebrow, eyebrowStyle);
  const headerBlock = measureBlock(ctx, header, headerStyle);
  const detailBlock = detail ? measureBlock(ctx, detail, detailStyle) : { lines: [], lineHeight: 0 };

  const width =
    Math.max(eyebrowStyle.maxWidth, headerStyle.maxWidth, detailStyle.maxWidth) + padding * 2;
  const height =
    padding * 2 +
    eyebrowBlock.lines.length * eyebrowBlock.lineHeight +
    gapSm +
    headerBlock.lines.length * headerBlock.lineHeight +
    (detailBlock.lines.length ? gapMd + detailBlock.lines.length * detailBlock.lineHeight : 0);

  canvas.width = width;
  canvas.height = height;

  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  let y = padding;
  y = drawBlock(ctx, eyebrow, eyebrowStyle, width / 2, y) + gapSm;
  y = drawBlock(ctx, header, headerStyle, width / 2, y) + (detail ? gapMd : 0);
  if (detail) {
    drawBlock(ctx, detail, detailStyle, width / 2, y);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return { texture, aspect: width / height };
}

export type PlanetLabel = {
  sprite: THREE.Sprite;
  aspect: number;
  dispose: () => void;
};

export function createPlanetLabel(eyebrow: string, header: string, detail: string): PlanetLabel {
  const { texture, aspect } = buildPlanetLabelTexture(eyebrow, header, detail);

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.renderOrder = 10;
  sprite.scale.set(2.8, 2.8 / aspect, 1);

  return {
    sprite,
    aspect,
    dispose: () => {
      texture.dispose();
      material.dispose();
    },
  };
}

type EnemyKind = "asteroid" | "alien";

export type GalaxyAudio = {
  resume: () => Promise<void>;
  startAmbient: () => void;
  stopAmbient: () => void;
  setSfxMuted: (muted: boolean) => void;
  isSfxMuted: () => boolean;
  playPew: () => void;
  playBlast: (kind: EnemyKind) => void;
  updateThrust: (speed: number, active: boolean, dt: number) => void;
  dispose: () => void;
};

const AMBIENT_VOLUME = 0.055;
const SFX_MASTER = 0.14;
const THRUST_MAX = 0.065;
const PEW_COOLDOWN = 0.05;

type AmbientNodes = {
  noise: AudioBufferSourceNode;
  drone: OscillatorNode;
};

function createNoiseBuffer(context: AudioContext, seconds: number): AudioBuffer {
  const length = Math.floor(context.sampleRate * seconds);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;

  for (let i = 0; i < length; i += 1) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.2;
  }

  return buffer;
}

export function createGalaxyAudio(): GalaxyAudio {
  let context: AudioContext | null = null;
  let masterGain: GainNode | null = null;
  let ambientGain: GainNode | null = null;
  let sfxGain: GainNode | null = null;
  let thrustGain: GainNode | null = null;
  let thrustSource: AudioBufferSourceNode | null = null;
  let ambientNodes: AmbientNodes | null = null;
  let sfxMuted = false;
  let thrustLevel = 0;
  let lastPewAt = 0;

  function ensureContext() {
    if (context) return;

    context = new AudioContext();
    masterGain = context.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(context.destination);

    ambientGain = context.createGain();
    ambientGain.gain.value = AMBIENT_VOLUME;
    ambientGain.connect(masterGain);

    sfxGain = context.createGain();
    sfxGain.gain.value = sfxMuted ? 0 : SFX_MASTER;
    sfxGain.connect(masterGain);

    thrustGain = context.createGain();
    thrustGain.gain.value = 0;
    thrustGain.connect(sfxGain);

    const thrustFilter = context.createBiquadFilter();
    thrustFilter.type = "bandpass";
    thrustFilter.frequency.value = 210;
    thrustFilter.Q.value = 0.75;

    thrustSource = context.createBufferSource();
    thrustSource.buffer = createNoiseBuffer(context, 1.2);
    thrustSource.loop = true;
    thrustSource.connect(thrustFilter);
    thrustFilter.connect(thrustGain);
    thrustSource.start();
  }

  function applySfxMute() {
    if (!sfxGain || !context) return;
    sfxGain.gain.setTargetAtTime(sfxMuted ? 0 : SFX_MASTER, context.currentTime, 0.04);
    if (sfxMuted && thrustGain) {
      thrustGain.gain.setTargetAtTime(0, context.currentTime, 0.04);
    }
  }

  return {
    async resume() {
      ensureContext();
      if (context?.state === "suspended") {
        await context.resume();
      }
    },

    startAmbient() {
      if (!context || !ambientGain || ambientNodes) return;

      const noise = context.createBufferSource();
      noise.buffer = createNoiseBuffer(context, 2);
      noise.loop = true;

      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 340;
      filter.Q.value = 0.4;

      const drone = context.createOscillator();
      drone.type = "sine";
      drone.frequency.value = 52;

      const droneGain = context.createGain();
      droneGain.gain.value = 0.22;

      noise.connect(filter);
      filter.connect(ambientGain);
      drone.connect(droneGain);
      droneGain.connect(ambientGain);

      noise.start();
      drone.start();

      ambientNodes = { noise, drone };
    },

    stopAmbient() {
      ambientNodes?.noise.stop();
      ambientNodes?.drone.stop();
      ambientNodes = null;
    },

    setSfxMuted(muted: boolean) {
      sfxMuted = muted;
      applySfxMute();
    },

    isSfxMuted() {
      return sfxMuted;
    },

    playPew() {
      if (!context || !sfxGain || sfxMuted) return;

      const now = context.currentTime;
      if (now - lastPewAt < PEW_COOLDOWN) return;
      lastPewAt = now;

      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(920, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(sfxGain);
      osc.start(now);
      osc.stop(now + 0.08);

      const osc2 = context.createOscillator();
      const gain2 = context.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(1400, now);
      osc2.frequency.exponentialRampToValueAtTime(420, now + 0.04);
      gain2.gain.setValueAtTime(0.05, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc2.connect(gain2);
      gain2.connect(sfxGain);
      osc2.start(now);
      osc2.stop(now + 0.06);
    },

    playBlast(kind: EnemyKind) {
      if (!context || !sfxGain || sfxMuted) return;

      const now = context.currentTime;
      const duration = kind === "asteroid" ? 0.35 : 0.28;
      const baseFreq = kind === "asteroid" ? 90 : 130;

      const noise = context.createBufferSource();
      noise.buffer = createNoiseBuffer(context, 0.15);

      const noiseFilter = context.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = kind === "asteroid" ? 280 : 520;
      noiseFilter.Q.value = 0.6;

      const noiseGain = context.createGain();
      noiseGain.gain.setValueAtTime(0.18, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(sfxGain);
      noise.start(now);
      noise.stop(now + duration + 0.02);

      const boom = context.createOscillator();
      boom.type = "sine";
      boom.frequency.setValueAtTime(baseFreq, now);
      boom.frequency.exponentialRampToValueAtTime(32, now + duration);

      const boomGain = context.createGain();
      boomGain.gain.setValueAtTime(0.16, now);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      boom.connect(boomGain);
      boomGain.connect(sfxGain);
      boom.start(now);
      boom.stop(now + duration + 0.02);
    },

    updateThrust(speed: number, active: boolean, dt: number) {
      if (!context || !thrustGain || sfxMuted) {
        thrustLevel = 0;
        return;
      }

      const target = active ? Math.min(1, 0.2 + speed * 0.09) : 0;
      const lerp = 1 - Math.pow(0.001, Math.max(dt, 0.001));
      thrustLevel += (target - thrustLevel) * lerp;

      thrustGain.gain.setTargetAtTime(thrustLevel * THRUST_MAX, context.currentTime, 0.06);
    },

    dispose() {
      this.stopAmbient();
      thrustSource?.stop();
      thrustSource = null;
      void context?.close();
      context = null;
      masterGain = null;
      ambientGain = null;
      sfxGain = null;
      thrustGain = null;
    },
  };
}

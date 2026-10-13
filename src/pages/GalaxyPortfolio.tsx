import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createGalaxyScene, type GameState, type GalaxySceneHandle } from "../galaxy/scene";
import { galaxyNodes } from "../galaxy/nodes";
import { profile } from "../data/profile";
import "../galaxy/galaxy.css";

const TOTAL_NODES = galaxyNodes.filter((node) => !node.isCore).length;
const DEFAULT_TITLE = `${profile.name} | ${profile.title}`;
const SFX_MUTE_KEY = "galaxy-sfx-muted";

function readSfxMuted() {
  try {
    return localStorage.getItem(SFX_MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

const initialGameState: GameState = {
  discovered: [],
  activeNode: null,
  inRange: false,
  complete: false,
  navTarget: null,
  destroyed: 0,
};

export default function GalaxyPortfolio() {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<GalaxySceneHandle | null>(null);
  const [started, setStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [profileClosed, setProfileClosed] = useState(false);
  const [sfxMuted, setSfxMuted] = useState(readSfxMuted);

  useEffect(() => {
    setProfileClosed(false);
  }, [gameState.activeNode?.id]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Galaxy Mode (Demo) | Abdul Azeem Shaik";

    const indexingMeta = ["robots", "googlebot"].map((name) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      const created = !meta;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      const previousContent = meta.getAttribute("content");
      meta.setAttribute("content", "noindex, nofollow");
      return { meta, created, previousContent };
    });

    return () => {
      document.title = previousTitle || DEFAULT_TITLE;
      indexingMeta.forEach(({ meta, created, previousContent }) => {
        if (created) {
          meta.remove();
        } else if (previousContent !== null) {
          meta.setAttribute("content", previousContent);
        } else {
          meta.removeAttribute("content");
        }
      });
    };
  }, []);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;

    const scene = createGalaxyScene(host, {
      onStateChange: setGameState,
      onScan: () => {},
    });
    scene.setSfxMuted(readSfxMuted());
    sceneRef.current = scene;

    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  const launch = () => {
    sceneRef.current?.start();
    setStarted(true);
    canvasHostRef.current?.focus();
  };

  const toggleSfxMute = () => {
    const next = !sfxMuted;
    setSfxMuted(next);
    sceneRef.current?.setSfxMuted(next);
    try {
      localStorage.setItem(SFX_MUTE_KEY, next ? "1" : "0");
    } catch {
      /* ignore storage errors */
    }
  };

  const holdInput = useCallback((key: keyof Parameters<GalaxySceneHandle["setInput"]>[0], active: boolean) => {
    sceneRef.current?.setInput({ [key]: active });
  }, []);

  const setFiring = useCallback((active: boolean) => {
    sceneRef.current?.setFiring(active);
  }, []);

  const goToNextPlanet = () => {
    sceneRef.current?.goToNextPlanet();
  };

  const activeNode = gameState.activeNode;
  const isMapped = activeNode ? gameState.discovered.includes(activeNode.id) : false;

  return (
    <div className="galaxy-shell">
      <header className="galaxy-hud">
        <div>
          <p className="galaxy-hud-eyebrow">Stellar recon · Scout class</p>
          <h1 className="galaxy-hud-title">Galaxy Mode</h1>
        </div>
        <div className="galaxy-hud-actions">
          <div className="galaxy-score">
            <span>Mapped</span> <span className="galaxy-score-value">{gameState.discovered.length} / {TOTAL_NODES}</span>
          </div>
          {started && (
            <div className="galaxy-score galaxy-destroyed-hud" aria-live="polite">
              <span>Destroyed</span>
              <span className="galaxy-destroyed-count" key={gameState.destroyed}>{gameState.destroyed}</span>
            </div>
          )}
          <button
            type="button"
            className={`galaxy-sfx-toggle ${sfxMuted ? "is-muted" : ""}`}
            aria-pressed={sfxMuted ? "true" : "false"}
            aria-label={sfxMuted ? "Unmute sound effects" : "Mute sound effects"}
            onClick={toggleSfxMute}
          >
            {sfxMuted ? "SFX muted" : "SFX on"}
          </button>
          <Link to="/" className="galaxy-hud-link">
            Back to portfolio
          </Link>
        </div>
      </header>

      <main className="galaxy-stage" aria-label="Space game">
      <div
        ref={canvasHostRef}
        className="galaxy-canvas-host"
        tabIndex={0}
        aria-label="Fly your ship through portfolio planets"
      />

      {!started && (
        <div className="galaxy-overlay">
          <div className="galaxy-start-card">
            <p className="galaxy-panel-label">Mission briefing</p>
            <h2 className="galaxy-start-title">Pilot the scout starship</h2>
            <p className="galaxy-start-copy">
              Explore a small space game inspired by the portfolio. Planets offer brief previews.
            </p>
            <p className="galaxy-info-notice" role="note">
              This is a game demo. Visit the <Link to="/">standard site</Link> for my full experience, projects, research, and contact details.
            </p>
            <dl className="galaxy-start-list">
              <div><dt>Fly</dt><dd>Use WASD or arrow keys. On phones, hold the arrow buttons.</dd></div>
              <div><dt>Look around</dt><dd>Drag the canvas to climb and turn.</dd></div>
              <div><dt>Fire</dt><dd>Hold Space or the Fire button to shoot lasers.</dd></div>
              <div><dt>Explore</dt><dd>Press N or Next to fly to another planet. Get close to map it.</dd></div>
            </dl>
            <button type="button" className="galaxy-panel-cta galaxy-launch-btn" onClick={launch}>
              Launch starship
            </button>
          </div>
        </div>
      )}

      {started && (
        <>
          <div className="galaxy-hint">
            {gameState.complete
              ? "All planets mapped. Keep exploring or visit the standard site."
              : gameState.navTarget
              ? `Auto-flying to ${gameState.navTarget.label}…`
              : gameState.inRange && activeNode && !isMapped
                ? `Scanning ${activeNode.label}…`
                : gameState.inRange && activeNode && isMapped
                  ? `${activeNode.label} mapped. N flies to the next planet`
                  : activeNode
                    ? `Approaching ${activeNode.label} · Hold Space to fire`
                    : "Hold Space to fire · Press N for the next planet"}
          </div>

          <div className="galaxy-controls" aria-label="Flight controls">
            <button
              type="button"
              className="galaxy-control-btn galaxy-control-fire"
              aria-label="Fire lasers"
              onPointerDown={() => setFiring(true)}
              onPointerUp={() => setFiring(false)}
              onPointerCancel={() => setFiring(false)}
              onPointerLeave={() => setFiring(false)}
            >
              Fire
            </button>
            <button
              type="button"
              className="galaxy-control-btn galaxy-control-next"
              aria-label="Fly to next planet"
              onClick={goToNextPlanet}
            >
              Next
            </button>
            <button
              type="button"
              className="galaxy-control-btn galaxy-control-up"
              aria-label="Fly forward"
              onPointerDown={() => holdInput("forward", true)}
              onPointerUp={() => holdInput("forward", false)}
              onPointerCancel={() => holdInput("forward", false)}
              onPointerLeave={() => holdInput("forward", false)}
            >
              ↑
            </button>
            <button
              type="button"
              className="galaxy-control-btn galaxy-control-left"
              aria-label="Turn left"
              onPointerDown={() => holdInput("left", true)}
              onPointerUp={() => holdInput("left", false)}
              onPointerCancel={() => holdInput("left", false)}
              onPointerLeave={() => holdInput("left", false)}
            >
              ←
            </button>
            <button
              type="button"
              className="galaxy-control-btn galaxy-control-right"
              aria-label="Turn right"
              onPointerDown={() => holdInput("right", true)}
              onPointerUp={() => holdInput("right", false)}
              onPointerCancel={() => holdInput("right", false)}
              onPointerLeave={() => holdInput("right", false)}
            >
              →
            </button>
            <button
              type="button"
              className="galaxy-control-btn galaxy-control-down"
              aria-label="Fly backward"
              onPointerDown={() => holdInput("backward", true)}
              onPointerUp={() => holdInput("backward", false)}
              onPointerCancel={() => holdInput("backward", false)}
              onPointerLeave={() => holdInput("backward", false)}
            >
              ↓
            </button>
          </div>
        </>
      )}

      {started && activeNode && !profileClosed && (
        <aside className="galaxy-profile-rail" aria-live="polite" key={activeNode.id}>
          <div className="galaxy-profile-rail-inner">
            <div className="galaxy-profile-rail-header">
              <p className="galaxy-panel-label">
                {activeNode.isCore ? "Core node" : "Orbital planet"}
              </p>
              <div className="galaxy-profile-rail-badges">
                {isMapped && <span className="galaxy-profile-mapped">Mapped</span>}
                {gameState.inRange && !isMapped && !activeNode.isCore && (
                  <span className="galaxy-profile-scanning">Scanning…</span>
                )}
                <button
                  type="button"
                  className="galaxy-profile-close"
                  aria-label="Close description"
                  onClick={() => setProfileClosed(true)}
                >
                  <span aria-hidden>×</span>
                </button>
              </div>
            </div>
            <h2 className="galaxy-panel-title">{activeNode.label}</h2>
            {activeNode.summary && <p className="galaxy-panel-copy">{activeNode.summary}</p>}

            {activeNode.highlights.length > 0 && (
              <ul className="galaxy-profile-highlights">
                {activeNode.highlights.map((item) => (
                  <li key={typeof item === "string" ? item : item.title}>
                    {typeof item === "string" ? item : (
                      <><strong className="galaxy-item-title">{item.title}</strong><p>{item.description}</p></>
                    )}
                  </li>
                ))}
              </ul>
            )}

          </div>
        </aside>
      )}
      </main>
    </div>
  );
}

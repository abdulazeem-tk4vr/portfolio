import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createGalaxyScene, type GameState, type GalaxySceneHandle } from "../galaxy/scene";
import { galaxyNodes } from "../galaxy/nodes";
import "../galaxy/galaxy.css";

const TOTAL_NODES = galaxyNodes.filter((node) => !node.isCore).length;
const DEFAULT_TITLE = "Abdul Azeem Shaik | Software Engineer";
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

    let robotsMeta = document.querySelector('meta[name="robots"]');
    const createdMeta = !robotsMeta;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    const previousRobots = robotsMeta.getAttribute("content");
    robotsMeta.setAttribute("content", "noindex, nofollow");

    return () => {
      document.title = previousTitle || DEFAULT_TITLE;
      if (createdMeta && robotsMeta?.parentNode) {
        robotsMeta.parentNode.removeChild(robotsMeta);
      } else if (robotsMeta) {
        if (previousRobots) {
          robotsMeta.setAttribute("content", previousRobots);
        } else {
          robotsMeta.removeAttribute("content");
        }
      }
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
            Mapped <strong>{gameState.discovered.length}</strong> / {TOTAL_NODES}
          </div>
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
            Standard site (full info)
          </Link>
        </div>
      </header>

      {started && (
        <div className="galaxy-destroyed-hud" aria-live="polite">
          <span className="galaxy-destroyed-label">Destroyed</span>
          <span className="galaxy-destroyed-count" key={gameState.destroyed}>
            {gameState.destroyed}
          </span>
        </div>
      )}

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
              Fly through a 3D demo of the portfolio layout. Planets preview section names only —
              not a complete profile.
            </p>
            <p className="galaxy-info-notice" role="note">
              For all professional information (experience, projects, publications, skills, contact), visit the{" "}
              <Link to="/">standard site</Link>. Do not use Galaxy Mode as a source for résumé or profile data.
            </p>
            <ul className="galaxy-start-list">
              <li>Desktop: <strong>WASD</strong> or arrows to turn and thrust</li>
              <li><strong>Click + drag</strong> — drag up/down to climb, left/right to turn</li>
              <li><strong>Hold Spacebar</strong> — rapid-fire twin lasers</li>
              <li><strong>N</strong> or <strong>Next</strong> — warp to the next profile planet</li>
            </ul>
            <button type="button" className="galaxy-panel-cta galaxy-launch-btn" onClick={launch}>
              Launch starship
            </button>
          </div>
        </div>
      )}

      {started && (
        <>
          <div className="galaxy-hint">
            {gameState.navTarget
              ? `Auto-flying to ${gameState.navTarget.label}…`
              : gameState.inRange && activeNode && !isMapped
                ? `Scanning ${activeNode.label}…`
                : gameState.inRange && activeNode && isMapped
                  ? `${activeNode.label} mapped — N warps to next planet`
                  : activeNode
                    ? `Approaching ${activeNode.label} · hold Space to pew pew`
                    : "Blast asteroids & aliens · Hold Space · N for next planet"}
          </div>

          <div className="galaxy-controls" aria-label="Flight controls">
            <button
              type="button"
              className="galaxy-control-btn galaxy-control-fire"
              aria-label="Fire lasers"
              onPointerDown={() => setFiring(true)}
              onPointerUp={() => setFiring(false)}
              onPointerLeave={() => setFiring(false)}
            >
              Pew
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
            <p className="galaxy-panel-copy">{activeNode.summary}</p>

            {activeNode.highlights.length > 0 && (
              <ul className="galaxy-profile-highlights">
                {activeNode.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {activeNode.tags && activeNode.tags.length > 0 && (
              <div className="galaxy-profile-tags">
                {activeNode.tags.map((tag) => (
                  <span key={tag} className="galaxy-profile-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="galaxy-panel-actions">
              <p className="galaxy-rail-notice">
                Preview only — full details on the{" "}
                <Link to="/">standard site</Link>.
              </p>
              <a href={activeNode.href} className="galaxy-panel-cta">
                Open on standard site
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { PlayingCard, type CardSpec } from './cards';
import { Die } from './dice';
import { MahjongTile } from './mahjong';

/**
 * Lepeza na karticama igara (početna) koja sama "igra":
 * Peaks: stigne 4. karta, karte se spoje u špil, gornja odleti, lepeza se vrati.
 * Mahjong: stigne 4. pločica, dvije iste zasvijetle, spoje se i nestanu, pa se vrate.
 * Radi samo dok je na ekranu; "smanji pokrete" ostavlja mirnu lepezu. Hover i dalje širi lepezu (CSS varijable).
 */
function usePhase(count: number, stepMs: number) {
  const root = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting));
    if (root.current) io.observe(root.current);
    const iv = setInterval(() => {
      if (visible && document.visibilityState === 'visible') setPhase((p) => (p + 1) % count);
    }, stepMs);
    return () => {
      io.disconnect();
      clearInterval(iv);
    };
  }, [count, stepMs]);
  return { root, phase };
}

/** Položaj jedne karte u fazi: pomak (px), rotacija (°), skala, prozirnost, sjaj. */
type Pose = [x: number, y: number, rot: number, scale?: number, opacity?: number, glow?: boolean];

const poseStyle = ([x, y, rot, s = 1, o = 1]: Pose, z: number): CSSProperties =>
  ({ '--tx': `${x}px`, '--ty': `${y}px`, '--rot': `${rot}deg`, '--s': s, opacity: o, zIndex: z }) as CSSProperties;

// ─────────────────────────── Peaks ───────────────────────────

const CARDS: CardSpec[] = [
  { rank: 1, suit: 0 },
  { rank: 13, suit: 1 },
  { rank: 7, suit: 2 },
  { rank: 8, suit: 3 },
];
const HIDDEN_RIGHT: Pose = [46, -26, 40, 0.8, 0];
/** faze × karte (4. karta je zadnja) */
const CARD_PHASES: Pose[][] = [
  [[-8, 0, -14], [0, -2, 0], [8, 0, 14], HIDDEN_RIGHT],
  [[-14, 2, -22], [-5, -2, -7], [5, -2, 7], [15, 2, 22]], // dijeljenje 4. karte
  [[-14, 2, -22], [-5, -2, -7], [5, -2, 7], [15, 2, 22]],
  [[-2, 0, -3], [-1, 0, -1], [0, 0, 1], [1, -1, 3]], // spoje se u špil
  [[-2, 0, -3], [-1, 0, -1], [0, 0, 1], [6, -40, 18, 0.8, 0]], // gornja odleti
  [[-8, 0, -14], [0, -2, 0], [8, 0, 14], HIDDEN_RIGHT],
];

export function PeaksFan() {
  const { root, phase } = usePhase(CARD_PHASES.length, 900);
  const poses = CARD_PHASES[phase]!;
  return (
    <div ref={root} className="fan-anim relative h-16 w-24" aria-hidden>
      {CARDS.map((c, i) => (
        <PlayingCard
          key={i}
          card={c}
          className="absolute top-0 left-1/2 -ml-[1.3rem]"
          style={{ width: '2.6rem', height: '3.9rem', fontSize: '1.05rem', ...poseStyle(poses[i]!, i) }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────── Mahjong ───────────────────────────

/** 中, krugovi, cvijeće + 4. pločica 中 (par sa prvom) */
const TILES = [31, 2, 34, 31];
const TILE_PHASES: Pose[][] = [
  [[-22, 4, -12], [0, -2, 0], [22, 4, 12], [44, -30, 30, 0.7, 0]],
  [[-26, 4, -14], [-6, -2, -3], [14, 0, 8], [32, 4, 16]], // stigne 4. pločica
  [[-26, 0, -14, 1, 1, true], [-6, -2, -3], [14, 0, 8], [32, 0, 16, 1, 1, true]], // par zasvijetli
  [[3, -10, 0, 0.6, 0, true], [-12, 2, -6], [12, 2, 6], [3, -10, 0, 0.6, 0, true]], // spoje se i nestanu
  [[-22, 4, -12, 0.8, 0], [-11, 0, -4], [11, 0, 4], [44, -30, 30, 0.7, 0]],
  [[-22, 4, -12], [0, -2, 0], [22, 4, 12], [44, -30, 30, 0.7, 0]], // vrate se
];

export function MahjongFan() {
  const { root, phase } = usePhase(TILE_PHASES.length, 900);
  const poses = TILE_PHASES[phase]!;
  return (
    <div ref={root} className="fan-anim relative h-16 w-24 text-[2.3rem]" aria-hidden>
      {TILES.map((f, i) => (
        <div key={i} className="absolute top-0 left-1/2 -ml-[0.5em]" style={poseStyle(poses[i]!, i)}>
          <MahjongTile face={f} glow={poses[i]![5]} />
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────── FreeCell ───────────────────────────

/** 3 karte u nizu (8♠ 7♥ 6♣) + kuća: 6♣ ode gore desno u kuću, pa se vrati; niz se pomjeri ulijevo i nazad. */
const FC_CARDS: CardSpec[] = [
  { rank: 8, suit: 0 },
  { rank: 7, suit: 1 },
  { rank: 6, suit: 3 },
];
const FC_PHASES: Pose[][] = [
  [[-10, -6, -10], [0, 2, 0], [10, 10, 10]],
  [[-10, -6, -10], [0, 2, 0], [10, 10, 10, 1, 1, true]], // 6♣ zasvijetli
  [[-10, -6, -10], [0, 2, 0], [40, -34, 30, 0.7, 0]], // ode u kuću
  [[-16, -2, -16], [-4, 6, -6], [40, -34, 30, 0.7, 0]], // niz se pomjeri
  [[-10, -6, -10], [0, 2, 0], [30, 30, -20, 0.8, 0]],
  [[-10, -6, -10], [0, 2, 0], [10, 10, 10]], // vrati se
];

export function FreeCellFan() {
  const { root, phase } = usePhase(FC_PHASES.length, 900);
  const poses = FC_PHASES[phase]!;
  return (
    <div ref={root} className="fan-anim relative h-16 w-24" aria-hidden>
      {FC_CARDS.map((c, i) => (
        <PlayingCard
          key={i}
          card={c}
          glow={poses[i]![5]}
          className="absolute top-0 left-1/2 -ml-[1.3rem]"
          style={{ width: '2.6rem', height: '3.9rem', fontSize: '1.05rem', ...poseStyle(poses[i]!, i) }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────── Kockice ───────────────────────────

/** 3 kocke: bace se (okret), dvije koje boduju (1 i 5) se izdvoje gore, pa nova bacanja. */
const DICE_FACES = [
  [1, 3, 5],
  [6, 2, 4],
  [5, 5, 5],
  [1, 4, 1],
];
const DICE_PHASES: Pose[][] = [
  [[-22, 6, -10], [0, 0, 4], [22, 6, 12]],
  [[-26, 2, -170, 0.9], [0, -6, 190, 0.9], [26, 2, 150, 0.9]], // bacanje
  [[-22, 6, -6], [0, 0, 8], [22, 6, -4]],
  [[-22, -6, -6, 1, 1, true], [0, 4, 8], [22, -6, -4, 1, 1, true]], // izdvojene se podignu
];

export function DiceFan() {
  const { root, phase } = usePhase(DICE_PHASES.length * DICE_FACES.length, 750);
  const poses = DICE_PHASES[phase % DICE_PHASES.length]!;
  const faces = DICE_FACES[Math.floor(phase / DICE_PHASES.length) % DICE_FACES.length]!;
  return (
    <div ref={root} className="fan-anim fan-dice relative h-16 w-24" aria-hidden>
      {faces.map((f, i) => (
        <div key={i} className="absolute top-2 left-1/2 -ml-[1.2rem]" style={poseStyle(poses[i]!, i)}>
          <Die value={f} size="2.4rem" held={!!poses[i]![5]} />
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────── Spider ───────────────────────────

/** 4 karte: K♠ Q♠ J♠ 10♠ se slože u niz (lepeza), pa zajedno odlete gore desno u kuću i vrate se. */
const SP_CARDS: CardSpec[] = [
  { rank: 13, suit: 0 },
  { rank: 12, suit: 0 },
  { rank: 11, suit: 0 },
  { rank: 10, suit: 0 },
];
const SP_PHASES: Pose[][] = [
  [[-24, 4, -16], [-8, 0, -5], [8, 0, 5], [24, 4, 16]],
  [[-6, -6, -2], [-2, -2, 0], [2, 2, 0], [6, 6, 2, 1, 1, true]], // slože se u niz
  [[-6, -6, -2, 1, 1, true], [-2, -2, 0, 1, 1, true], [2, 2, 0, 1, 1, true], [6, 6, 2, 1, 1, true]], // niz svijetli
  [[40, -40, 30, 0.6, 0], [42, -38, 30, 0.6, 0], [44, -36, 30, 0.6, 0], [46, -34, 30, 0.6, 0]], // u kuću
  [[-24, 4, -16, 0.8, 0], [-8, 0, -5, 0.8, 0], [8, 0, 5, 0.8, 0], [24, 4, 16, 0.8, 0]],
  [[-24, 4, -16], [-8, 0, -5], [8, 0, 5], [24, 4, 16]], // vrate se
];

export function SpiderFan() {
  const { root, phase } = usePhase(SP_PHASES.length, 850);
  const poses = SP_PHASES[phase]!;
  return (
    <div ref={root} className="fan-anim relative h-16 w-24" aria-hidden>
      {SP_CARDS.map((c, i) => (
        <PlayingCard
          key={i}
          card={c}
          glow={poses[i]![5]}
          className="absolute top-0 left-1/2 -ml-[1.3rem]"
          style={{ width: '2.6rem', height: '3.9rem', fontSize: '1.05rem', ...poseStyle(poses[i]!, i) }}
        />
      ))}
    </div>
  );
}

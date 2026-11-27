import type { CSSProperties } from 'react';
import { PlayingCard, type CardSpec } from './cards';

/**
 * Spider sto (HTML/CSS) kao u igri: 10 kolona, karte licem dolje na dnu, gore otvoreni nizovi;
 * jedna kolona ima skoro gotov niz K–2 iste boje (zadnja karta svijetli), dole kuće i špil.
 */
const RATIO = 0.67;

/** Stalan raspored (ilustracija): [licem dolje, otvorene karte] po koloni; boje ♠ (0) i ♥ (1). */
const COLS: [number, CardSpec[]][] = [
  [4, [{ rank: 9, suit: 1 }, { rank: 8, suit: 0 }]],
  [3, [{ rank: 13, suit: 0 }, { rank: 12, suit: 0 }, { rank: 11, suit: 0 }, { rank: 10, suit: 0 }, { rank: 9, suit: 0 }, { rank: 8, suit: 0 }, { rank: 7, suit: 0 }]],
  [5, [{ rank: 4, suit: 1 }]],
  [4, [{ rank: 6, suit: 0 }, { rank: 5, suit: 0 }, { rank: 4, suit: 0 }, { rank: 3, suit: 0 }, { rank: 2, suit: 0 }]],
  [3, [{ rank: 12, suit: 1 }, { rank: 11, suit: 1 }]],
  [4, [{ rank: 3, suit: 1 }, { rank: 2, suit: 1 }]],
  [5, [{ rank: 10, suit: 1 }]],
  [2, [{ rank: 7, suit: 1 }, { rank: 6, suit: 1 }, { rank: 5, suit: 1 }]],
  [4, [{ rank: 1, suit: 0 }]],
  [3, [{ rank: 13, suit: 1 }]],
];

export function SpiderTable({ className = '' }: { className?: string }) {
  const W = 10;
  const cardH = 1 / RATIO;
  const down = 0.16;
  const open = 0.3;
  const colH = (c: (typeof COLS)[number]) => c[0] * down * cardH + (c[1].length - 1) * open * cardH + cardH;
  const H = Math.max(...COLS.map(colH)) + 0.3 + cardH * 0.7;
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  const box = (x: number, y: number, h = cardH): CSSProperties => ({ left: pct(x + 0.04, W), top: pct(y, H), width: pct(0.92, W), height: pct(h * 0.96, H), fontSize: `${(0.92 / W) * 40}cqw` });
  return (
    <div className={`@container relative w-full ${className}`} style={{ aspectRatio: `${W} / ${H}` }}>
      {COLS.flatMap(([hidden, cards], ci) => [
        ...Array.from({ length: hidden }, (_, k) => (
          <div key={`${ci}d${k}`} className="deal-card absolute" style={{ ...box(ci, k * down * cardH), zIndex: k + 1, '--delay': `${(k * 10 + ci) * 15}ms`, '--dx': '0', '--dy': '-3' } as CSSProperties}>
            <PlayingCard faceDown className="absolute inset-0" />
          </div>
        )),
        ...cards.map((card, k) => (
          <div
            key={`${ci}o${k}`}
            className="deal-card absolute"
            style={{ ...box(ci, hidden * down * cardH + k * open * cardH), zIndex: hidden + k + 1, '--delay': `${((hidden + k) * 10 + ci) * 15}ms`, '--dx': '0', '--dy': '-3' } as CSSProperties}
          >
            <PlayingCard card={card} className="absolute inset-0" glow={ci === 3 && k === cards.length - 1} />
          </div>
        )),
      ])}
      {/* kuće: dva završena niza, ostale prazne */}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={`h${i}`} className="absolute grid place-items-center rounded-[0.18em] border border-white/20 bg-white/5 text-white/30" style={{ ...box(i * 0.62, H - cardH * 0.62, 0.6), width: pct(0.55, W) }}>
          {i < 2 ? <PlayingCard card={{ rank: 13, suit: i }} className="absolute inset-0" /> : null}
        </div>
      ))}
      <div className="absolute" style={{ ...box(9, H - cardH * 0.62, 0.6), width: pct(0.55, W) }}>
        <PlayingCard faceDown className="absolute inset-0" />
      </div>
    </div>
  );
}

import type { CSSProperties } from 'react';
import { PlayingCard } from './cards';

type Item = { kind: 'card'; rank: number; suit: number } | { kind: 'symbol'; s: string };

/** Karte i simboli koji polako lebde iza naslova (samo ukras, bez teksta za čitače ekrana). */
const ITEMS: (Item & { left: string; top: string; size: number; r: number; t: number; delay: number; opacity: number })[] = [
  { kind: 'card', rank: 1, suit: 0, left: '4%', top: '12%', size: 3.2, r: -14, t: 8, delay: 0, opacity: 0.25 },
  { kind: 'card', rank: 13, suit: 1, left: '44%', top: '6%', size: 2.6, r: 12, t: 9, delay: 1.2, opacity: 0.2 },
  { kind: 'symbol', s: 's5', left: '88%', top: '8%', size: 2.4, r: 0, t: 7, delay: 0.6, opacity: 0.3 },
  { kind: 'card', rank: 7, suit: 2, left: '92%', top: '62%', size: 2.8, r: 18, t: 10, delay: 2, opacity: 0.2 },
  { kind: 'symbol', s: 's3', left: '36%', top: '78%', size: 2.2, r: 0, t: 8, delay: 0.3, opacity: 0.25 },
  { kind: 'card', rank: 12, suit: 3, left: '1%', top: '70%', size: 2.4, r: -8, t: 9, delay: 1.6, opacity: 0.18 },
  { kind: 'symbol', s: 's1', left: '62%', top: '88%', size: 2, r: 0, t: 6.5, delay: 2.4, opacity: 0.22 },
];

export function FloatingDeco() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {ITEMS.map((it, i) => {
        const style = { left: it.left, top: it.top, '--o': it.opacity, '--r': `${it.r}deg`, '--t': `${it.t}s`, '--delay': `${it.delay}s` } as CSSProperties;
        // vanjski: polako se nagne pri učitavanju; unutrašnji: lebdi
        return (
          <div key={i} className="tilt-in absolute" style={style}>
            <div className="float">
            {it.kind === 'card' ? (
              <PlayingCard card={{ rank: it.rank, suit: it.suit }} style={{ width: `${it.size}rem`, height: `${it.size / 0.67}rem`, fontSize: `${it.size * 0.42}rem` }} className="relative" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- ukras, statični SVG
              <img src={`/symbols/${it.s}.svg`} alt="" style={{ width: `${it.size * 1.2}rem`, height: `${it.size * 1.2}rem` }} />
            )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

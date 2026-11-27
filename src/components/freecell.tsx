import type { CSSProperties } from 'react';
import { PlayingCard, type CardSpec } from './cards';

/**
 * FreeCell sto (HTML/CSS, bez slika) kao u igri: gore 4 slobodne ćelije i 4 kuće, ispod 8 kolona.
 * Karte se "podijele" kad sto uđe u ekran (.reveal), a karta koja ide u kuću svijetli.
 */
const RATIO = 0.67;
const SUITS = ['♠', '♥', '♦', '♣'];

/** Ista "nasumična" podjela pri svakom učitavanju (ilustracija). */
function dealt(): CardSpec[][] {
  const deck = Array.from({ length: 52 }, (_, i) => i);
  let h = 7;
  for (let i = deck.length - 1; i > 0; i--) {
    h = (Math.imul(h, 1103515245) + 12345) >>> 0;
    const j = h % (i + 1);
    [deck[i], deck[j]] = [deck[j]!, deck[i]!];
  }
  const cols: CardSpec[][] = Array.from({ length: 8 }, () => []);
  // asovi su već u kućama (A♠, A♥), 9♦ je u ćeliji, 2♥ na vrhu kolone, ostalo po kolonama
  deck
    .filter((n) => n !== 0 && n !== 13 && n !== 14 && n !== 34)
    .forEach((n, i) => cols[i % 8]!.push({ rank: (n % 13) + 1, suit: Math.floor(n / 13) }));
  // vrh jedne kolone je 2♥: ide u kuću (svijetli)
  cols[3]!.push({ rank: 2, suit: 1 });
  return cols;
}

export function FreeCellTable({ className = '' }: { className?: string }) {
  const cols = dealt();
  const W = 8;
  const cardH = 1 / RATIO;
  const fan = 0.32;
  const maxLen = Math.max(...cols.map((c) => c.length));
  const colsY = cardH + 0.35;
  const H = colsY + (maxLen - 1) * fan * cardH + cardH;
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  const box = (x: number, y: number): CSSProperties => ({ left: pct(x + 0.03, W), top: pct(y, H), width: pct(0.94, W), height: pct(cardH * 0.96, H), fontSize: `${(0.94 / W) * 42}cqw` });
  const homes: (CardSpec | null)[] = [{ rank: 1, suit: 0 }, { rank: 1, suit: 1 }, null, null];

  return (
    <div className={`@container relative w-full ${className}`} style={{ aspectRatio: `${W} / ${H}` }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={`c${i}`} className="absolute grid place-items-center rounded-[0.18em] border border-white/25 bg-white/5" style={box(i, 0)}>
          {i === 1 ? <PlayingCard card={{ rank: 9, suit: 2 }} className="absolute inset-0" /> : <span className="text-[0.28em] font-bold tracking-wide text-white/30">FREE</span>}
        </div>
      ))}
      {homes.map((c, i) => (
        <div key={`h${i}`} className="absolute grid place-items-center rounded-[0.18em] border border-gold/40 bg-gold/5 text-[1.1em] text-white/35" style={box(4 + i, 0)}>
          {c ? <PlayingCard card={c} className="absolute inset-0" /> : SUITS[i]}
        </div>
      ))}
      {cols.flatMap((col, ci) =>
        col.map((card, k) => {
          const top = k === col.length - 1;
          return (
            <div
              key={`${ci}-${k}`}
              className="deal-card absolute"
              style={{ ...box(ci, colsY + k * fan * cardH), zIndex: k + 1, '--delay': `${(k * 8 + ci) * 18}ms`, '--dx': '0', '--dy': '-3' } as CSSProperties}
            >
              <PlayingCard card={card} className="absolute inset-0" glow={top && ci === 3} />
            </div>
          );
        }),
      )}
    </div>
  );
}

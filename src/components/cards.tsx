import type { CSSProperties } from 'react';

/**
 * Karte i mali stolovi za ilustracije (HTML/CSS, bez slika). Rasporedi su isti kao u igri:
 * TriPeaks (tri vrha), Golf (7 kolona × 5), Piramida (7 redova). Karta je široka 1, visoka 1/0.67 jedinica.
 */
const RATIO = 0.67;
const SUITS = ['♠', '♥', '♦', '♣'] as const;
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;

export type Variant = 'tripeaks' | 'golf' | 'pyramid';

/** Karta: rang 1..13, boja 0..3 (♠ ♥ ♦ ♣). */
export interface CardSpec {
  rank: number;
  suit: number;
}

export function PlayingCard({ card, faceDown, dim, glow, className = '', style }: { card?: CardSpec; faceDown?: boolean; dim?: boolean; glow?: boolean; className?: string; style?: CSSProperties }) {
  if (faceDown || !card)
    return (
      <div className={`rounded-[0.18em] border border-white/30 bg-[repeating-linear-gradient(45deg,#2b4a8c_0_0.18em,#22396a_0.18em_0.36em)] shadow-md ${className}`} style={style} aria-hidden />
    );
  const red = card.suit === 1 || card.suit === 2;
  return (
    <div
      className={`flex flex-col rounded-[0.18em] border border-black/15 bg-white px-[0.12em] py-[0.06em] font-bold leading-none shadow-md ${red ? 'text-[#d12b2b]' : 'text-[#1b1f2a]'} ${glow ? 'glow-pulse' : ''} ${className}`}
      style={style}
      aria-hidden
    >
      <span className="text-[0.9em]">{RANKS[card.rank - 1]}</span>
      <span className="text-[0.75em]">{SUITS[card.suit]}</span>
      <span className="mt-auto self-end text-[1.35em]">{SUITS[card.suit]}</span>
      {dim && <span className="absolute inset-0 rounded-[0.18em] bg-black/35" />}
    </div>
  );
}

interface Tile {
  x: number;
  y: number;
  z: number;
  faceUp: boolean;
  free: boolean;
}

function tilesFor(variant: Variant): Tile[] {
  const t: Tile[] = [];
  if (variant === 'golf') {
    for (let col = 0; col < 7; col++) for (let r = 0; r < 5; r++) t.push({ x: col, y: r * 0.5, z: r, faceUp: true, free: r === 4 });
  } else if (variant === 'pyramid') {
    for (let r = 0; r < 7; r++) for (let i = 0; i <= r; i++) t.push({ x: (6 - r) * 0.5 + i, y: r * 0.5, z: r, faceUp: true, free: r === 6 });
  } else {
    // tri vrha: 3 + 6 + 9 + 10
    const rows: number[][] = [
      [1.5, 4.5, 7.5],
      [1, 2, 4, 5, 7, 8],
      [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ];
    rows.forEach((xs, r) => xs.forEach((x) => t.push({ x, y: r * 0.5, z: r, faceUp: r === 3, free: r === 3 })));
  }
  return t;
}

/** Ista "nasumična" karta za isto mjesto (ilustracija se ne mijenja između učitavanja). */
function cardAt(i: number, salt: number): CardSpec {
  const h = Math.imul(i + 1, 2654435761) ^ Math.imul(salt, 40503);
  const n = (h >>> 0) % 52;
  return { rank: (n % 13) + 1, suit: Math.floor(n / 13) };
}

/**
 * Mali sto načina igre sa špilom i odlagalištem. Karte se "podijele" kad sto uđe u ekran (.reveal),
 * a potez koji se može odigrati svijetli (TriPeaks/Golf: karta ±1 od odlagališta; Piramida: par sa zbirom 13).
 */
export function MiniTable({ variant, className = '' }: { variant: Variant; className?: string }) {
  const tiles = tilesFor(variant);
  const cols = Math.max(...tiles.map((t) => t.x)) + 1;
  const rows = Math.max(...tiles.map((t) => t.y)) + 1;
  const cardH = 1 / RATIO;
  const height = rows * cardH + 0.35 + cardH; // sto + razmak + red sa špilom i odlagalištem
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  const salt = variant === 'golf' ? 7 : variant === 'pyramid' ? 13 : 3;

  // karte koje "svijetle" (ispravan potez) i karta na odlagalištu
  const free = tiles.map((t, i) => ({ t, i })).filter((x) => x.t.free);
  const pile: CardSpec = variant === 'golf' ? { rank: 9, suit: 3 } : variant === 'pyramid' ? { rank: 4, suit: 0 } : { rank: 5, suit: 2 };
  const special = new Map<number, CardSpec>();
  if (variant === 'pyramid') {
    special.set(free[2]!.i, { rank: 6, suit: 1 });
    special.set(free[3]!.i, { rank: 7, suit: 3 });
    special.set(free[5]!.i, { rank: 13, suit: 0 });
  } else special.set(free[Math.floor(free.length / 2)]!.i, variant === 'golf' ? { rank: 10, suit: 1 } : { rank: 6, suit: 0 });

  const deckX = cols / 2 - 1.3;
  const pileX = cols / 2 + 0.3;
  const bottomY = rows * cardH + 0.35;

  return (
    <div className={`@container relative w-full ${className}`} style={{ aspectRatio: `${cols} / ${height}` }}>
      {tiles.map((t, i) => {
        const card = special.get(i) ?? cardAt(i, salt);
        const style: CSSProperties & Record<string, string | number> = {
          left: pct(t.x, cols),
          top: pct(t.y * cardH, height),
          width: pct(0.94, cols),
          height: pct(cardH * 0.96, height),
          zIndex: t.z * 10,
          fontSize: `${(0.94 / cols) * 42}cqw`,
          '--delay': `${i * 28}ms`,
          '--dx': (deckX - t.x).toFixed(2),
          '--dy': ((bottomY - t.y * cardH) / cardH).toFixed(2),
        };
        return (
          <PlayingCard
            key={i}
            card={card}
            faceDown={!t.faceUp}
            dim={variant !== 'tripeaks' && !t.free}
            glow={special.has(i)}
            className="deal-card absolute"
            style={style}
          />
        );
      })}
      <PlayingCard faceDown className="absolute" style={{ left: pct(deckX, cols), top: pct(bottomY, height), width: pct(1, cols), height: pct(cardH, height), fontSize: `${(1 / cols) * 42}cqw` }} />
      <PlayingCard
        card={pile}
        className="absolute"
        style={{ left: pct(pileX, cols), top: pct(bottomY, height), width: pct(1, cols), height: pct(cardH, height), fontSize: `${(1 / cols) * 42}cqw` }}
      />
    </div>
  );
}

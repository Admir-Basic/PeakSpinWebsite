import type { CSSProperties } from 'react';

/**
 * Mahjong pločice i mali sto (HTML/CSS, bez slika), isti simboli kao u aplikaciji:
 * krugovi, bambusi i znakovi 1–9, vjetrovi, zmajevi, cvijeće, godišnja doba (pločica 0–41).
 */
const RATIO = 0.74;
const CH_NUM = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
const WINDS = ['東', '南', '西', '北'];
const FLOWERS = ['🌸', '🌼', '🌺', '🌻'];
const SEASONS = ['🌱', '☀️', '🍂', '❄️'];
const ROWS: Record<number, number[]> = { 1: [1], 2: [1, 1], 3: [1, 1, 1], 4: [2, 2], 5: [2, 1, 2], 6: [2, 2, 2], 7: [3, 1, 3], 8: [3, 2, 3], 9: [3, 3, 3] };
const DOT = ['#1e5aa8', '#c62828', '#2e7d32'];

function Symbol({ face }: { face: number }) {
  if (face < 18) {
    const n = (face % 9) + 1;
    const dots = face < 9;
    return (
      <div className="flex flex-col items-center justify-center gap-[0.04em]">
        {ROWS[n]!.map((count, r) => (
          <div key={r} className="flex gap-[0.05em]">
            {Array.from({ length: count }, (_, i) =>
              dots ? (
                <span
                  key={i}
                  className="block rounded-full"
                  style={{ width: n === 1 ? '0.6em' : '0.24em', height: n === 1 ? '0.6em' : '0.24em', border: `0.05em solid ${DOT[(r + i) % 3]}`, background: n === 1 ? '#c62828' : '#fff' }}
                />
              ) : (
                <span key={i} className="block rounded-full" style={{ width: '0.09em', height: '0.3em', background: n === 1 || (n >= 5 && r === 1) ? '#c62828' : '#2e7d32' }} />
              ),
            )}
          </div>
        ))}
      </div>
    );
  }
  if (face < 27)
    return (
      <div className="flex flex-col items-center font-black leading-[0.9]">
        <span className="text-[0.42em] text-[#13315c]">{CH_NUM[face - 18]}</span>
        <span className="text-[0.42em] text-[#c62828]">萬</span>
      </div>
    );
  if (face < 31) return <span className="text-[0.62em] font-black text-[#13315c]">{WINDS[face - 27]}</span>;
  if (face === 31) return <span className="text-[0.62em] font-black text-[#c62828]">中</span>;
  if (face === 32) return <span className="text-[0.62em] font-black text-[#2e7d32]">發</span>;
  if (face === 33) return <span className="block h-[0.6em] w-[0.45em] rounded-[0.05em] border-[0.06em] border-[#1e5aa8]" />;
  return <span className="text-[0.5em]">{face < 38 ? FLOWERS[face - 34] : SEASONS[face - 38]}</span>;
}

/** Jedna pločica (slonovača sa debljinom desno i dole). Veličina se zadaje preko font-size (širina = 1em). */
export function MahjongTile({ face, glow, dim, className = '', style }: { face: number; glow?: boolean; dim?: boolean; className?: string; style?: CSSProperties }) {
  return (
    <div className={`relative rounded-[0.12em] bg-[#b59a62] shadow-md ${glow ? 'glow-pulse' : ''} ${className}`} style={{ width: '1em', height: `${1 / RATIO}em`, ...style }} aria-hidden>
      <div className="absolute top-0 left-0 grid place-items-center rounded-[0.1em] border border-[#e2d6b8] bg-[#fbf5e6]" style={{ width: '0.9em', height: `${1 / RATIO - 0.1}em` }}>
        <Symbol face={face} />
      </div>
      {dim && <span className="absolute inset-0 rounded-[0.12em] bg-black/30" />}
    </div>
  );
}

/** Ista "nasumična" pločica za isto mjesto (ilustracija se ne mijenja između učitavanja). */
const faceAt = (i: number) => ((Math.imul(i + 3, 2654435761) >>> 0) % 34) as number;

/**
 * "Toranj" kao u aplikaciji (72 pločice, 4 sloja + uši), slojevi pomaknuti gore lijevo.
 * Pločice se "podijele" kad sto uđe u ekran, a jedan slobodan par svijetli.
 */
export function MahjongTable({ className = '' }: { className?: string }) {
  const tiles: { x: number; y: number; z: number }[] = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 8; c++) tiles.push({ x: c + 1, y: r, z: 0 });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) tiles.push({ x: c + 2, y: r + 1, z: 1 });
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) tiles.push({ x: c + 3, y: r + 1.5, z: 2 });
  tiles.push({ x: 4, y: 2, z: 3 }, { x: 5, y: 2, z: 3 }, { x: 0, y: 1.5, z: 0 }, { x: 0, y: 2.5, z: 0 }, { x: 9, y: 1.5, z: 0 }, { x: 9, y: 2.5, z: 0 });
  const h = 1 / RATIO;
  const depth = 0.1;
  const W = 10 + 0.3;
  const H = 5 * h + 0.3;
  // svijetle: lijeva uha i vrh (slobodne pločice) sa istim simbolom
  const pair = new Map<number, number>([
    [tiles.length - 4, 31],
    [tiles.length - 6, 31],
  ]);
  const covered = (i: number) => tiles.some((o) => o.z > tiles[i]!.z && Math.abs(o.x - tiles[i]!.x) < 1 && Math.abs(o.y - tiles[i]!.y) < 1);
  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: `${W} / ${H}` }}>
      {tiles
        .map((t, i) => ({ t, i }))
        .sort((a, b) => a.t.z - b.t.z)
        .map(({ t, i }) => (
          <div
            key={i}
            className="deal-card absolute"
            style={
              {
                left: `${((t.x + 0.3 - t.z * depth) / W) * 100}%`,
                top: `${((t.y * h + 0.3 - t.z * depth) / H) * 100}%`,
                width: `${(1 / W) * 100}%`,
                zIndex: t.z * 100 + i,
                containerType: 'inline-size',
                '--delay': `${(t.z * 12 + (i % 12)) * 30}ms`,
                '--dx': '0',
                '--dy': '-2',
              } as CSSProperties
            }
          >
            <MahjongTile face={pair.get(i) ?? faceAt(i)} glow={pair.has(i)} dim={covered(i)} style={{ fontSize: '100cqw' }} />
          </div>
        ))}
    </div>
  );
}

/** Pregled svih vrsta pločica (stranica igre). */
export const TILE_GROUPS: { faces: number[]; key: 'dots' | 'bamboo' | 'chars' | 'winds' | 'dragons' | 'flowers' | 'seasons' }[] = [
  { key: 'dots', faces: [0, 2, 4, 8] },
  { key: 'bamboo', faces: [10, 13, 15, 17] },
  { key: 'chars', faces: [18, 20, 23, 26] },
  { key: 'winds', faces: [27, 28, 29, 30] },
  { key: 'dragons', faces: [31, 32, 33] },
  { key: 'flowers', faces: [34, 35, 36, 37] },
  { key: 'seasons', faces: [38, 39, 40, 41] },
];

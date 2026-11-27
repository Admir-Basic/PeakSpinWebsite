'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Simboli kao u aplikaciji (emoji dok ne stignu pravi crteži). */
/** PeakSpin crteži simbola (isti kao u aplikaciji: app/scripts/gen-symbols.ts → public/symbols). */
const SYMBOLS = ['s1', 's2', 's3', 's4', 's5', 's6'];
const N = SYMBOLS.length;
const STRIP = N * 12;
/** rolne staju jedna za drugom */
const DURATIONS = [900, 1100, 1300, 1500, 1700];

export interface ReelLabels {
  spin: string;
  again: string;
  hold: string;
  /** "dodirni rolnu da je zadržiš" */
  holdHint: string;
  roll: string;
  combos: { yamb: string; poker: string; full: string; three: string; straight: string; pair: string; none: string };
}

/** Kombinacija i bodovi (trenutna default pravila igre). */
function score(values: number[], L: ReelLabels['combos']): { name: string; points: number } {
  const counts = new Map<number, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  const c = [...counts.values()].sort((a, b) => b - a);
  if (c[0] === 5) return { name: L.yamb, points: 250_000 };
  if (c[0] === 4) return { name: L.poker, points: 150_000 };
  if (c[0] === 3 && c[1] === 2) return { name: L.full, points: 80_000 };
  if (c[0] === 3) return { name: L.three, points: 100_000 };
  if (c.length === 5) return { name: L.straight, points: 60_000 };
  if (c[0] === 2) return { name: L.pair, points: 30_000 };
  return { name: L.none, points: 0 };
}

/**
 * Pet rolni koje se stvarno vrte (CSS transition). Kao u igri: 3 vrtnje, dodir na rolnu je zadrži.
 * `compact` + `autoPlay`: mala verzija na početnoj, vrti sama dok je na ekranu.
 */
export function Reels({ labels, compact = false, autoPlay = false }: { labels: ReelLabels; compact?: boolean; autoPlay?: boolean }) {
  // offset = koliko je simbola traka prešla (stalno raste dok se ne vrati u prvi krug)
  const [offsets, setOffsets] = useState([0, 1, 2, 3, 4]);
  const [instant, setInstant] = useState(false);
  const [held, setHeld] = useState([false, false, false, false, false]);
  const [roll, setRoll] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{ name: string; points: number; key: number } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const spin = useCallback(() => {
    if (spinning) return;
    const next = roll >= 3 ? 1 : roll + 1;
    const keep = roll >= 3 ? [false, false, false, false, false] : held;
    if (roll >= 3) setHeld(keep);
    setRoll(next);
    setSpinning(true);
    setResult(null);
    setInstant(false);
    const target = offsets.map((o, i) => (keep[i] ? o : o + N * (3 + i) + Math.floor(Math.random() * N)));
    setOffsets(target);
    timer.current = setTimeout(() => {
      setSpinning(false);
      // traka se vrati u prvi krug bez animacije (isti simbol)
      setInstant(true);
      setOffsets(target.map((o) => o % N));
      setResult({ ...score(target.map((o) => o % N), labels.combos), key: Date.now() });
    }, DURATIONS[4]! + 80);
  }, [spinning, roll, held, offsets, labels.combos]);

  useEffect(() => () => clearTimeout(timer.current), []);

  // mala verzija: vrti sama svakih nekoliko sekundi dok je vidljiva (ne kad je uključeno "smanji pokrete")
  useEffect(() => {
    if (!autoPlay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting));
    if (root.current) io.observe(root.current);
    const iv = setInterval(() => visible && document.visibilityState === 'visible' && spin(), 3600);
    return () => {
      io.disconnect();
      clearInterval(iv);
    };
  }, [autoPlay, spin]);

  const toggle = (i: number) => {
    if (compact || spinning || roll === 0 || roll >= 3) return;
    setHeld((h) => h.map((x, j) => (j === i ? !x : x)));
  };

  const h = compact ? '2.6rem' : 'clamp(3.2rem, 11vw, 5rem)';
  // mala verzija je unutar linka: bez dugmadi (dugme u linku nije ispravan HTML)
  const Cell = compact ? 'div' : 'button';
  return (
    <div ref={root} className="grid gap-3">
      <div className="relative flex justify-center gap-[2%] rounded-2xl bg-black/35 p-[3%] shadow-inner">
        {offsets.map((o, i) => (
          <Cell
            key={i}
            {...(compact ? { 'aria-hidden': true } : { type: 'button' as const, onClick: () => toggle(i), 'aria-label': `${labels.hold} ${i + 1}` })}
            className={`relative w-[18%] overflow-hidden rounded-xl bg-gradient-to-b from-[#fdf6ff] to-[#e3d2f5] ring-[3px] transition ${held[i] ? 'ring-gold' : 'ring-transparent'}`}
            style={{ height: h }}
          >
            <div
              className="absolute inset-x-0 top-0"
              style={{
                transform: `translateY(calc(${-o} * ${h}))`,
                transition: instant ? 'none' : `transform ${DURATIONS[i]}ms cubic-bezier(0.15, 0.85, 0.25, 1.02)`,
              }}
            >
              {Array.from({ length: STRIP }, (_, k) => (
                <div key={k} className="flex items-center justify-center" style={{ height: h }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- statični export, SVG bez optimizacije */}
                  <img src={`/symbols/${SYMBOLS[k % N]}.svg`} alt="" draggable={false} style={{ width: `calc(${h} * 0.72)`, height: `calc(${h} * 0.72)` }} />
                </div>
              ))}
            </div>
            {held[i] && <span className="absolute inset-x-0 bottom-0 bg-gold py-0.5 text-[10px] font-bold text-black uppercase">{labels.hold}</span>}
          </Cell>
        ))}
        {result && result.points > 0 && (
          <span key={result.key} className="pop pointer-events-none absolute -top-3 rounded-full bg-gold px-3 py-1 text-sm font-extrabold text-black shadow-lg">
            {result.name} +{result.points.toLocaleString('de-DE')}
          </span>
        )}
      </div>
      {!compact && (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={spin}
            disabled={spinning}
            className="rounded-xl bg-gold px-5 py-2.5 font-extrabold text-black shadow-lg shadow-gold/20 transition hover:scale-105 active:scale-95 disabled:opacity-60"
          >
            {roll >= 3 ? labels.again : labels.spin}
          </button>
          <span className="text-sm text-white/70">
            {labels.roll} {Math.min(Math.max(roll, 1), 3)}/3{roll > 0 && roll < 3 ? ` · ${labels.holdHint}` : ''}
          </span>
          {result && <span className="text-sm font-semibold text-spin">{result.points > 0 ? `${result.name}: ${result.points.toLocaleString('de-DE')}` : result.name}</span>}
        </div>
      )}
    </div>
  );
}

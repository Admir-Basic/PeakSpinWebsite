'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

/** Tačkice na kocki (3 × 3): koje su upaljene za 1–6. Isto kao u aplikaciji. */
const PIPS: Record<number, number[]> = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };

/** Kocka (HTML/CSS): slonovača, 1 i 4 imaju crvene tačkice; `held` = izdvojena (zlatni okvir). */
export function Die({ value, size = '3rem', held = false, rolling = false, style }: { value: number; size?: string; held?: boolean; rolling?: boolean; style?: CSSProperties }) {
  const red = value === 1 || value === 4;
  return (
    <span
      className={`grid shrink-0 grid-cols-3 grid-rows-3 rounded-[22%] border bg-[#fbf7ee] p-[12%] shadow-lg shadow-black/40 transition-transform duration-300 ${held ? 'border-[3px] border-gold bg-[#fff6d6] -translate-y-1' : 'border-[#d9cdb4]'} ${rolling ? 'die-roll' : ''}`}
      style={{ width: size, height: size, ...style }}
      aria-label={String(value)}
    >
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className="grid place-items-center">
          {PIPS[value]!.includes(i) && <span className={`block size-[70%] rounded-full ${red ? 'bg-[#d32f2f]' : 'bg-[#1b1b1b]'}`} />}
        </span>
      ))}
    </span>
  );
}

/** Stalna "nasumična" bacanja (ilustracija), da se server i klijent slažu. */
const ROLLS = [
  [1, 5, 3, 3, 3, 2],
  [6, 4, 1, 2, 5, 6],
  [2, 2, 4, 4, 6, 6],
  [1, 1, 1, 5, 2, 3],
  [5, 3, 6, 2, 4, 1],
];
/** koje kocke boduju u svakom bacanju (izdvoje se) */
const HELD = [
  [0, 1, 2, 3, 4],
  [2, 4],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3],
  [0, 1, 2, 3, 4, 5],
];

/**
 * Sto sa kockama (stranica Kockica): svako malo novo bacanje, kocke koje boduju se izdvoje.
 * Radi samo dok je na ekranu; "smanji pokrete" ostavlja mirnu sliku.
 */
export function DiceTable({ label }: { label: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [rolling, setRolling] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting));
    if (root.current) io.observe(root.current);
    const iv = setInterval(() => {
      if (!visible || document.visibilityState !== 'visible') return;
      setRolling(true);
      setTimeout(() => {
        setI((n) => (n + 1) % ROLLS.length);
        setRolling(false);
      }, 450);
    }, 2600);
    return () => {
      io.disconnect();
      clearInterval(iv);
    };
  }, []);
  return (
    <div ref={root} className="grid place-items-center gap-5 py-6">
      <div className="grid grid-cols-3 gap-4 sm:gap-5">
        {ROLLS[i]!.map((v, k) => (
          <Die key={k} value={v} size="clamp(3rem, 12vw, 4.5rem)" held={!rolling && HELD[i]!.includes(k)} rolling={rolling} style={{ animationDelay: `${k * 40}ms` }} />
        ))}
      </div>
      <p className="text-sm font-semibold text-white/70">{label}</p>
    </div>
  );
}

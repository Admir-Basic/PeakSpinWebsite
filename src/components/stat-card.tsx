'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

/**
 * Brojka na početnoj: broji od nule kad uđe u ekran; na hover se kartica podigne, ikonica poskoči
 * i broj zasvijetli. "Smanji pokrete": odmah konačan broj.
 */
export function StatCard({ value, label, icon, style }: { value: number; label: string; icon: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || value === 0) return;
    setShown(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - start) / 900);
        setShown(Math.round(value * (1 - (1 - k) ** 3)));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div
      ref={ref}
      className="reveal stat group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center transition duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-white/[0.08] hover:shadow-[0_18px_40px_-14px] hover:shadow-gold/40"
      style={style}
    >
      <div className="text-2xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-125 group-hover:-rotate-12" aria-hidden>
        {icon}
      </div>
      <div className="stat-num mt-1 text-5xl font-extrabold text-gold tabular-nums transition-transform duration-300 group-hover:scale-110">{shown}</div>
      <div className="mt-2 text-base font-semibold text-white/80">{label}</div>
    </div>
  );
}

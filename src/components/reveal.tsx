'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Jedan observer za cijelu stranicu: svaki element sa klasom `reveal` dobije `in` kad uđe u ekran
 * (CSS u globals.css radi animaciju). Bez JavaScripta `<noscript>` stil u layoutu sve pokaže odmah.
 */
export function RevealObserver() {
  const path = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}

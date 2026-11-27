/**
 * Vodiči kampanja (isti likovi kao u aplikaciji, `app/src/components/GuideArt.tsx`), kao SVG u kutiji 100 × 100.
 * Oči trepću (CSS `blink`), lik lebdi (`bob`).
 */
const INK = '#2b2118';

function Face({ x, y, gap = 13, eye = 6, mouthY = 14, cheeks }: { x: number; y: number; gap?: number; eye?: number; mouthY?: number; cheeks?: string }) {
  const l = x - gap / 2 - 2;
  const r = x + gap / 2 + 2;
  return (
    <g>
      {cheeks && (
        <>
          <circle cx={x - gap - 3} cy={y + 9} r={4.5} fill={cheeks} opacity={0.55} />
          <circle cx={x + gap + 3} cy={y + 9} r={4.5} fill={cheeks} opacity={0.55} />
        </>
      )}
      <g className="guide-blink" style={{ transformOrigin: `${x}px ${y}px` }}>
        <circle cx={l} cy={y} r={eye} fill="#fff" />
        <circle cx={r} cy={y} r={eye} fill="#fff" />
        <circle cx={l + 0.8} cy={y + 0.8} r={eye * 0.55} fill={INK} />
        <circle cx={r + 0.8} cy={y + 0.8} r={eye * 0.55} fill={INK} />
        <circle cx={l + 1.6} cy={y - 0.8} r={eye * 0.18} fill="#fff" />
        <circle cx={r + 1.6} cy={y - 0.8} r={eye * 0.18} fill="#fff" />
      </g>
      <path d={`M${x - 5} ${y + mouthY - 1} Q${x} ${y + mouthY + 4} ${x + 5} ${y + mouthY - 1}`} stroke="#7a2e2e" strokeWidth={2.2} fill="none" strokeLinecap="round" />
    </g>
  );
}

const ART: Record<string, React.ReactNode> = {
  kazaljka: (
    <g>
      <circle cx={50} cy={9} r={6} stroke="#c8961e" strokeWidth={4} fill="none" />
      <circle cx={50} cy={52} r={41} fill="#c8961e" />
      <circle cx={50} cy={52} r={36} fill="#e8b93a" />
      <circle cx={50} cy={52} r={31} fill="#f7eed5" />
      <g opacity={0.35} transform="rotate(20 50 50)">
        <path d="M50 18 L57 50 L43 50 Z" fill="#d23b3b" />
        <path d="M50 82 L57 50 L43 50 Z" fill="#8a8f99" />
      </g>
      <Face x={50} y={47} cheeks="#f08a7a" mouthY={15} />
    </g>
  ),
  'majstor-zad': (
    <g>
      <rect x={22} y={30} width={56} height={60} rx={24} fill="#2f8f6a" />
      <circle cx={50} cy={50} r={22} fill="#f2d4a8" />
      <path d="M14 34 Q50 4 86 34 Q50 26 14 34 Z" fill="#1f5f47" />
      <circle cx={50} cy={16} r={4} fill="#e8b93a" />
      <Face x={50} y={49} gap={12} eye={5} mouthY={12} />
      <path d="M31 40 Q38 35 45 40 M55 40 Q62 35 69 40" stroke="#fff" strokeWidth={3} strokeLinecap="round" fill="none" />
      <path d="M33 62 Q50 98 67 62 Q58 70 50 68 Q42 70 33 62 Z" fill="#f4f1ea" />
      <circle cx={50} cy={84} r={5} fill="#8fe0b8" />
    </g>
  ),
  'kapetanica-bura': (
    <g>
      <path d="M24 52 Q20 80 30 90 L36 60 Z M76 52 Q80 80 70 90 L64 60 Z" fill="#c2452d" />
      <circle cx={50} cy={56} r={27} fill="#f3c9a0" />
      <path d="M18 40 Q50 8 82 40 L78 46 Q50 38 22 46 Z" fill="#1d2f57" />
      <rect x={20} y={40} width={60} height={7} rx={3.5} fill="#f4f4f4" />
      <circle cx={50} cy={27} r={6} fill="#e8b93a" />
      <path d="M50 23 L50 31 M46 27 L54 27" stroke="#1d2f57" strokeWidth={1.8} />
      <Face x={50} y={57} gap={13} eye={5.5} mouthY={12} cheeks="#e9826b" />
    </g>
  ),
  pletilja: (
    <g>
      <path
        d="M30 52 Q14 40 8 28 M29 58 Q10 56 4 48 M30 64 Q12 70 6 80 M33 70 Q20 84 18 94 M70 52 Q86 40 92 28 M71 58 Q90 56 96 48 M70 64 Q88 70 94 80 M67 70 Q80 84 82 94"
        stroke="#4b3478"
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={50} cy={62} r={26} fill="#6f52a8" />
      <circle cx={50} cy={36} r={18} fill="#7d60b6" />
      <Face x={50} y={60} gap={14} eye={6} mouthY={13} cheeks="#f29bc3" />
      <circle cx={41} cy={60} r={9} stroke="#f0c75e" strokeWidth={2.5} fill="none" />
      <circle cx={59} cy={60} r={9} stroke="#f0c75e" strokeWidth={2.5} fill="none" />
    </g>
  ),
  kocko: (
    <g transform="rotate(-7 50 54)">
      <rect x={16} y={22} width={68} height={68} rx={14} fill="#d9d4c3" />
      <rect x={14} y={18} width={68} height={68} rx={14} fill="#fbf8ef" />
      <circle cx={26} cy={30} r={4.5} fill="#d23b3b" />
      <circle cx={70} cy={30} r={4.5} fill={INK} />
      <circle cx={26} cy={74} r={4.5} fill={INK} />
      <circle cx={70} cy={74} r={4.5} fill={INK} />
      <Face x={48} y={48} gap={12} eye={5.5} mouthY={13} cheeks="#f2a08f" />
    </g>
  ),
  zmajko: (
    <g>
      <path d="M50 4 L80 40 L50 40 Z" fill="#f472b6" />
      <path d="M50 4 L20 40 L50 40 Z" fill="#ec4899" />
      <path d="M20 40 L50 78 L50 40 Z" fill="#facc15" />
      <path d="M80 40 L50 78 L50 40 Z" fill="#fbbf24" />
      <path d="M50 4 L50 78 M20 40 L80 40 M50 78 Q40 84 46 90 Q54 94 48 99" stroke="#7c4a1e" strokeWidth={2} fill="none" />
      <path d="M42 82 L49 85.5 L42 89 Z M56 82 L49 85.5 L56 89 Z" fill="#38bdf8" />
      <Face x={50} y={38} gap={12} eye={5.5} mouthY={12} cheeks="#fb7185" />
    </g>
  ),
};

/** Nacrtan vodič (SVG). */
export function Guide({ id, size = 96 }: { id: string; size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className="bob" aria-hidden>
      {ART[id] ?? ART.kazaljka}
    </svg>
  );
}

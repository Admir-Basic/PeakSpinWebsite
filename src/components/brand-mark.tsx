/**
 * Znak PeakSpina bez pozadine ikonice (isti crtež kao `public/logo.svg` iz `pnpm gen:icons` u ../app,
 * samo bez zaobljenog kvadrata). Znak stoji mirno, a dijelovi se animiraju zasebno (CSS u `globals.css`):
 * zlatni luk se povremeno zavrti oko centra (`mark-spin`), zeleni i ljubičasti vrh se naizmjenično dižu (`mark-left`, `mark-right`).
 * Bočni vrhovi su puni trouglovi, a tamni obrub bijelog vrha nije odsječen po njihovom obliku, pa se smiju pomjerati.
 * Svaki dio je u svom `<g>` sa animacijom izvan skaliranja, pa su pomaci i centar okretanja u koordinatama viewBoxa.
 */
const T = 'translate(71.68 92.32) scale(0.86)';

export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="150 120 740 720" className={className} role="img" aria-label="PeakSpin">
      <defs>
        <linearGradient id="mark-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffcc33" />
          <stop offset="1" stopColor="#f0a500" />
        </linearGradient>
      </defs>
      <g className="mark-spin">
        <g transform={T}>
          <path d="M226 665 A330 330 0 1 1 837 557" fill="none" stroke="url(#mark-gold)" strokeWidth={50} strokeLinecap="round" />
          <polygon points="886,562 792,544 826,628" fill="url(#mark-gold)" stroke="url(#mark-gold)" strokeWidth={22} strokeLinejoin="round" />
        </g>
      </g>
      <g className="mark-left">
        <g transform={T}>
          <polygon points="196,796 360,474 524,796" fill="#7fe0a8" stroke="#7fe0a8" strokeWidth={28} strokeLinejoin="round" />
        </g>
      </g>
      <g className="mark-right">
        <g transform={T}>
          <polygon points="500,796 664,474 828,796" fill="#c3a2ee" stroke="#c3a2ee" strokeWidth={28} strokeLinejoin="round" />
        </g>
      </g>
      <g transform={T}>
        <polygon points="316,796 512,300 708,796" fill="none" stroke="#0a0f1e" strokeWidth={64} strokeLinejoin="round" />
        <polygon points="316,796 512,300 708,796" fill="#ffffff" stroke="#ffffff" strokeWidth={28} strokeLinejoin="round" />
      </g>
    </svg>
  );
}

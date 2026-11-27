/**
 * Vrhko (en: Peaky), maskota PeakSpina, kao SVG (isti crtež kao `app/src/components/Mascot.tsx`):
 * bijeli vrh iz znaka, zeleni i ljubičasti vrh iza, zlatni luk kao šal sa strelicom.
 * Oči trepću (`guide-blink`), desna ručica maše (`vrhko-wave`), lik lebdi (`bob`). Bez JavaScripta.
 */
export type MascotPose = 'wave' | 'talk' | 'celebrate' | 'sad';

const GREEN = '#7fe0a8';
const PURPLE = '#c3a2ee';
const NAVY = '#22396a';
const INK = '#1d2340';

/** ugao ruke (0 = desno, 90 = gore) */
const ARMS: Record<MascotPose, [number, number]> = { wave: [215, 62], talk: [205, 25], celebrate: [128, 52], sad: [250, -70] };

function Arm({ x, y, angle, color, wave }: { x: number; y: number; angle: number; color: string; wave?: boolean }) {
  return (
    <g transform={`rotate(${-angle} ${x} ${y})`}>
      <g className={wave ? 'vrhko-wave' : undefined} style={wave ? { transformOrigin: `${x}px ${y}px` } : undefined}>
        <line x1={x} y1={y} x2={x + 66} y2={y} stroke="#e3eaff" strokeWidth={22} strokeLinecap="round" />
        <circle cx={x + 66} cy={y} r={15} fill={color} stroke="#fff" strokeWidth={3} />
      </g>
    </g>
  );
}

function Face({ pose }: { pose: MascotPose }) {
  const sad = pose === 'sad';
  const look = pose === 'talk' ? 3 : 0;
  return (
    <g transform="translate(0 22)">
      <circle cx={150} cy={264} r={11} fill="#ff8f9a" opacity={0.55} />
      <circle cx={250} cy={264} r={11} fill="#ff8f9a" opacity={0.55} />
      {pose === 'celebrate' ? (
        <path d="M160 232 Q175 216 190 232 M210 232 Q225 216 240 232" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
      ) : (
        <g className="guide-blink" style={{ transformOrigin: '200px 232px' }}>
          <circle cx={175} cy={sad ? 234 : 232} r={sad ? 15 : 17} fill="#fff" />
          <circle cx={225} cy={sad ? 234 : 232} r={sad ? 15 : 17} fill="#fff" />
          <circle cx={177 + look} cy={sad ? 239 : 234} r={sad ? 8.5 : 10} fill={INK} />
          <circle cx={227 + look} cy={sad ? 239 : 234} r={sad ? 8.5 : 10} fill={INK} />
          <circle cx={180 + look} cy={229} r={3.5} fill="#fff" />
          <circle cx={230 + look} cy={229} r={3.5} fill="#fff" />
        </g>
      )}
      {sad && <path d="M156 220 L188 210 M244 220 L212 210" stroke={INK} strokeWidth={5} strokeLinecap="round" />}
      {pose === 'celebrate' && (
        <>
          <path d="M176 264 Q200 298 224 264 Z" fill="#7a2e2e" />
          <ellipse cx={200} cy={280} rx={12} ry={4} fill="#ef6f6f" />
        </>
      )}
      {sad && <path d="M184 282 Q200 268 216 282" stroke="#7a2e2e" strokeWidth={6} fill="none" strokeLinecap="round" />}
      {pose === 'wave' && <path d="M182 266 Q200 284 218 266" stroke="#7a2e2e" strokeWidth={6} fill="none" strokeLinecap="round" />}
      {pose === 'talk' && (
        <>
          <ellipse cx={200} cy={274} rx={13} ry={11} fill="#7a2e2e" />
          <ellipse cx={200} cy={279} rx={8} ry={4} fill="#ef6f6f" />
        </>
      )}
    </g>
  );
}

/** Nacrtan Vrhko (SVG, kutija 400 × 400). */
export function Mascot({ pose = 'wave', size = 160, className = '' }: { pose?: MascotPose; size?: number; className?: string }) {
  const [la, ra] = ARMS[pose];
  const id = `vrhko-${pose}`;
  return (
    <svg viewBox="0 0 400 400" width={size} height={size} className={`bob ${className}`} role="img" aria-label="Vrhko">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dfe7ff" />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffcc33" />
          <stop offset="1" stopColor="#f0a500" />
        </linearGradient>
      </defs>
      <ellipse cx={200} cy={372} rx={120} ry={12} fill="#000" opacity={0.25} />
      <path d="M30 352 L112 196 Q120 184 128 196 L206 352 Z" fill={GREEN} />
      <path d="M194 352 L272 196 Q280 184 288 196 L370 352 Z" fill={PURPLE} />
      <path d="M112 196 Q120 184 128 196 L142 224 Q120 214 98 224 Z" fill="#fff" opacity={0.85} />
      <path d="M272 196 Q280 184 288 196 L302 224 Q280 214 258 224 Z" fill="#fff" opacity={0.85} />
      <Arm x={104} y={272} angle={la} color={GREEN} />
      <Arm x={296} y={272} angle={ra} color={PURPLE} wave={pose === 'wave'} />
      <path
        d="M200 66 C214 66 222 78 229 92 L318 286 C332 318 312 346 280 346 L120 346 C88 346 68 318 82 286 L171 92 C178 78 186 66 200 66 Z"
        fill={`url(#${id}-body)`}
        stroke="#c8d4f5"
        strokeWidth={3}
      />
      <path d="M229 92 L318 286 C332 318 312 346 280 346 L250 346 C286 300 262 180 229 92 Z" fill="#9fb3e8" opacity={0.28} />
      <path d="M171 92 C178 78 186 66 200 66 C214 66 222 78 229 92 L246 130 Q232 120 222 132 Q211 118 200 132 Q189 118 178 132 Q168 120 154 130 Z" fill="#fff" />
      <ellipse cx={160} cy={350} rx={28} ry={13} fill={NAVY} />
      <ellipse cx={240} cy={350} rx={28} ry={13} fill={NAVY} />
      <Face pose={pose} />
      <path d="M128 190 Q200 222 272 190" stroke={`url(#${id}-gold)`} strokeWidth={20} fill="none" strokeLinecap="round" />
      <path d="M264 196 Q310 182 334 144" stroke={`url(#${id}-gold)`} strokeWidth={16} fill="none" strokeLinecap="round" />
      <polygon points="350,120 318,138 344,156" fill={`url(#${id}-gold)`} stroke="#f0a500" strokeWidth={6} strokeLinejoin="round" />
    </svg>
  );
}

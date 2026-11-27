/**
 * Početna adresa `/`: jezik po browseru (bs za bs/hr/sr, inače en).
 * Statični export je `out/index.html`, pa radi na svakom hostingu; bez JavaScripta vodi na /bs/ (meta refresh).
 */
import Link from 'next/link';

const PICK_LANG = `location.replace(['bs','hr','sr','sh'].indexOf((navigator.language||'bs').slice(0,2).toLowerCase())>=0?'/bs/':'/en/')`;

export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="1; url=/bs/" />
      <script dangerouslySetInnerHTML={{ __html: PICK_LANG }} />
      <p>
        <Link href="/bs/" style={{ color: '#ffcc33' }}>
          PeakSpin (bosanski)
        </Link>{' '}
        ·{' '}
        <Link href="/en/" style={{ color: '#ffcc33' }}>
          PeakSpin (English)
        </Link>
      </p>
    </>
  );
}

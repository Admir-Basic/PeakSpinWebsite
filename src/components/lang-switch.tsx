'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** Prebaci jezik i ostani na istoj stranici (/bs/peaks/ → /en/peaks/). */
export function LangSwitch({ lang, other }: { lang: string; other: string }) {
  const path = usePathname() ?? `/${lang}/`;
  const href = path.startsWith(`/${lang}/`) ? `/${other}/${path.slice(lang.length + 2)}` : `/${other}/`;
  return (
    <Link className="rounded-md border border-white/20 px-2.5 py-1 font-semibold hover:bg-white/10 hover:text-white" href={href} hrefLang={other}>
      {other.toUpperCase()}
    </Link>
  );
}

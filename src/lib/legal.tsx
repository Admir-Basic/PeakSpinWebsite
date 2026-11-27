import type { ReactNode } from 'react';
import { dict } from './dict';
import { site, type Lang } from './site';

/** Okvir za pravne stranice (naslov, datum izmjene, tekst). */
export function LegalPage({ lang, title, children }: { lang: Lang; title: string; children: ReactNode }) {
  return (
    <article className="legal mx-auto max-w-3xl px-4 pt-8 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-white/50">
        {dict[lang].updated}: {site.updated}
      </p>
      {children}
    </article>
  );
}

export const Mail = () => <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>;

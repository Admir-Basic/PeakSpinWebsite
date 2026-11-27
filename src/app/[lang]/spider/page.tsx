import type { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { FloatingDeco } from '@/components/deco';
import { SpiderTable } from '@/components/spider';
import { StoreButtons } from '@/components/store-buttons';
import { dict } from '@/lib/dict';
import { games } from '@/lib/games';
import { isLang } from '@/lib/site';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export async function generateMetadata({ params }: PageProps<'/[lang]/spider'>): Promise<Metadata> {
  const { lang } = await params;
  const g = games[isLang(lang) ? lang : 'bs'].spider;
  return { title: g.title, description: `${g.tagline} ${g.intro}`, alternates: { languages: { bs: '/bs/spider/', en: '/en/spider/' } } };
}

/** Spider: sto, tok igre, bodovanje i načini igre. */
export default async function SpiderPage({ params }: PageProps<'/[lang]/spider'>) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : 'bs';
  const d = dict[lang];
  const all = games[lang];
  const g = all.spider;

  return (
    <>
      <section className="relative isolate">
        <FloatingDeco />
        <div className="mx-auto max-w-5xl px-4 pt-8 pb-10 sm:px-6">
          <Link href={`/${lang}/`} className="text-sm text-white/60 transition hover:text-white">
            ← {all.back}
          </Link>
          <div className="reveal in mt-4 grid items-center gap-8 md:grid-cols-[1fr_1.2fr]">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight">
                <span className="text-spider">{g.title}</span>
              </h1>
              <p className="mt-3 text-xl font-semibold text-white/90">{g.tagline}</p>
              <p className="mt-4 max-w-xl text-white/75">{g.intro}</p>
              <StoreButtons getOn={d.getOn} soon={d.soon} />
            </div>
            <div className="reveal rounded-3xl bg-gradient-to-br from-[#1f5a40] to-[#081a12] p-5 shadow-2xl shadow-black/50" style={delay(150)}>
              <SpiderTable />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="reveal mb-6 text-3xl font-bold">{all.howTo}</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {g.steps.map(([n, title, text], i) => (
            <li key={n} className="reveal lift rounded-2xl border border-white/10 bg-white/[0.04] p-5" style={delay(i * 100)}>
              <span className="grid size-10 place-items-center rounded-full bg-spider/20 text-lg font-extrabold text-spider">{n}</span>
              <h3 className="mt-3 text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-white/70">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <div className="reveal grid gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-bold">{g.scoringTitle}</h2>
            <table className="mt-4 w-full text-left">
              <tbody>
                {g.scoring.map(([what, pts]) => (
                  <tr key={what} className="border-b border-white/10 last:border-0">
                    <td className="py-2 font-bold">{what}</td>
                    <td className="py-2 text-right text-gold">{pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="grid content-center gap-3">
            {g.scoringNotes.map((n, i) => (
              <li key={n} className="reveal flex gap-3 rounded-xl bg-black/25 p-3 text-white/85" style={delay(i * 100)}>
                <span className="text-xl" aria-hidden>
                  {['✖️', '⚠️', '🎉'][i]}
                </span>
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <h2 className="reveal mb-5 text-2xl font-bold">{all.ways}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {g.waysList.map(([icon, title, text], i) => (
            <div key={title} className="reveal lift rounded-2xl border border-white/10 bg-white/[0.04] p-5" style={delay((i % 2) * 100)}>
              <div className="bob inline-block text-3xl" style={{ animationDelay: `${i * 0.4}s` }} aria-hidden>
                {icon}
              </div>
              <h3 className="mt-2 text-lg font-bold">{title}</h3>
              <p className="mt-1 text-white/70">{text}</p>
            </div>
          ))}
        </div>
        <div className="reveal mt-10 flex flex-wrap justify-center gap-3">
          <Link href={`/${lang}/mahjong/`} className="inline-flex items-center gap-2 rounded-xl border border-mahjong/40 px-5 py-3 font-bold text-mahjong transition hover:gap-3 hover:bg-mahjong/10">
            {all.mahjong.title} →
          </Link>
          <Link href={`/${lang}/peaks/`} className="inline-flex items-center gap-2 rounded-xl border border-peaks/40 px-5 py-3 font-bold text-peaks transition hover:gap-3 hover:bg-peaks/10">
            {all.peaks.title} →
          </Link>
          <Link href={`/${lang}/spin-yamb/`} className="inline-flex items-center gap-2 rounded-xl border border-spin/40 px-5 py-3 font-bold text-spin transition hover:gap-3 hover:bg-spin/10">
            {all.spin.title} →
          </Link>
        </div>
      </section>
    </>
  );
}

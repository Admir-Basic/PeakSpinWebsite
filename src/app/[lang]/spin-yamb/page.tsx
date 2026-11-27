import type { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { FloatingDeco } from '@/components/deco';
import { Reels } from '@/components/reels';
import { StoreButtons } from '@/components/store-buttons';
import { CampaignSection } from '@/components/campaign-section';
import { dict } from '@/lib/dict';
import { games } from '@/lib/games';
import { isLang } from '@/lib/site';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export async function generateMetadata({ params }: PageProps<'/[lang]/spin-yamb'>): Promise<Metadata> {
  const { lang } = await params;
  const g = games[isLang(lang) ? lang : 'bs'].spin;
  return { title: g.title, description: `${g.tagline} ${g.intro}`, alternates: { languages: { bs: '/bs/spin-yamb/', en: '/en/spin-yamb/' } } };
}

/** Spin Yamb: rolne koje se mogu probati, tok runde, kombinacije i načini igre. */
export default async function SpinYambPage({ params }: PageProps<'/[lang]/spin-yamb'>) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : 'bs';
  const d = dict[lang];
  const all = games[lang];
  const g = all.spin;

  return (
    <>
      <section className="relative isolate">
        <FloatingDeco />
        <div className="mx-auto max-w-5xl px-4 pt-8 pb-10 sm:px-6">
          <Link href={`/${lang}/`} className="text-sm text-white/60 transition hover:text-white">
            ← {all.back}
          </Link>
          <div className="reveal in mt-4 grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight">
                <span className="text-spin">{g.title}</span>
              </h1>
              <p className="mt-3 text-xl font-semibold text-white/90">{g.tagline}</p>
              <p className="mt-4 max-w-xl text-white/75">{g.intro}</p>
              <StoreButtons getOn={d.getOn} soon={d.soon} />
            </div>
            <div className="reveal rounded-3xl bg-gradient-to-br from-[#7a3ea8] to-[#2e1747] p-5 shadow-2xl shadow-black/50" style={delay(150)}>
              <h2 className="text-lg font-extrabold">✨ {g.tryIt}</h2>
              <p className="mt-1 mb-4 text-sm text-white/75">{g.tryText}</p>
              <Reels labels={all.reels} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="reveal mb-6 text-3xl font-bold">{all.howTo}</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {g.steps.map(([n, title, text], i) => (
            <li key={n} className="reveal lift rounded-2xl border border-white/10 bg-white/[0.04] p-5" style={delay(i * 100)}>
              <span className="grid size-10 place-items-center rounded-full bg-spin/20 text-lg font-extrabold text-spin">{n}</span>
              <h3 className="mt-3 text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-white/70">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <div className="reveal rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-bold">{g.combosTitle}</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {g.combos.map(([name, what, pts], i) => (
              <div key={name} className="reveal flex items-center justify-between gap-3 rounded-xl bg-black/25 px-4 py-3 transition hover:bg-black/40" style={delay(i * 60)}>
                <div>
                  <div className="font-bold">{name}</div>
                  <div className="text-sm text-white/60">{what}</div>
                </div>
                <div className="font-extrabold text-gold">{pts}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CampaignSection game="spinyamb" lang={lang} accent="#c3a2ee" />

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
          <Link href={`/${lang}/freecell/`} className="inline-flex items-center gap-2 rounded-xl border border-freecell/40 px-5 py-3 font-bold text-freecell transition hover:gap-3 hover:bg-freecell/10">
            {games[lang].freecell.title} →
          </Link>
          <Link href={`/${lang}/mahjong/`} className="inline-flex items-center gap-2 rounded-xl border border-mahjong/40 px-5 py-3 font-bold text-mahjong transition hover:gap-3 hover:bg-mahjong/10">
            {games[lang].mahjong.title} →
          </Link>
          <Link href={`/${lang}/peaks/`} className="inline-flex items-center gap-2 rounded-xl border border-peaks/40 px-5 py-3 font-bold text-peaks transition hover:gap-3 hover:bg-peaks/10">
            {games[lang].peaks.title} →
          </Link>
        </div>
      </section>
    </>
  );
}

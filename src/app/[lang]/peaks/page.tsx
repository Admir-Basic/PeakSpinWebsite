import type { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { MiniTable, type Variant } from '@/components/cards';
import { FloatingDeco } from '@/components/deco';
import { StoreButtons } from '@/components/store-buttons';
import { CampaignSection } from '@/components/campaign-section';
import { dict } from '@/lib/dict';
import { games } from '@/lib/games';
import { isLang } from '@/lib/site';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export async function generateMetadata({ params }: PageProps<'/[lang]/peaks'>): Promise<Metadata> {
  const { lang } = await params;
  const g = games[isLang(lang) ? lang : 'bs'].peaks;
  return { title: g.title, description: `${g.tagline} ${g.intro}`, alternates: { languages: { bs: '/bs/peaks/', en: '/en/peaks/' } } };
}

/** Peaks: tri načina sa malim stolom (karte se dijele kad sto uđe u ekran), bodovanje i načini igre. */
export default async function PeaksPage({ params }: PageProps<'/[lang]/peaks'>) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : 'bs';
  const d = dict[lang];
  const all = games[lang];
  const g = all.peaks;

  return (
    <>
      <section className="relative isolate">
        <FloatingDeco />
        <div className="mx-auto max-w-5xl px-4 pt-8 pb-10 sm:px-6">
          <Link href={`/${lang}/`} className="text-sm text-white/60 transition hover:text-white">
            ← {all.back}
          </Link>
          <div className="reveal in mt-4 grid items-center gap-8 md:grid-cols-[1.1fr_1fr]">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight">
                <span className="text-peaks">{g.title}</span>
              </h1>
              <p className="mt-3 text-xl font-semibold text-white/90">{g.tagline}</p>
              <p className="mt-4 max-w-xl text-white/75">{g.intro}</p>
              <StoreButtons getOn={d.getOn} soon={d.soon} />
            </div>
            <div className="reveal rounded-3xl bg-gradient-to-br from-[#2e7d5b] to-[#0f3d2c] p-5 shadow-2xl shadow-black/50" style={delay(150)}>
              <MiniTable variant="pyramid" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="reveal mb-6 text-3xl font-bold">{all.howTo}</h2>
        <div className="grid gap-8">
          {g.modes.map((m, i) => (
            <article key={m.id} className={`reveal grid items-center gap-6 md:grid-cols-2 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div className="rounded-3xl bg-gradient-to-br from-[#1f6b4c] to-[#0c2f22] p-5 shadow-xl shadow-black/40">
                <MiniTable variant={m.id as Variant} />
              </div>
              <div>
                <span className="rounded-full bg-peaks/15 px-3 py-1 text-xs font-bold tracking-wide text-peaks uppercase">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-2xl font-extrabold">{m.name}</h3>
                <p className="mt-2 text-white/80">{m.text}</p>
                <ul className="mt-4 space-y-1.5">
                  {m.tips.map((t) => (
                    <li key={t} className="flex gap-2 text-white/80">
                      <span className="text-gold">★</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <div className="reveal grid gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-bold">{g.scoringTitle}</h2>
            <table className="mt-4 w-full text-left">
              <tbody>
                {g.scoring.map(([card, pts]) => (
                  <tr key={card} className="border-b border-white/10 last:border-0">
                    <td className="py-2 font-bold">{card}</td>
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
        <h2 className="reveal text-2xl font-bold">{g.obstaclesTitle}</h2>
        <p className="reveal mt-2 max-w-2xl text-white/65">{g.obstaclesNote}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {g.obstacles.map(([icon, title, text], i) => (
            <div key={title} className="reveal lift group rounded-2xl border border-white/10 bg-white/[0.04] p-4" style={delay((i % 4) * 80)}>
              <div className="grid size-12 place-items-center rounded-xl bg-black/30 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" aria-hidden>
                {icon}
              </div>
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-1 text-sm text-white/70">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <CampaignSection game="peaks" lang={lang} accent="#7fe0a8" />

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
          <Link href={`/${lang}/spin-yamb/`} className="inline-flex items-center gap-2 rounded-xl border border-spin/40 px-5 py-3 font-bold text-spin transition hover:gap-3 hover:bg-spin/10">
            {games[lang].spin.title} →
          </Link>
        </div>
      </section>
    </>
  );
}

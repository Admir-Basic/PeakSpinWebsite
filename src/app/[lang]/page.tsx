import Link from 'next/link';
import type { CSSProperties } from 'react';
import { FloatingDeco } from '@/components/deco';
import { DiceFan, FreeCellFan, MahjongFan, PeaksFan, SpiderFan } from '@/components/autoplay';
import { BrandMark } from '@/components/brand-mark';
import { Mascot } from '@/components/mascot';
import { Reels } from '@/components/reels';
import { StatCard } from '@/components/stat-card';
import { StoreButtons } from '@/components/store-buttons';
import { dict } from '@/lib/dict';
import { games } from '@/lib/games';
import { isLang } from '@/lib/site';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : 'bs';
  const d = dict[lang];
  const g = games[lang];
  // "Dvije igre. Jedan izazov." → drugi dio svjetluca
  const [first, ...rest] = d.heroTitle.split(/(?<=\.)\s/);

  return (
    <>
      <section className="relative isolate">
        <FloatingDeco />
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 md:grid-cols-[1.2fr_1fr] md:pt-16">
          <div className="reveal in">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {first} {rest.length > 0 && <span className="shimmer">{rest.join(' ')}</span>}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/75">{d.heroText}</p>
            <StoreButtons getOn={d.getOn} soon={d.soon} />
          </div>
          <div className="relative flex justify-center pb-24 sm:pb-28">
            {/* znak bez kvadrata ikonice stoji mirno (dijelovi mu se miču sami), a zlatni sjaj se vrti iza njega */}
            <div className="relative">
              <div className="halo absolute inset-4 rounded-full bg-[conic-gradient(from_0deg,#ffcc3300,#ffcc3355,#7fe0a833,#c3a2ee44,#ffcc3300)] blur-2xl" aria-hidden />
              <BrandMark className="relative w-56 drop-shadow-[0_18px_30px_#000a] sm:w-72" />
            </div>
            {/* Vrhko šeta ispred znaka (odvojeno od njega): ode lijevo, skakuće, vrati se, pa skoči od radosti */}
            <div className="vrhko-stroll absolute right-2 bottom-0 sm:-right-4">
              {/* oblačić ide sa Vrhkom (ne skakuće i ne vrti se sa njim), a dok šeta ispod znaka sakrije se */}
              <div className="vrhko-say absolute -top-14 right-0 z-10">
                <div className="pop-in relative w-max max-w-40 rounded-2xl bg-white px-3 py-2 text-sm font-bold text-[#1d2340] shadow-lg" style={{ animationDelay: '0.8s' }}>
                  {d.mascotHello}
                  <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 bg-white" aria-hidden />
                </div>
              </div>
              <div className="vrhko-hop">
                <Mascot size={130} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {d.stats.map(([n, label, icon], i) => (
            <StatCard key={label} value={Number(n)} label={label} icon={icon} style={delay(i * 90)} />
          ))}
        </div>

        <h2 className="reveal mb-5 text-2xl font-bold">{d.games}</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Link href={`/${lang}/peaks/`} className="reveal group relative block hover:z-10" style={delay(0)}>
            <article className="lift shine h-full rounded-3xl bg-gradient-to-br from-[#2e7d5b] to-[#0f3d2c] p-6 shadow-xl shadow-black/40">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-extrabold">{d.peaksTitle}</h3>
                <PeaksFan />
              </div>
              <p className="mt-3 text-white/85">{d.peaksText}</p>
              <ul className="mt-4 space-y-1.5">
                {d.peaksPoints.map((p) => (
                  <li key={p} className="flex gap-2 text-white/85">
                    <span className="text-peaks">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 font-bold text-peaks transition group-hover:gap-2">{g.more} →</span>
            </article>
          </Link>

          <Link href={`/${lang}/mahjong/`} className="reveal group relative block hover:z-10" style={delay(120)}>
            <article className="lift shine h-full rounded-3xl bg-gradient-to-br from-[#a8452a] to-[#3a140a] p-6 shadow-xl shadow-black/40">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-extrabold">{d.mahjongTitle}</h3>
                <MahjongFan />
              </div>
              <p className="mt-3 text-white/85">{d.mahjongText}</p>
              <ul className="mt-4 space-y-1.5">
                {d.mahjongPoints.map((p) => (
                  <li key={p} className="flex gap-2 text-white/85">
                    <span className="text-mahjong">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 font-bold text-mahjong transition group-hover:gap-2">{g.more} →</span>
            </article>
          </Link>

          <Link href={`/${lang}/freecell/`} className="reveal group relative block hover:z-10" style={delay(180)}>
            <article className="lift shine h-full rounded-3xl bg-gradient-to-br from-[#2f6fb3] to-[#0c2442] p-6 shadow-xl shadow-black/40">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-extrabold">{d.freecellTitle}</h3>
                <FreeCellFan />
              </div>
              <p className="mt-3 text-white/85">{d.freecellText}</p>
              <ul className="mt-4 space-y-1.5">
                {d.freecellPoints.map((p) => (
                  <li key={p} className="flex gap-2 text-white/85">
                    <span className="text-freecell">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 font-bold text-freecell transition group-hover:gap-2">{g.more} →</span>
            </article>
          </Link>

          <Link href={`/${lang}/spider/`} className="reveal group relative block hover:z-10" style={delay(195)}>
            <article className="lift shine h-full rounded-3xl bg-gradient-to-br from-[#3f8f6b] to-[#0c2a1d] p-6 shadow-xl shadow-black/40">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-extrabold">{d.spiderTitle}</h3>
                <SpiderFan />
              </div>
              <p className="mt-3 text-white/85">{d.spiderText}</p>
              <ul className="mt-4 space-y-1.5">
                {d.spiderPoints.map((p) => (
                  <li key={p} className="flex gap-2 text-white/85">
                    <span className="text-spider">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 font-bold text-spider transition group-hover:gap-2">{g.more} →</span>
            </article>
          </Link>

          <Link href={`/${lang}/kockice/`} className="reveal group relative block hover:z-10" style={delay(210)}>
            <article className="lift shine h-full rounded-3xl bg-gradient-to-br from-[#c77a26] to-[#3d1f07] p-6 shadow-xl shadow-black/40">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-extrabold">{d.kockiceTitle}</h3>
                <DiceFan />
              </div>
              <p className="mt-3 text-white/85">{d.kockiceText}</p>
              <ul className="mt-4 space-y-1.5">
                {d.kockicePoints.map((p) => (
                  <li key={p} className="flex gap-2 text-white/85">
                    <span className="text-kockice">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 font-bold text-kockice transition group-hover:gap-2">{g.more} →</span>
            </article>
          </Link>

          <Link href={`/${lang}/spin-yamb/`} className="reveal group relative block hover:z-10" style={delay(240)}>
            <article className="lift shine h-full rounded-3xl bg-gradient-to-br from-[#7a3ea8] to-[#2e1747] p-6 shadow-xl shadow-black/40">
              <h3 className="text-2xl font-extrabold">{d.spinTitle}</h3>
              <div className="mt-3">
                <Reels labels={g.reels} compact autoPlay />
              </div>
              <p className="mt-3 text-white/85">{d.spinText}</p>
              <ul className="mt-4 space-y-1.5">
                {d.spinPoints.map((p) => (
                  <li key={p} className="flex gap-2 text-white/85">
                    <span className="text-spin">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 font-bold text-spin transition group-hover:gap-2">{g.more} →</span>
            </article>
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-5xl px-4 sm:px-6">
        <div className="reveal grid items-center gap-6 rounded-3xl border border-gold/25 bg-gradient-to-br from-[#22396a] to-[#0f1830] p-6 md:grid-cols-[1fr_1.3fr]">
          <div className="flex items-end justify-center gap-1">
            {(['wave', 'talk', 'celebrate'] as const).map((p, i) => (
              <figure key={p} className="flex flex-col items-center">
                <Mascot pose={p} size={i === 1 ? 130 : 104} />
                <figcaption className="text-xs font-semibold text-white/60">{d.mascotPoses[i]}</figcaption>
              </figure>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {d.mascotTitle} <span aria-hidden>👋</span>
            </h2>
            <p className="mt-3 text-white/80">{d.mascotText}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-5xl px-4 sm:px-6">
        <h2 className="reveal mb-5 text-2xl font-bold">{d.features}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {d.featureList.map(([icon, title, text], i) => (
            <div
              key={title}
              className="reveal group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-gold/40 hover:bg-white/[0.07]"
              style={delay((i % 3) * 90)}
            >
              <div className="text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" aria-hidden>
                {icon}
              </div>
              <h3 className="mt-2 font-bold">{title}</h3>
              <p className="mt-1 text-sm text-white/70">{text}</p>
            </div>
          ))}
        </div>
        <p className="reveal mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-sm text-white/80">{d.noMoney}</p>
      </section>
    </>
  );
}

import type { CSSProperties } from 'react';
import { Guide } from '@/components/guides';
import { campaignLabels, campaigns, type CampaignGame } from '@/lib/campaigns';
import type { Lang } from '@/lib/site';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/** Sekcija "Kampanja i priča" na stranici igre: vodič (nacrtan kao u aplikaciji), priča i poglavlja kao staza. */
export function CampaignSection({ game, lang, accent }: { game: CampaignGame; lang: Lang; accent: string }) {
  const c = campaigns[lang][game];
  const t = campaignLabels[lang];
  return (
    <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
      <div className="reveal grid gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center gap-2 md:w-44">
          <div className="grid size-32 place-items-center rounded-full border-4 bg-black/30" style={{ borderColor: accent }}>
            <Guide id={c.guideId} size={104} />
          </div>
          <div className="text-xs tracking-widest text-white/50 uppercase">{t.guide}</div>
          <div className="text-lg font-bold" style={{ color: accent }}>
            {c.guide}
          </div>
          <p className="text-center text-sm text-white/70 italic">„{c.quote}“</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{t.title}</h2>
          <p className="mt-1 font-semibold" style={{ color: accent }}>
            {t.levels(c.levels, c.chapters.length)}
          </p>
          <p className="mt-3 text-white/80">{c.story}</p>
          <ol className="mt-5 flex flex-wrap items-center gap-2">
            {c.chapters.map((ch, i) => (
              <li key={ch} className="reveal flex items-center gap-2" style={delay(i * 90)}>
                <span className="rounded-full border px-3 py-1 text-sm font-semibold" style={{ borderColor: `${accent}66`, background: `${accent}14` }}>
                  <span className="mr-1.5 text-white/50">{i + 1}</span>
                  {ch}
                </span>
                {i < c.chapters.length - 1 && (
                  <span className="text-white/30" aria-hidden>
                    ⋯
                  </span>
                )}
              </li>
            ))}
            <li className="text-xl" aria-hidden>
              🏆
            </li>
          </ol>
          <p className="mt-4 text-sm text-white/60">{t.how}</p>
        </div>
      </div>
    </section>
  );
}

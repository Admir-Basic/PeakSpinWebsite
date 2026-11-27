import type { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ContactForm } from '@/components/contact-form';
import { FloatingDeco } from '@/components/deco';
import { contact } from '@/lib/contact';
import { isLang, site, type Lang } from '@/lib/site';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export async function generateMetadata({ params }: PageProps<'/[lang]/contact'>): Promise<Metadata> {
  const { lang } = await params;
  const t = contact[isLang(lang) ? lang : 'bs'];
  return { title: t.title, description: `${t.tagline} ${t.intro}`, alternates: { languages: { bs: '/bs/contact/', en: '/en/contact/' } } };
}

/** Kontakt: forma (šalje na backend, poruke su u dashboardu) i savjeti sa strane. */
export default async function ContactPage({ params }: PageProps<'/[lang]/contact'>) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : 'bs';
  const t = contact[lang];

  return (
    <section className="relative isolate">
      <FloatingDeco />
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-6 sm:px-6">
        <div className="reveal in">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className="shimmer">{t.title}</span>
          </h1>
          <p className="mt-3 text-xl font-semibold text-white/90">{t.tagline}</p>
          <p className="mt-2 max-w-2xl text-white/70">{t.intro}</p>
        </div>

        <div className="mt-8 grid items-start gap-6 md:grid-cols-[1.5fr_1fr]">
          <div className="reveal relative rounded-3xl border border-white/10 bg-gradient-to-br from-navy to-night p-5 shadow-2xl shadow-black/50 sm:p-7" style={delay(100)}>
            <div className="pointer-events-none absolute -top-px right-10 left-10 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" aria-hidden />
            <ContactForm t={t} lang={lang} apiUrl={site.apiUrl} email={site.contactEmail} />
          </div>

          <aside className="grid gap-3">
            {t.side.map(([icon, title, text], i) => (
              <div key={title} className="reveal lift flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4" style={delay(200 + i * 100)}>
                <div className="bob text-2xl" style={{ animationDelay: `${i * 0.5}s` }} aria-hidden>
                  {icon}
                </div>
                <div>
                  <h2 className="font-bold">{title}</h2>
                  <p className="mt-0.5 text-sm text-white/70">{text}</p>
                </div>
              </div>
            ))}
            <div className="reveal rounded-2xl border border-gold/30 bg-gold/5 p-4 text-sm" style={delay(500)}>
              <p className="text-white/80">{t.deleteHint}</p>
              <Link href={`/${lang}/delete-account/`} className="mt-1 inline-flex items-center gap-1 font-bold text-gold transition hover:gap-2">
                {t.deleteLink} →
              </Link>
              <p className="mt-3 border-t border-white/10 pt-3 text-white/60">
                ✉️{' '}
                <a className="text-white/85 underline underline-offset-2 hover:text-white" href={`mailto:${site.contactEmail}`}>
                  {site.contactEmail}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

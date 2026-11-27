import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LangSwitch } from '@/components/lang-switch';
import { RevealObserver } from '@/components/reveal';
import { dict } from '@/lib/dict';
import { LANGS, isLang, site, type Lang } from '@/lib/site';
import '../globals.css';

export const dynamicParams = false;
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  const d = dict[isLang(lang) ? lang : 'bs'];
  return {
    metadataBase: new URL(site.url),
    title: { default: d.metaTitle, template: `%s · ${site.name}` },
    description: d.metaDescription,
    openGraph: { title: d.metaTitle, description: d.metaDescription, siteName: site.name, type: 'website' },
    alternates: { languages: { bs: '/bs/', en: '/en/' } },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = dict[lang];
  const other: Lang = lang === 'bs' ? 'en' : 'bs';
  return (
    <html lang={lang}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        {/* bez JavaScripta: sve sekcije odmah vidljive (animacije otkrivanja trebaju RevealObserver) */}
        <noscript>
          <style>{'.reveal,.reveal .deal-card{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <RevealObserver />
        <header className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
          <Link href={`/${lang}/`} className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" width={36} height={36} className="size-9 rounded-lg" />
            <span className="hidden text-lg font-extrabold tracking-tight min-[480px]:inline">
              Peak<span className="text-gold">Spin</span>
            </span>
          </Link>
          <nav className="ml-auto flex items-center gap-0.5 text-sm text-white/75 sm:gap-1">
            <Link className="rounded-md px-2 py-1.5 font-semibold whitespace-nowrap text-peaks hover:bg-white/10 sm:px-2.5" href={`/${lang}/peaks/`}>
              Peaks
            </Link>
            <Link className="rounded-md px-2 py-1.5 font-semibold whitespace-nowrap text-mahjong hover:bg-white/10 sm:px-2.5" href={`/${lang}/mahjong/`}>
              Mahjong
            </Link>
            <Link className="hidden rounded-md px-2 py-1.5 font-semibold whitespace-nowrap text-freecell hover:bg-white/10 min-[420px]:block sm:px-2.5" href={`/${lang}/freecell/`}>
              FreeCell
            </Link>
            <Link className="hidden rounded-md px-2 py-1.5 font-semibold whitespace-nowrap text-spider hover:bg-white/10 md:block sm:px-2.5" href={`/${lang}/spider/`}>
              Spider
            </Link>
            <Link className="hidden rounded-md px-2 py-1.5 font-semibold whitespace-nowrap text-kockice hover:bg-white/10 sm:block sm:px-2.5" href={`/${lang}/kockice/`}>
              {lang === 'bs' ? 'Kockice' : 'Dice'}
            </Link>
            <Link className="rounded-md px-2 py-1.5 font-semibold whitespace-nowrap text-spin hover:bg-white/10 sm:px-2.5" href={`/${lang}/spin-yamb/`}>
              Spin Yamb
            </Link>
            <Link className="hidden rounded-md px-2.5 py-1.5 hover:bg-white/10 hover:text-white sm:block" href={`/${lang}/contact/`}>
              {d.contact}
            </Link>
            <LangSwitch lang={lang} other={other} />
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-16 border-t border-white/10">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-white/60 sm:flex-row sm:items-center sm:px-6">
            <span>
              © {new Date().getFullYear()} {site.name}. {d.footer}
            </span>
            <nav className="flex flex-wrap gap-x-4 gap-y-1 sm:ml-auto">
              <Link className="hover:text-white" href={`/${lang}/privacy/`}>
                {d.nav.privacy}
              </Link>
              <Link className="hover:text-white" href={`/${lang}/terms/`}>
                {d.nav.terms}
              </Link>
              <Link className="hover:text-white" href={`/${lang}/delete-account/`}>
                {d.nav.deleteAccount}
              </Link>
              <Link className="hover:text-white" href={`/${lang}/contact/`}>
                {d.contact}
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}

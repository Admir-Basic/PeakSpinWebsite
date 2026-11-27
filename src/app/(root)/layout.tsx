import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  alternates: { canonical: '/bs/', languages: { bs: '/bs/', en: '/en/' } },
};

/**
 * Root layout samo za početnu adresu `/` (stranice su u `[lang]`, koji ima svoj root layout).
 * Mora postojati kao stranica: `next dev` ne servira public/index.html na `/`.
 */
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bs">
      <body style={{ background: '#0a0f1e', color: '#fff', fontFamily: 'system-ui, sans-serif', display: 'grid', placeItems: 'center', minHeight: '100vh', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}

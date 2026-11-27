import { site } from '@/lib/site';

function StoreButton({ label, store, href }: { label: string; store: string; href: string | null }) {
  const cls = 'flex min-w-44 flex-col rounded-xl border border-white/20 bg-black/40 px-5 py-2.5 text-left transition hover:-translate-y-0.5 hover:border-white/40';
  const body = (
    <>
      <span className="text-[11px] uppercase tracking-wide text-white/60">{label}</span>
      <span className="text-lg font-bold leading-tight">{store}</span>
    </>
  );
  return href ? (
    <a className={cls} href={href} rel="noopener">
      {body}
    </a>
  ) : (
    <span className={`${cls} cursor-default opacity-60 hover:translate-y-0`}>{body}</span>
  );
}

/** Dugmad za Google Play i App Store (dok aplikacija nije objavljena: "uskoro"). */
export function StoreButtons({ getOn, soon }: { getOn: string; soon: string }) {
  return (
    <>
      <div className="mt-8 flex flex-wrap gap-3">
        <StoreButton label={getOn} store="Google Play" href={site.playStoreUrl} />
        <StoreButton label={getOn} store="App Store" href={site.appStoreUrl} />
      </div>
      {!site.playStoreUrl && !site.appStoreUrl && <p className="mt-3 text-sm text-gold">{soon}</p>}
    </>
  );
}

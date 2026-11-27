# PeakSpin website: upute za Claude Code

Javna stranica aplikacije PeakSpin (Next.js 16, statični export): opis igara, politika privatnosti, uslovi korištenja, brisanje naloga. Jezici bs i en.
Komunikacija je na bosanskom.

Jedan od četiri odvojena repozitorija (`app`, `backend`, `dashboard`, `website`). Website ne koristi zajedničke pakete.

## Komande
```bash
pnpm install
pnpm dev        # http://localhost:3200
pnpm build      # statični sajt u out/ (bilo koji hosting: Netlify, Vercel, Cloudflare Pages, nginx)
pnpm typecheck
pnpm lint
```

## Struktura
- `src/app/[lang]/...`: root layout je u `[lang]` (`<html lang>`), `generateStaticParams` = bs, en; `dynamicParams = false`.
- Stranice: `/bs/`, `/bs/privacy/`, `/bs/terms/`, `/bs/delete-account/` (i `/en/...`). `src/app/(root)` (svoj root layout) šalje `/` na jezik browsera; u buildu je to `out/index.html`.
- Stranice igara: `/bs/peaks/`, `/bs/mahjong/`, `/bs/freecell/`, `/bs/spider/`, `/bs/kockice/`, `/bs/spin-yamb/` (i `/en/...`). Kocke (CSS) i sto koji se sam baca crta `src/components/dice.tsx`, lepeza na početnoj je `DiceFan`. FreeCell sto crta `src/components/freecell.tsx`. Na početnoj kartice igara imaju lepezu koja se sama igra (`src/components/autoplay.tsx`: PeaksFan, MahjongFan, FreeCellFan; poza kroz CSS varijable, hover je širi), a brojke broje od nule (`src/components/stat-card.tsx`), tekstovi u `src/lib/games.ts`. Mahjong pločice i sto (Toranj) crta `src/components/mahjong.tsx` (isti simboli kao u aplikaciji) (brojevi = default pravila igre).
- Stranica Peaksa ima dio "Prepreke i specijalne karte" (`obstacles` u `src/lib/games.ts`).
- Kontakt: `/bs/contact/` (i `/en/`), forma `src/components/contact-form.tsx`, tekstovi `src/lib/contact.ts`. Šalje na backend `POST ${site.apiUrl}/contact` (`NEXT_PUBLIC_API_URL`, default `http://localhost:2568`); poruke se vide u dashboardu (Kontakt). Kad server nije dostupan, forma nudi email.
- Tekstovi: `src/lib/dict.ts` (početna), pravni tekst je u samim stranicama (bs i en).
- Animacije: samo CSS (`globals.css`: float, tilt-in, shimmer, deal, glow, lift/shine) + `RevealObserver` (`src/components/reveal.tsx`) doda `.in` sekcijama sa klasom `reveal` kad uđu u ekran. "Smanji pokrete" gasi animacije; bez JavaScripta `<noscript>` stil sve pokaže.
- Ukras u pozadini (`deco.tsx`): vanjski element se pri učitavanju polako nagne (`tilt-in`), unutrašnji lebdi (`float`). Nagib nije u `float` keyframeovima, jer bi karta tokom `animation-delay` stajala ravno pa skočila u nagnut položaj.
- Ilustracije bez slika: `MiniTable` (`src/components/cards.tsx`) crta sto TriPeaks/Golf/Piramida kao u igri, `Reels` (`src/components/reels.tsx`) su rolne koje se mogu probati (3 vrtnje, zadržavanje); simboli su SVG-ovi u `public/symbols` (iz `pnpm gen:symbols` u `../app`, ne uređivati ručno). Prave snimke ekrana iz aplikacije mogu se dodati kasnije.
- `src/lib/site.ts`: domena, adresa backenda (`apiUrl`), kontakt email, ko pruža uslugu, država, linkovi na store. **Prije objave** zamijeniti oznake u uglastim zagradama i `.example` adrese pravim podacima; pravne tekstove neka pregleda pravnik.
- Aplikacija otvara `/<jezik>/privacy/` i `/<jezik>/terms/` (`WEBSITE_URL` u `app/src/config.ts`). Google Play traži URL stranice za brisanje naloga: `/bs/delete-account/` ili `/en/delete-account/`.
- Ikonice, logo i slika za dijeljenje (`opengraph-image.png`) dolaze iz `pnpm gen:icons` u `../app`.

- Spider sto crta `src/components/spider.tsx`, lepeza na početnoj je `SpiderFan`.
- `pnpm build` i `npx next typegen` pišu u `.next` dok `pnpm dev` radi: poslije toga dev server zna služiti stari CSS (nove boje iz `@theme` se ne pojave). Zaustavi dev, obriši `.next`, `npx next typegen`, pa ponovo `pnpm dev`.

## Pravila
- Bez riječi "slot" i "casino". Coinsi se ne kupuju niti mijenjaju za novac (tako i piše na stranici).
- Ne koristiti zvanične Google Play / App Store bedževe bez njihovih smjernica (sada su obična dugmad sa tekstom).

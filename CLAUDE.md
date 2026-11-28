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
- Maskota Vrhko (en: Peaky) kao SVG (`src/components/mascot.tsx`, isti crtež kao `app/src/components/Mascot.tsx`; poze wave, talk, celebrate, sad; CSS `guide-blink`, `vrhko-wave`, `bob`): na početnoj je znak bez kvadrata ikonice (`src/components/brand-mark.tsx`, isti crtež kao `public/logo.svg`; stoji mirno, a luk se povremeno zavrti `mark-spin` i bočni vrhovi, puni trouglovi, se naizmjenično dižu `mark-left`/`mark-right`) a Vrhko ispod njega šeta odvojeno (`vrhko-stroll` = hod lijevo-desno, `vrhko-hop` = skokovi, njihanje i skok sa okretom, `vrhko-say` = oblačić `mascotHello` se sakrije dok šeta; sve na istom ritmu od 14 s) i ima sekciju "Upoznaj Vrhka" (`mascotTitle`, `mascotText`, `mascotPoses` u `dict.ts`). `html`/`body` imaju `overflow-x: clip`, pa ukrasi smiju viriti preko ruba bez horizontalnog skrola na telefonu.
- Lepeza kocki (`DiceFan`, klasa `fan-dice`) se okreće oko centra kocke, a ne oko tačke ispod kao karte.
- Svaka stranica igre ima sekciju "Kampanja i priča" (`src/components/campaign-section.tsx`, tekstovi i broj nivoa u `src/lib/campaigns.ts`): vodič nacrtan kao SVG (`src/components/guides.tsx`, isti likovi kao `GuideArt` u aplikaciji, oči trepću kroz CSS `guide-blink`), priča i poglavlja kao staza do pehara. Kad se kampanje promijene (`pnpm gen:campaign`, dashboard), ručno ažurirati brojeve i poglavlja u `campaigns.ts`.
- Kontakt: `/bs/contact/` (i `/en/`), forma `src/components/contact-form.tsx`, tekstovi `src/lib/contact.ts`. Šalje na backend `POST ${site.apiUrl}/contact` (`NEXT_PUBLIC_API_URL`, default `http://localhost:2568`); poruke se vide u dashboardu (Kontakt). Kad server nije dostupan, forma nudi email.
- Zaglavlje (logo, igre, kontakt, jezik) je u `src/app/[lang]/layout.tsx` i sticky (ostaje gore pri skrolanju, poluprozirna pozadina sa `backdrop-blur`, `z-50`). Sticky radi jer `html`/`body` imaju `overflow-x: clip`, a ne `hidden`.
- Tekstovi: `src/lib/dict.ts` (početna), pravni tekst je u samim stranicama (bs i en).
- Animacije: samo CSS (`globals.css`: float, tilt-in, shimmer, deal, glow, lift/shine) + `RevealObserver` (`src/components/reveal.tsx`) doda `.in` sekcijama sa klasom `reveal` kad uđu u ekran. "Smanji pokrete" gasi animacije; bez JavaScripta `<noscript>` stil sve pokaže.
- Ukras u pozadini (`deco.tsx`): vanjski element se pri učitavanju polako nagne (`tilt-in`), unutrašnji lebdi (`float`). Nagib nije u `float` keyframeovima, jer bi karta tokom `animation-delay` stajala ravno pa skočila u nagnut položaj.
- Ilustracije bez slika: `MiniTable` (`src/components/cards.tsx`) crta sto TriPeaks/Golf/Piramida kao u igri, `Reels` (`src/components/reels.tsx`) su rolne koje se mogu probati (3 vrtnje, zadržavanje); simboli su SVG-ovi u `public/symbols` (iz `pnpm gen:symbols` u `../app`, ne uređivati ručno). Prave snimke ekrana iz aplikacije mogu se dodati kasnije.
- Reklame i kupovine (PLAN A9): politika privatnosti (AdMob, RevenueCat, Google Play / App Store, postavke privatnosti reklama) i uslovi ("Kupovine i reklame") su dopunjeni; `public/app-ads.txt` ima zakomentarisan red za AdMob, prije objave upisati pravi ID izdavača. Početna više ne kaže "0 reklama" (sada "159 nivoa u kampanjama").
- `src/lib/site.ts`: domena, adresa backenda (`apiUrl`), kontakt email, ko pruža uslugu, država, linkovi na store. **Prije objave** zamijeniti oznake u uglastim zagradama i `.example` adrese pravim podacima; pravne tekstove neka pregleda pravnik.
- Aplikacija otvara `/<jezik>/privacy/` i `/<jezik>/terms/` (`WEBSITE_URL` u `app/src/config.ts`). Google Play traži URL stranice za brisanje naloga: `/bs/delete-account/` ili `/en/delete-account/`.
- Ikonice, logo i slika za dijeljenje (`opengraph-image.png`) dolaze iz `pnpm gen:icons` u `../app`.

- Spider sto crta `src/components/spider.tsx`, lepeza na početnoj je `SpiderFan`.
- `pnpm build` i `npx next typegen` pišu u `.next` dok `pnpm dev` radi: poslije toga dev server zna služiti stari CSS (nove boje iz `@theme` se ne pojave). Zaustavi dev, obriši `.next`, `npx next typegen`, pa ponovo `pnpm dev`.

## Pravila
- Bez riječi "slot" i "casino". Coinsi se ne kupuju niti mijenjaju za novac (tako i piše na stranici).
- Ne koristiti zvanične Google Play / App Store bedževe bez njihovih smjernica (sada su obična dugmad sa tekstom).

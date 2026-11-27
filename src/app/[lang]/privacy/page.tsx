import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, Mail } from '@/lib/legal';
import { isLang, site, type Lang } from '@/lib/site';

const TITLE: Record<Lang, string> = { bs: 'Politika privatnosti', en: 'Privacy policy' };

export async function generateMetadata({ params }: PageProps<'/[lang]/privacy'>): Promise<Metadata> {
  const { lang } = await params;
  return { title: TITLE[isLang(lang) ? lang : 'bs'] };
}

export default async function Privacy({ params }: PageProps<'/[lang]/privacy'>) {
  const { lang: l } = await params;
  const lang: Lang = isLang(l) ? l : 'bs';
  return <LegalPage lang={lang} title={TITLE[lang]}>{lang === 'bs' ? <Bs /> : <En />}</LegalPage>;
}

function Bs() {
  return (
    <>
      <p className="mt-6">
        Ova politika objašnjava koje podatke aplikacija PeakSpin i njen server prikupljaju, zašto i kako ih možeš obrisati. Uslugu pruža {site.operator} („mi“).
        Kontakt: <Mail />.
      </p>

      <h2>Šta prikupljamo</h2>
      <ul>
        <li>
          <b>Nalog.</b> Pri prvom pokretanju aplikacija napravi gost nalog sa slučajnim identifikatorom i brojem (npr. guest123). Ako se registruješ, čuvamo email
          adresu (ili identifikator Google / Apple naloga kad ta prijava bude dostupna) i nadimak koji izabereš.
        </li>
        <li>
          <b>Podaci o igri.</b> Rezultati partija i zapis poteza (replay) koji server ponovo odigra da provjeri rezultat; coinsi, XP, nivo, napredak u kampanji,
          misijama, ligama, sezonama i turnirima.
        </li>
        <li>
          <b>Društveno.</b> Lista prijatelja i zahtjeva, članstva u grupama, pozivi u sobe.
        </li>
        <li>
          <b>Tehnički podaci.</b> Vrijeme zadnje aktivnosti, sesije za prijavu (token za obnovu čuvamo samo kao kriptografski otisak) i IP adresa u logovima servera.
        </li>
      </ul>
      <p>
        <b>Na telefonu</b> ostaju podešavanja, keš pravila i nivoa, napredak kampanje i token za prijavu (u sigurnom spremištu sistema: Keychain / Keystore).
      </p>
      <p>
        <b>Kamera</b> se koristi samo za skeniranje QR koda grupe ili sobe; slika se ne čuva i ne šalje. <b>Lokalna mreža</b> služi samo za igru sa telefonima na istom
        Wi-Fi-ju ili hotspotu.
      </p>

      <h2>Šta ne radimo</h2>
      <ul>
        <li>Nema reklama, reklamnih SDK-ova ni praćenja između aplikacija.</li>
        <li>Ne prodajemo podatke i ne dijelimo ih radi marketinga.</li>
        <li>Ne prikupljamo lokaciju, kontakte, fotografije ni mikrofon.</li>
      </ul>

      <h2>Zašto koristimo podatke</h2>
      <ul>
        <li>Da igra radi: nalog, napredak, nagrade, online utrke, prijatelji i grupe (izvršenje ugovora).</li>
        <li>Fer igra i sigurnost: provjera rezultata, sprečavanje varanja i zloupotrebe (legitimni interes).</li>
        <li>Email adresu samo za slanje koda za prijavu.</li>
      </ul>
      <p>Nadimak (ili guest broj) i rezultati vidljivi su drugim igračima na rang listama, u ligama, turnirima, grupama i online sobama.</p>

      <h2>Ko obrađuje podatke</h2>
      <p>
        Podaci su na našem serveru kod pružaoca hostinga [naziv hostinga, država]. Email za kod za prijavu šalje [pružalac email usluge]. Oni podatke obrađuju samo po
        našem nalogu.
      </p>

      <h2>Koliko dugo čuvamo</h2>
      <ul>
        <li>Podatke naloga i igre dok nalog postoji.</li>
        <li>Kod za prijavu važi 10 minuta; sesije za prijavu najviše 90 dana od zadnje upotrebe.</li>
        <li>Logove servera najviše [30] dana.</li>
      </ul>

      <h2>Brisanje naloga</h2>
      <p>
        Nalog i sve podatke vezane za njega možeš obrisati u aplikaciji: <b>Nalog → Obriši nalog</b>. Detalji su na stranici{' '}
        <Link href="/bs/delete-account/">Brisanje naloga</Link>. Gost podaci na telefonu nestaju i brisanjem aplikacije.
      </p>

      <h2>Tvoja prava</h2>
      <p>
        Imaš pravo na pristup, ispravku i brisanje podataka, ograničenje obrade, prigovor i prenosivost podataka, kao i pravo na žalbu nadležnom tijelu za zaštitu
        podataka. Zahtjev pošalji na <Mail />.
      </p>

      <h2>Djeca</h2>
      <p>
        Aplikacija nije namijenjena djeci mlađoj od 13 godina (ili starosne granice koju propisuje tvoja država). Ako saznamo da je takvo dijete napravilo nalog,
        obrisaćemo ga.
      </p>

      <h2>Izmjene</h2>
      <p>O bitnim izmjenama ove politike obavijestićemo u aplikaciji ili na ovoj stranici. Datum zadnje izmjene je na vrhu.</p>
    </>
  );
}

function En() {
  return (
    <>
      <p className="mt-6">
        This policy explains what data the PeakSpin app and its server collect, why, and how you can delete it. The service is provided by {site.operator} (“we”).
        Contact: <Mail />.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <b>Account.</b> On first launch the app creates a guest account with a random identifier and number (e.g. guest123). If you register, we store your email
          address (or a Google / Apple account identifier once that sign-in is available) and the nickname you choose.
        </li>
        <li>
          <b>Game data.</b> Game results and the move log (replay) that the server replays to verify the score; coins, XP, level, and progress in the campaign,
          missions, leagues, seasons and tournaments.
        </li>
        <li>
          <b>Social.</b> Friend list and requests, group memberships, room invites.
        </li>
        <li>
          <b>Technical data.</b> Last activity time, sign-in sessions (we only store a cryptographic hash of the refresh token) and the IP address in server logs.
        </li>
      </ul>
      <p>
        <b>On your phone</b> we keep settings, a cache of rules and levels, campaign progress and the sign-in token (in the system secure storage: Keychain / Keystore).
      </p>
      <p>
        The <b>camera</b> is used only to scan a group or room QR code; the image is not stored or sent. The <b>local network</b> is used only to play with phones on the
        same Wi-Fi or hotspot.
      </p>

      <h2>What we do not do</h2>
      <ul>
        <li>No ads, no ad SDKs and no cross-app tracking.</li>
        <li>We do not sell data or share it for marketing.</li>
        <li>We do not collect location, contacts, photos or microphone data.</li>
      </ul>

      <h2>Why we use data</h2>
      <ul>
        <li>To run the game: account, progress, rewards, online races, friends and groups (performance of a contract).</li>
        <li>Fair play and security: verifying results and preventing cheating and abuse (legitimate interest).</li>
        <li>Your email address only to send sign-in codes.</li>
      </ul>
      <p>Your nickname (or guest number) and scores are visible to other players on leaderboards, in leagues, tournaments, groups and online rooms.</p>

      <h2>Who processes data</h2>
      <p>
        Data is stored on our server at the hosting provider [hosting name, country]. Sign-in code emails are sent by [email provider]. They process data only on our
        instructions.
      </p>

      <h2>How long we keep data</h2>
      <ul>
        <li>Account and game data for as long as the account exists.</li>
        <li>A sign-in code is valid for 10 minutes; sign-in sessions for at most 90 days after last use.</li>
        <li>Server logs for at most [30] days.</li>
      </ul>

      <h2>Deleting your account</h2>
      <p>
        You can delete your account and all data linked to it in the app: <b>Account → Delete account</b>. See the{' '}
        <Link href="/en/delete-account/">account deletion</Link> page. Guest data on the phone is also removed when you uninstall the app.
      </p>

      <h2>Your rights</h2>
      <p>
        You have the right to access, correct and delete your data, to restrict processing, to object and to data portability, and to lodge a complaint with your data
        protection authority. Send requests to <Mail />.
      </p>

      <h2>Children</h2>
      <p>
        The app is not intended for children under 13 (or the age set by your country). If we learn that such a child created an account, we will delete it.
      </p>

      <h2>Changes</h2>
      <p>We will announce significant changes to this policy in the app or on this page. The last update date is at the top.</p>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, Mail } from '@/lib/legal';
import { isLang, site, type Lang } from '@/lib/site';

const TITLE: Record<Lang, string> = { bs: 'Uslovi korištenja', en: 'Terms of use' };

export async function generateMetadata({ params }: PageProps<'/[lang]/terms'>): Promise<Metadata> {
  const { lang } = await params;
  return { title: TITLE[isLang(lang) ? lang : 'bs'] };
}

export default async function Terms({ params }: PageProps<'/[lang]/terms'>) {
  const { lang: l } = await params;
  const lang: Lang = isLang(l) ? l : 'bs';
  return <LegalPage lang={lang} title={TITLE[lang]}>{lang === 'bs' ? <Bs /> : <En />}</LegalPage>;
}

function Bs() {
  return (
    <>
      <p className="mt-6">
        Korištenjem aplikacije PeakSpin prihvataš ove uslove. Uslugu pruža {site.operator}. Ako se ne slažeš sa uslovima, nemoj koristiti aplikaciju.
      </p>

      <h2>Nalog</h2>
      <ul>
        <li>Aplikacija sama napravi gost nalog. Za prijatelje, grupe, nadimak, rangirane modove i turnire treba registracija.</li>
        <li>Nalog je lični. Odgovoran si za pristup svom emailu i telefonu.</li>
        <li>Nadimak ne smije biti uvredljiv, lažno predstavljati drugu osobu ili kršiti tuđa prava. Takav nadimak možemo promijeniti ili ukloniti.</li>
      </ul>

      <h2>Virtualna valuta</h2>
      <p>
        Coinsi, XP i nagrade u igri nemaju novčanu vrijednost. Ne mogu se zamijeniti za novac, robu ili usluge, prenijeti drugom igraču ni isplatiti. Možemo ih
        korigovati ako su dobijeni greškom ili varanjem.
      </p>

      <h2>Kupovine i reklame</h2>
      <p>
        U aplikaciji se mogu kupiti energija, pomoć, neograničena energija na određeno vrijeme i „Bez reklama“. To je digitalni sadržaj koji se isporučuje odmah;
        plaćanje i povrat novca idu preko Google Play-a ili App Store-a, po njihovim pravilima. Ako je novac vraćen, uklanjamo ono što je kupovina dala. Coinsi se ne
        prodaju. Kupljeno ne daje prednost u rangiranim mečevima ni turnirima. „Bez reklama“ ukida reklame između partija; reklame za nagradu ostaju dobrovoljne, uz
        dnevni limit.
      </p>

      <h2>Fer igra</h2>
      <ul>
        <li>Zabranjeno je varanje: izmijenjena aplikacija, botovi, automatizacija, iskorištavanje grešaka, dogovaranje rezultata i više naloga radi prednosti.</li>
        <li>Server provjerava svaku partiju koja ulazi u rang liste, lige, sezone i turnire.</li>
        <li>Za kršenje pravila možemo poništiti rezultate i nagrade, privremeno ili trajno zabraniti pristup.</li>
      </ul>

      <h2>Ponašanje</h2>
      <p>Poštuj druge igrače. Zabranjeni su uznemiravanje, prevare i pokušaji ometanja rada servera.</p>

      <h2>Sadržaj i prava</h2>
      <p>
        Aplikacija, grafika, nivoi i ostali sadržaj pripadaju nama ili davaocima licence. Dobijaš lično, neprenosivo pravo da aplikaciju koristiš za zabavu.
      </p>

      <h2>Dostupnost</h2>
      <p>
        Trudimo se da usluga radi stalno, ali je pružamo „kakva jeste“. Pravila, nagrade i funkcije možemo mijenjati, a server povremeno može biti nedostupan zbog
        održavanja. Solo igra i igra na lokalnoj mreži rade i bez interneta.
      </p>

      <h2>Odgovornost</h2>
      <p>U mjeri u kojoj zakon dozvoljava, ne odgovaramo za indirektnu štetu, gubitak podataka u igri ni prekide usluge.</p>

      <h2>Prestanak</h2>
      <p>
        Nalog možeš obrisati kad god želiš (<Link href="/bs/delete-account/">kako</Link>). Mi možemo ugasiti nalog koji krši ove uslove.
      </p>

      <h2>Izmjene i pravo</h2>
      <p>
        O bitnim izmjenama uslova obavijestićemo u aplikaciji ili na ovoj stranici. Na uslove se primjenjuje pravo države {site.country}. Pitanja: <Mail />.
      </p>
    </>
  );
}

function En() {
  return (
    <>
      <p className="mt-6">
        By using the PeakSpin app you accept these terms. The service is provided by {site.operator}. If you do not agree, do not use the app.
      </p>

      <h2>Account</h2>
      <ul>
        <li>The app creates a guest account for you. Friends, groups, a nickname, ranked modes and tournaments require registration.</li>
        <li>Your account is personal. You are responsible for access to your email and phone.</li>
        <li>Nicknames must not be offensive, impersonate others or infringe anyone’s rights. We may change or remove such a nickname.</li>
      </ul>

      <h2>Virtual currency</h2>
      <p>
        Coins, XP and in-game rewards have no monetary value. They cannot be exchanged for money, goods or services, transferred to another player or cashed out. We
        may correct them if they were obtained by mistake or by cheating.
      </p>

      <h2>Purchases and ads</h2>
      <p>
        You can buy energy, hints, unlimited energy for a limited time and “No ads” in the app. This is digital content delivered immediately; payment and refunds go
        through Google Play or the App Store, under their rules. If a purchase is refunded, we remove what it gave. Coins are not sold. Purchases give no advantage in
        ranked matches or tournaments. “No ads” removes ads between games; reward ads stay optional, with a daily limit.
      </p>

      <h2>Fair play</h2>
      <ul>
        <li>Cheating is prohibited: modified apps, bots, automation, exploiting bugs, fixing results and multiple accounts for an advantage.</li>
        <li>The server verifies every game that counts for leaderboards, leagues, seasons and tournaments.</li>
        <li>For violations we may void results and rewards, and suspend or ban access.</li>
      </ul>

      <h2>Conduct</h2>
      <p>Respect other players. Harassment, scams and attempts to disrupt the server are prohibited.</p>

      <h2>Content and rights</h2>
      <p>The app, graphics, levels and other content belong to us or our licensors. You get a personal, non-transferable right to use the app for entertainment.</p>

      <h2>Availability</h2>
      <p>
        We aim to keep the service running, but provide it “as is”. We may change rules, rewards and features, and the server may occasionally be unavailable for
        maintenance. Solo and local network play work without the internet.
      </p>

      <h2>Liability</h2>
      <p>To the extent permitted by law, we are not liable for indirect damages, loss of in-game data or service interruptions.</p>

      <h2>Termination</h2>
      <p>
        You can delete your account at any time (<Link href="/en/delete-account/">how</Link>). We may close an account that violates these terms.
      </p>

      <h2>Changes and law</h2>
      <p>
        We will announce significant changes in the app or on this page. These terms are governed by the law of {site.country}. Questions: <Mail />.
      </p>
    </>
  );
}

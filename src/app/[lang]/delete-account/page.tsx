import type { Metadata } from 'next';
import { LegalPage, Mail } from '@/lib/legal';
import { isLang, type Lang } from '@/lib/site';

const TITLE: Record<Lang, string> = { bs: 'Brisanje naloga', en: 'Delete your account' };

export async function generateMetadata({ params }: PageProps<'/[lang]/delete-account'>): Promise<Metadata> {
  const { lang } = await params;
  return { title: TITLE[isLang(lang) ? lang : 'bs'] };
}

/** Stranica koju traži Google Play (URL za brisanje naloga) i App Store. */
export default async function DeleteAccount({ params }: PageProps<'/[lang]/delete-account'>) {
  const { lang: l } = await params;
  const lang: Lang = isLang(l) ? l : 'bs';
  return (
    <LegalPage lang={lang} title={TITLE[lang]}>
      {lang === 'bs' ? (
        <>
          <h2>U aplikaciji</h2>
          <ol className="my-2 list-decimal space-y-1 pl-6 text-white/80">
            <li>Otvori PeakSpin i na početnom ekranu dodirni 👤 (nalog).</li>
            <li>
              Na dnu ekrana dodirni <b>Obriši nalog</b> i potvrdi.
            </li>
          </ol>
          <p>Brisanje je odmah i ne može se vratiti. Aplikacija zatim napravi novi, prazan gost nalog.</p>

          <h2>Šta se briše</h2>
          <ul>
            <li>nalog, email adresa i nadimak, sesije za prijavu</li>
            <li>coinsi, XP, nivo, napredak u kampanji, misijama, ligama, sezonama i turnirima</li>
            <li>rezultati na rang listama, prijatelji, zahtjevi i pozivi, članstva u grupama</li>
          </ul>
          <p>
            Ako si vlasnik grupe, vlasništvo prelazi na najstarijeg admina (ili člana); grupa bez drugih članova se briše. U istoriji online mečeva ostaje samo
            anoniman red bez veze sa tobom. Logovi servera se brišu sami najkasnije za [30] dana.
          </p>

          <h2>Bez pristupa aplikaciji</h2>
          <p>
            Pošalji zahtjev sa email adrese kojom si registrovan na <Mail /> (naslov: „Brisanje naloga“). Nalog brišemo u roku od 30 dana i javimo kad je gotovo.
          </p>
        </>
      ) : (
        <>
          <h2>In the app</h2>
          <ol className="my-2 list-decimal space-y-1 pl-6 text-white/80">
            <li>Open PeakSpin and tap 👤 (account) on the home screen.</li>
            <li>
              At the bottom, tap <b>Delete account</b> and confirm.
            </li>
          </ol>
          <p>Deletion is immediate and cannot be undone. The app then creates a new, empty guest account.</p>

          <h2>What is deleted</h2>
          <ul>
            <li>your account, email address and nickname, sign-in sessions</li>
            <li>coins, XP, level, progress in the campaign, missions, leagues, seasons and tournaments</li>
            <li>leaderboard scores, friends, requests and invites, group memberships</li>
          </ul>
          <p>
            If you own a group, ownership passes to the oldest admin (or member); a group with no other members is deleted. Online match history keeps only an anonymous
            row with no link to you. Server logs are removed automatically within [30] days.
          </p>

          <h2>Without access to the app</h2>
          <p>
            Send a request from the email address you registered with to <Mail /> (subject: “Delete account”). We delete the account within 30 days and confirm when
            done.
          </p>
        </>
      )}
    </LegalPage>
  );
}

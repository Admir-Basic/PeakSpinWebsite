/**
 * Podaci o stranici. Prije objave zamijeni oznake u uglastim zagradama pravim podacima
 * (pravno lice ili ime, kontakt email, država). Uslovi i privatnost su predložak: neka ih pregleda pravnik.
 */
export const site = {
  name: 'PeakSpin',
  /** javna adresa stranice (za slike pri dijeljenju linka); zamijeni pravom domenom */
  url: 'https://peakspin.example',
  /** kontakt za podršku i zahtjeve za brisanje podataka */
  contactEmail: 'kontakt@peakspin.example',
  /** REST adresa backenda (kontakt forma šalje na `${apiUrl}/contact`); zamijeni pravom https adresom servera */
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:2568',
  /** ko pruža uslugu (firma ili fizičko lice) */
  operator: '[naziv firme ili ime i prezime]',
  /** država čije pravo važi */
  country: '[država]',
  /** datum zadnje izmjene uslova i privatnosti */
  updated: '2026-11-25',
  /** linkovi na store kad aplikacija bude objavljena (null = "uskoro") */
  playStoreUrl: null as string | null,
  appStoreUrl: null as string | null,
};

export const LANGS = ['bs', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

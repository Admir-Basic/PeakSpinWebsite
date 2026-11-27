import type { Lang } from './site';

export type Topic = 'support' | 'bug' | 'idea' | 'account' | 'other';

export interface ContactTexts {
  title: string;
  tagline: string;
  intro: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  messagePh: string;
  send: string;
  sending: string;
  topics: [Topic, string, string][];
  sentTitle: string;
  sentText: string;
  again: string;
  errors: { required: string; email: string; short: string; tooMany: string; server: string; mailInstead: string };
  privacy: string;
  privacyLink: string;
  side: [string, string, string][];
  deleteHint: string;
  deleteLink: string;
}

/** Tekstovi kontakt stranice (bs, en). Teme su iste kao u backendu (`CONTACT_TOPICS`). */
export const contact: Record<Lang, ContactTexts> = {
  bs: {
    title: 'Kontakt',
    tagline: 'Pitanje, greška ili ideja? Piši nam.',
    intro: 'Čitamo svaku poruku. Ako prijavljuješ grešku, napiši koju igru i način igraš i šta se desilo.',
    name: 'Ime',
    email: 'Email',
    topic: 'Tema',
    message: 'Poruka',
    messagePh: 'Npr. u Piramidi se karta sa odlagališta ne spaja sa kartom sa stola…',
    send: 'Pošalji poruku',
    sending: 'Šaljem…',
    topics: [
      ['support', '🙋', 'Pomoć'],
      ['bug', '🐞', 'Greška'],
      ['idea', '💡', 'Prijedlog'],
      ['account', '👤', 'Nalog i podaci'],
      ['other', '✉️', 'Ostalo'],
    ],
    sentTitle: 'Poruka je poslana!',
    sentText: 'Hvala. Odgovaramo na email koji si upisao, obično u roku od par dana.',
    again: 'Pošalji još jednu',
    errors: {
      required: 'Popuni ovo polje.',
      email: 'Upiši ispravnu email adresu.',
      short: 'Poruka treba imati bar 10 znakova.',
      tooMany: 'Poslao si previše poruka. Pokušaj ponovo za sat vremena.',
      server: 'Poruka trenutno ne može biti poslana.',
      mailInstead: 'Piši nam direktno na',
    },
    privacy: 'Ime, email i poruku koristimo samo da ti odgovorimo. Više u',
    privacyLink: 'politici privatnosti',
    side: [
      ['⏱️', 'Brz odgovor', 'Obično u roku od par dana, radnim danima brže.'],
      ['🐞', 'Prijava greške', 'Navedi igru, način (TriPeaks, Golf, Piramida, Spin Yamb) i model telefona.'],
      ['💡', 'Ideje su dobrodošle', 'Novi načini, nivoi ili izazovi: mnogo toga je stiglo baš od igrača.'],
    ],
    deleteHint: 'Želiš obrisati nalog i podatke?',
    deleteLink: 'Uputstvo za brisanje naloga',
  },
  en: {
    title: 'Contact',
    tagline: 'A question, a bug or an idea? Write to us.',
    intro: 'We read every message. If you are reporting a bug, tell us which game and mode you were playing and what happened.',
    name: 'Name',
    email: 'Email',
    topic: 'Topic',
    message: 'Message',
    messagePh: 'E.g. in Pyramid the pile card does not pair with a card on the table…',
    send: 'Send message',
    sending: 'Sending…',
    topics: [
      ['support', '🙋', 'Help'],
      ['bug', '🐞', 'Bug'],
      ['idea', '💡', 'Suggestion'],
      ['account', '👤', 'Account and data'],
      ['other', '✉️', 'Other'],
    ],
    sentTitle: 'Message sent!',
    sentText: 'Thank you. We reply to the email you entered, usually within a few days.',
    again: 'Send another',
    errors: {
      required: 'Please fill in this field.',
      email: 'Enter a valid email address.',
      short: 'The message needs at least 10 characters.',
      tooMany: 'You have sent too many messages. Try again in an hour.',
      server: 'The message cannot be sent right now.',
      mailInstead: 'Write to us directly at',
    },
    privacy: 'We use your name, email and message only to reply to you. More in the',
    privacyLink: 'privacy policy',
    side: [
      ['⏱️', 'Quick reply', 'Usually within a few days, faster on weekdays.'],
      ['🐞', 'Bug reports', 'Tell us the game, the mode (TriPeaks, Golf, Pyramid, Spin Yamb) and your phone model.'],
      ['💡', 'Ideas welcome', 'New modes, levels or challenges: a lot of them came from players.'],
    ],
    deleteHint: 'Want to delete your account and data?',
    deleteLink: 'How to delete your account',
  },
};

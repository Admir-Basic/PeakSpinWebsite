'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import type { ContactTexts, Topic } from '@/lib/contact';

const MAX = 3000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = 'name' | 'email' | 'message';
type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; text: string; mail: boolean };

/**
 * Forma šalje na backend `POST /contact` (statična stranica nema svoj server).
 * Skriveno polje `website` je zamka za botove. Kad server nije dostupan, nudi se email.
 */
export function ContactForm({ t, lang, apiUrl, email }: { t: ContactTexts; lang: string; apiUrl: string; email: string }) {
  const [topic, setTopic] = useState<Topic>('support');
  const [values, setValues] = useState({ name: '', email: '', message: '', website: '' });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<State>({ kind: 'idle' });

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (k in errors) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) er.name = t.errors.required;
    if (!values.email.trim()) er.email = t.errors.required;
    else if (!EMAIL.test(values.email.trim())) er.email = t.errors.email;
    if (!values.message.trim()) er.message = t.errors.required;
    else if (values.message.trim().length < 10) er.message = t.errors.short;
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (state.kind === 'sending' || !validate()) return;
    setState({ kind: 'sending' });
    try {
      const res = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...values, topic, lang }),
      });
      if (res.ok) {
        setState({ kind: 'sent' });
        setValues({ name: '', email: '', message: '', website: '' });
      } else if (res.status === 429) setState({ kind: 'error', text: t.errors.tooMany, mail: false });
      else setState({ kind: 'error', text: t.errors.server, mail: true });
    } catch {
      setState({ kind: 'error', text: t.errors.server, mail: true });
    }
  }

  if (state.kind === 'sent')
    return (
      <div className="pop-in grid place-items-center gap-3 py-10 text-center" role="status">
        <div className="check-burst grid size-20 place-items-center rounded-full bg-peaks/20 text-4xl font-black text-peaks">✓</div>
        <h2 className="text-2xl font-extrabold">{t.sentTitle}</h2>
        <p className="max-w-sm text-white/75">{t.sentText}</p>
        <button type="button" onClick={() => setState({ kind: 'idle' })} className="mt-2 rounded-xl border border-white/20 px-4 py-2 font-semibold transition hover:bg-white/10">
          {t.again}
        </button>
      </div>
    );

  const input =
    'w-full rounded-xl border bg-black/30 px-3.5 py-2.5 text-white placeholder:text-white/35 outline-none transition focus:border-gold focus:bg-black/40 focus:ring-2 focus:ring-gold/30';
  const border = (f: Field) => (errors[f] ? 'border-red-400/80' : 'border-white/15');
  const sending = state.kind === 'sending';

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="text-sm font-semibold text-white/85">{t.name}</span>
          <input className={`${input} ${border('name')}`} value={values.name} onChange={set('name')} maxLength={60} autoComplete="name" aria-invalid={!!errors.name} />
          {errors.name && <span className="shake text-sm text-red-300">{errors.name}</span>}
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-semibold text-white/85">{t.email}</span>
          <input
            className={`${input} ${border('email')}`}
            type="email"
            value={values.email}
            onChange={set('email')}
            maxLength={120}
            autoComplete="email"
            inputMode="email"
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className="shake text-sm text-red-300">{errors.email}</span>}
        </label>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold text-white/85">{t.topic}</legend>
        <div className="flex flex-wrap gap-2">
          {t.topics.map(([id, icon, label]) => {
            const on = topic === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTopic(id)}
                aria-pressed={on}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition active:scale-95 ${
                  on ? 'border-gold bg-gold/15 text-gold shadow-[0_0_18px_-4px] shadow-gold/60' : 'border-white/15 text-white/75 hover:border-white/35 hover:text-white'
                }`}
              >
                <span aria-hidden className={on ? 'chip-pop' : ''}>
                  {icon}
                </span>
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="grid gap-1.5">
        <span className="flex items-baseline justify-between text-sm font-semibold text-white/85">
          {t.message}
          <span className={`text-xs font-normal ${values.message.length > MAX - 200 ? 'text-gold' : 'text-white/45'}`}>
            {values.message.length}/{MAX}
          </span>
        </span>
        <textarea
          className={`${input} ${border('message')} min-h-36 resize-y`}
          value={values.message}
          onChange={set('message')}
          maxLength={MAX}
          placeholder={t.messagePh}
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="shake text-sm text-red-300">{errors.message}</span>}
      </label>

      {/* zamka za botove: ljudi je ne vide */}
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
        </label>
      </div>

      {state.kind === 'error' && (
        <p className="shake rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200" role="alert">
          {state.text}
          {state.mail && (
            <>
              {' '}
              {t.errors.mailInstead}{' '}
              <a className="font-semibold text-gold underline underline-offset-2" href={`mailto:${email}`}>
                {email}
              </a>
              .
            </>
          )}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/55">
          {t.privacy}{' '}
          <Link className="text-white/80 underline underline-offset-2 hover:text-white" href={`/${lang}/privacy/`}>
            {t.privacyLink}
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={sending}
          className="send-btn relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-b from-gold to-gold-deep px-6 py-3 font-extrabold text-night shadow-lg shadow-gold/20 transition hover:-translate-y-0.5 hover:shadow-gold/40 active:translate-y-0 disabled:cursor-wait disabled:opacity-80"
        >
          {sending ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-night/30 border-t-night" aria-hidden />
              {t.sending}
            </>
          ) : (
            <>
              {t.send} <span aria-hidden>➜</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

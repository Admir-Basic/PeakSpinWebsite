# PeakSpin website

Statična stranica (Next.js 16, `output: export`): opis igara, politika privatnosti, uslovi korištenja, brisanje naloga. Jezici bs i en.

```bash
pnpm install
pnpm dev        # http://localhost:3200
pnpm build      # → out/ (bilo koji statični hosting)
```

Prije objave popuni `src/lib/site.ts` (domena, kontakt email, ko pruža uslugu, država, linkovi na store) i daj pravne tekstove pravniku na pregled.
Google Play traži URL za brisanje naloga: `/bs/delete-account/` (ili `/en/delete-account/`).

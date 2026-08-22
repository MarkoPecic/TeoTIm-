# TeoTim Trstenik — sajt

Statički sajt zanatske radnje TeoTim (Trstenik, Srbija) — ugradnja i servis centralnih sistema
za automatsko podmazivanje teške mehanizacije.

Čist HTML, CSS i JavaScript. Bez frameworka, bez build koraka, bez npm zavisnosti.
Otvoriš `index.html` u pregledaču i sajt radi.

## Struktura

```
/
├── index.html          Početna (hero, usluge, proces, mašine, galerija, FAQ, CTA)
├── reference.html      Reference sa filterom po tipu mašine
├── kontakt.html        Telefoni, e-mail, adresa, radno vreme, podaci o firmi
├── css/
│   └── style.css       Kompletan stil, podeljen u 20 komentarisanih sekcija
├── js/
│   └── main.js         Tri funkcije: reveal na skrolu, FAQ akordeon, filter referenci
├── assets/images/
│   ├── hero-2400.jpg   Hero, desktop (2400×1263)
│   ├── hero-1200.jpg   Hero, telefon/tablet (1200×632)
│   ├── rad-1..6.jpg    Fotografije sa terena
│   └── logo.svg        Logotip
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── llms.txt            Sažetak sajta za AI pretraživače (AI SEO / GEO)
└── .nojekyll           GitHub Pages: bez Jekyll obrade
```

Radni fajlovi dizajna (`TeoTim.dc.html`, `TeoTim v2.dc.html`, `support.js`, `uploads/`) nisu
deo javnog sajta. Nisu povezani nijednim linkom i isključeni su u `robots.txt`.
Mogu se slobodno izbrisati iz produkcijskog repozitorijuma.

## Domen

U kodu je kao produkcioni domen upisan `https://teotim.rs/`. Pojavljuje se na četiri mesta:

- `<link rel="canonical">` i `og:url` u sve tri HTML stranice
- `@id` / `url` u JSON-LD blokovima
- `sitemap.xml`
- `robots.txt` (linija `Sitemap:`)

Kad se zna pravi domen, jedan find-and-replace kroz projekat je dovoljan.
Svi interni linkovi i putevi do resursa su **relativni**, pa sajt radi i na root domenu i u
podfolderu (npr. `korisnik.github.io/teotim/`) bez ikakve izmene.

## Konvencije u kodu

- **CSS**: jedan fajl, numerisane sekcije u zaglavlju, CSS custom properties za boje i fontove
  (`:root`). Klase su semantične i pisane blok-elementom (`.ref__media`, `.svc-card`).
  Bez `!important` osim u `prefers-reduced-motion` bloku.
- **Breakpointi**: 1024 px (tablet), 760 px (telefon), 600 px (footer), 480 px (mali telefon).
- **JS**: jedan IIFE, tri nezavisne funkcije, bez zavisnosti. Ako se `main.js` ne izvrši, klasa
  `no-js` na `<html>` ostaje i sav sadržaj je vidljiv — animacije su jedini gubitak.
- **Slike**: sve nose `width`/`height` (bez CLS-a), `loading="lazy"` ispod prvog ekrana.
  Hero se preloaduje i nikad nije lazy (LCP element).
- **Pristupačnost**: `aria-current` na aktivnoj stranici, `aria-expanded` na FAQ dugmadima,
  `aria-pressed` na filterima, skip link, vidljiv `:focus-visible`, poštuje
  `prefers-reduced-motion`.

## SEO i AI SEO

- Po stranici: jedinstven `title`, `meta description`, `canonical`, Open Graph, jedan `<h1>`,
  uređena `h2`/`h3` hijerarhija, `alt` na svim sadržajnim slikama.
- JSON-LD: `LocalBusiness` + `ProfessionalService` (naziv, adresa, telefoni, e-mail, radno vreme,
  područje rada, katalog usluga), `WebSite`, `FAQPage` na početnoj, `BreadcrumbList` i
  `CollectionPage` / `ContactPage` na podstranama.
- `llms.txt` u korenu: pun tekstualni sažetak firme, usluga, mašina i čestih pitanja za AI
  pretraživače.
- Strukturirani podaci sadrže **samo** ono što je vidljivo na sajtu. Nema izmišljenih ocena,
  cena ni sertifikata.

## Hosting

Radi bez izmena na GitHub Pages, Netlify, Vercel i klasičnom shared hostingu — samo se sadržaj
foldera prebaci u web root. Nema serverskog koda ni forme, pa nema backend zavisnosti; kontakt
ide isključivo preko `tel:` i `mailto:` linkova.

## Otvorena pitanja za vlasnika

Tri podatka na sajtu treba potvrditi ili zameniti pre nego što sajt ide u produkciju:

1. Brojevi u traci na početnoj (`10+` godina, `500+` opremljenih mašina) — ako nisu tačni, treba
   ih ispraviti ili izbaciti.
2. Tri preporuke klijenata na početnoj strani su primeri, bez potvrđenog izvora. Zato **nisu**
   uključene u strukturirane podatke (Google zabranjuje izmišljene ocene). Treba ih zameniti
   pravim izjavama ili ukloniti.
3. Reference sa oznakom „Fotografija u pripremi“ čekaju prave fotografije sa terena.

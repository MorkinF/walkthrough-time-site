# Walk Through Time — promo-site

Statische landingspagina voor de app **Walk Through Time** (zie `C:\Projects\deventer-tijdreis`).
Pure HTML + CSS + vanilla JavaScript, geen build-stap.

## Structuur

```
index.html                Landingspagina (tweetalig NL/EN via data-i18n)
privacy-policy.html       Privacybeleid NL (zelfde inhoud als de store-versie)
privacy-policy-en.html    Privacybeleid EN
css/style.css             Alle styling (huisstijl van de app)
js/main.js                Taalwissel + navigatie + reconstructie-slider + aanmeldformulier
images/                   Foto's (.webp), app-icon, favicons, og-image
images/screenshots/       App-screenshots (.webp) voor de "Zo ziet de app eruit"-sectie
scripts/optimize-images.py  Resize + WebP-export + favicon-set (PIL). Zie kop in het bestand.
robots.txt / sitemap.xml  SEO
app-ads.txt               AdMob-autorisatie (publisher-ID)
netlify.toml              Netlify-config (alleen nodig bij Git-deploy)
```

> **Afbeeldingen wijzigen?** Leg het origineel in `images/` en draai
> `python scripts/optimize-images.py` (of `--screenshots` voor de app-captures).
> Het script maakt de lichte `.webp`-varianten die de pagina toont; de originele
> JPG/PNG's blijven als bron staan.

## Lokaal bekijken

Open een terminal in deze map en start een simpele webserver:

```bash
python -m http.server 8000
```

Ga daarna naar <http://localhost:8000>. (Open `index.html` niet rechtstreeks via `file://` —
dan werkt het aanmeldformulier-script niet goed.)

> Het **aanmeldformulier** werkt lokaal nog niet écht: het verstuurt naar Netlify, en die backend
> is er pas na deployen. Lokaal zie je daarom de foutmelding-fallback. Dat is normaal.

## Tweetalig (NL / EN)

De teksten staan in één woordenboek bovenin `js/main.js` (`translations.nl` en `translations.en`).
In de HTML markeren `data-i18n="sleutel"`-attributen welke tekst vertaald wordt. Wil je een tekst
wijzigen? Pas 'm aan in **beide** talen in dat woordenboek (niet in de HTML — de HTML-tekst is enkel
de Nederlandse standaard die getoond wordt vóór het script draait).

Standaardtaal is Nederlands; de keuze van de bezoeker wordt onthouden in de browser.

## Deployen naar Netlify

> 📋 **Volledige stap-voor-stap (GitHub → Netlify → eigen domein): zie [`DEPLOY.md`](DEPLOY.md).**

Twee manieren — kies er één:

**A. Drag-and-drop (snelst, geen account-koppeling nodig)**
1. Log in op <https://app.netlify.com>.
2. Sleep de **inhoud van deze map** naar het "deploys"-vak ("Want to deploy a new site without
   connecting to Git? Drag and drop your site folder here").
3. Klaar — je krijgt direct een `random-naam.netlify.app`-URL.
   Bij een update: opnieuw slepen. (Dit is dezelfde methode die nu voor de privacy-policy gebruikt wordt.)

**B. Gekoppeld aan Git (automatisch opnieuw deployen bij elke push)**
1. Push deze map naar een GitHub-repo (er is nu nog geen remote ingesteld).
2. In Netlify: "Add new site" → "Import an existing project" → kies de repo.
3. Build command leeg laten, publish directory `.` (staat al in `netlify.toml`).

### Eigen domein koppelen (`walkthrough-time.com`)

1. In Netlify: **Site configuration → Domain management → Add a domain** → `walkthrough-time.com`.
2. Stel bij je domeinregistrar de DNS in zoals Netlify aangeeft. Twee opties:
   - **Netlify DNS** (makkelijkst): zet de nameservers van je domein om naar de servers die Netlify toont.
   - **Of A/CNAME-records**: een `A`-record naar Netlify's load-balancer + een `CNAME` voor `www`.
3. SSL (`https://`) regelt Netlify daarna automatisch en gratis via Let's Encrypt — niets te doen.

### Aanmeldingen ontvangen (Netlify Forms)

Het formulier wordt automatisch herkend (het heeft `data-netlify="true"`). Inzendingen verschijnen
in Netlify onder **Forms**. Zet daar een **e-mailnotificatie** aan (Forms → Settings → Form
notifications) zodat je een mailtje krijgt bij elke nieuwe aanmelding.

## Wat kost dit? (Netlify gratis "Starter"-plan)

De gratis tier vraagt **geen creditcard**, dus je kunt niet per ongeluk geld kwijtraken — je raakt
hooguit een limiet en krijgt dan een waarschuwing. Je betaalt pas als je zélf upgrade.

| Wat | Gratis inbegrepen (per maand) | Voor deze site |
|---|---|---|
| Bandbreedte | 100 GB | Tienduizenden bezoekers. Geen punt. |
| Build-minuten | 300 | N.v.t. (geen build). |
| Custom domain + HTTPS + DNS | Gratis | Domein koppelen, SSL en DNS kosten niets. |
| **Netlify Forms** | **100 inzendingen** | De enige limiet die je realistisch raakt. Daarboven worden extra aanmeldingen geweigerd tot de volgende maand. |

Wil je die 100 formulier-inzendingen vermijden: vervang het formulier door een `mailto:`-knop, of
gebruik een gratis nieuwsbrief-dienst (Buttondown ~100 abonnees, Mailchimp ~500 contacten).
Limieten zoals bekend begin 2026 — check de actuele <https://www.netlify.com/pricing/>.

## ⚠️ Privacy-URL: blijft (voorlopig) op de netlify-subdomein

**Beslissing (juli 2026):** deze marketingsite komt op **`walkthrough-time.com`**, maar de
**privacy-URL van de stores blijft `https://walkthroughtime.netlify.app/`** (de root serveert daar
het privacybeleid als `index.html`, en beide stores + AdMob linken daarnaartoe). Die netlify-host
**niet aanraken/overschrijven** met deze site.

- **iOS** — de privacy-URL (en Marketing-URL) in App Store Connect zijn **vergrendeld zolang de app
  live is**; pas te wijzigen bij een nieuwe versie. Dus voorlopig blijft iOS naar de netlify-URL wijzen.
- **Play** — het privacy-veld is wél altijd aanpasbaar. Optioneel later ompunten naar
  `https://walkthrough-time.com/privacy-policy.html` (Play Console → Beleid → App-content → Privacybeleid).

Deze site draagt zijn eigen `privacy-policy.html` + `app-ads.txt` al mee, dus zo'n migratie kan later
zonder herwerk. Tot die tijd: laat de netlify-URL gewoon in de lucht.

## Losse eindjes / opties

- **Contact-e-mail**: footer en privacy gebruiken `walkthroughtime0570@gmail.com` (consistent met de
  stores). Wil je `info@walkthrough-time.com`? Richt dan eerst die mailbox op het domein in en pas
  het adres aan in `index.html` (footer) en `privacy-policy.html`.
- **og-image** (`images/og-image.jpg`, de afbeelding die je in WhatsApp/social ziet): afgeleid van de
  feature graphic van de app. Opnieuw genereren? Pas de bron aan in
  `deventer-tijdreis/scripts/generate-feature-graphic.py` en zet 'm via PIL om naar 1200×630.
- **Store-knoppen** zijn **live** (juli 2026): echte links naar de App Store
  (`apps.apple.com/app/id6764508617`) en Google Play
  (`play.google.com/store/apps/details?id=com.jouwgeschiedenis.deventertijdreis`). De CTA heeft nu de
  download-knoppen als hoofd-actie, met daaronder een kleine nieuwsbrief-opt-in voor nieuwe steden.

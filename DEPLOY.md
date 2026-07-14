# Deploy-handleiding — walkthrough-time.com

Stap-voor-stap om deze site live te zetten op Netlify met je eigen domein, met
**automatisch deployen bij elke `git push`** (GitHub-koppeling).

> Volgorde: **Fase 1** (GitHub) → **Fase 2** (Netlify koppelen) → **Fase 3** (domein + DNS) → **Fase 4** (afronden).
> Vink af wat je gedaan hebt. Commando's draai je in een terminal in de map
> `C:\Projects\walkthrough-time-site`.

---

## Fase 1 — Code op GitHub zetten

### 1.1 Maak een lege GitHub-repo
- [ ] Ga naar <https://github.com/new>
- [ ] **Repository name:** `walkthrough-time-site`
- [ ] **Public** of **Private** — allebei werken met Netlify (public is prima; er staan geen keys/wachtwoorden in deze repo)
- [ ] ⚠️ **Vink NIETS aan** bij "Initialize this repository" (geen README, geen .gitignore, geen license). Die hebben we al lokaal — een lege repo voorkomt een botsing.
- [ ] Klik **Create repository**
- [ ] Kopieer de URL die eindigt op `.git`, bijv. `https://github.com/MorkinF/walkthrough-time-site.git`

### 1.2 Koppel de lokale map aan GitHub
Vervang de URL door die van jou:
```bash
git remote add origin https://github.com/MorkinF/walkthrough-time-site.git
```

### 1.3 Push je code (eenmalig inloggen via browser)
```bash
git push -u origin master
```
- De eerste keer opent **Git Credential Manager** een browservenster om bij GitHub in te loggen. Doe dat eenmalig; daarna onthoudt hij het en gaat pushen vanzelf.
- In Claude Code kun je dit commando ook draaien door in de prompt `! git push -u origin master` te typen — dan verschijnt de uitvoer (en de login-popup) direct in je sessie.

- [ ] `git remote add` gedaan
- [ ] `git push` gelukt — je code staat nu op GitHub

> **Updates voortaan:** wijziging maken → `git add -A` → `git commit -m "..."` → `git push`.
> Netlify pikt elke push automatisch op (na Fase 2).

---

## Fase 2 — Repo koppelen aan Netlify

- [ ] Log in op <https://app.netlify.com> (kan met je GitHub-account)
- [ ] Klik **Add new site → Import an existing project**
- [ ] Kies **GitHub**, autoriseer Netlify, selecteer de repo `walkthrough-time-site`
- [ ] Build-instellingen — laat ze zoals ze zijn:
  - **Build command:** *leeg laten*
  - **Publish directory:** `.` (staat al in `netlify.toml`)
- [ ] Klik **Deploy site**
- [ ] Na ~1 min ben je live op een tijdelijke URL als `random-naam.netlify.app` — open 'm en check of alles klopt

> Tip: hernoem de site naar iets herkenbaars onder **Site configuration → Change site name**
> (bijv. `walkthrough-time` → `walkthrough-time.netlify.app`).

---

## Fase 3 — Eigen domein koppelen (walkthrough-time.com)

- [ ] In Netlify: **Site configuration → Domain management → Add a domain** → typ `walkthrough-time.com`
- [ ] Netlify vraagt om DNS in te stellen bij je domeinregistrar (waar je het domein gekocht hebt). Twee opties:

  **Optie A — Netlify DNS (makkelijkst):**
  - [ ] Netlify toont een lijstje **nameservers** (bijv. `dns1.p0X.nsone.net`, …)
  - [ ] Zet bij je registrar de nameservers van het domein om naar die van Netlify
  - [ ] Wachten tot het doorzet (meestal 1–4 uur, soms tot 24u)

  **Optie B — DNS-records bij je huidige registrar laten:**
  - [ ] Voeg een **A-record** toe voor `walkthrough-time.com` → het IP dat Netlify opgeeft (`75.2.60.5`)
  - [ ] Voeg een **CNAME** toe voor `www` → `<jouw-site>.netlify.app`

- [ ] **HTTPS (slotje):** zodra DNS klopt, regelt Netlify automatisch en gratis een SSL-certificaat (Let's Encrypt). Niets te doen — even afwachten tot het op "active" staat.
- [ ] Zet eventueel **www → non-www** (of andersom) als voorkeur in Domain management.

---

## Fase 4 — Afronden

### 4.1 Aanmeldingen ontvangen (Netlify Forms)
- [ ] Het formulier wordt automatisch herkend (`data-netlify="true"`). Test een aanmelding op de live site.
- [ ] Zet een mailnotificatie aan: **Forms → Settings → Form notifications → Add notification → Email**, naar `walkthroughtime0570@gmail.com`.

### 4.2 ⚠️ Privacy-URL blijft op de netlify-subdomein
De stores + AdMob linken naar `https://walkthroughtime.netlify.app/` (root = het privacybeleid).
Die host **niet overschrijven** met deze marketingsite — laat 'm gewoon in de lucht.
- [ ] iOS: privacy-/Marketing-URL zijn vergrendeld zolang de app live is → blijven voorlopig op netlify.
- [ ] Play: optioneel later ompunten naar `https://walkthrough-time.com/privacy-policy.html`
  (Play Console → Beleid → App-content → Privacybeleid). Niet verplicht.

### 4.3 Store-knoppen — ✅ al live
De store-knoppen zijn al echte links (App Store + Google Play), de app staat publiek in beide stores
(juli 2026). Niets meer te doen. Toekomstige tekst-/beeldwijzigingen: aanpassen → committen → pushen →
Netlify redeployt vanzelf.

---

## Kosten (Netlify gratis "Starter")
Geen creditcard nodig, dus geen verrassingen. Enige limiet die je realistisch raakt:
**Netlify Forms = 100 aanmeldingen/maand** gratis. Zie `README.md` voor de volledige tabel.

## Even vastgelopen?
- **Push wordt geweigerd / "remote contains work you don't have":** je hebt per ongeluk de repo tóch met een README geïnitialiseerd. Oplossing: `git pull origin master --allow-unrelated-histories` en daarna opnieuw pushen — of de repo verwijderen en leeg opnieuw aanmaken.
- **Netlify deployt een oude versie:** check of je push echt op GitHub staat (`git log origin/master`).
- **Domein werkt nog niet:** DNS heeft tijd nodig. Check met <https://dnschecker.org>.

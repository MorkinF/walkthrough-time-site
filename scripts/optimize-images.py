"""
Optimaliseer de site-afbeeldingen: resize + WebP-export + favicon-set.

Waarom: de bron-afbeeldingen in images/ zijn 1,3-2,5 MB (foto's op volle
resolutie). Voor een landingspagina is dat veel te zwaar — het kost bezoekers
laadtijd en verbruikt Netlify-bandbreedte. Dit script maakt lichte WebP-varianten
op weergavegrootte en een nette favicon-set, zonder de originelen te overschrijven
(die blijven als bron/back-up staan).

Idempotent: opnieuw draaien overschrijft simpelweg de output. Zonder argumenten
verwerkt het de content-afbeeldingen + favicons; met --screenshots ook de
app-screenshots (zie SCREENSHOTS onderin).

Gebruik:
    python scripts/optimize-images.py
    python scripts/optimize-images.py --screenshots
"""

import os
import sys
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
IMAGES = os.path.join(HERE, "..", "images")

# Bron-afbeelding -> (output-naam, max-breedte in px, WebP-kwaliteit).
# Alleen afbeeldingen die de site daadwerkelijk toont; de niet-gebruikte
# _restored-varianten slaan we over.
CONTENT = [
    # Comparison-slider (getoond tot ~720px breed, retina -> 1600 is ruim).
    # De 1750-gravure heeft veel fijne lijndetails -> comprimeert zwaar; 1200px/q78
    # houdt 'm scherp genoeg voor de ~720px-slider zonder een dik bestand.
    ("grotekerkhof_original.jpg", "grotekerkhof_original.webp", 1200, 78),
    ("grotekerkhof_restored.png", "grotekerkhof_restored.webp", 1600, 82),
    # Berkelpoort (Zutphen) — foto-reconstructie, tweede slider.
    ("berkelpoort_original.jpg", "berkelpoort_original.webp", 1400, 82),
    ("berkelpoort_restored.png", "berkelpoort_restored.webp", 1400, 82),
    # (brink blijft als bron staan maar wordt niet meer op de pagina getoond)
    ("brink_original.jpg", "brink_original.webp", 1600, 82),
    ("brink_restored.png", "brink_restored.webp", 1600, 82),
    # Locatiekaarten (getoond ~340px, aspect 3/4 -> 900 dekt retina).
    ("waag_original.jpg", "waag_original.webp", 900, 82),
    ("lebuinuskerk_original.jpg", "lebuinuskerk_original.webp", 900, 82),
    ("drieharingen_original.jpg", "drieharingen_original.webp", 900, 82),
    ("walburgiskerk_original.jpg", "walburgiskerk_original.webp", 900, 82),
    ("drogenapstoren_original.jpg", "drogenapstoren_original.webp", 900, 82),
    # Hero-achtergrond (background-size 150%) + locatiekaart -> grotere bron.
    ("deventer-1899.png", "deventer-1899.webp", 1600, 82),
]

# Favicon-set uit het app-icoon (1024x1024). De losse PNG's zijn licht en
# vervangen het gebruik van het 845 KB-icon.png als favicon.
FAVICONS = [
    ("favicon-16.png", 16),
    ("favicon-32.png", 32),
    ("apple-touch-icon.png", 180),
    ("icon-96.png", 96),  # gebruikt in nav-logo + footer
]

# App-screenshots: (bron in de app-repo, output-naam). Ingekort naar ~600px
# breed voor de phone-frames op de site. Alleen met --screenshots.
APP_REPO_RAW = os.path.join(
    HERE, "..", "..", "deventer-tijdreis", "assets", "store", "screenshots-raw"
)
SCREENSHOTS = [
    # (bronbestand in screenshots-raw/, output-naam). Volgorde = exact die van de
    # Play Store-listing (= de gebrande 01-08 uit de app-repo generate-screenshots.py).
    ("Screenshot_20260610_114643_Walk Through Time.jpg", "01-map.webp"),          # kaart + locaties
    ("Screenshot_20260610_114822_Walk Through Time.jpg", "02-compare.webp"),      # voor/na-slider
    ("Screenshot_20260610_114844_Walk Through Time.jpg", "03-audio.webp"),        # audio-speler
    ("Screenshot_20260610_114638_Walk Through Time.jpg", "04-overlay.webp"),      # historische overlay
    ("Screenshot_20260610_114430_Walk Through Time.jpg", "05-city.webp"),         # stadsgeschiedenis
    ("Screenshot_20260610_114459_Walk Through Time.jpg", "06-routes.webp"),       # wandelroutes
    ("Screenshot_20260610_114526_Walk Through Time.jpg", "07-route-detail.webp"), # route-detail
    ("Screenshot_20260610_111402_Walk Through Time.jpg", "08-badges.webp"),       # badges
]


def resize_to_width(img, max_w):
    """Schaal alleen naar beneden zodat de breedte <= max_w; aspect blijft."""
    w, h = img.size
    if w <= max_w:
        return img
    new_h = round(h * max_w / w)
    return img.resize((max_w, new_h), Image.LANCZOS)


def to_webp(src_name, out_name, max_w, quality):
    src = os.path.join(IMAGES, src_name)
    out = os.path.join(IMAGES, out_name)
    if not os.path.exists(src):
        print(f"  ! overslaan (bron ontbreekt): {src_name}")
        return
    img = Image.open(src)
    # WebP verwacht RGB of RGBA; grijswaarden (L) en palet (P) omzetten.
    if img.mode in ("RGBA", "LA") or ("transparency" in img.info):
        img = img.convert("RGBA")
    else:
        img = img.convert("RGB")
    img = resize_to_width(img, max_w)
    img.save(out, "WEBP", quality=quality, method=6)
    kb = os.path.getsize(out) // 1024
    print(f"  {src_name:32s} -> {out_name:28s} {img.size[0]}x{img.size[1]}  {kb} KB")


BRAND_TERRACOTTA = (200, 75, 49)  # #C84B31


def fill_white(base):
    """Vervang witte/grijze (neutraal-lichte) pixels door de kaderkleur van het icoon.

    Pakt zowel de achtergrond ALS het lichte strookje onderaan het icoon. Truc:
    de crème kaart is wárm (rood >> blauw), terwijl het ongewenste wit neutraal is
    (R~G~B). Dus vullen we alleen pixels die licht én neutraal zijn; de kaart blijft.

    De vulkleur wordt uit het icoon zélf bemonsterd (de mediaan van het rode kader),
    zodat de opgevulde hoeken exact dezelfde tint hebben als de rand van het icoon.
    """
    import numpy as np

    arr = np.array(base.convert("RGB"))
    v = arr.astype(int)
    # Donkerrode rand rond de plattegrond: de dominante donkere band (geen lichte
    # bevel-glans). Sluit crème (warm licht) + navy (blauw) uit. Mediaan ~#9A2303.
    frame = (v[:, :, 0] > 120) & (v[:, :, 0] < 185) & (v[:, :, 2] < 40) & (v[:, :, 1] < 70)
    color = (tuple(int(x) for x in np.median(v[frame], axis=0).round())
             if frame.any() else BRAND_TERRACOTTA)
    mn = v.min(axis=2)
    spread = v.max(axis=2) - mn
    neutral_light = (mn > 214) & (spread < 24)
    arr[neutral_light] = color
    return Image.fromarray(arr.astype("uint8"), "RGB")


def crop_to_logo(base, pad_frac=0.0):
    """Snijd de uniforme (bijna-witte) rand rond het logo weg en maak het vierkant.

    icon.png heeft ~15% witte marge rond het logo; die zie je terug als een witte
    rand in het tab-icoontje. Deze crop laat het logo de favicon vullen.
    """
    import numpy as np

    arr = np.array(base)
    rgb = arr[:, :, :3].astype(int)
    alpha = arr[:, :, 3]
    near_white = (rgb[:, :, 0] > 245) & (rgb[:, :, 1] > 245) & (rgb[:, :, 2] > 245)
    content = ~(near_white | (alpha < 10))
    ys, xs = np.where(content)
    if len(xs) == 0:
        return base
    cx, cy = (xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2
    half = max(xs.max() - xs.min(), ys.max() - ys.min()) / 2 * (1 + pad_frac)
    W, H = base.size
    box = (max(0, int(cx - half)), max(0, int(cy - half)),
           min(W, int(cx + half)), min(H, int(cy + half)))
    return base.crop(box)


def make_favicons():
    src = os.path.join(IMAGES, "icon.png")
    if not os.path.exists(src):
        print("  ! icon.png ontbreekt, favicons overgeslagen")
        return
    base = crop_to_logo(Image.open(src).convert("RGBA"))
    base = fill_white(base).convert("RGBA")
    for name, size in FAVICONS:
        out = os.path.join(IMAGES, name)
        base.resize((size, size), Image.LANCZOS).save(out, "PNG", optimize=True)
        kb = os.path.getsize(out) // 1024
        print(f"  icon.png -> {name:24s} {size}x{size}  {kb} KB")


def make_screenshots():
    if not SCREENSHOTS:
        print("  (geen screenshots geconfigureerd)")
        return
    out_dir = os.path.join(IMAGES, "screenshots")
    os.makedirs(out_dir, exist_ok=True)
    for src_name, out_name in SCREENSHOTS:
        src = os.path.join(APP_REPO_RAW, src_name)
        out = os.path.join(out_dir, out_name)
        if not os.path.exists(src):
            print(f"  ! overslaan (bron ontbreekt): {src_name}")
            continue
        img = Image.open(src).convert("RGB")
        img = resize_to_width(img, 600)
        img.save(out, "WEBP", quality=80, method=6)
        kb = os.path.getsize(out) // 1024
        print(f"  {out_name:20s} {img.size[0]}x{img.size[1]}  {kb} KB")


def main():
    print("Content-afbeeldingen -> WebP:")
    for args in CONTENT:
        to_webp(*args)
    print("Favicon-set:")
    make_favicons()
    if "--screenshots" in sys.argv:
        print("App-screenshots:")
        make_screenshots()


if __name__ == "__main__":
    main()

/* ============================================
   Walk Through Time — Landing Page Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initNavigation();
  initScrollAnimations();
  initImageComparison();
  initSignupForm();
});

/* ============================================
   Translations (NL default + EN)
   ============================================ */
const translations = {
  nl: {
    'meta.title': 'Walk Through Time — Ontdek de verborgen geschiedenis van je stad',
    'meta.description': "Wandel door eeuwen geschiedenis in historische Nederlandse steden. Een audio-tour app met ingekleurde reconstructies van het verleden, historische kaarten en 31 locaties in Deventer en Zutphen — meer steden volgen.",

    'nav.features': 'Functies',
    'nav.discover': 'Ontdek',
    'nav.app': 'De app',
    'nav.locations': 'Locaties',
    'nav.cta': 'Download',

    'hero.badge': 'Nu gratis in de App Store & Google Play',
    'hero.title': 'Wandel door de <span>tijd</span>',
    'hero.text': 'Ontdek eeuwen geschiedenis, verborgen in de straten om je heen. Luister naar verhalen, vergelijk verleden en heden, en zie de stad zoals die er lang geleden uitzag.',
    'hero.cta_primary': 'Download gratis',
    'hero.cta_secondary': 'Bekijk hoe het werkt',

    'features.title': 'Geschiedenis komt tot leven',
    'features.subtitle': 'Zes manieren om de rijke geschiedenis van een stad te beleven, direct vanaf je telefoon.',
    'feature.audio.title': 'Audio-verhalen op locatie',
    'feature.audio.text': 'Elke plek heeft zijn eigen verteld verhaal. Doe je oortjes in, wandel door de stad en laat de geschiedenis tot je spreken — ook met je scherm uit. Een overkoepelende stadsgeschiedenis luister je als introductie.',
    'feature.photo.title': 'Het verleden tot leven',
    'feature.photo.text': 'Schuif van een oude foto of prent naar een ingekleurde reconstructie en zie hoe een plek er vroeger werkelijk uitzag — alsof een tijdmachine je er middenin zet.',
    'feature.map.title': 'Historische kaarten',
    'feature.map.text': 'Leg eeuwenoude stadsplattegronden over de huidige kaart. Schakel zelf welke kaart je onder je voeten ziet verschijnen.',
    'feature.routes.title': 'Wandelroutes & navigatie',
    'feature.routes.text': 'Kant-en-klare routes door themagebieden zoals de Hanze of religieus erfgoed, inclusief voetgangersnavigatie van plek naar plek.',
    'feature.arrival.title': 'Aankomst-meldingen',
    'feature.arrival.text': 'Krijg een trilling en melding zodra je bij een nieuwe locatie aankomt — zelfs met je telefoon in je broekzak. Geen vaste route nodig.',
    'feature.badges.title': 'Badges & voortgang',
    'feature.badges.text': 'Verzamel een badge bij elke bezochte locatie. Maak een herstelcode aan om je voortgang mee te nemen naar een ander toestel.',

    'comparison.title': 'Stap in het verleden',
    'comparison.subtitle': 'Sleep de schuif van het originele archiefbeeld naar de ingekleurde reconstructie.',
    'comparison.before': 'Origineel',
    'comparison.after': 'Reconstructie',
    'comparison.caption': 'Grote Kerkhof, Deventer — een gravure uit circa 1750, opnieuw tot leven gewekt',
    'comparison.caption2': 'Berkelpoort, Zutphen — een oude foto opnieuw ingekleurd',
    'comparison.slider_aria': 'Schuif om voor en na te vergelijken',

    'screens.title': 'Zo ziet de app eruit',
    'screens.subtitle': 'Een kijkje in Walk Through Time — van interactieve kaart tot audio en badges.',
    'screens.map': 'Ontdek verhalen om je heen',
    'screens.compare': 'Schuif tussen toen en nu',
    'screens.audio': 'Luister ter plekke',
    'screens.overlay': 'Leg het verleden over het heden',
    'screens.city': 'Begin met de stadsgeschiedenis',
    'screens.routes': 'Volg kant-en-klare routes',
    'screens.routedetail': 'Volg de route, stap voor stap',
    'screens.badges': 'Verzamel badges onderweg',

    'how.title': 'Hoe het werkt',
    'how.subtitle': 'In drie eenvoudige stappen begin je je reis door de tijd.',
    'step.download.title': 'Download',
    'step.download.text': 'Download de gratis app en loop de historische binnenstad in. Werkt het best op locatie — maar verkennen vanuit huis kan ook.',
    'step.explore.title': 'Verken',
    'step.explore.text': 'De app merkt wanneer je in de buurt van een historische plek bent. Wandel op je eigen tempo — er is geen vaste route.',
    'step.discover.title': 'Ontdek',
    'step.discover.text': "Luister naar verhalen, vergelijk oude foto's en ontdek de verborgen geschiedenis van de stad om je heen.",

    'locations.title': '31 locaties om te ontdekken',
    'locations.subtitle': 'Middeleeuwse kerken, Hanze-pakhuizen, eeuwenoude marktpleinen — elk met zijn eigen verhaal.',
    'locations.waag': 'Deventer · waaggebouw, 1528',
    'locations.lebuinus': 'Deventer · gesticht in de 8e eeuw',
    'locations.brink': 'Deventer · eeuwenoud marktplein',
    'locations.drieharingen': 'Deventer · Hanze-pakhuizen, 1575',
    'locations.walburgis': 'Zutphen · middeleeuwse kerk',
    'locations.drogenap': 'Zutphen · stadstoren, 1444',
    'locations.multicity': 'In Deventer en Zutphen — meer steden volgen.',

    'cta.title': 'Nu gratis te downloaden',
    'cta.text': 'Walk Through Time is te downloaden in de App Store en Google Play. Download gratis en stap terug in de tijd.',
    'store.apple_small': 'Download in de',
    'store.apple_aria': 'Download Walk Through Time in de App Store',
    'store.google_small': 'Ontdek het op',
    'store.google_aria': 'Ontdek Walk Through Time op Google Play',
    'newsletter.title': 'Blijf op de hoogte van nieuwe steden',
    'newsletter.text': 'Deventer is nog maar het begin — Zutphen en meer steden volgen. Laat je e-mail achter, dan laten we het je weten.',
    'form.placeholder': 'jouw@email.nl',
    'form.button': 'Hou me op de hoogte',
    'form.note': 'We gebruiken je e-mail alleen voor nieuws over nieuwe steden — niets anders.',
    'form.success': 'Bedankt! We laten het je weten zodra er een nieuwe stad live is.',
    'form.error': 'Er ging iets mis. Mail ons gerust op walkthroughtime0570@gmail.com.',

    'footer.privacy': 'Privacybeleid',
    'footer.privacy_href': 'privacy-policy.html',
    'footer.contact': 'Contact',
  },

  en: {
    'meta.title': 'Walk Through Time — Discover the Hidden History of Your City',
    'meta.description': 'Walk through centuries of history in historic Dutch cities. An audio tour app with colour reconstructions of the past, historical maps, and 31 locations across Deventer and Zutphen — with more cities on the way.',

    'nav.features': 'Features',
    'nav.discover': 'Discover',
    'nav.app': 'The app',
    'nav.locations': 'Locations',
    'nav.cta': 'Download',

    'hero.badge': 'Now free on the App Store & Google Play',
    'hero.title': 'Walk Through <span>Time</span>',
    'hero.text': 'Discover centuries of history hidden in the streets around you. Listen to stories, compare past and present, and see the city as it once was.',
    'hero.cta_primary': 'Download free',
    'hero.cta_secondary': 'See how it works',

    'features.title': 'History Comes Alive',
    'features.subtitle': "Six ways to experience a city's rich past, right from your phone.",
    'feature.audio.title': 'Audio stories on location',
    'feature.audio.text': 'Every place has its own narrated story. Put in your earbuds, walk through the city, and let history speak to you — even with your screen off. An overarching city history plays as an introduction.',
    'feature.photo.title': 'The past brought to life',
    'feature.photo.text': 'Slide from an old photo or print to a colour reconstruction and see how a place really looked back then — as if a time machine dropped you right into the scene.',
    'feature.map.title': 'Historical maps',
    'feature.map.text': "Lay centuries-old city maps over today's streets. Toggle which map appears beneath your feet as you explore.",
    'feature.routes.title': 'Routes & navigation',
    'feature.routes.text': 'Ready-made routes through themed areas such as the Hanseatic trade or religious heritage, with pedestrian navigation from place to place.',
    'feature.arrival.title': 'Arrival alerts',
    'feature.arrival.text': 'Get a buzz and a notification the moment you reach a new location — even with your phone in your pocket. No fixed route required.',
    'feature.badges.title': 'Badges & progress',
    'feature.badges.text': 'Earn a badge for every location you visit. Create a recovery code to carry your progress over to another device.',

    'comparison.title': 'Step into the past',
    'comparison.subtitle': 'Drag the slider from the original archive image to the colour reconstruction.',
    'comparison.before': 'Original',
    'comparison.after': 'Reconstruction',
    'comparison.caption': 'Grote Kerkhof, Deventer — a circa-1750 engraving, brought back to life',
    'comparison.caption2': 'Berkelpoort, Zutphen — an old photo, freshly colourised',
    'comparison.slider_aria': 'Slide to compare before and after',

    'screens.title': 'A Look Inside the App',
    'screens.subtitle': 'A peek at Walk Through Time — from interactive map to audio and badges.',
    'screens.map': 'Discover stories around you',
    'screens.compare': 'Slide between then and now',
    'screens.audio': 'Listen on the spot',
    'screens.overlay': 'Lay the past over the present',
    'screens.city': "Start with the city's history",
    'screens.routes': 'Follow ready-made routes',
    'screens.routedetail': 'Follow the route, step by step',
    'screens.badges': 'Collect badges as you go',

    'how.title': 'How It Works',
    'how.subtitle': 'Three simple steps to start your journey through time.',
    'step.download.title': 'Download',
    'step.download.text': "Download the free app and step into the historic old town. Works best on location — but feel free to explore from home too.",
    'step.explore.title': 'Explore',
    'step.explore.text': "The app detects when you're near a historic site. Walk at your own pace — there's no fixed route.",
    'step.discover.title': 'Discover',
    'step.discover.text': 'Listen to stories, compare historic photos, and uncover the hidden history of the city around you.',

    'locations.title': '31 Locations to Discover',
    'locations.subtitle': 'Medieval churches, Hanseatic warehouses, centuries-old market squares — each with its own story.',
    'locations.waag': 'Deventer · weighing house, est. 1528',
    'locations.lebuinus': 'Deventer · founded in the 8th century',
    'locations.brink': 'Deventer · centuries-old market square',
    'locations.drieharingen': 'Deventer · Hanseatic warehouses, 1575',
    'locations.walburgis': 'Zutphen · medieval church',
    'locations.drogenap': 'Zutphen · city tower, 1444',
    'locations.multicity': 'In Deventer and Zutphen — more cities coming soon.',

    'cta.title': 'Free to Download Now',
    'cta.text': 'Walk Through Time is available on the App Store and Google Play. Download it free and step back in time.',
    'store.apple_small': 'Download on the',
    'store.apple_aria': 'Download Walk Through Time on the App Store',
    'store.google_small': 'Get it on',
    'store.google_aria': 'Get Walk Through Time on Google Play',
    'newsletter.title': 'Stay posted on new cities',
    'newsletter.text': "Deventer is just the beginning — Zutphen and more cities are on the way. Leave your email and we'll let you know.",
    'form.placeholder': 'you@email.com',
    'form.button': 'Notify me',
    'form.note': "We'll only use your email for news about new cities — nothing else.",
    'form.success': "Thanks! We'll let you know as soon as a new city goes live.",
    'form.error': 'Something went wrong. Feel free to email us at walkthroughtime0570@gmail.com.',

    'footer.privacy': 'Privacy Policy',
    'footer.privacy_href': 'privacy-policy-en.html',
    'footer.contact': 'Contact',
  },
};

/* ============================================
   Language switching
   ============================================ */
const LANG_KEY = 'wtt-lang';
let currentLang = 'nl';

function initLanguage() {
  const saved = localStorage.getItem(LANG_KEY);
  const browser = (navigator.language || 'nl').toLowerCase().startsWith('nl') ? 'nl' : 'en';
  setLanguage(saved || browser);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
}

function setLanguage(lang) {
  if (!translations[lang]) lang = 'nl';
  currentLang = lang;
  const dict = translations[lang];

  document.documentElement.lang = lang;

  // Plain text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = dict[el.dataset.i18n];
    if (value !== undefined) el.textContent = value;
  });

  // Nodes that contain inline markup (e.g. <span>)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const value = dict[el.dataset.i18nHtml];
    if (value !== undefined) el.innerHTML = value;
  });

  // Input placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const value = dict[el.dataset.i18nPlaceholder];
    if (value !== undefined) el.setAttribute('placeholder', value);
  });

  // Links whose target differs per language (e.g. the privacy page)
  document.querySelectorAll('[data-i18n-href]').forEach(el => {
    const value = dict[el.dataset.i18nHref];
    if (value !== undefined) el.setAttribute('href', value);
  });

  // Accessible names that need translating (e.g. the store links)
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const value = dict[el.dataset.i18nAriaLabel];
    if (value !== undefined) el.setAttribute('aria-label', value);
  });

  // Document <title> + meta description
  if (dict['meta.title']) document.title = dict['meta.title'];
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && dict['meta.description']) metaDesc.setAttribute('content', dict['meta.description']);

  // Active state on the toggle
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });

  // Refresh any visible signup status message in the new language
  const msg = document.querySelector('.signup-message');
  if (msg && !msg.hidden && msg.dataset.msgKey) {
    msg.textContent = dict[msg.dataset.msgKey] || msg.textContent;
  }

  localStorage.setItem(LANG_KEY, lang);
}

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
}

/* ============================================
   Sticky navigation
   ============================================ */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    // Close mobile menu when a navigation link is clicked.
    // Language buttons are excluded so switching language keeps the menu open.
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });
  }
}

/* ============================================
   Scroll reveal animations
   ============================================ */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* ============================================
   Image comparison slider
   ============================================ */
function initImageComparison() {
  // Meerdere sliders op de pagina — initialiseer ze allemaal los van elkaar.
  document.querySelectorAll('.comparison-wrapper').forEach(setupComparison);
}

function setupComparison(wrapper) {
  const beforeImg = wrapper.querySelector('.comparison-img-before');
  const slider = wrapper.querySelector('.comparison-slider');
  const handle = wrapper.querySelector('.comparison-handle');
  let pct = 50;
  let isDragging = false;

  // Single source of truth: set the reveal percentage and reflect it
  // in the visuals + ARIA so mouse, touch and keyboard all agree.
  function setPct(value) {
    pct = Math.max(0, Math.min(100, value));
    beforeImg.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    slider.style.left = pct + '%';
    if (handle) handle.setAttribute('aria-valuenow', Math.round(pct));
  }

  function setFromX(x) {
    const rect = wrapper.getBoundingClientRect();
    setPct(((x - rect.left) / rect.width) * 100);
  }

  // Mouse: start on wrapper, track & release on document so dragging
  // continues even when the cursor leaves the image area
  wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    setFromX(e.clientX);
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setFromX(e.clientX);
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch: same pattern — start on wrapper, track on document
  wrapper.addEventListener('touchstart', (e) => {
    isDragging = true;
    setFromX(e.touches[0].clientX);
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setFromX(e.touches[0].clientX);
  }, { passive: true });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Keyboard: arrows nudge, Home/End jump to the extremes
  if (handle) {
    handle.addEventListener('keydown', (e) => {
      const step = e.shiftKey ? 10 : 2;
      let handled = true;
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown': setPct(pct - step); break;
        case 'ArrowRight':
        case 'ArrowUp': setPct(pct + step); break;
        case 'Home': setPct(0); break;
        case 'End': setPct(100); break;
        default: handled = false;
      }
      if (handled) e.preventDefault();
    });
  }
}

/* ============================================
   Signup form (Netlify Forms + progressive enhancement)
   ============================================ */
function initSignupForm() {
  const form = document.querySelector('.signup-form');
  const message = document.querySelector('.signup-message');
  if (!form || !message) return;

  function showMessage(key, isError) {
    message.dataset.msgKey = key;
    message.textContent = t(key);
    message.classList.toggle('is-error', !!isError);
    message.hidden = false;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // URL-encode the form data the way Netlify Forms expects.
    const data = new URLSearchParams(new FormData(form)).toString();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Bad response');
        form.reset();
        form.hidden = true;
        showMessage('form.success', false);
      })
      .catch(() => {
        // No Netlify backend (e.g. local preview) or a network error.
        showMessage('form.error', true);
      });
  });
}

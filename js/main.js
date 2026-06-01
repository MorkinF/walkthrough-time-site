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
    'meta.title': 'Walk Through Time — Ontdek de verborgen geschiedenis van Deventer',
    'meta.description': "Wandel door eeuwen geschiedenis in Deventer. Een audio-tour app met voor/na foto's, historische kaarten en 23 bijzondere locaties om te ontdekken.",

    'nav.features': 'Functies',
    'nav.discover': 'Ontdek',
    'nav.locations': 'Locaties',
    'nav.cta': 'Hou me op de hoogte',

    'hero.badge': 'Gratis audio-wandeling',
    'hero.title': 'Wandel door de <span>tijd</span>',
    'hero.text': 'Ontdek eeuwen geschiedenis, verborgen in de straten van Deventer. Luister naar verhalen, vergelijk verleden en heden, en zie de stad zoals die er lang geleden uitzag.',
    'hero.cta_primary': 'Binnenkort beschikbaar',
    'hero.cta_secondary': 'Bekijk hoe het werkt',

    'features.title': 'Geschiedenis komt tot leven',
    'features.subtitle': 'Zes manieren om de rijke geschiedenis van Deventer te beleven, direct vanaf je telefoon.',
    'feature.audio.title': 'Audio-verhalen op locatie',
    'feature.audio.text': 'Elke plek heeft zijn eigen verteld verhaal. Doe je oortjes in, wandel door de stad en laat de geschiedenis tot je spreken — ook met je scherm uit. Een overkoepelende stadsgeschiedenis luister je als introductie.',
    'feature.photo.title': 'Voor & na',
    'feature.photo.text': "Schuif tussen oude prenten of foto's en de situatie van vandaag. Sommige locaties tonen meerdere paren uit verschillende tijdperken.",
    'feature.map.title': 'Historische kaarten',
    'feature.map.text': 'Leg eeuwenoude stadsplattegronden over de huidige kaart. Schakel zelf welke kaart je onder je voeten ziet verschijnen.',
    'feature.routes.title': 'Wandelroutes & navigatie',
    'feature.routes.text': 'Kant-en-klare routes door themagebieden zoals de Hanze of religieus erfgoed, inclusief voetgangersnavigatie van plek naar plek.',
    'feature.arrival.title': 'Aankomst-meldingen',
    'feature.arrival.text': 'Krijg een trilling en melding zodra je bij een nieuwe locatie aankomt — zelfs met je telefoon in je broekzak. Geen vaste route nodig.',
    'feature.badges.title': 'Badges & voortgang',
    'feature.badges.text': 'Verzamel een badge bij elke bezochte locatie. Maak een herstelcode aan om je voortgang mee te nemen naar een ander toestel.',

    'comparison.title': 'Zie het verschil',
    'comparison.subtitle': 'Sleep de schuif om tussen verleden en heden te reizen.',
    'comparison.before': 'Toen',
    'comparison.after': 'Nu',
    'comparison.caption': 'De Brink — Deventers historische marktplein door de eeuwen heen',

    'how.title': 'Hoe het werkt',
    'how.subtitle': 'In drie eenvoudige stappen begin je je reis door de tijd.',
    'step.download.title': 'Download',
    'step.download.text': 'Haal straks de gratis app op en ga naar het centrum van Deventer. Werkt het best op locatie — maar verkennen vanuit huis kan ook.',
    'step.explore.title': 'Verken',
    'step.explore.text': 'De app merkt wanneer je in de buurt van een historische plek bent. Wandel op je eigen tempo — er is geen vaste route.',
    'step.discover.title': 'Ontdek',
    'step.discover.text': "Luister naar verhalen, vergelijk oude foto's en ontdek de verborgen lagen van de stad om je heen.",

    'locations.title': '23 locaties om te ontdekken',
    'locations.subtitle': 'Middeleeuwse kerken, Hanze-pakhuizen, eeuwenoude marktpleinen — elk met zijn eigen verhaal.',
    'locations.waag': 'Waaggebouw, 1528',
    'locations.lebuinus': 'Gesticht in de 8e eeuw',
    'locations.more_title': 'En nog 20 meer…',
    'locations.more_sub': 'Download om ze allemaal te ontdekken',
    'locations.more': 'Van de <span>Brink</span> tot het <span>Bergkwartier</span> — een wandeling door 1000 jaar geschiedenis.',
    'locations.multicity': 'Beginnend in Deventer — meer steden volgen.',

    'cta.title': 'Klaar om terug in de tijd te stappen?',
    'cta.text': 'De app is bijna klaar. Laat je e-mail achter en we laten het je weten zodra Walk Through Time in de stores verschijnt.',
    'form.placeholder': 'jouw@email.nl',
    'form.button': 'Hou me op de hoogte',
    'form.note': 'We gebruiken je e-mail alleen om je te laten weten dat de app live is — niets anders.',
    'form.success': 'Bedankt! We mailen je zodra de app live is.',
    'form.error': 'Er ging iets mis. Mail ons gerust op walkthroughtime0570@gmail.com.',
    'store.soon': 'Binnenkort op',

    'footer.privacy': 'Privacybeleid',
    'footer.privacy_href': 'privacy-policy.html',
    'footer.contact': 'Contact',
  },

  en: {
    'meta.title': "Walk Through Time — Discover Deventer's Hidden History",
    'meta.description': 'Walk through centuries of history in Deventer. An audio tour app with then-and-now photo comparisons, historical maps, and 23 fascinating locations to discover.',

    'nav.features': 'Features',
    'nav.discover': 'Discover',
    'nav.locations': 'Locations',
    'nav.cta': 'Get notified',

    'hero.badge': 'Free audio tour app',
    'hero.title': 'Walk Through <span>Time</span>',
    'hero.text': 'Discover centuries of history hidden in the streets of Deventer. Listen to stories, compare past and present, and see the city as it once was.',
    'hero.cta_primary': 'Coming soon',
    'hero.cta_secondary': 'See how it works',

    'features.title': 'History Comes Alive',
    'features.subtitle': "Six ways to experience Deventer's rich past, right from your phone.",
    'feature.audio.title': 'Audio stories on location',
    'feature.audio.text': 'Every place has its own narrated story. Put in your earbuds, walk through the city, and let history speak to you — even with your screen off. An overarching city history plays as an introduction.',
    'feature.photo.title': 'Then & Now',
    'feature.photo.text': 'Slide between historical prints or photographs and the present-day view. Some locations show multiple pairs from different eras.',
    'feature.map.title': 'Historical maps',
    'feature.map.text': "Lay centuries-old city maps over today's streets. Toggle which map appears beneath your feet as you explore.",
    'feature.routes.title': 'Routes & navigation',
    'feature.routes.text': 'Ready-made routes through themed areas such as the Hanseatic trade or religious heritage, with pedestrian navigation from place to place.',
    'feature.arrival.title': 'Arrival alerts',
    'feature.arrival.text': 'Get a buzz and a notification the moment you reach a new location — even with your phone in your pocket. No fixed route required.',
    'feature.badges.title': 'Badges & progress',
    'feature.badges.text': 'Earn a badge for every location you visit. Create a recovery code to carry your progress over to another device.',

    'comparison.title': 'See the Difference',
    'comparison.subtitle': 'Drag the slider to travel between past and present.',
    'comparison.before': 'Then',
    'comparison.after': 'Now',
    'comparison.caption': "De Brink — Deventer's historic market square through the ages",

    'how.title': 'How It Works',
    'how.subtitle': 'Three simple steps to start your journey through time.',
    'step.download.title': 'Download',
    'step.download.text': "Soon you'll grab the free app and head to Deventer's city center. Works best on location — but feel free to explore from home too.",
    'step.explore.title': 'Explore',
    'step.explore.text': "The app detects when you're near a historic site. Walk at your own pace — there's no fixed route.",
    'step.discover.title': 'Discover',
    'step.discover.text': 'Listen to stories, compare historic photos, and uncover the hidden layers of the city around you.',

    'locations.title': '23 Locations to Discover',
    'locations.subtitle': 'Medieval churches, Hanseatic warehouses, centuries-old market squares — each with its own story.',
    'locations.waag': 'Weighing house, est. 1528',
    'locations.lebuinus': 'Founded in the 8th century',
    'locations.more_title': 'And 20 More…',
    'locations.more_sub': 'Download to discover them all',
    'locations.more': 'From the <span>Brink</span> to the <span>Bergkwartier</span> — a walk through 1000 years of history.',
    'locations.multicity': 'Starting in Deventer — more cities coming soon.',

    'cta.title': 'Ready to Step Back in Time?',
    'cta.text': "The app is almost ready. Leave your email and we'll let you know the moment Walk Through Time hits the stores.",
    'form.placeholder': 'you@email.com',
    'form.button': 'Notify me',
    'form.note': "We'll only use your email to let you know the app is live — nothing else.",
    'form.success': "Thanks! We'll email you when the app goes live.",
    'form.error': 'Something went wrong. Feel free to email us at walkthroughtime0570@gmail.com.',
    'store.soon': 'Coming soon to',

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
  const wrapper = document.querySelector('.comparison-wrapper');
  if (!wrapper) return;

  const beforeImg = wrapper.querySelector('.comparison-img-before');
  const slider = wrapper.querySelector('.comparison-slider');
  let isDragging = false;

  function updatePosition(x) {
    const rect = wrapper.getBoundingClientRect();
    let pct = ((x - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    beforeImg.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    slider.style.left = pct + '%';
  }

  // Mouse: start on wrapper, track & release on document so dragging
  // continues even when the cursor leaves the image area
  wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    updatePosition(e.clientX);
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    updatePosition(e.clientX);
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch: same pattern — start on wrapper, track on document
  wrapper.addEventListener('touchstart', (e) => {
    isDragging = true;
    updatePosition(e.touches[0].clientX);
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updatePosition(e.touches[0].clientX);
  }, { passive: true });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });
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

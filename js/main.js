/* ============================================
   Walk Through Time — Landing Page Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initImageComparison();
});

/* ---- Sticky Navigation ---- */
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

    // Close mobile menu on link click
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });
  }
}

/* ---- Scroll Reveal Animations ---- */
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

/* ---- Image Comparison Slider ---- */
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

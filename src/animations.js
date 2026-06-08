import gsap from 'gsap';
import Lenis from 'lenis';

export function initAnimations() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  initLenis();
  runEntrance();
  bindHoverMicroInteractions();
}

function initLenis() {
  const lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.4
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Permite que o skip link pule corretamente mesmo com Lenis ativo
  document.querySelector('.skip-link')?.addEventListener('click', (event) => {
    const href = event.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (target) {
      event.preventDefault();
      lenis.scrollTo(target, { offset: -16 });
      target.focus({ preventScroll: true });
    }
  });
}

function runEntrance() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.header', { y: -40, opacity: 0, duration: 0.6 })
    .from('.hero__title', { y: 24, opacity: 0, duration: 0.7 }, '-=0.3')
    .from('.hero__lead', { y: 20, opacity: 0, duration: 0.6 }, '-=0.45')
    .from('.canvas-container', { scale: 0.96, opacity: 0, duration: 0.8 }, '-=0.4')
    .from(
      '.scene-controls > *',
      { y: 14, opacity: 0, duration: 0.45, stagger: 0.06 },
      '-=0.4'
    );

  // Fade-in suave para seções abaixo da dobra
  document.querySelectorAll('.info, .about').forEach((section) => {
    gsap.set(section, { opacity: 0, y: 30 });
    observeOnce(section, () => {
      gsap.to(section, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
    });
  });
}

function bindHoverMicroInteractions() {
  const buttons = document.querySelectorAll('.ctrl-btn, .a11y-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.04, duration: 0.18, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1, duration: 0.18, ease: 'power2.out' });
    });
    btn.addEventListener('focus', () => {
      gsap.to(btn, { scale: 1.04, duration: 0.18, ease: 'power2.out' });
    });
    btn.addEventListener('blur', () => {
      gsap.to(btn, { scale: 1, duration: 0.18, ease: 'power2.out' });
    });
  });
}

function observeOnce(element, callback) {
  if (!('IntersectionObserver' in window)) {
    callback();
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.15 }
  );
  observer.observe(element);
}

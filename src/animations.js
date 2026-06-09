import gsap from 'gsap';
import Lenis from 'lenis';

const ANIMATED_SELECTORS = [
  '.header',
  '.hero__title',
  '.hero__lead',
  '.canvas-container',
  '.scene-controls > *',
  '.info',
  '.about'
];

export function initAnimations() {
  // Rede de segurança: independente do que aconteça, libera o conteúdo em 3s
  const safety = setTimeout(forceVisible, 3000);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    clearTimeout(safety);
    return;
  }

  try {
    initLenis();
    runEntrance(() => clearTimeout(safety));
    bindHoverMicroInteractions();
  } catch (err) {
    console.warn('Falha na inicialização das animações:', err);
    clearTimeout(safety);
    forceVisible();
  }
}

function forceVisible() {
  document.querySelectorAll(ANIMATED_SELECTORS.join(',')).forEach((el) => {
    el.style.opacity = '';
    el.style.transform = '';
    el.style.translate = '';
    el.style.rotate = '';
    el.style.scale = '';
  });
}

function initLenis() {
  const lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.4,
    // Não intercepta rolagem sobre a cena 3D nem sobre o widget do VLibras
    prevent: (node) => {
      if (!(node instanceof Element)) return false;
      if (node.closest('#canvas-container')) return true;
      if (node.closest('[vw]')) return true;
      return false;
    }
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

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

function runEntrance(onDone) {
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out', clearProps: 'all' },
    onComplete: onDone
  });
  tl.from('.header', { y: -40, opacity: 0, duration: 0.6 })
    .from('.hero__title', { y: 24, opacity: 0, duration: 0.7 }, '-=0.3')
    .from('.hero__lead', { y: 20, opacity: 0, duration: 0.6 }, '-=0.45')
    .from('.canvas-container', { scale: 0.96, opacity: 0, duration: 0.8 }, '-=0.4')
    .from(
      '.scene-controls > *',
      { y: 14, opacity: 0, duration: 0.45, stagger: 0.06 },
      '-=0.4'
    );

  document.querySelectorAll('.info, .about').forEach((section) => {
    gsap.set(section, { opacity: 0, y: 30 });
    observeOnce(section, () => {
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'all'
      });
    });
  });
}

function bindHoverMicroInteractions() {
  const buttons = document.querySelectorAll('.ctrl-btn, .a11y-btn');
  buttons.forEach((btn) => {
    const enter = () => gsap.to(btn, { scale: 1.04, duration: 0.18, ease: 'power2.out' });
    const leave = () => gsap.to(btn, { scale: 1, duration: 0.18, ease: 'power2.out' });
    btn.addEventListener('mouseenter', enter);
    btn.addEventListener('mouseleave', leave);
    btn.addEventListener('focus', enter);
    btn.addEventListener('blur', leave);
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

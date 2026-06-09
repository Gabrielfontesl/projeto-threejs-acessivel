import gsap from 'gsap';
import Lenis from 'lenis';

export function initAnimations() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  try {
    initLenis();
  } catch (err) {
    console.warn('Falha ao inicializar Lenis:', err);
  }
  try {
    runEntrance();
  } catch (err) {
    console.warn('Falha na animação de entrada:', err);
  }
  try {
    bindHoverMicroInteractions();
  } catch (err) {
    console.warn('Falha ao ligar micro-interações:', err);
  }
}

function initLenis() {
  const lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.4,
    // Lenis não intercepta rolagem sobre a cena 3D nem sobre o widget do VLibras
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

// Anima APENAS translateY — nunca opacity. Se algo travar a animação, o conteúdo
// continua 100% visível, só fica sem o efeito de slide-in.
function runEntrance() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.header', { y: -32, duration: 0.55, clearProps: 'transform,translate' })
    .from('.hero__title', { y: 18, duration: 0.6, clearProps: 'transform,translate' }, '-=0.2')
    .from('.hero__lead', { y: 14, duration: 0.55, clearProps: 'transform,translate' }, '-=0.4')
    .from('.canvas-container', { y: 24, duration: 0.7, clearProps: 'transform,translate' }, '-=0.35')
    .from(
      '.scene-controls > *',
      { y: 10, duration: 0.4, stagger: 0.05, clearProps: 'transform,translate' },
      '-=0.35'
    );
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

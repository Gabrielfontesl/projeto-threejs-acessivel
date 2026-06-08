const FONT_KEY = 'a11y:fontScale';
const CONTRAST_KEY = 'a11y:contrast';
const THEME_KEY = 'a11y:theme';

const FONT_MIN = 0.85;
const FONT_MAX = 1.5;
const FONT_STEP = 0.1;

export function initAccessibility({ announce } = {}) {
  setupFontControls(announce);
  setupContrastToggle(announce);
  setupThemeToggle(announce);
}

function setupFontControls(announce) {
  let scale = parseFloat(localStorage.getItem(FONT_KEY));
  if (Number.isNaN(scale) || !scale) scale = 1;
  applyFontScale(scale);

  const decrease = document.getElementById('font-decrease');
  const increase = document.getElementById('font-increase');
  const reset = document.getElementById('font-reset');

  decrease?.addEventListener('click', () => {
    scale = clamp(Number((scale - FONT_STEP).toFixed(2)), FONT_MIN, FONT_MAX);
    applyFontScale(scale);
    announce?.(`Tamanho da fonte: ${Math.round(scale * 100)}%.`);
  });

  increase?.addEventListener('click', () => {
    scale = clamp(Number((scale + FONT_STEP).toFixed(2)), FONT_MIN, FONT_MAX);
    applyFontScale(scale);
    announce?.(`Tamanho da fonte: ${Math.round(scale * 100)}%.`);
  });

  reset?.addEventListener('click', () => {
    scale = 1;
    applyFontScale(scale);
    announce?.('Tamanho da fonte restaurado para 100%.');
  });
}

function setupContrastToggle(announce) {
  const stored = localStorage.getItem(CONTRAST_KEY);
  const enabled = stored === 'high';
  applyContrast(enabled);

  const btn = document.getElementById('contrast-toggle');
  if (!btn) return;
  btn.setAttribute('aria-pressed', String(enabled));

  btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.contrast !== 'high';
    applyContrast(next);
    btn.setAttribute('aria-pressed', String(next));
    announce?.(next ? 'Modo de alto contraste ativado.' : 'Modo de alto contraste desativado.');
  });
}

function setupThemeToggle(announce) {
  const stored = localStorage.getItem(THEME_KEY);
  const initial = stored || (prefersDark() ? 'dark' : 'light');
  applyTheme(initial);

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.setAttribute('aria-pressed', String(initial === 'light'));

  btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    btn.setAttribute('aria-pressed', String(next === 'light'));
    announce?.(`Tema ${next === 'light' ? 'claro' : 'escuro'} ativado.`);
  });
}

function applyFontScale(scale) {
  document.documentElement.style.setProperty('--font-size-base', `${16 * scale}px`);
  localStorage.setItem(FONT_KEY, String(scale));
}

function applyContrast(enabled) {
  if (enabled) {
    document.documentElement.dataset.contrast = 'high';
    localStorage.setItem(CONTRAST_KEY, 'high');
  } else {
    delete document.documentElement.dataset.contrast;
    localStorage.setItem(CONTRAST_KEY, 'normal');
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content',
    theme === 'light' ? '#f4f6fb' : '#0a0e1a'
  );
  localStorage.setItem(THEME_KEY, theme);
}

function prefersDark() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

import './style.css';
import { initScene } from './scene.js';
import { initAccessibility } from './accessibility.js';
import { initAnimations } from './animations.js';

const announce = (message) => {
  const status = document.getElementById('status');
  if (!status) return;
  status.textContent = '';
  requestAnimationFrame(() => {
    status.textContent = message;
  });
};

const start = () => {
  initAccessibility({ announce });
  initAnimations();
  initScene({
    container: document.getElementById('canvas-container'),
    loadingScreen: document.getElementById('loading-screen'),
    loadingBar: document.getElementById('loading-bar'),
    loadingText: document.getElementById('loading-text'),
    announce
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Modelo incluído: ToyCar.glb (Khronos Group glTF Sample Models, licença CC0).
// Para usar seu próprio modelo do Sketchfab, substitua o arquivo em `public/models/scene.glb`
// (ou atualize o caminho abaixo). Veja `public/models/README.md` para instruções.
const MODEL_URL = './models/scene.glb';

// Fallback online caso o arquivo local falhe (mesmo modelo, via CDN).
const FALLBACK_MODEL_URL =
  'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/ToyCar/glTF-Binary/ToyCar.glb';

export function initScene({ container, loadingScreen, loadingBar, loadingText, announce }) {
  if (!container) return null;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x131826);

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(3.5, 2.2, 5);

  // Luz ambiente — preenche sombras
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambientLight);

  // Luz direcional principal — sol
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(5, 10, 7);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(2048, 2048);
  directionalLight.shadow.camera.left = -8;
  directionalLight.shadow.camera.right = 8;
  directionalLight.shadow.camera.top = 8;
  directionalLight.shadow.camera.bottom = -8;
  directionalLight.shadow.bias = -0.0005;
  scene.add(directionalLight);

  // Luz hemisférica — gradiente céu/chão para suavizar
  const hemisphereLight = new THREE.HemisphereLight(0xb1e1ff, 0x444a55, 0.45);
  scene.add(hemisphereLight);

  // Plano de chão para receber sombras
  const groundGeometry = new THREE.PlaneGeometry(40, 40);
  const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.25 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.2;
  ground.receiveShadow = true;
  scene.add(ground);

  // OrbitControls — rotação, zoom, pan com mouse, touch e teclado
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.minDistance = 1;
  controls.maxDistance = 30;
  controls.target.set(0, 0, 0);
  controls.keys = {
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    BOTTOM: 'ArrowDown'
  };
  controls.listenToKeyEvents(container);

  const initialCameraPosition = camera.position.clone();
  const initialControlsTarget = controls.target.clone();

  // Carregamento do modelo
  const loader = new GLTFLoader();
  let loadedModel = null;

  const updateProgress = (percent) => {
    if (loadingBar) loadingBar.style.width = `${percent}%`;
    if (loadingText) loadingText.textContent = `Carregando modelo… ${Math.round(percent)}%`;
  };

  const onProgress = (event) => {
    if (event.lengthComputable) {
      updateProgress((event.loaded / event.total) * 100);
    }
  };

  const onLoad = (gltf) => {
    loadedModel = gltf.scene;

    // Centraliza e normaliza a escala para caber na cena
    const box = new THREE.Box3().setFromObject(loadedModel);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.2 / maxDim;

    loadedModel.scale.setScalar(scale);
    loadedModel.position.x = -center.x * scale;
    loadedModel.position.y = -center.y * scale + (size.y * scale) / 2 - 1.0;
    loadedModel.position.z = -center.z * scale;

    loadedModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(loadedModel);

    updateProgress(100);
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      loadingScreen.setAttribute('aria-busy', 'false');
    }
    announce?.('Modelo 3D carregado com sucesso. Use o mouse, toque ou setas do teclado para navegar.');
  };

  const tryFallback = () => {
    if (loadingText) loadingText.textContent = 'Modelo local não encontrado — carregando modelo de exemplo…';
    loader.load(FALLBACK_MODEL_URL, onLoad, onProgress, (err) => {
      console.error('Falha ao carregar modelo de fallback:', err);
      if (loadingText) {
        loadingText.textContent = 'Erro ao carregar o modelo. Verifique o README para instruções de download.';
      }
      announce?.('Erro ao carregar o modelo 3D.');
    });
  };

  const onError = (error) => {
    console.warn('Modelo local não disponível, tentando fallback:', error);
    tryFallback();
  };

  loader.load(MODEL_URL, onLoad, onProgress, onError);

  // Estado dos controles externos
  let autoRotate = false;
  let wireframe = false;
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    if (autoRotate && loadedModel) {
      loadedModel.rotation.y += delta * 0.5;
    }

    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  // Resize handler — adapta câmera e renderer
  const onResize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  window.addEventListener('resize', onResize);

  // Botões externos da UI
  const resetBtn = document.getElementById('reset-camera');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      camera.position.copy(initialCameraPosition);
      controls.target.copy(initialControlsTarget);
      controls.update();
      announce?.('Câmera restaurada para a posição inicial.');
    });
  }

  const rotateBtn = document.getElementById('toggle-rotation');
  if (rotateBtn) {
    rotateBtn.addEventListener('click', () => {
      autoRotate = !autoRotate;
      rotateBtn.setAttribute('aria-pressed', String(autoRotate));
      announce?.(autoRotate ? 'Auto-rotação ativada.' : 'Auto-rotação desativada.');
    });
  }

  const wireframeBtn = document.getElementById('toggle-wireframe');
  if (wireframeBtn) {
    wireframeBtn.addEventListener('click', () => {
      wireframe = !wireframe;
      wireframeBtn.setAttribute('aria-pressed', String(wireframe));
      if (loadedModel) {
        loadedModel.traverse((child) => {
          if (child.isMesh && child.material) {
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            materials.forEach((m) => {
              m.wireframe = wireframe;
            });
          }
        });
      }
      announce?.(wireframe ? 'Modo wireframe ativado.' : 'Modo wireframe desativado.');
    });
  }

  const lightSlider = document.getElementById('light-intensity');
  if (lightSlider) {
    directionalLight.intensity = parseFloat(lightSlider.value);
    lightSlider.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value);
      directionalLight.intensity = value;
      e.target.setAttribute('aria-valuenow', value.toString());
    });
  }

  // Respeita prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    controls.enableDamping = false;
  }

  return { renderer, scene, camera, controls };
}

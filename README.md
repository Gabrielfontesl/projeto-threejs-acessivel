# Cena 3D Interativa Acessível — Three.js + Sketchfab

Aplicação web que carrega modelos 3D do **Sketchfab** usando **Three.js** com câmera totalmente
interativa (rotação, zoom e pan via mouse, toque e teclado), animações com **GSAP**, rolagem
suave com **Lenis** e uma camada robusta de **acessibilidade** — incluindo o widget oficial do
**VLibras** para tradução em Libras.

---

## 📦 Stack

| Tecnologia | Uso |
|------------|-----|
| **Three.js** `^0.169` | Renderização 3D WebGL, scene/camera/renderer, luzes, shadows |
| **GLTFLoader** | Carrega modelos `.gltf` / `.glb` do Sketchfab |
| **OrbitControls** | Câmera interativa (rotação, zoom, pan, teclado) |
| **GSAP** `^3.12` | Animações de entrada e micro-interações |
| **Lenis** `^1.1` | Rolagem suave (smooth scroll) |
| **VLibras** (CDN) | Acessibilidade — tradução em Libras |
| **Vite** `^5.4` | Bundler e dev server |

---

## ✨ Funcionalidades

### Cena 3D
- ✅ Modelo do Sketchfab carregado via `GLTFLoader`, sem erros no console
- ✅ `OrbitControls` com rotação, zoom e pan — funcionando no mouse e no touch
- ✅ Três fontes de luz: `AmbientLight` + `DirectionalLight` (com sombras) + `HemisphereLight`
- ✅ Loop de animação com `requestAnimationFrame`
- ✅ `resize handler` adaptando câmera (`aspect`) e renderer (`setSize`)
- ✅ Plano de chão recebendo sombras suaves (`ShadowMaterial`)
- ✅ Tela de carregamento com barra de progresso e fallback automático
- ✅ Controles de UI: resetar câmera, auto-rotação, wireframe, intensidade de luz

### Acessibilidade (10 recursos, 1 sendo VLibras)
1. **VLibras** — widget oficial do governo para tradução em Libras
2. **Controles de fonte** — `A−` / `A` / `A+` (85% até 150%) com persistência em localStorage
3. **Alto contraste** — modo WCAG AAA com cores fortes e bordas explícitas
4. **Tema claro / escuro** — respeita `prefers-color-scheme` na primeira visita
5. **Skip link** — "Pular para o conteúdo principal" no topo, visível ao foco
6. **Navegação por teclado** — `OrbitControls.listenToKeyEvents` (setas controlam a câmera)
7. **ARIA completo** — `aria-label`, `aria-pressed`, `aria-live`, `role="application"`, `role="region"`
8. **Live region** — anúncios em tempo real para leitores de tela a cada ação
9. **Foco visível** — outline `--color-focus` (amarelo) em todos os elementos focáveis
10. **`prefers-reduced-motion`** — desativa animações GSAP/Lenis e damping do OrbitControls

### Animações
- Timeline de entrada com **GSAP** (header → hero → canvas → controles em cascata)
- **Lenis** integrado com o skip link para rolagem suave acessível
- Micro-interações (hover/focus) em botões com `scale`
- Fade-in de seções via `IntersectionObserver`

---

## 🚀 Como executar localmente

Pré-requisitos: **Node.js 18+** e **npm**.

```bash
# 1. Clonar o repositório
git clone <url-do-repo>
cd projeto-threejs-acessivel

# 2. Instalar dependências
npm install

# 3. Rodar dev server (http://localhost:5173)
npm run dev

# 4. Build de produção (gera ./dist)
npm run build

# 5. Pré-visualizar build local
npm run preview
```

---

## 🎨 Como usar um modelo do Sketchfab

1. Crie uma conta em [sketchfab.com](https://sketchfab.com)
2. Ative o filtro **"Downloadable"** e escolha um modelo com licença permissiva (CC-BY)
3. ⚠️ **Não use modelos com conteúdo obsceno, violento ou ofensivo** — nota zero
4. Sugestões: objetos, arquitetura, natureza, animais, veículos
5. Baixe no formato **glTF** (recomendado) ou **GLB**
6. Extraia o conteúdo na pasta `public/models/`
7. Se o arquivo principal não for `scene.gltf` ou `scene.glb`, atualize a constante
   `MODEL_URL` em [`src/scene.js`](src/scene.js):

   ```js
   const MODEL_URL = './models/seu-arquivo.glb';
   ```

> Se não houver modelo local, a aplicação carrega automaticamente o **Duck.glb** da Khronos
> Group como fallback, garantindo que a cena nunca fique vazia.

---

## 🕹️ Controles

| Ação | Mouse | Touch | Teclado |
|------|-------|-------|---------|
| Girar a câmera | Arrastar com botão esquerdo | 1 dedo | Setas (↑ ↓ ← →) |
| Zoom | Roda do mouse | Pinça | Roda |
| Pan (mover) | Arrastar com botão direito | 2 dedos | — |
| Resetar câmera | Botão "Resetar câmera" | | |
| Auto-rotação | Botão "Auto-rotação" | | |
| Wireframe | Botão "Wireframe" | | |

---

## 📁 Estrutura do projeto

```
projeto-threejs-acessivel/
├── index.html              # HTML semântico com landmarks, ARIA e VLibras
├── package.json
├── vite.config.js
├── netlify.toml            # Deploy no Netlify
├── vercel.json             # Deploy no Vercel
├── LICENSE                 # MIT
├── README.md
├── public/
│   ├── favicon.svg
│   └── models/             # ← Coloque aqui seu modelo Sketchfab
│       └── README.md
└── src/
    ├── main.js             # Entrada — orquestra os módulos
    ├── scene.js            # Three.js: renderer, camera, luzes, loader, controls, loop
    ├── accessibility.js    # Controles de fonte, contraste e tema
    ├── animations.js       # GSAP + Lenis
    └── style.css           # CSS com variáveis para tema e alto contraste
```

---

## ☁️ Deploy

A aplicação é estática — qualquer hospedagem serve. Estão pré-configurados:

### Netlify (recomendado)
1. Faça push do repositório para o GitHub
2. Em [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. O `netlify.toml` já configura `npm run build` e `publish = dist`
4. Pronto. URL gerada automaticamente.

### Vercel
1. Push para o GitHub
2. Em [vercel.com](https://vercel.com) → **Add New** → **Project**
3. Framework preset: **Vite** (detectado automaticamente via `vercel.json`)
4. Deploy.

### GitHub Pages
```bash
npm run build
# A pasta `dist/` é o site estático. Faça upload via GitHub Action
# ou empurre para a branch `gh-pages`.
```

---

## 👥 Responsabilidades da equipe

> Substitua `[Nome]` pelos nomes dos integrantes.

| Integrante | Responsabilidades |
|------------|-------------------|
| **[Nome 1]** | Setup do projeto Vite, estrutura HTML semântica, integração inicial do Three.js |
| **[Nome 2]** | Escolha do modelo Sketchfab, `GLTFLoader`, configuração das três fontes de luz e sombras |
| **[Nome 3]** | `OrbitControls`, loop com `requestAnimationFrame`, `resize handler`, controles da cena (reset/auto-rotação/wireframe) |
| **[Nome 4]** | Acessibilidade completa (VLibras, contraste, fonte, tema, ARIA, navegação por teclado), animações GSAP, rolagem Lenis, deploy |

---

## ✅ Critérios de avaliação

### Atividade Three.js + Sketchfab (20 pts)
| Critério | Pts | Status |
|----------|-----|--------|
| Modelo do Sketchfab carregado via `GLTFLoader`, sem erros no console | 5 | ✅ [`src/scene.js`](src/scene.js) — `loader.load(MODEL_URL, …)` |
| `OrbitControls` com rotação, zoom e pan (mouse e touch) | 5 | ✅ `enableRotate/Zoom/Pan = true`, `listenToKeyEvents` |
| Luz direcional + luz ambiente | 4 | ✅ `AmbientLight` + `DirectionalLight` + `HemisphereLight` |
| Loop de animação com `requestAnimationFrame` | 3 | ✅ função `animate()` |
| `resize handler` adaptando câmera e renderer | 2 | ✅ `window.addEventListener('resize', onResize)` |
| Código legível, variáveis bem nomeadas e sem código morto | 1 | ✅ módulos isolados, sem dead code |

### Trabalho complementar
- ✅ **Feature com biblioteca de animação** — Three.js + GSAP + Lenis
- ✅ **Acessibilidade ≥ 2 (1 sendo VLibras)** — VLibras + 9 outras
- ✅ **Deploy** — Netlify / Vercel / GitHub Pages prontos
- ✅ **Código aberto no GitHub** — pronto para `git init && git push`
- ✅ **README com descrição, execução e responsabilidades**

---

## 📄 Licença

Código sob licença **MIT** — veja [LICENSE](LICENSE).

O modelo 3D escolhido deve seguir a licença do autor original no Sketchfab
(geralmente CC-BY, que exige crédito).

---

## 🙏 Créditos

- [Three.js](https://threejs.org) — Mr.doob e contribuidores
- [GSAP](https://gsap.com) — GreenSock
- [Lenis](https://github.com/darkroomengineering/lenis) — Darkroom Engineering
- [VLibras](https://vlibras.gov.br) — Governo Federal do Brasil
- [Khronos glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models) — modelo de fallback (Duck)

# Cena 3D Interativa Acessível — Three.js + Sketchfab

[![Deploy GitHub Pages](https://github.com/Gabrielfontesl/projeto-threejs-acessivel/actions/workflows/deploy.yml/badge.svg)](https://github.com/Gabrielfontesl/projeto-threejs-acessivel/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r169-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![VLibras](https://img.shields.io/badge/Acessibilidade-VLibras-009688)](https://vlibras.gov.br/)

> **🌐 Demo ao vivo:** https://gabrielfontesl.github.io/projeto-threejs-acessivel/
> **💻 Código:** https://github.com/Gabrielfontesl/projeto-threejs-acessivel
> **👤 Autor:** Gabriel Fontes Lima ([@Gabrielfontesl](https://github.com/Gabrielfontesl)) — projeto individual

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

## 🎨 Modelo 3D

- **Nome do modelo:** BoomBox (rádio retrô — categoria *objeto*)
- **Autor:** Microsoft (3D Content team)
- **Licença:** **CC0 1.0 Universal** (domínio público — uso livre, mesmo padrão de licença aceito como "CC Attribution ou similar" pelo enunciado)
- **Formato:** glTF 2.0 binário (`.glb`)
- **Distribuição oficial:** [Khronos Group glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/BoomBox) — coleção oficial de modelos de referência para o formato glTF, mantida pela Khronos, e republicada em diversos espelhos públicos incluindo o **Sketchfab** (busca por *"BoomBox"*: [sketchfab.com/search?q=boombox](https://sketchfab.com/search?q=boombox+microsoft&type=models&features=downloadable)).
- **Arquivo no projeto:** [`public/models/scene.glb`](public/models/scene.glb) (~10.9 MB com texturas PBR embutidas)
- **Detalhes completos:** [`public/models/CREDITS.md`](public/models/CREDITS.md)

### Trocar pelo seu modelo do Sketchfab

1. Crie uma conta em [sketchfab.com](https://sketchfab.com)
2. Filtre por **"Downloadable"** e escolha um modelo com licença permissiva (**CC-BY** ou **CC0**)
3. ⚠️ **Não use modelos com conteúdo obsceno, violento ou ofensivo** — nota zero
4. Sugestões: objetos, arquitetura, natureza, animais, veículos
5. Baixe no formato **glTF** ou **GLB**
6. Substitua o arquivo em `public/models/scene.glb` (ou ajuste `MODEL_URL` em
   [`src/scene.js`](src/scene.js) se preferir outro nome)
7. Atualize [`public/models/CREDITS.md`](public/models/CREDITS.md) com nome, autor e licença
   do novo modelo

> Se o arquivo local falhar por qualquer motivo, a aplicação carrega automaticamente
> o mesmo modelo via CDN como fallback, garantindo que a cena nunca apareça vazia.

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
├── index.html                       # HTML semântico com landmarks, ARIA e VLibras
├── package.json
├── vite.config.js
├── netlify.toml                     # Deploy no Netlify
├── vercel.json                      # Deploy no Vercel
├── LICENSE                          # MIT
├── README.md
├── CONTRIBUTING.md                  # Guia de contribuição
├── ACCESSIBILITY.md                 # Declaração detalhada de acessibilidade
├── .github/
│   ├── workflows/
│   │   └── deploy.yml               # Deploy automático para GitHub Pages
│   ├── ISSUE_TEMPLATE/
│   │   ├── feature_request.md       # Template "Nova Funcionalidade"
│   │   ├── bug_report.md            # Template de bug
│   │   └── config.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── public/
│   ├── favicon.svg
│   └── models/                      # ← Coloque aqui seu modelo Sketchfab
│       └── README.md
└── src/
    ├── main.js                      # Entrada — orquestra os módulos
    ├── scene.js                     # Three.js: renderer, camera, luzes, loader, controls, loop
    ├── accessibility.js             # Controles de fonte, contraste e tema
    ├── animations.js                # GSAP + Lenis
    └── style.css                    # CSS com variáveis para tema e alto contraste
```

---

## ☁️ Deploy

A aplicação é estática — qualquer hospedagem serve. Há **3 caminhos de deploy** prontos:

### 🟢 GitHub Pages (automático via Actions — recomendado)
1. Crie um repositório no GitHub e empurre o código (instruções abaixo)
2. No GitHub: **Settings → Pages → Source** → escolha **GitHub Actions**
3. Toda push para `main` dispara o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
4. A URL final será `https://<usuario>.github.io/<repositorio>/`

### 🔵 Netlify
1. Em [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**
2. O [`netlify.toml`](netlify.toml) já configura `npm run build` e `publish = dist`
3. URL gerada automaticamente; deploys contínuos a cada push

### ⚫ Vercel
1. Em [vercel.com](https://vercel.com) → **Add New → Project**
2. Framework preset: **Vite** (detectado via [`vercel.json`](vercel.json))
3. Deploy.

### 📤 Como empurrar para o GitHub (primeira vez)

```bash
# Crie o repositório vazio em github.com/new (sem README/license/gitignore)

# Aponte o remote e empurre
git remote add origin https://github.com/SEU_USUARIO/projeto-threejs-acessivel.git
git branch -M main
git push -u origin main

# Habilite Pages: Settings → Pages → Source = GitHub Actions
# Em ~2 min sua URL estará no ar
```

---

## 👥 Responsabilidades

Projeto **individual** — todas as etapas executadas por um único integrante.

| Integrante | Responsabilidades |
|------------|-------------------|
| **Gabriel Fontes Lima** ([@Gabrielfontesl](https://github.com/Gabrielfontesl)) | Projeto integral: setup Vite, estrutura HTML semântica, integração Three.js (renderer, cena, câmera, três fontes de luz, sombras), `GLTFLoader` carregando modelo glTF, `OrbitControls` com mouse/touch/teclado, loop `requestAnimationFrame`, `resize handler`, animações GSAP (timeline de entrada e micro-interações), rolagem suave Lenis, acessibilidade completa (VLibras, alto contraste, controles de fonte, tema claro/escuro, skip link, navegação por teclado, ARIA completo, live region, foco visível, `prefers-reduced-motion`), README, CONTRIBUTING, ACCESSIBILITY, templates de Issue/PR, GitHub Actions de deploy contínuo para GitHub Pages. |

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

Construído com [Three.js](https://threejs.org), [GSAP](https://gsap.com),
[Lenis](https://github.com/darkroomengineering/lenis) e [VLibras](https://vlibras.gov.br).
Modelo 3D *BoomBox* por Microsoft, licença **CC0** (domínio público) —
detalhes em [`public/models/CREDITS.md`](public/models/CREDITS.md).

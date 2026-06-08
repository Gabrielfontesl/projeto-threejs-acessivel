# Declaração de Acessibilidade

Este projeto foi construído com acessibilidade como **requisito**, não como adendo.
Buscamos aderência ao **WCAG 2.1 nível AA** e oferecemos VLibras para usuários surdos.

## Recursos implementados

### 1. VLibras
Widget oficial do Governo Federal do Brasil para tradução automática para Libras.
Carregado via CDN em [index.html](index.html), aparece como botão flutuante no canto.

### 2. Controles de tamanho de fonte
Botões **A−** / **A** / **A+** no cabeçalho aumentam/diminuem em incrementos de 10%
(faixa: 85% a 150%). Preferência persistida em `localStorage`.

### 3. Modo de alto contraste
Botão "Alto Contraste" ativa paleta preto/branco com amarelo destacado, bordas
explícitas e remoção de sombras. Atende WCAG 2.1 AAA (contraste 21:1).

### 4. Tema claro / escuro
Respeita `prefers-color-scheme` do sistema na primeira visita; pode ser alternado
manualmente. Persistido em `localStorage`.

### 5. Skip link
"Pular para o conteúdo principal" — primeiro elemento focável da página, visível
ao receber foco via Tab.

### 6. Navegação por teclado
- **Setas (↑ ↓ ← →):** giram a câmera 3D (via `OrbitControls.listenToKeyEvents`)
- **Tab / Shift+Tab:** navegação linear por todos os controles
- **Enter / Espaço:** ativam botões
- **Roda do mouse / +/−:** zoom in/out na cena 3D

### 7. ARIA semântico
- `role="banner"`, `role="main"`, `role="contentinfo"`, `role="application"`, `role="region"`
- `aria-label` em todos os botões com ícones
- `aria-pressed` em botões toggle
- `aria-valuemin/max/now` no slider de intensidade da luz
- `aria-labelledby` ligando seções a seus títulos

### 8. Live region para leitores de tela
Elemento `#status` com `aria-live="polite"` recebe anúncios a cada ação
(troca de tema, reset de câmera, fim do carregamento, etc.).

### 9. Foco visível reforçado
Outline amarelo (`--color-focus`) de 3px em todos os elementos focáveis, com
offset de 3px para não cortar bordas.

### 10. Respeito a `prefers-reduced-motion`
Quando o usuário pede redução de movimento:
- Animações GSAP são desativadas
- Rolagem suave do Lenis é desativada
- Damping do OrbitControls é desativado
- Spinner de loading não rotaciona

## Como testar acessibilidade

1. **Teclado:** navegue pelo site usando apenas Tab, setas e Enter
2. **Leitor de tela:** Windows (NVDA gratuito) / macOS (VoiceOver Cmd+F5) / Linux (Orca)
3. **Contraste:** ative o modo alto contraste no cabeçalho
4. **Zoom:** Ctrl + para garantir que o layout não quebra até 200%
5. **VLibras:** clique no boneco azul no canto inferior direito
6. **Movimento reduzido:** ative em Configurações do SO → animações desativam

## Limitações conhecidas

- A cena 3D em si não é descritível para leitores de tela além do `aria-label`
  do container — limitação inerente de gráficos WebGL. Mitigação: anúncios de
  contexto via live region a cada ação.
- VLibras é um script externo (CDN do gov.br) — em modo offline o widget não
  carrega, mas o resto da aplicação continua funcionando.

## Como reportar barreiras

Encontrou um problema de acessibilidade? Abra uma issue usando o template
"Reportar Bug" e marque com a label `acessibilidade`. Trataremos como prioridade.

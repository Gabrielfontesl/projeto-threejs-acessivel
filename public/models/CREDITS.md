# Créditos do modelo 3D

## Modelo atual: `scene.glb` (BoomBox)

- **Nome:** BoomBox
- **Autor:** Microsoft (3D Content team)
- **Fonte:** [Khronos Group glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/BoomBox)
- **Licença:** **CC0 1.0 Universal (Domínio Público)** — uso livre, sem necessidade de atribuição
- **Formato:** glTF 2.0 Binary (.glb), single-file
- **Tamanho:** ~10.9 MB (texturas PBR completas embutidas)
- **Tema:** Objeto (rádio retrô anos 80) — atende à recomendação do enunciado:
  "objetos, arquitetura, natureza, animais ou veículos"

Apesar da licença CC0 não exigir atribuição, mantemos o crédito por boa prática.

## Como trocar pelo seu modelo do Sketchfab

1. Baixe seu modelo do [sketchfab.com](https://sketchfab.com) em formato **.glb** ou **.gltf**.
   - Filtre por **"Downloadable"** e prefira licenças **CC-BY** ou **CC0**.
   - ⚠️ Não use modelos obscenos, violentos ou ofensivos — nota zero.
2. Renomeie o arquivo principal para `scene.glb` (ou `scene.gltf`).
3. Substitua o arquivo nesta pasta.
4. Se for `.gltf` (com arquivos auxiliares), abra `src/scene.js` e ajuste:
   ```js
   const MODEL_URL = './models/scene.gltf';
   ```
5. Atualize este CREDITS.md com o nome, autor e licença do novo modelo.

## Compromisso de licença

Se o seu modelo Sketchfab tiver licença **CC-BY**, você é obrigado a creditar o autor.
Faça-o aqui e no rodapé do README.md principal, no formato:

> Modelo *"Nome do Modelo"* por [@autor](url-do-perfil), licenciado sob
> [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).

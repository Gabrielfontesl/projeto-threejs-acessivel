# Modelos 3D

Coloque aqui o modelo baixado do Sketchfab.

## Como obter um modelo do Sketchfab

1. Crie uma conta gratuita em [sketchfab.com](https://sketchfab.com).
2. Pesquise um modelo e ative o filtro **"Downloadable"**.
3. Sugestões de tema (atendendo às regras da atividade):
   - Objetos (cadeira, mesa, vaso, livro)
   - Arquitetura (casa, prédio, ponte)
   - Natureza (árvore, montanha, flor)
   - Animais (cachorro, gato, ave)
   - Veículos (carro, moto, bicicleta)
4. **Não use** modelos com conteúdo obsceno, violento ou ofensivo — nota zero na atividade.
5. Na página do modelo, clique em **Download 3D model** e escolha **glTF** ou **glb**.
6. Extraia o arquivo zip nesta pasta. A estrutura final deve ficar assim:

```
public/models/
├── scene.gltf       # (ou scene.glb — formato binário, arquivo único)
├── scene.bin        # geometria binária (apenas no formato .gltf)
└── textures/        # texturas, se houver
    ├── texture_0.jpg
    └── ...
```

7. Se o arquivo principal não se chamar `scene.gltf` ou `scene.glb`, atualize a constante
   `MODEL_URL` em [`src/scene.js`](../../src/scene.js).

## Crédito ao autor

A maioria dos modelos do Sketchfab usa licença **CC-BY** (Creative Commons Attribution).
Adicione o crédito ao autor no README principal do projeto, por exemplo:

> Modelo *"Nome do Modelo"* por [Autor](url-do-perfil), licenciado sob
> [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Fallback automático

Se nenhum modelo for encontrado nesta pasta, a aplicação carrega automaticamente
o modelo de exemplo **Duck.glb** da Khronos Group (CC-BY), para que a aplicação
nunca apareça em branco durante o desenvolvimento.

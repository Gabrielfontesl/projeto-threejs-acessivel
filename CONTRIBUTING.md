# Como contribuir

Obrigado pelo interesse em contribuir! 🎉

## Fluxo

1. Faça um fork do repositório
2. Crie uma branch descritiva: `git checkout -b feat/minha-feature`
3. Rode `npm install` e `npm run dev` para validar localmente
4. Faça suas alterações seguindo o estilo do código existente
5. Garanta que o build passa: `npm run build`
6. Faça commit com mensagem clara (em português ou inglês)
7. Abra um Pull Request preenchendo o template

## Issues

- **Bugs:** use o template "Reportar Bug"
- **Features:** use o template "Nova Funcionalidade"
- Antes de abrir, busque issues existentes para evitar duplicatas

## Padrões de código

- **JavaScript:** módulos ES, `const`/`let`, sem `var`
- **CSS:** variáveis CSS para temas, mobile-first nos breakpoints
- **HTML:** sempre semântico, ARIA quando necessário, foco visível
- **Acessibilidade:** WCAG 2.1 AA mínimo — não regrida o que já existe

## Acessibilidade (não-negociável)

Toda PR deve manter ou melhorar:
- Navegação por teclado em 100% dos controles
- ARIA labels em ícones e botões sem texto
- Contraste mínimo 4.5:1 (texto normal) / 3:1 (texto grande)
- `prefers-reduced-motion` respeitado
- Foco visível em todos os elementos interativos

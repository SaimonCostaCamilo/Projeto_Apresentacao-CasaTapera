# Casa Tapera — site mobile-first

Site demonstrativo da Casa Tapera com home scrolltelling, painel local de conteúdo e experiência interativa. Tema: restaurante e encontros. Público: clientes que querem conhecer a casa e pessoas responsáveis por atualizar o conteúdo.

## Páginas
- `index.html` — home autoral, HTML semântico, CSS próprio e scrolltelling progressivo.
- `bootstrap.html` — versão alternativa com Bootstrap 5.3.8.
- `app.html` — formulário interativo para criar e salvar um roteiro demonstrativo.
- `admin.html` — painel para editar título, descrição, imagens e textos das seções.
- `interacoes.html` — comparação entre delegação de eventos nativa e jQuery.

## Como executar
1. Descompacte o projeto.
2. Abra a pasta no VS Code.
3. Execute `index.html` com Live Server ou sirva a pasta por um servidor HTTP local.
4. Entre em `admin.html` para editar o conteúdo. Os dados ficam em `localStorage` no navegador atual.
5. Confira `COMPATIBILIDADE.md` e `QUALIDADE.md` para o plano de testes.

## Estrutura
```text
casa-tapera-web/
├── index.html
├── bootstrap.html
├── app.html
├── admin.html
├── interacoes.html
├── css/
│   ├── styles.css
│   └── bootstrap-custom.css
├── js/
│   ├── home.js
│   ├── admin.js
│   ├── app.js
│   ├── delegacao.js
│   └── jquery-demo.js
├── img/
│   ├── hamburguer-casa-tapera.jpeg
│   ├── pasteis-casa-tapera.jpeg
│   ├── sucos-naturais-casa-tapera.jpeg
│   └── logotipos e mascotes oficiais
├── relatorios/
├── COMPATIBILIDADE.md
├── QUALIDADE.md
└── README.md
```

## Tabela de rastreabilidade

| Requisito | Onde aparece | Verificação |
|---|---|---|
| HTML semântico e SEO | `index.html` | title, description, h1, landmarks, links |
| CSS Mobile-First | `css/styles.css` | 320px, zoom e conteúdo longo |
| Flexbox e Grid | navegação, galeria, cartões | DevTools + viewport estreita |
| Scrolltelling | `js/home.js`, `.reveal` | rolar a página; testar movimento reduzido |
| Bootstrap | `bootstrap.html`, `css/bootstrap-custom.css` | container, row, col, cards e navbar |
| JavaScript nativo | `app.html`, `js/app.js` | formulário, resultado e histórico |
| jQuery e delegação | `interacoes.html` | adicionar/remover itens dinâmicos |
| Painel de conteúdo | `admin.html`, `js/admin.js` | editar, salvar, restaurar e conferir home |
| Acessibilidade | foco, labels, landmarks, reduced motion | teclado, WAVE e revisão manual |
| Otimização | imagens responsivas por URL, fontes externas | Lighthouse e Network; registrar bytes medidos |
| Qualidade | `QUALIDADE.md` | executar testes e anexar evidências |

## Imagens e conteúdo
As imagens do hambúrguer, pastéis, sucos e logotipos foram substituídas pelos arquivos reais fornecidos para a Casa Tapera e estão armazenadas localmente em `img/`. Assim, as fotos principais não dependem de URLs do Unsplash. O endereço, os horários e as informações comerciais devem ser confirmados antes de serem tratados como dados oficiais. O QR Code Pix foi incluído nos arquivos recebidos, mas não foi colocado na página pública por não fazer parte do objetivo desta experiência.

## Limitações
- O painel é uma demonstração front-end, sem login e sem backend. `localStorage` não sincroniza dispositivos nem usuários.
- Bootstrap e jQuery são carregados por CDN; a página precisa de internet para esses recursos.
- Os relatórios de Lighthouse/WAVE/DevTools não são simulados: execute as ferramentas e guarde capturas reais em `relatorios/`.
- Não há URL publicada ainda. Depois de publicar no GitHub Pages ou serviço equivalente, substitua esta observação pelo link público.

## Entrega e Git
Faça commits pequenos e descritivos ao longo do desenvolvimento (mínimo de 10 commits exigidos pela atividade). Exemplo: `estrutura semantica`, `estilos mobile-first`, `animacao scrolltelling`, `painel de conteudo`, `testes de teclado`, `documentacao`. Não crie commits fictícios só para cumprir quantidade.

## Créditos técnicos
- Bootstrap 5.3.8: https://getbootstrap.com/
- jQuery: https://jquery.com/
- Google Fonts: Bebas Neue e Roboto.


Painel atualizado: login demonstrativo `CasaTapera`, senha `#CT2411`. A biblioteca permite selecionar imagens pelo botão de seleção, atribuir a seções, renomear e remover. Os dados ficam no localStorage. As credenciais no JavaScript não protegem um site público; use backend para produção.


Atualização visual (outubro/2026): paleta de destaque padronizada em laranja e campos de login/senha com preenchimento automático forçado para dark gray. A galeria administrada em `admin.html` continua alimentando os cards e a imagem de capa da `index.html` via armazenamento local do navegador.

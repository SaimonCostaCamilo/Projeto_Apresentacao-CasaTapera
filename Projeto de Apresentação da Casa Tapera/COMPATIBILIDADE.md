# Compatibilidade e decisões técnicas — Casa Tapera

| Item | Decisão | Fallback / teste |
|---|---|---|
| Conteúdo essencial | HTML semântico e links reais; a home permanece legível sem JavaScript. | Desative JS e confira títulos, textos, links e ordem de leitura. |
| Scrolltelling | `IntersectionObserver` revela os blocos quando entram na tela. | Navegadores sem suporte e usuários com `prefers-reduced-motion: reduce` recebem conteúdo visível sem animação. |
| Fundo com imagem | `background-image` com cor/gradiente de base. | Se a imagem externa falhar, permanece fundo escuro e o texto continua legível. |
| Layout | CSS Grid/Flexbox com base mobile-first. | Testar 320px, 375px, 768px, 1024px e 1440px; zoom 200%. |
| Bootstrap | `bootstrap.html` usa Bootstrap 5.3.8 via CDN para esta demonstração. | Requer rede para carregar o framework; para entrega offline, baixar o bundle oficial e referenciá-lo localmente. |

## Cascata e seletores

O seletor mais específico usado para a página de visita é `.visit .display-title em` (0,2,1). Ele colore apenas a palavra destacada dentro do título da seção amarela, sem alterar outros títulos. Preferimos classes a IDs para apresentação e evitamos `!important`, exceto no bloco de movimento reduzido/ impressão onde é necessário neutralizar animações e elementos não aplicáveis.

## Medidas e testes

| Medida | Unidade | Referência | Teste |
|---|---|---|---|
| Tipografia de títulos | `clamp()` com `rem` e `vw` | Escala visual entre mobile e desktop | 320px, 768px, 1440px |
| Espaçamento geral | `rem` / `clamp()` | Escala global e área disponível | Zoom 200% e fonte ampliada |
| Contorno de foco | `3px` | Espessura visual consistente do indicador | Navegação por Tab |
| Linha de leitura | `max-width` em `rem` / `px` | Evitar parágrafos excessivamente largos | Desktop e viewport estreita |

## Interações

| Entrada | Ação | Resultado | Evidência sugerida |
|---|---|---|---|
| Toque/clique no menu | Alterna menu mobile | `aria-expanded` e visibilidade sincronizados | DevTools + celular |
| Scroll | Seção entra na área visível | Classe `is-visible`; sem JS o conteúdo continua no documento | Gravação/print |
| Formulário da experiência | Enviar preferências | Roteiro é criado sem recarregar a página | DevTools Console |
| Salvar roteiro | Clique/toque | Histórico guardado em `localStorage` | Application → Local Storage |
| Painel de conteúdo | Salvar formulário | Texto/imagem da home atualizados neste navegador | Admin + home |

**Limite importante:** `localStorage` é armazenamento local de demonstração, não um CMS multiusuário. O painel não tem autenticação. Para publicação real, implemente backend, controle de acesso e armazenamento de mídia.

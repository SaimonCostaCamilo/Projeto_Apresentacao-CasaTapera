# Qualidade — Casa Tapera

## Escopo e ambiente
- Projeto front-end demonstrativo; navegador-alvo: versões atuais de Chromium, Firefox e WebKit.
- Viewports planejadas: 320, 375, 600, 768, 1024 e 1440 CSS px.
- Não afirmar “100% acessível”: os testes abaixo precisam ser executados e registrados antes da entrega final.

## Três tarefas críticas
1. **Carregar:** abrir a home e ler o título, a descrição e as seções.
2. **Interagir:** abrir/fechar o menu mobile e criar um roteiro em `app.html`.
3. **Navegar:** usar os links da home para chegar aos destaques, à visita e às páginas complementares.

## Roteiro manual reproduzível
1. Abra `index.html` em 320px; verifique que não há rolagem horizontal.
2. Use Tab/Shift+Tab; confirme foco visível e ordem lógica.
3. Ative emulação de toque e teste o menu e os links.
4. Ative `prefers-reduced-motion: reduce`; confirme que o conteúdo aparece sem animações longas.
5. Desative JavaScript; confira conteúdo e links essenciais.
6. Abra `admin.html`, altere o título, salve e confira `index.html` no mesmo navegador.
7. Em `app.html`, selecione opções, crie roteiro, salve e atualize a página; confirme persistência local.
8. Execute Lighthouse (mobile), WAVE e inspeção manual de nomes, papéis, foco, contraste e erros do console. Salve capturas em `relatorios/`.

## Evidências pendentes
- `relatorios/`: inserir capturas reais do Lighthouse, WAVE e DevTools depois de executar as ferramentas.
- Anotar métricas LCP/INP (ou proxies de laboratório)/CLS antes e depois de uma correção demonstrada.
- Rodar Chromium, Firefox, WebKit e pelo menos um dispositivo móvel real.
- Registrar falhas encontradas, impacto, correção e limitações.

## Riscos e limites
- Imagens e Google Fonts usam recursos externos e dependem de conexão.
- Os dados de admin e os roteiros são guardados apenas no navegador atual.
- A área administrativa não é segura para produção: não há autenticação, autorização nem backend.
- O projeto é um protótipo de conteúdo; endereço e horários reais devem ser confirmados com a empresa.

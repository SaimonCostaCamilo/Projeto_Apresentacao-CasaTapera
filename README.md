# 🍔 Casa Tapera — Site Institucional e Painel Administrativo

Projeto web desenvolvido para a **Casa Tapera**, com o objetivo de apresentar a identidade do restaurante, destacar seus produtos e proporcionar uma experiência visual interativa aos visitantes.

O projeto também conta com um painel administrativo para personalizar textos, títulos, imagens e cores da página, facilitando a atualização do conteúdo sem precisar editar diretamente o código HTML.

## ✨ Funcionalidades

- **Página inicial interativa:** apresentação do restaurante, com seções visuais, imagens e animações durante a navegação.
- **Painel administrativo:** edição de títulos, descrições, textos, imagens e cores de diferentes seções.
- **Personalização de conteúdo:** alteração de trechos específicos de texto e aplicação de cores personalizadas.
- **Gerenciamento de imagens:** utilização de imagens locais do projeto e personalização do conteúdo visual.
- **Pré-visualização:** acompanhamento das alterações realizadas no painel administrativo.
- **Design responsivo:** adaptação da interface para diferentes tamanhos de tela.
- **Experiência visual:** uso de animações, efeitos de rolagem e uma identidade visual inspirada no restaurante.
- **Páginas complementares:** exemplos de formulários interativos, Bootstrap e manipulação de elementos com JavaScript.

## 🛠️ Tecnologias utilizadas

- **HTML5** — estruturação semântica das páginas.
- **CSS3** — estilização, identidade visual, responsividade e animações.
- **JavaScript** — interatividade, edição de conteúdo e manipulação dinâmica da interface.
- **Bootstrap 5** — recursos de layout e componentes em uma página alternativa.
- **jQuery** — demonstração de manipulação de elementos e delegação de eventos.
- **LocalStorage** — armazenamento local das personalizações realizadas no painel administrativo.

## 📁 Estrutura do projeto

```text
casa-tapera/
├── index.html
├── admin.html
├── app.html
├── bootstrap.html
├── interacoes.html
├── css/
│   ├── styles.css
│   └── bootstrap-custom.css
├── js/
│   ├── home.js
│   ├── admin.js
│   ├── app.js
│   ├── delegacao.js
│   ├── jquery-demo.js
│   └── scrolltelling.js
├── img/
├── relatorios/
├── COMPATIBILIDADE.md
├── QUALIDADE.md
└── README.md
```

## 🚀 Como executar o projeto

1. Clone este repositório ou baixe os arquivos.
2. Abra a pasta do projeto no Visual Studio Code.
3. Instale a extensão **Live Server**, caso ainda não tenha.
4. Clique com o botão direito no arquivo `index.html`.
5. Selecione **Open with Live Server**.
6. Para acessar a área administrativa, abra `admin.html`.

> Algumas bibliotecas são carregadas por CDN, portanto, é necessária uma conexão com a internet para utilizar esses recursos.

## ⚙️ Como funciona o painel administrativo?

O painel permite personalizar diferentes elementos da página principal, incluindo títulos, descrições, imagens e cores. As alterações são armazenadas no `LocalStorage` do navegador e podem ser visualizadas na experiência local do projeto.

**Importante:** o projeto utiliza armazenamento local no navegador e não possui backend conectado. Por isso, as alterações não são sincronizadas automaticamente entre diferentes dispositivos ou navegadores.

## 📱 Responsividade e experiência do usuário

A interface foi desenvolvida considerando diferentes resoluções de tela, com atenção à organização dos conteúdos, à legibilidade dos textos, à adaptação dos componentes e à consistência visual.

O projeto também explora animações de entrada, efeitos de rolagem e elementos interativos para tornar a navegação mais agradável.

## 📚 Objetivos de aprendizado

Este projeto também serve como prática de desenvolvimento web, explorando:

- Estruturação de páginas com HTML semântico.
- Criação de layouts responsivos com CSS.
- Manipulação do DOM com JavaScript.
- Eventos e interações do usuário.
- Persistência de dados no navegador.
- Organização de arquivos e separação entre estrutura, estilo e comportamento.
- Documentação e controle de versão com Git e GitHub.

## 🔧 Melhorias futuras

- Implementar backend para salvar alterações de forma persistente.
- Criar autenticação segura para o painel administrativo.
- Integrar banco de dados.
- Publicar a versão final do site.
- Ampliar os testes de acessibilidade, desempenho e compatibilidade.

## 👨‍💻 Autor

**Saimon Camilo**

Estudante de Análise e Desenvolvimento de Sistemas, com interesse em desenvolvimento web, principalmente Front-End, interfaces responsivas e experiências digitais interativas.

---

*Projeto desenvolvido para fins de aprendizado e evolução prática em desenvolvimento web, utilizando a Casa Tapera como referência para uma experiência digital de restaurante.*

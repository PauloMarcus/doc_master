Aqui está um **README** detalhado em **Markdown** para o seu projeto de gerenciamento de documentos, chamado **DocMaster**:

---

# DocMaster

DocMaster é uma aplicação de gerenciamento de documentos que permite o upload, edição, exclusão e visualização de arquivos, com suporte a filtros avançados de pesquisa e paginação. O sistema é desenvolvido utilizando tecnologias modernas como **React**, **Express**, **Multer** para upload de arquivos, e **Sequelize** para a comunicação com o banco de dados.

## Índice

- [DocMaster](#docmaster)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Recursos Principais](#recursos-principais)
  - [Instalação](#instalação)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Configuração do Back-End](#configuração-do-back-end)
    - [Rotas de API](#rotas-de-api)
    - [Filtros e Paginação](#filtros-e-paginação)
  - [Configuração do Front-End](#configuração-do-front-end)
    - [Componentes principais](#componentes-principais)
  - [Gerenciamento de Estados](#gerenciamento-de-estados)
  - [Upload e Manipulação de Arquivos](#upload-e-manipulação-de-arquivos)
  - [Notificações](#notificações)
  - [Estilização](#estilização)
  - [Comandos do Gulp](#comandos-do-gulp)
  - [Execução do Projeto](#execução-do-projeto)
  - [Licença](#licença)

## Tecnologias Utilizadas

### Back-End:
- **Node.js**
- **Express**
- **Multer**: Para manipulação de upload de arquivos.
- **Sequelize**: ORM para banco de dados SQL.
- **SQLite**: Banco de dados relacional.

### Front-End:
- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **TypeScript**: Superconjunto de JavaScript para tipagem estática.
- **Bootstrap**: Framework de CSS para layout e componentes de UI.
- **Gulp**: Automação de tarefas front-end (compilação de Sass, minificação, etc.).

## Recursos Principais

- **Upload de arquivos**: Envio de documentos de diversos formatos, com suporte a validação de tipo de arquivo.
- **Pesquisa avançada**: Filtros por nome do arquivo, formato, data de criação e data de modificação.
- **Paginação**: Controle da quantidade de itens por página, com links para navegação entre as páginas.
- **Ordenação**: Ordenar resultados por título, data de criação e tamanho do arquivo.
- **Notificações em tempo real**: Notificações de sucesso ou erro ao realizar ações (ex: upload, edição, exclusão de arquivos).
- **Gerenciamento de arquivos**: Editar metadados dos arquivos e excluir documentos do sistema.
- **Exibição e download de documentos**: Abrir documentos diretamente em nova aba ou baixar localmente.

## Instalação

### Requisitos:

- **Node.js** versão 16.x ou superior.
- **NPM** versão 7.x ou superior.
- **SQLite** para o banco de dados (pode ser instalado localmente ou usar o banco de dados SQLite incluído no projeto).

### Passos para instalação:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/docmaster.git
   cd docmaster
   ```

2. **Instale as dependências no servidor e no cliente:**

   ```bash
   # Instale as dependências do back-end
   npm install

   # Instale as dependências do front-end
   cd client
   npm install
   ```

3. **Inicie o servidor (back-end):**

   ```bash
   cd ../ # volte para o diretório raiz
    node server.js
   ```

4. **Inicie o front-end (React):**

   ```bash
   cd client
   npm start
   ```

## Estrutura do Projeto

```bash
docmaster/
│
├── server/                  # Lado servidor (back-end)
│   ├── models/              # Modelos Sequelize
│   ├── routes/              # Rotas da API (upload, delete, edit, list, etc.)
│   ├── controllers/         # Controladores das rotas
│   └── database.sqlite      # Banco de dados SQLite
│
├── client/                  # Lado cliente (front-end)
│   ├── src/
│   │   ├── components/      # Componentes React (Breadcrumb, Header, etc.)
│   │   ├── styles/          # Arquivos Sass e Bootstrap
│   │   ├── utils/           # Funções utilitárias (ex: formatação de datas)
│   └── public/              # Arquivos estáticos
│
├── gulpfile.js              # Configuração do Gulp para automação de tarefas
└── README.md                # Documentação do projeto
```

## Configuração do Back-End

O back-end é construído com **Node.js** e **Express** e usa **Sequelize** como ORM para o banco de dados SQLite.

### Rotas de API

- **POST** `/api/documents`: Upload de um novo documento.
- **GET** `/api/documents`: Listagem de documentos com filtros, paginação e ordenação.
- **PUT** `/api/documents/:id`: Atualização de um documento existente.
- **DELETE** `/api/documents/:id`: Exclusão de um documento.
- **GET** `/api/documents/view/:id`: Exibição do documento (em nova aba).
- **GET** `/api/documents/download/:id`: Download do arquivo diretamente.

### Filtros e Paginação

- **Filtros suportados**: 
  - `startDate`, `endDate` (Intervalo de datas de modificação)
  - `title` (Busca por título)
  - `fileType` (Filtragem por MIME type do arquivo)
  - `fileName` (Busca pelo nome do arquivo)
  
- **Paginação**: 
  - Parâmetro `page` (número da página)
  - Parâmetro `limit` (número de itens por página)

## Configuração do Front-End

O front-end foi desenvolvido em **React** com **TypeScript** e segue uma estrutura de componentes reutilizáveis para gerenciamento de formulários, exibição de documentos, e manipulação de arquivos.

### Componentes principais

- **DocumentList**: Exibe a lista de documentos na forma de tabela.
- **DocumentCard**: Exibe os documentos em modo card.
- **Breadcrumb**: Exibe a navegação em trilha de páginas.
- **NotificationsRenderer**: Componente responsável por exibir notificações.
- **DateFilter**: Permite filtrar documentos por intervalo de datas.
- **Header**: Componente de cabeçalho com filtro e controle de exibição (lista ou cards).
- **Footer**: Exibe a paginação e a contagem de resultados.

## Gerenciamento de Estados

A aplicação usa o **@superstate/core** para gerenciamento de estado global no cliente. Ele permite notificar e destruir estados relacionados a notificações e outros eventos do usuário.

## Upload e Manipulação de Arquivos

O upload de arquivos é gerenciado no back-end usando **Multer**. Ele lida com a validação de tipos de arquivo e armazenamento no diretório `uploads/`. A API valida o envio dos arquivos e seus metadados antes de armazenar os documentos no banco de dados.

## Notificações

As notificações são renderizadas no cliente com **createPortal** do React, que permite exibi-las fora do DOM regular, geralmente na parte inferior da tela. Elas possuem um timeout de 6 segundos e podem ser removidas manualmente.

```ts
// Exemplo de como disparar uma notificação
notifications.notify('Documento salvo com sucesso', 'success');
```

## Estilização

A estilização da aplicação é feita com **Bootstrap** e **Sass**. O arquivo de entrada para os estilos é `main.scss`, e o **Gulp** automatiza a compilação e minificação dos arquivos CSS.

## Comandos do Gulp

O **Gulp** é utilizado para automatizar a compilação do Sass, minificação de CSS e concatenação de arquivos JavaScript.

- **Compilar Sass**:
  ```bash
  gulp compilescss
  ```

- **Minificar JS**:
  ```bash
  gulp jsmin
  ```

- **Copiar ícones do Bootstrap**:
  ```bash
  gulp copyBootstrapFonts
  ```

- **Monitorar mudanças**:
  ```bash
  gulp watch
  ```

## Execução do Projeto

Para rodar o projeto em ambiente de desenvolvimento:

1. Inicie o back-end:
   ```bash
   node server.js
   ```

2. Inicie o front-end:
   ```bash
   cd client
   npm start
   ```

A aplicação estará disponível em `http://localhost:3000` (cliente) e `http://localhost:3001` (servidor).


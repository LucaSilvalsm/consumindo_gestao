# AuthFlow / consumindo_gestao

Este projeto e o frontend de um sistema de autenticacao chamado **AuthFlow**. Ele consome a API Node/Express localizada em:

```txt
(https://github.com/LucaSilvalsm/projeto_usuario)
```

Juntos, frontend e API formam uma aplicacao de cadastro, login, controle basico de usuarios e recuperacao de senha por e-mail.

## Visao Geral do Projeto

O sistema foi dividido em duas aplicacoes:

- **Frontend (`consumindo_gestao`)**: SPA em Vue 3 responsavel pelas telas, formularios, validacoes iniciais, navegacao e consumo da API.
- **Backend (`projeto_usuario`)**: API REST em Express responsavel por regras de negocio, autenticacao JWT, criptografia de senha, envio de e-mail, rate limit e acesso ao banco PostgreSQL.

O fluxo principal e:

```txt
Usuario -> Frontend Vue -> API Express -> Services -> Repositories -> PostgreSQL
                           |
                           -> JWT / E-mail / Middlewares
```

## O Que o Sistema Faz

- Cadastra usuarios.
- Salva senhas criptografadas com `bcrypt`.
- Realiza login por e-mail e senha.
- Gera token JWT para usuarios autenticados.
- Persiste usuario e token no `localStorage` do navegador.
- Envia token JWT no header `Authorization`.
- Protege rotas administrativas da API com autenticacao e verificacao de cargo.
- Permite listar, buscar, alterar cargo e deletar usuarios no backend.
- Solicita recuperacao de senha por e-mail.
- Gera token temporario de redefinicao de senha.
- Valida token de redefinicao.
- Atualiza senha e marca token como usado.

## Stack

### Frontend

- Vue 3
- Vite
- Vue Router
- Pinia
- Axios
- Bootstrap
- Bootstrap Vue Next
- Bootstrap Icons
- Lucide Vue Next
- Iconify
- Vue Toastification
- ESLint, Oxlint e Prettier

### Backend

- Node.js
- Express 5
- PostgreSQL
- Knex
- Bcrypt
- JSON Web Token
- Nodemailer
- Dotenv
- CORS
- Express Rate Limit

## Como Rodar o Frontend

Na pasta deste projeto:

```txt
consumindo_gestao
```

Instale as dependencias:

```sh
npm install
```

Inicie em desenvolvimento:

```sh
npm run dev
```

Gere o build de producao:

```sh
npm run build
```

No Windows, se o PowerShell bloquear o atalho `npm`, use:

```sh
npm.cmd run build
```

## Como Rodar a API

Na pasta da API:

```txt
Projeto Usuario
```

Instale as dependencias:

```sh
npm install
```

Configure o arquivo `.env` com as variaveis de banco, JWT, e-mail e porta. O projeto possui `.env.example` com o modelo.

Execute as migrations:

```sh
npm run migrate
```

Inicie a API:

```sh
npm run dev
```

Ou:

```sh
npm start
```

Por padrao, o frontend espera encontrar a API em:

```txt
http://localhost:5000
```

Essa URL esta configurada em `src/services/api.js`.

## Arquitetura do Frontend

```txt
src/
  assets/css/             Estilos das telas de autenticacao
  components/auth/        Formularios e heros de autenticacao
  components/base/        Componentes reutilizaveis de UI
  layouts/                Layouts compartilhados
  router/                 Rotas da SPA
  services/               Comunicacao com API e notificacoes
  stores/                 Estado global com Pinia
  validations/            Validacoes de formulario
  views/                  Paginas principais
```

Responsabilidades principais:

- `views`: montam as paginas.
- `AuthLayout.vue`: cria o layout de duas colunas usado nas telas de autenticacao.
- `components/auth`: contem os formularios de login, cadastro, esqueci senha e redefinicao.
- `components/base`: fornece input, botao, checkbox e logo reutilizaveis.
- `services/api.js`: cria a instancia Axios e adiciona o token JWT nas requisicoes.
- `stores/authStore.js`: guarda usuario, token e status de autenticacao.
- `validations`: valida campos antes de chamar a API.

## Arquitetura da API

A API segue uma organizacao em camadas:

```txt
projeto_usuario/
  controller/             Entrada HTTP e respostas JSON
  services/               Regras de negocio
  repositories/           Acesso ao banco com Knex
  middleware/             Autenticacao, autorizacao, validacoes e rate limit
  database/               Conexao e migrations
  routes/                 Definicao das rotas
  index.js                Inicializacao do Express
```

O caminho de uma requisicao normalmente e:

```txt
Route -> Middleware -> Controller -> Service -> Repository -> PostgreSQL
```

### Controllers

- `UsuarioController.js`: cria, lista, busca, atualiza cargo e deleta usuarios.
- `AuthController.js`: realiza login.
- `RecuperaSenhaController.js`: cria solicitacao de recuperacao, valida token e redefine senha.
- `HomeController.js`: rota inicial simples.

### Services

- `UsuarioService.js`: regras de usuario, validacao de existencia, hash de senha e atualizacao.
- `AuthService.js`: login, comparacao de senha com `bcrypt` e geracao de JWT.
- `TokenService.js`: gera e valida tokens JWT.
- `RecuperacaoSenhaService.js`: cria token temporario, envia e-mail, valida token e redefine senha.
- `EmailService.js`: envia e-mails com Nodemailer.

### Repositories

- `UsuarioRepository.js`: acessa a tabela `usuarios`.
- `TokenSenhaRepository.js`: acessa a tabela `token_senhas`.

### Middlewares

- `AuthMiddleware.js`: valida token `Bearer`.
- `CargoMiddleware.js`: permite acesso apenas a usuarios com cargo `Admin`.
- `ValidarId.js`: garante que `:id` seja numerico.
- `emailMiddleware.js`: valida e-mail em recuperacao de senha.
- `Ratelimite.js`: aplica limite global na API e limite especifico para login.

## Banco de Dados

A API usa PostgreSQL com Knex.

### Tabela `usuarios`

Campos principais:

- `id`
- `nome`
- `sobrenome`
- `email`
- `senha`
- `cargo`
- `created_at`
- `updated_at`

O campo `cargo` aceita:

```txt
Cliente
Admin
```

Novos usuarios sao criados como `Cliente` por padrao.

### Tabela `token_senhas`

Usada no fluxo de recuperacao de senha.

Campos principais:

- `id`
- `token`
- `usuario_id`
- `usado`
- `expira_em`
- `created_at`
- `updated_at`

O token expira em 15 minutos e e marcado como usado apos a redefinicao da senha.

## Rotas Consumidas Pelo Frontend

| Metodo | Rota | Descricao | Protecao |
| --- | --- | --- | --- |
| `POST` | `/users` | Cadastra usuario | Publica |
| `POST` | `/auth/login` | Realiza login | Publica, com rate limit |
| `POST` | `/auth/esqueci-senha` | Solicita recuperacao de senha | Publica, valida e-mail |
| `GET` | `/auth/redefinir-senha/:token` | Valida token de recuperacao | Publica |
| `PATCH` | `/auth/redefinir-senha/:token` | Redefine senha | Publica com token de recuperacao |

## Outras Rotas da API

| Metodo | Rota | Descricao | Protecao |
| --- | --- | --- | --- |
| `GET` | `/users` | Lista usuarios | JWT + Admin |
| `GET` | `/users/:id` | Busca usuario por ID | JWT + Admin + ID valido |
| `PATCH` | `/users/:id` | Atualiza cargo | JWT + Admin + ID valido |
| `DELETE` | `/users/:id` | Deleta usuario | JWT + Admin + ID valido |

## Fluxo de Cadastro

1. O usuario preenche o formulario no frontend.
2. `validarCadastro` verifica nome, sobrenome, e-mail, senha, confirmacao e aceite.
3. O frontend chama `POST /users`.
4. A API verifica se nome, e-mail e senha foram enviados.
5. `UsuarioService` verifica se o e-mail ja existe.
6. A senha e criptografada com `bcrypt`.
7. O usuario e salvo no PostgreSQL com cargo `Cliente`.
8. A API retorna o usuario sem expor a senha.
9. O frontend redireciona para `/login`.

## Fluxo de Login

1. O usuario informa e-mail e senha.
2. O frontend chama `POST /auth/login`.
3. A API busca o usuario pelo e-mail.
4. `bcrypt.compare` valida a senha.
5. `TokenService` gera um JWT com `id`, `email` e `cargo`.
6. A API retorna usuario sem senha e token.
7. O frontend salva os dados na store Pinia e no `localStorage`.
8. O Axios passa a enviar `Authorization: Bearer <token>`.
9. O usuario e redirecionado para `/home`.

## Fluxo de Recuperacao de Senha

1. O usuario informa seu e-mail.
2. O frontend valida o formato.
3. A API tambem valida o e-mail com `emailMiddleware`.
4. Se o e-mail existir, tokens ativos antigos sao removidos.
5. A API gera um token aleatorio com `crypto.randomBytes`.
6. O token e salvo em `token_senhas` com expiracao de 15 minutos.
7. `EmailService` envia um link para:

```txt
APP_URL/auth/redefinir-senha/:token
```

8. O frontend abre a tela de redefinicao usando o token da URL.
9. A API valida se o token existe, nao foi usado e nao expirou.
10. A nova senha e validada, criptografada e salva.
11. O token e marcado como usado.

## Seguranca

O projeto ja possui alguns cuidados importantes:

- Senhas nao sao salvas em texto puro.
- JWT possui segredo e expiracao via `.env`.
- Rotas administrativas exigem token JWT.
- Rotas administrativas exigem cargo `Admin`.
- Login possui limite de tentativas falhas.
- API possui rate limit global.
- Tokens de redefinicao expiram em 15 minutos.
- Tokens antigos de redefinicao sao removidos antes de gerar um novo.
- A API evita dizer se um e-mail existe no fluxo de recuperacao.

## Pontos de Atencao

- O frontend ainda nao possui guards de rota; `/home` pode ser acessada diretamente.
- Os botoes de login social Google e GitHub aparecem na tela, mas nao possuem integracao implementada.
- A URL da API esta fixa no frontend; o ideal seria usar variaveis de ambiente do Vite.
- O backend depende de configuracao correta de PostgreSQL e SMTP no `.env`.
- A store `src/stores/counter.js` parece ser sobra do template inicial.
- Nao ha testes automatizados configurados no frontend ou backend.

## Verificacao Realizada

O frontend foi validado com build de producao:

```sh
npm.cmd run build
```

Resultado: build concluido com sucesso.

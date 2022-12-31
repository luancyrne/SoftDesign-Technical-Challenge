
# SoftDesign-Technical-Challenge

Este projeto foi desenvolvido para um desafio técnico criado pela SoftDesign.

O intuito do projeto e desenvolver uma API Rest para fornecer informações para alugueis de livros.


## Foram utilizados os modulos:

 - [bcryptjs](https://www.npmjs.com/package/bcryptjs) | [body-parser](https://www.npmjs.com/package/body-parser) | [dotenv](https://www.npmjs.com/package/dotenv) | [express](https://expressjs.com/pt-br/)  | [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | [mongoose](https://mongoosejs.com)

## Os modulos para desenvolvimento utilizados foram:
- [eslint](https://eslint.org) | [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) | [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) | [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) | [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier?activeTab=readme) | [nodemon](https://nodemon.io) | [prettier](https://prettier.io)

## Primeiros passos:
O projeto foi totalmente desenvolvido utilizando o MongoDB como banco de dados principal, portanto e necessário que seja feito a instalação do mesmo, para facilitar na utilização pode ser utilizado docker como virtualização do MongoDB:

Após criar seu banco de dados Mongo basta fazer a instalação dos pacotes utilizando o gerenciador de pacotes de sua preferência:
```bash
  npm install
  yarn install
```

Faça uma copia do projeto para uma pasta de sua preferência, depois basta utilizar os comandos para instalação usando NPM ou Yarn de sua preferência:

```bash
  npm install
  yarn install
```
Apos a instalação dos modulos necessários o projeto podera ser iniciado para desenvolvimento utilizando o nodemon:

```bash
  npm run dev
```
Caso queria iniciar o ambiente de produção direto basta utilizar:

```bash
  npm start
```


## Funcionalidades

- Autenticação com proteção de rotas e token
- Rotas de listagem, livros, genero, autor, alugados ou não
### Abaixo esta listado toda a documentação da API
Todas as rotas de envio de dados POST e PUT estão configuradas conforme abaixo:
| HEADERS   | VALUE       |
| :---------- | :--------- |
| `Content-Type` | `application/json` |
| `Content-Type` |`application/x-www-form-urlencoded` |

A aplicação esta totalmente protegida, portanto todas as rotas de ações necessitam de autenticação.



## Documentação da API e suas rotas

#### Rota de autenticação

```http
  POST /auth/authenticate
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório** |
| `password` | `string` | **Obrigatório** |

### Rota de registro
```http
  POST /auth/register
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório** |
| `email` | `string` | **Obrigatório** |
| `password` | `string` | **Obrigatório** |

#### ////////////////////////////////////////////////////////////////////////////////////////////////////
#### Rota para buscar todos livros

```http
  GET /books
```

### Rota para buscar informações de um unico livros
```http
  GET /books/{idBook}
```
### Rota para buscar livros por nome
```http
  GET /books/name/{name}
```
### Rota para buscar mais detalhes sobre um unico livro
```http
  GET /books/{idBook}/detail
```
### Rotas para livros por alugado ou não
```http
  GET /books/rented/filter
  GET /books/norented/filter
```

### Rota para adicionar livros
```http
  POST /books
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `img` | `string` | **Opicional** |
| `title` | `string` | **Obrigatório** |
| `author` | `string` | **Obrigatório** |
| `genre` | `string` | **Obrigatório** |
| `detail` | `string` | **Obrigatório** |
| `publisher` | `string` | **Obrigatório** |
| `rented` | `string` | **Opicional** |

### Rota para atualizar livros
```http
  PUT /books/{idBook}
```

### Rota para deletar livros
```http
  DELETE /books/{idBook}
```
#### ////////////////////////////////////////////////////////////////////////////////////////////////////

### Rota para adicionar um genero
```http
  POST /genres
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório** |

### Rota para buscar todos os generos
```http
  GET /genres
```
### Rota para buscar genero por nome
```http
  GET /genres/name/{name}
```
### Rota para buscar livros com genero especifico
```http
  GET /genres/{idGenre}
```
### Rota para deletar um genero
```http
  DELETE /genres/{idGenre}
```
#### ////////////////////////////////////////////////////////////////////////////////////////////////////

### Rota para adicionar um autor
```http
  POST /authors
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório** |

### Rota para atualizar um autor
```http
  PUT /authors/{idAuthor}
```
### Rota para deletar um autor
```http
  DELETE /authors/{idAuthor}
```

### Rota para listar todos os autores
```http
  GET /authors
```

### Rota para buscar autores por nome
```http
  GET /authors/name/{name}
```

### Rota para listar livros de autores
```http
  GET /authors/{idAuthor}
```

#### ////////////////////////////////////////////////////////////////////////////////////////////////////

### Rota para alugar um livro
```http
  GET /rent/{idBook}
```

### Rota para visualizar livros alugos na conta do usuário
```http
  GET /rent/rented/my
```

### Rota para devolver livros que foram alugados
```http
  GET /rent/{idBook}
```



## Primeiros passos:
O projeto foi totalmente desenvolvido utilizando o MongoDB como banco de dados principal, portanto e necessário que seja feito a instalação do mesmo, para facilitar na utilização pode ser utilizado docker como virtualização do MongoDB:

Caso já tenha o Docker instalado na maquina que sera utilizada, utilize o comando abaixo para baixar o mongo e criar o container para utilização da API, as variaveis definidas na configuração do Docker abaixo podem ser alteradas de sua preferênca:
```bash
  docker create --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -p 27017:27017  mongo
```
Após criar o container e baixar a imagem o Docker podera ser iniciado utilizando o comando abaixo:
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

# Labook

# Documentação: https://documenter.getpostman.com/view/24823029/2s93sXca7S

Labook é um projeto de backend desenvolvido em Node.js utilizando as tecnologias Knex, Express.js, SQL, JWT, bcrypt e UUID. O objetivo deste projeto é criar uma aplicação de mídia social onde os usuários podem criar posts, editar, excluir e interagir com eles.

# Funcionalidades

- Criação de usuário (signup): Permite que os usuários se cadastrem na plataforma fornecendo nome, email e senha.
- Login: Permite que os usuários façam login na plataforma utilizando suas credenciais de email e senha.
- Criação de post: Permite que os usuários criem posts fornecendo um título e conteúdo.
- Edição de post: Permite que os usuários editem o título e o conteúdo de um post existente.
- Exclusão de post: Permite que os usuários excluam um post existente.
- Like e Dislike: Permite que os usuários curtam ou descurtam um post.

# Tecnologias utilizadas

O projeto Labook utiliza as seguintes tecnologias:

- Node.js: Plataforma de desenvolvimento backend em JavaScript.
- Knex: Um construtor de consultas SQL para Node.js.
- Express.js: Framework web para Node.js.
- SQL: Linguagem de consulta estruturada para interagir com o banco de dados.
- JWT (JSON Web Tokens): Método de autenticação e autorização baseado em tokens.
- bcrypt: Biblioteca de criptografia para hashing de senhas.
- UUID: Um identificador único universalmente (Universally Unique Identifier) para gerar IDs únicos.

# Arquitetura em camadas

O projeto Labook segue uma arquitetura em camadas para garantir uma estrutura organizada e modular. As camadas incluem:

- Camada de rotas (routes): Responsável por receber as requisições HTTP e direcioná-las para os controladores apropriados.
- Camada de controladores (controllers): Responsável por lidar com a lógica de negócio e interagir com a camada de serviços.
- Camada de serviços (services): Responsável por implementar as regras de negócio e interagir com a camada de dados.
- Camada de dados (data): Responsável por se comunicar com o banco de dados utilizando o Knex para executar as consultas SQL.

# Instalação

Para executar o projeto localmente, siga as etapas abaixo:

- Certifique-se de ter o Node.js instalado em sua máquina.
- Clone este repositório para o seu ambiente local.
- Navegue até o diretório raiz do projeto.
- Execute o comando npm install para instalar as dependências do projeto.
    -- Se eventualmente alguma dependencia não for instalada corretamente, siga os comandos abaixo:

       # dependencies - npm i cors dotenv express jsonwebtoken knex sqlite3 uuid zod bcryptjs
       # devDependencies - npm i @types/cors @types/express @types/jsonwebtoken @types/knex @types/node @types/uuid @types/bcryptjs ts-node-dev typescript

- Configure as variáveis de ambiente necessárias no arquivo .env.
- Execute o comando npm start para iniciar o servidor.

# Considerações finais

O Labook é um projeto backend construído utilizando as melhores práticas de desenvolvimento, incluindo arquitetura em camadas, orientação a objetos e autenticação/autorização segura. Sinta-se à vontade para explorar e utilizar este projeto como ponto de partida para a criação de suas próprias aplicações de mídia social.
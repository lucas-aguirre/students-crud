# Comentários

<br>

#### Decisão da arquitetura utilizada
A arquitetura utilizada foi baseada em padrões utilizados no cenário atual, utilizando as especificações técnicas solicitadas.

A aplicação está organizada da seguinte maneira:
- app: os arquivos relacionados à regra e lógica de negócio estão localizados na pasta app, organizados nas subpastas controllers e models;
- config: nesta pasta a ideia é jogar todos os arquivos de configuração para a aplicação, neste caso, só existe a base de dados para ser configurada;
- database: pasta para organizar as migrations e seeders do sequelize;
- helpers: pasta para organizar os helpers que são utilizados na aplicação;
- routes: pasta onde estão declaradas as rotas da API;
- tests: pasta onde estão organizados os testes unitários, testes de integração e utils que são usados nos testes;

#### Lista de bibliotecas de terceiros utilizadas
As bibliotecas de terceiros utilizadas são as seguintes:
- dotenv: utilizada para recuperar as informações do arquivo .env no javascript;
- express: framework solicitado para o Node.JS;
- faker: utilizada para gerar valores aleatórios para o seed na base de dados e testes;
- mysql2: utilizada para facilitar a comunicação entre o Sequelize o MySQL;
- sequelize: ORM para facilitar o uso do MySQL;
- cors: utilizado para facilitar a configuração do cors;
- jest: utilizado para os testes;
- sequelize-cli: CLI utilizado para os comandos do sequelize;
- supertest: utilizado para os testes;

#### O que você melhoraria se tivesse mais tempo
Realizaria algumas melhorias, dentre elas:
- Paginação na rota de listar alunos
- Criar um validator para as rotas da API (hoje existe apenas algumas validações simples)
- Comentários e documentação para a API (Swagger ou Postman)
- Melhoria nos testes unitários e de integração, cobrindo uma maior gama de testes;

#### Quais requisitos obrigatórios que não foram entregues
- Todos os requisitos obrigatórios foram entregues;

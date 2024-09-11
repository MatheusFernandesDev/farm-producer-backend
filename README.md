# Backend de Produtores Rurais

Um projeto baseado em NestJS, TypeScript, TypeORM, PostgreSQL, Swagger e Docker  para cadastro de produtores rurais e seus produtos plantados.

## Tecnologias Utilizadas

- NestJS
- TypeScript
- TypeORM
- Docker
- PostgreSQL

## Pré-requisitos

- Docker e Node instalado em sua máquina (versão 18.19.1 ou superior recomendada)

## Configuração e Execução

### Clonando o Repositório

```bash
git clone https://github.com/MatheusFernandesDev/farm-producer-backend
```

### 2. Navegue até o Diretório do Projeto

```bash
cd farm-producer-backend
```

### 3. Configure as Variáveis de Ambiente

Copie o arquivo env.example para criar seu arquivo de variáveis de ambiente:

```bash
.env.example -> .env
```

Edite o arquivo .env para adicionar suas variáveis de ambiente:

```bash
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
```

### 4. Construa e Execute a Aplicação com Docker

Utilize o comando abaixo para construir a imagem Docker e iniciar os containers:

```bash
docker-compose up -d
```

## Migração

Para criar migrações, execute:

yarn migration:create <nome_da_migração>

Para executar migrações, execute:

yarn migration:run

### 5. Acesse a Aplicação

A API estará disponível em http://localhost:3333

## Rotas da API

## Documentação do Swagger

Para visualizar todos os pontos de fim com exemplos e documentação estruturada, visite:

http://localhost:3333/api/#/

<p align="center">Projeto feito com ❤️ por <a href="https://www.linkedin.com/in/matheus-fernandes--devfull/">Matheus Fernandes</a></p>

const { execSync } = require('child_process');

// Obtém o nome da migration passada como argumento
const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Você precisa passar o nome da migration. Ex: yarn migration:create CreateTablesProducerFarm');
  process.exit(1);
}

// Executa o comando TypeORM com o nome da migration
execSync(`npx typeorm migration:create ./src/db/migrations/${migrationName}`, { stdio: 'inherit' });

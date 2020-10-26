import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import fastGlob from 'fast-glob';

const entities = fastGlob.sync([
  'src/infra/db/typeorm/entities/*{.ts, .js}',
  '!src/infra/db/typeorm/entities/*{.spec.ts, .spec.js}',
  '!src/infra/db/typeorm/entities/*{.map.js}',
]);

const migrations = fastGlob.sync([
  'src/infra/db/typeorm/migrations/*{.ts, .js}',
  '!src/infra/db/typeorm/migrations/*{.map.js}',
]);

const typeormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tcdl',
  logging: false,
  entities,
  migrations,
  cli: {
    migrationsDir: 'src/infra/db/typeorm/migrations',
  },
};

export default typeormConfig;

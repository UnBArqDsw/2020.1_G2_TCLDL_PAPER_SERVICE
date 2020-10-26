import 'reflect-metadata';
import { createConnection } from 'typeorm';
import typeormConfig from './ormconfig';

(async () => {
  (await createConnection(typeormConfig)).runMigrations();

  const app = (await import('./config/app')).default;
  const port = process.env.SERVICE_PORT;

  app.listen(port, () => console.log(`Server runing at http://localhost:${port}`));
})();

import { Application, Router } from 'express';
import { readdirSync } from 'fs';

export default (app: Application): void => {
  const router = Router();
  const version = process.env.SERVICE_VERSION || 'v0';
  app.use(`/${version}`, router);
  readdirSync(`${__dirname}/../routes`).map(async (file) => {
    if (!file.includes('.test.') && !file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router);
    }
  });
};

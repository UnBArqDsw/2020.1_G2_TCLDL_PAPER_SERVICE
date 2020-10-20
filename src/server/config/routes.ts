import { Application, Router } from 'express';
import fastGlob from 'fast-glob';

export default (app: Application): void => {
  const router = Router();
  const version = process.env.SERVICE_VERSION || 'v0';
  app.use(`/${version}`, router);
  fastGlob.sync('**/src/server/routes/**Route.{ts,js}').map(async (file) => {
    console.log(file)
    if (!file.includes('.test.') && !file.endsWith('.map')) {
      (await import(`../../../${file}`)).default(router);
    }
  });
};

import { json, Application } from 'express';

export default (app: Application) => {
  app.use(json());
};

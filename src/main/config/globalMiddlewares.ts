import bodyParser from '@main/global_middlewares/bodyParser';
import contentType from '@main/global_middlewares/contentType';
import cors from '@main/global_middlewares/cors';
import { Application } from 'express';

export default (app: Application) => {
  cors(app);
  contentType(app);
  bodyParser(app);
};

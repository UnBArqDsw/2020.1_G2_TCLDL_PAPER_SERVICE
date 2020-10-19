import bodyParser from '@server/global_middlewares/bodyParser';
import contentType from '@server/global_middlewares/contentType';
import cors from '@server/global_middlewares/cors';
import { Application } from 'express';

export default (app: Application) => {
  cors(app);
  contentType(app);
  bodyParser(app);
};

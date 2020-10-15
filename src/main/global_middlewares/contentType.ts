import {
  Request, Response, NextFunction, Application,
} from 'express';

export default (app: Application) => {
  app.use((_request: Request, response: Response, next: NextFunction): void => {
    response.type('json');
    next();
  });
};

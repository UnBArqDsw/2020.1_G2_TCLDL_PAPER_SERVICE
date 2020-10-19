import express, { Application } from 'express';
import globalMiddlewares from './globalMiddlewares';
import routes from './routes';

class App {
  public readonly app: Application

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares() {
    globalMiddlewares(this.app);
  }

  private setupRoutes() {
    routes(this.app);
  }
}

export default new App().app;

import { HttpError } from '@presentation/protocols/HttpError';

export class ServerError extends Error implements HttpError {
  public readonly statusCode: number

  constructor() {
    super('Internal server error.');
    this.name = this.constructor.name;
    this.statusCode = 500;
  }
}

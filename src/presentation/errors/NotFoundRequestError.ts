import { HttpError } from '@presentation/protocols/HttpError';

export class NotFoundRequestError extends Error implements HttpError {
  public readonly statusCode: number

  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = this.constructor.name;
    this.statusCode = 404;
  }
}

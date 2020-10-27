import { HttpError } from '@presentation/protocols/HttpError';

export class UnauthorizedError extends Error implements HttpError {
  public readonly statusCode: number

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 401;
  }
}

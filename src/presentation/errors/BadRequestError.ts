import { HttpError } from '@presentation/protocols/HttpError';

export class BadRequestError extends Error implements HttpError {
  public readonly statusCode: number

  constructor(fields: string) {
    super(`Invalid request body with error in this fields: ${fields}`);
    this.name = this.constructor.name;
    this.statusCode = 400;
  }
}

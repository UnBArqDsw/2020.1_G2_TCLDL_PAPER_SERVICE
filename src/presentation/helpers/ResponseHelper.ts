import { BadRequestError } from '@presentation/errors/BadRequestError';
import { NotFoundRequestError } from '@presentation/errors/NotFoundRequestError';
import { ServerError } from '@presentation/errors/ServerError';
import { UnauthorizedError } from '@presentation/errors/UnauthorizedError';
import { ValidationRequestError } from '@presentation/errors/ValidationRequestError';
import { HttpResponse } from '@presentation/protocols/Http';

export class ResponseHelper {
  static successRequest(data: any): HttpResponse {
    return {
      statusCode: 200,
      body: data,
    };
  }

  static successCreate(data: any): HttpResponse {
    return {
      statusCode: 201,
      body: data,
    };
  }

  static successRemove(): HttpResponse {
    return {
      statusCode: 204,
    };
  }

  static unhatourizedRequest(message: string): HttpResponse {
    const unauthorizedError = new UnauthorizedError(message);

    return {
      statusCode: unauthorizedError.statusCode,
      body: unauthorizedError.message,
    };
  }

  static badRequest(message: string): HttpResponse {
    const badRequestError = new BadRequestError(message);

    return {
      statusCode: badRequestError.statusCode,
      body: badRequestError.message,
    };
  }

  static notFound(message: string): HttpResponse {
    const notFoundRequestError = new NotFoundRequestError(message);

    return {
      statusCode: notFoundRequestError.statusCode,
      body: notFoundRequestError.message,
    };
  }

  static validationError(message: string): HttpResponse {
    const validationRequestError = new ValidationRequestError(message);

    return {
      statusCode: validationRequestError.statusCode,
      body: validationRequestError.message,
    };
  }

  static serverError(): HttpResponse {
    const httpServerError = new ServerError();

    return {
      statusCode: httpServerError.statusCode,
      body: httpServerError.message,
    };
  }
}

import { User } from '@domain/entities/User';
import { FindUser } from '@domain/interactors/user/FindUser';
import { BadRequestError } from '@presentation/errors/BadRequestError';
import { ValidationRequestError } from '@presentation/errors/ValidationRequestError';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { VerifyIfUserAlreadyExistsMiddleware } from './VerifyIfUserAlreadyExistsMiddleware';

class FindUserStub implements FindUser {
  async execute(_parameter: string): Promise<User | undefined> {
    return undefined;
  }
}

describe('Find user by email middleware', () => {
  const findUserStub = new FindUserStub();
  const sut = new VerifyIfUserAlreadyExistsMiddleware(findUserStub);
  describe('when calls execute', () => {
    describe('and promise resolves', () => {
      describe('and user not found', () => {
        let response: HttpResponse;
        let request: HttpRequest;
        beforeAll(async () => {
          request = {
            body: {
              email: 'user_email',
            },
          };
          response = await sut.handle(request);
        });

        it('should return 200', () => {
          expect(response.statusCode).toBe(200);
        });
      });

      describe('and user not given', () => {
        let response: HttpResponse;
        let request: HttpRequest;
        beforeAll(async () => {
          request = {};
          response = await sut.handle(request);
        });

        it('should return 400', () => {
          expect(response.statusCode).toBe(400);
        });

        it('should return bad request in body', () => {
          expect(response.body).toBe(new BadRequestError('user email').message);
        });
      });

      describe('and user is found', () => {
        let response: HttpResponse;
        let request: HttpRequest;
        beforeAll(async () => {
          request = {
            body: {
              email: 'user_email',
            },
          };
          jest.spyOn(findUserStub, 'execute').mockResolvedValueOnce({
            id: 'valid_id',
            name: 'valid_name',
            lastName: 'valid_lastName',
            email: 'valid_email',
            password: 'valid_password',
            createdAt: 'valid_createdAt',
            updatedAt: 'valid_updatedAt',
          });
          response = await sut.handle(request);
        });

        it('should return 400', () => {
          expect(response.statusCode).toBe(422);
        });

        it('should return bad request in body', () => {
          expect(response.body).toBe(new ValidationRequestError('user already exists.').message);
        });
      });
    });
  });
});

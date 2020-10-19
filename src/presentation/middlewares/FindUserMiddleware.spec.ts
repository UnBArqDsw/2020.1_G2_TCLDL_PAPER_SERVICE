import { FindUser } from '@domain/interactors/FindUser';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { FindUserMiddleware } from './FindUserMiddleware';

class FindUserStub implements FindUser {
  async execute(_params: string) {
    return {
      id: 'valid_id',
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email',
      password: 'valid_password',
      createdAt: 'valid_createdAt',
      updatedAt: 'valid_updatedAt',
    };
  }
}

describe('Find user middleware', () => {
  const findUserStub = new FindUserStub();
  const sut = new FindUserMiddleware(findUserStub);

  describe('and calls handle', () => {
    describe('and promise resolves', () => {
      const httpRequest: HttpRequest = {
        params: {
          userId: 'valid_id',
        },
      };
      let httpResponse: HttpResponse;

      beforeAll(async () => {
        httpResponse = await sut.handle(httpRequest);
      });

      test('should return 200 if user is found', () => {
        expect(httpResponse.statusCode).toBe(200);
      });
    });
  });
});

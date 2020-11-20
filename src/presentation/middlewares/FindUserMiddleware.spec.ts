import { User } from '@domain/entities/User';
import { FindUser } from '@domain/interactors/user/FindUser';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { FindUserMiddleware } from './FindUserMiddleware';

class FindUserStub implements FindUser {
  async execute(_params: Partial<User>): Promise<User | undefined> {
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
        jest.spyOn(findUserStub, 'execute');
        httpResponse = await sut.handle(httpRequest);
      });

      test('should return 200 if user is found', () => {
        expect(httpResponse.statusCode).toBe(200);
      });

      test('should call find user with correct params', () => {
        expect(findUserStub.execute).toHaveBeenCalledWith({ id: 'valid_id' });
      });

      describe('and user is not found', () => {
        beforeAll(async () => {
          jest.spyOn(findUserStub, 'execute').mockResolvedValueOnce(undefined);
          httpResponse = await sut.handle(httpRequest);
        });

        test('should return 404 if user is not found', () => {
          expect(httpResponse.statusCode).toBe(404);
        });
      });
    });

    describe('and promises rejects', () => {
      const httpRequest: HttpRequest = {
        params: {
          userId: 'valid_id',
        },
      };
      let httpResponse: HttpResponse;

      beforeAll(async () => {
        jest.spyOn(findUserStub, 'execute').mockRejectedValueOnce(new Error());
        httpResponse = await sut.handle(httpRequest);
      });

      it('should throws', () => {
        expect(httpResponse.statusCode).toBe(500);
      });
    });
  });
});

import { User } from '@domain/entities/User';
import { FindUser } from '@domain/interactors/user/FindUser';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { ReadUserController } from './ReadUserController';

class ReadUserStub implements FindUser {
  async execute(_data: Partial<User>): Promise<User | undefined> {
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

describe('Update user controller', () => {
  const readUserStub = new ReadUserStub();
  const sut = new ReadUserController(readUserStub);

  describe('and calls handle', () => {
    describe('and promise resolves', () => {
      const httpRequest: HttpRequest = {
        params: {
          userId: 'valid_id',
        },
      };
      let httpResponse: HttpResponse;

      beforeAll(async () => {
        jest.spyOn(readUserStub, 'execute');
        httpResponse = await sut.handle(httpRequest);
      });

      test('should return 200 if user is found', () => {
        expect(httpResponse.statusCode).toBe(200);
      });

      test('should call Update user with correct params', () => {
        expect(readUserStub.execute).toHaveBeenCalledWith({ id: 'valid_id' });
      });

      describe('and user is not found', () => {
        beforeAll(async () => {
          jest.spyOn(readUserStub, 'execute').mockResolvedValueOnce(undefined);
          httpResponse = await sut.handle(httpRequest);
        });

        test('should return 404 if user is not found', () => {
          expect(httpResponse.statusCode).toBe(404);
        });
      });
    });

    describe('and readUser throws', () => {
      const httpRequest: HttpRequest = {
        params: {
          userId: 'valid_id',
        },
      };
      let httpResponse: HttpResponse;

      beforeAll(async () => {
        jest.spyOn(readUserStub, 'execute').mockRejectedValueOnce(new Error());
        httpResponse = await sut.handle(httpRequest);
      });

      test('should return 404 if user is not found', () => {
        expect(httpResponse.statusCode).toBe(500);
      });
    });
  });
});

import { User } from '@domain/entities/User';
import { UpdateUser } from '@domain/interactors/UpdateUser';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { UpdateUserController } from './UpdateUserController';
import { UpdateUserAttribute } from '@data/repositories/UpdateUserRepository';

class UpdateUserStub implements UpdateUser {
  async execute(data: UpdateUserAttribute): Promise<User> {
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
  const findUserStub = new UpdateUserStub();
  const sut = new UpdateUserController(findUserStub);

  describe('and calls handle', () => {
    describe('and promise resolves', () => {
      const httpRequest: HttpRequest = {
        params: {
          id: 'valid_id',
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

      test('should call Update user with correct params', () => {
        expect(findUserStub.execute).toHaveBeenCalledWith('valid_id', 'id');
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
  });
});

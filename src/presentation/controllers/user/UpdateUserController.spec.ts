import { UpdateUser, UpdateUserAttribute } from '@domain/interactors/user/UpdateUser';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { UpdateUserController } from './UpdateUserController';

class UpdateUserStub implements UpdateUser {
  // eslint-disable-next-line no-empty-function
  async execute(_params: UpdateUserAttribute) {
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

describe('Remove user controller', () => {
  const updateUserStub = new UpdateUserStub();
  const sut = new UpdateUserController(updateUserStub);
  describe('when calls handle', () => {
    describe('and promise resolves', () => {
      const httpRequest: HttpRequest = {
        params: 'valid_id',
      };
      let httpResponse: HttpResponse;

      beforeAll(async () => {
        jest.spyOn(updateUserStub, 'execute');
        httpResponse = await sut.handle(httpRequest);
      });

      it('should return 200', () => {
        expect(httpResponse.statusCode).toBe(200);
      });

      it('should return user in response', () => {
        expect(httpResponse.body).toEqual({
          id: 'valid_id',
          name: 'valid_name',
          lastName: 'valid_lastName',
          email: 'valid_email',
          password: 'valid_password',
          createdAt: 'valid_createdAt',
          updatedAt: 'valid_updatedAt',
        });
      });
    });

    describe('and promise rejects', () => {
      const httpRequest: HttpRequest = {
        params: 'valid_id',
      };
      let httpResponse: HttpResponse;

      beforeAll(async () => {
        jest.spyOn(updateUserStub, 'execute').mockRejectedValueOnce(new Error());
        httpResponse = await sut.handle(httpRequest);
      });

      it('should return 500 if remove user throws', () => {
        expect(httpResponse.statusCode).toBe(500);
      });
    });
  });
});

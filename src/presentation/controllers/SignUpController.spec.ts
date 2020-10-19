import { User } from '@domain/entities/User';
import { CreateUser } from '@domain/interactors/CreateUser';
import { ServerError } from '@presentation/errors/ServerError';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { SignUpController } from './SignUpController';

class CreateUserStub implements CreateUser {
  async execute(data: Omit<User, 'id'>): Promise<User> {
    return {
      id: 'valid_id',
      ...data,
    };
  }
}

describe('SignUpController', () => {
  const createUserStub = new CreateUserStub();
  const sut = new SignUpController(createUserStub);
  describe('when handle execute', () => {
    describe('and promise resolves', () => {
      let httpRequest: HttpRequest;
      let httpResponse: HttpResponse;
      const createUserSpy = jest.spyOn(createUserStub, 'execute');
      beforeAll(async () => {
        httpRequest = {
          body: {
            name: 'valid_name',
            lastName: 'valid_lastName',
            email: 'valid_email',
            password: 'valid_password',
            password_confirmation: 'valid_password',
          },
        };
        httpResponse = await sut.handle(httpRequest);
      });

      it('should return status code 200', () => {
        expect(httpResponse.statusCode).toBe(201);
      });

      it('should return user info', () => {
        expect(httpResponse.body).toEqual({ id: 'valid_id', ...httpRequest.body });
      });

      it('should call createUser with correct params', () => {
        expect(createUserSpy).toHaveBeenCalledWith(httpRequest.body);
      });
    });

    describe('and promise rejects', () => {
      let httpRequest: HttpRequest;
      let httpResponse: HttpResponse;

      beforeAll(async () => {
        jest.spyOn(createUserStub, 'execute').mockRejectedValueOnce('Error');
        httpRequest = {
          body: {
            name: 'valid_name',
            lastName: 'valid_lastName',
            email: 'valid_email',
            password: 'valid_password',
            password_confirmation: 'valid_password',
          },
        };
        httpResponse = await sut.handle(httpRequest);
      });

      it('should return 500 if throws', () => {
        expect(httpResponse.statusCode).toBe(500);
      });

      it('should return message error', () => {
        expect(httpResponse.body).toEqual(new ServerError().message);
      });
    });
  });
});

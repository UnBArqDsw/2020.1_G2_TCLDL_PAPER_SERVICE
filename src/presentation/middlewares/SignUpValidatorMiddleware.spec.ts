import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import {
  RequestValidator, RequestValidatorReturn,
} from '@presentation/validators/RequestValidator';
import { SignUpValidatorMiddleware } from './SignUpValidatorMiddleware';

class SignUpRequestValidatorStub implements RequestValidator {
  async validate(_request: HttpRequest): Promise<RequestValidatorReturn> {
    return {
      isValid: true,
      fields: '',
    };
  }
}

describe('SignUpValidatorMiddleware', () => {
  const validatorStub = new SignUpRequestValidatorStub();
  const sut = new SignUpValidatorMiddleware(validatorStub);
  describe('when call handle', () => {
    describe('and request validator returns true', () => {
      let httpRequest: HttpRequest;
      const validatorSpy = jest.spyOn(validatorStub, 'validate');
      beforeAll(() => {
        httpRequest = {
          body: {
            name: 'valid_name',
            lastName: 'valid_lastName',
            email: 'valid_email',
            password: 'valid_password',
            password_confirmation: 'valid_password',
          },
        };
      });

      it('should not throw error', async () => {
        await expect(sut.handle(httpRequest)).resolves.toBe(undefined);
      });

      it('should call validator with correct params', () => {
        expect(validatorSpy).toHaveBeenCalledWith(httpRequest.body);
      });
    });

    describe('and request validator returns false', () => {
      let httpRequest: HttpRequest;
      let httpResponse: HttpResponse | undefined;

      beforeAll(async () => {
        httpRequest = {
          body: {
            name: 'invalid_name',
            lastName: 'invalid_lastName',
            email: 'invalid_email',
            password: 'invalid_password',
            passwordConfirmation: 'invalid_password',
          },
        };
        jest.spyOn(validatorStub, 'validate').mockResolvedValueOnce(
          { isValid: false, fields: 'name, lastName, email, password, passwordConfirmation' },
        );
        httpResponse = await sut.handle(httpRequest);
      });

      it('should returns status code 400', () => {
        expect(httpResponse?.statusCode).toBe(400);
      });

      it('should return bad request message in body', () => {
        expect(httpResponse?.body)
          .toBe('Invalid request body with error in this fields: name, lastName, email, password, passwordConfirmation');
      });
    });

    describe('and validator throws', () => {
      let httpRequest: HttpRequest;

      beforeAll(() => {
        httpRequest = {
          body: {
            name: 'valid_name',
            lastName: 'valid_lastName',
            email: 'valid_email',
            password: 'valid_password',
            passwordConfirmation: 'valid_password',
          },
        };
        jest.spyOn(validatorStub, 'validate').mockRejectedValue(new Error());
      });

      it('should throw an error', async () => {
        await expect(sut.handle(httpRequest)).rejects.toThrow();
      });
    });
  });
});

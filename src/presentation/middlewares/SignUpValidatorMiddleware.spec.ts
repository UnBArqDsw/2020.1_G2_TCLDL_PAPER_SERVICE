import { BadRequestError } from '../errors/BadRequestError';
import { IHttpRequest } from '../protocols/IHttp';
import { IRequestValidator, IRequestValidatorReturn } from '../validators/IRequestValidator';
import { SignUpValidatorMiddleware } from './SignUpValidatorMiddleware';

class SignUpRequestValidatorStub implements IRequestValidator {
  async validate(_request: IHttpRequest): Promise<IRequestValidatorReturn> {
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
      let httpRequest: IHttpRequest;

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
    });

    describe('and request validator returns false', () => {
      let httpRequest: IHttpRequest;

      beforeAll(() => {
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
      });

      it('should throw an error', async () => {
        await expect(sut.handle(httpRequest)).rejects.toThrow(
          new BadRequestError('name, lastName, email, password, passwordConfirmation'),
        );
      });
    });
  });
});

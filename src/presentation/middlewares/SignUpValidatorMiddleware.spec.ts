import { IHttpRequest } from '../protocols/IHttp';
import { IRequestValidator } from '../validators/IRequestValidator';
import { SignUpValidatorMiddleware } from './SignUpValidatorMiddleware';

class SignUpRequestValidatorStub implements IRequestValidator {
  async isValid(_request: IHttpRequest): Promise<boolean> {
    return true;
  }
}

describe('SignUpValidatorMiddleware', () => {
  const validator = new SignUpRequestValidatorStub();
  const sut = new SignUpValidatorMiddleware(validator);
  describe('when call handle', () => {
    describe('and promise resolves', () => {
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
  });
});

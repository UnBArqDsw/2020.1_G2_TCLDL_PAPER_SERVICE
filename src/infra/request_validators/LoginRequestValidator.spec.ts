import { RequestValidatorReturn } from '@presentation/validators/RequestValidator';
import { LoginRequestValidator } from './LoginRequestValidator';

const validateAsyncMocked = jest.fn(async () => {});
jest.mock('joi', () => ({
  object: () => ({
    validateAsync: validateAsyncMocked,
  }),
  string: () => ({
    email: () => {},
  }),
}));

describe('Login request validator', () => {
  const sut = new LoginRequestValidator();
  describe('and calls validate', () => {
    describe('and promise resolves', () => {
      let result: RequestValidatorReturn;
      beforeAll(async () => {
        result = await sut.validate({ test: 'test' });
      });

      it('should return is valid true', () => {
        expect(result.isValid).toBe(true);
      });
    });
  });
});

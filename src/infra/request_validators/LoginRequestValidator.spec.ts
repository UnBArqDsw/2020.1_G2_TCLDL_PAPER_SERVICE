import { RequestValidatorReturn } from '@presentation/validators/RequestValidator';
import { LoginRequestValidator } from './LoginRequestValidator';
import { ValidationErrorStub } from './stubs/ValidationErrorStub';

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

    describe('and promise rejects validation error', () => {
      let result: RequestValidatorReturn;
      beforeAll(async () => {
        validateAsyncMocked.mockRejectedValueOnce(new ValidationErrorStub('ValidationError', true, [{
          message: 'valid_message',
          path: ['valid_path'],
          type: 'valid_type',
          context: {
            label: 'valid_label',
          },
        }]));
        result = await sut.validate({ test: 'test' });
      });

      it('should return is valid false', () => {
        expect(result.isValid).toBe(false);
      });
    });

    describe('and promises rejects with an other error', () => {
      let result: Promise<RequestValidatorReturn>;
      beforeAll(async () => {
        validateAsyncMocked.mockRejectedValueOnce(new Error());
        result = sut.validate({ test: 'test' });
      });

      it('should return is valid false', () => {
        expect(result).rejects.toThrow();
      });
    });
  });
});

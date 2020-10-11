import { RequestValidatorReturn } from '@presentation/validators/RequestValidator';
import { CreateUserRequestValidator } from './CreateUserRequestValidator';

jest.mock('joi', () => ({
  object: () => ({
    validateAsync: async () => {},
  }),
  string: () => ({
    email: () => {},
  }),
}));

describe('Create user request validator', () => {
  const sut = new CreateUserRequestValidator();

  describe('and calls validate', () => {
    describe('and promises resolves', () => {
      let result: RequestValidatorReturn;

      beforeAll(async () => {
        result = await sut.validate({
          valid: true,
        });
      });

      it('should return isValid if validations is ok', () => {
        expect(result.isValid).toBe(true);
      });

      it('should return field empty if validations is ok', () => {
        expect(result.fields).toBe('');
      });
    });
  });
});

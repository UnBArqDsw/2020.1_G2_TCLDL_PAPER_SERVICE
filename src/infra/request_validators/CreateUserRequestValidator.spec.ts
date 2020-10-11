import { RequestValidatorReturn } from '@presentation/validators/RequestValidator';
import joi from 'joi';
import { CreateUserRequestValidator } from './CreateUserRequestValidator';

const validateAsyncMocked = jest.fn(async () => {});
jest.mock('joi', () => ({
  object: () => ({
    validateAsync: validateAsyncMocked,
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

      it('should return isValid true if validations is ok', () => {
        expect(result.isValid).toBe(true);
      });

      it('should return field empty if validations is ok', () => {
        expect(result.fields).toBe('');
      });
    });

    describe('and validation throws', () => {
      let result: RequestValidatorReturn;

      beforeAll(async () => {
        jest.spyOn(joi.object(), 'validateAsync').mockRejectedValueOnce(new Error());
        result = await sut.validate({
          valid: true,
        });
      });

      it('should return isValid false if validations fails', () => {
        expect(result.isValid).toBe(false);
      });
    });
  });
});

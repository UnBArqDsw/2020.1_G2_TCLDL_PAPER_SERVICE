import { RequestValidatorReturn } from '@presentation/validators/RequestValidator';
import joi from 'joi';
import { CreatePaperRequestValidator } from './CreatePaperRequestValidator';
import { ValidationErrorStub } from './stubs/ValidationErrorStub';

const validateAsyncMocked = jest.fn(async () => {});
jest.mock('joi', () => ({
  object: () => ({
    validateAsync: validateAsyncMocked,
  }),
  date: () => {},
  number: () => {},
  string: () => ({
    regex: () => {},
    uri: () => {},
  }),
  ref: () => {},
}));

describe('Create paper request validator', () => {
  const sut = new CreatePaperRequestValidator();

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
        const details = [{
          message: 'valid_message',
          path: ['valid_path'],
          type: 'valid_type',
          context: {
            label: 'valid_label',
          },
        },
        {
          message: 'valid2_message',
          path: ['valid2_path'],
          type: 'valid2_type',
          context: {
            label: 'valid2_label',
          },
        }];
        jest.spyOn(joi.object(), 'validateAsync').mockRejectedValueOnce(
          new ValidationErrorStub('ValidationError', true, details),
        ).mockRejectedValueOnce(new Error());
        result = await sut.validate({
          valid: true,
        });
      });

      it('should return isValid false if validations fails with validation error', () => {
        expect(result.isValid).toBe(false);
      });

      it('should return labels joined in fields', () => {
        expect(result.fields).toBe('valid_label,valid2_label');
      });

      it('should throw if validations throws with an error that is not validation error',
        async () => {
          await expect(sut.validate({
            valid: false,
          })).rejects.toThrow();
        });
    });
  });
});

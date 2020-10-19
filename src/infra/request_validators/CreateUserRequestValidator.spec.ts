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
    valid: () => {},
  }),
  ref: () => {},
}));

class ValidationErrorStub extends Error implements joi.ValidationError {
  public readonly name: 'ValidationError'

  public readonly isJoi: boolean

  public readonly details: joi.ValidationErrorItem[]

  public readonly _object: any

  constructor(
    name: 'ValidationError',
    isJoi: boolean,
    details: joi.ValidationErrorItem[],
  ) {
    super(name);
    this.name = name;
    this.isJoi = isJoi;
    this.details = details;
  }

  annotate() {
    return 'annotate_stub';
  }
}
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

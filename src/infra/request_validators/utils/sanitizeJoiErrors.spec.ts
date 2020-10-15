import joi from 'joi';
import { sanitizeJoiError } from './sanitizeJoiErrors';

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
describe('Sanitize joi errors', () => {
  describe('and have context', () => {
    let result: any;
    beforeAll(() => {
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
      result = sanitizeJoiError(new ValidationErrorStub('ValidationError', true, details));
    });

    it('should return labels joined', () => {
      expect(result).toBe('valid_label,valid2_label');
    });
  });

  describe('and no have context', () => {
    let result: any;
    beforeAll(() => {
      const details = [{
        message: 'valid_message',
        path: ['valid_path'],
        type: 'valid_type',
      }];
      result = sanitizeJoiError(new ValidationErrorStub('ValidationError', true, details));
    });

    it('should return empty string', () => {
      expect(result).toBe('');
    });
  });
});

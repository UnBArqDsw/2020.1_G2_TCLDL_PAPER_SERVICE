import joi from 'joi';
import {
  RequestValidator, RequestValidatorReturn,
} from '@presentation/validators/RequestValidator';
import { sanitizeJoiError } from './utils/sanitizeJoiErrors';

export class CreateUserRequestValidator implements RequestValidator {
  private readonly schema: joi.Schema

  constructor() {
    this.schema = joi.object({
      name: joi.string(),
      lastName: joi.string(),
      email: joi.string().email(),
      password: joi.string(),
      passwordConfirmation: joi.string().valid(joi.ref('password')),
    });
  }

  async validate(data: any): Promise<RequestValidatorReturn> {
    try {
      await this.schema.validateAsync(data, { abortEarly: false, presence: 'required' });
      return { isValid: true, fields: '' };
    } catch (error) {
      if (error.name === 'ValidationError') {
        const fields = sanitizeJoiError(error);
        return { isValid: false, fields };
      }

      throw error;
    }
  }
}

import joi, { Schema } from 'joi';
import {
  RequestValidator, RequestValidatorReturn,
} from '@presentation/validators/RequestValidator';
import { sanitizeJoiError } from './utils/sanitizeJoiErrors';

export class AbstractRequestValidator implements RequestValidator {
  private readonly schema: joi.Schema

  constructor(schema: Schema) {
    this.schema = schema;
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

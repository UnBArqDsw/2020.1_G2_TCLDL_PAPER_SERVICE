import { RequestValidator, RequestValidatorReturn } from '@presentation/validators/RequestValidator';
import joi from 'joi';

export class CreateUserRequestValidator implements RequestValidator {
  private readonly schema: joi.Schema

  constructor() {
    this.schema = joi.object({
      name: joi.string(),
      lastName: joi.string(),
      email: joi.string().email(),
      password: joi.string(),
      passwordConfirmation: joi.string(),
    });
  }

  async validate(data: any): Promise<RequestValidatorReturn> {
    await this.schema.validateAsync(data);
    return { isValid: true, fields: '' };
  }
}

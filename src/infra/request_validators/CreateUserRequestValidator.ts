import joi from 'joi';
import { AbstractRequestValidator } from './AbstractRequestValidator';

export class CreateUserRequestValidator extends AbstractRequestValidator {
  constructor() {
    super(joi.object({
      name: joi.string(),
      lastName: joi.string(),
      email: joi.string().email(),
      password: joi.string(),
      passwordConfirmation: joi.string().valid(joi.ref('password')),
    }));
  }
}

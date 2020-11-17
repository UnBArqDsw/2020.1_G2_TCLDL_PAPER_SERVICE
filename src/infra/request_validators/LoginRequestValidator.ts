import joi from 'joi';
import { AbstractRequestValidator } from './AbstractRequestValidator';

export class LoginRequestValidator extends AbstractRequestValidator {
  constructor() {
    super(joi.object({
      email: joi.string().email(),
      password: joi.string(),
    }));
  }
}

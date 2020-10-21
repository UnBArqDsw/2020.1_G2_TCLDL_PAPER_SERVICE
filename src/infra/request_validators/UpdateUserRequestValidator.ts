import joi from 'joi';
import { AbstractRequestValidator } from './AbstractRequestValidator';

export class UpdateUserRequestValidator extends AbstractRequestValidator {
  constructor() {
    super(joi.object({
      id: joi.string(),
      name: joi.string(),
      lastName: joi.string()
    }));
  }
}

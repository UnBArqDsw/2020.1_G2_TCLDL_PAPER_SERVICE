import { User } from '@domain/entities/User';
import joi from 'joi';
import { AbstractRequestValidator } from './AbstractRequestValidator';

export class UpdateUserRequestValidator extends AbstractRequestValidator {
  constructor() {
    super(joi.object<Partial<Pick<User, 'name' | 'lastName' | 'password' | 'email'>>>({
      email: joi.string().email().optional(),
      name: joi.string().optional(),
      lastName: joi.string().optional(),
      password: joi.string().optional(),
    }));
  }
}

import { HttpRequest } from '../protocols/Http';

export interface RequestValidatorReturn {
  isValid: boolean
  fields: string
}

export interface RequestValidator {
  validate: (data: HttpRequest['body']) => Promise<RequestValidatorReturn>
}

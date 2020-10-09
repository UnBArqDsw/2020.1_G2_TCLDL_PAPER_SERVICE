import { IHttpRequest } from '../protocols/IHttp';

export interface IRequestValidatorReturn {
  isValid: boolean
  fields: string
}

export interface IRequestValidator {
  validate: (data: IHttpRequest) => Promise<IRequestValidatorReturn>
}

import { IHttpRequest } from '../protocols/IHttp';

export interface IRequestValidator {
  isValid: (data: IHttpRequest) => Promise<boolean>
}

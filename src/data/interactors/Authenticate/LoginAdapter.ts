import { Login } from '@domain/interactors/Authentication/Login';
import { Authenticate } from '@domain/entities/Authenticate';

export class LoginAdapter implements Login {
  async execute(_data: Authenticate): Promise<string> {
    return 'valid_token';
  }
}

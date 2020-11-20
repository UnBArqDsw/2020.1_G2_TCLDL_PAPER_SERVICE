import { LoginAdapter } from '@data/interactors/authenticate/LoginAdapter';
import { JwtAdapter } from '@infra/jwt/JwtAdapter';
import { FindUserRepositoryAdapter }
  from '@infra/db/typeorm/repositories/user/FindUserRepositoryAdapter';
import { EncrypterAdapter } from '@infra/criptography/EncrypterAdapter';

export class LoginFactory {
  create(): LoginAdapter {
    const jwt = new JwtAdapter();
    const findUserRepository = new FindUserRepositoryAdapter();
    const encrypter = new EncrypterAdapter();
    return new LoginAdapter(jwt, findUserRepository, encrypter);
  }
}

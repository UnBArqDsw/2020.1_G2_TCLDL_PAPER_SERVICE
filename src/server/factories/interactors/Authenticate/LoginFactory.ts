import { LoginAdapter } from '@data/interactors/Authenticate/LoginAdapter';
import { JwtGeneratorAdapter } from '@infra/jwt/JwtGeneratorAdapter';
import { FindUserRepositoryAdapter } from '@infra/db/typeorm/repositories/user/FindUserRepositoryAdapter';
import { EncrypterAdapter } from '@infra/criptography/EncrypterAdapter';

export class LoginFactory {
  create(): LoginAdapter {
    const jwt = new JwtGeneratorAdapter();
    const findUserRepository = new FindUserRepositoryAdapter();
    const encrypter = new EncrypterAdapter();
    return new LoginAdapter(jwt, findUserRepository, encrypter);
  }
}

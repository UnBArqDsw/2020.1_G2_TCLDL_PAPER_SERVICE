import { LoginAdapter } from '@data/interactors/Authenticate/LoginAdapter';
import { JwtGeneratorAdapter } from '@infra/jwt/JwtGeneratorAdapter';
import { FindUserRepositoryAdapter } from '@infra/db/typeorm/repositories/FindUserRepositoryAdapter';
import { BcryptAdapter } from '@infra/criptography/BcryptAdapter';

export class LoginFactory {
  create(): LoginAdapter {
    const jwt = new JwtGeneratorAdapter();
    const findUserRepository = new FindUserRepositoryAdapter();
    const encrypter = new BcryptAdapter();
    return new LoginAdapter(jwt, findUserRepository, encrypter);
  }
}

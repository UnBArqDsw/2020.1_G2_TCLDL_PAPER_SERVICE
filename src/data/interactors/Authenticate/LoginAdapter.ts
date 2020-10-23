import { Login } from '@domain/interactors/Authentication/Login';
import { Authenticate } from '@domain/entities/Authenticate';
import { JwtGenerator } from '@data/protocols/JwtGenerator';
import { FindUserRepository } from '@data/repositories/FindUserRepository';
import { Encrypter } from '@data/protocols/Encrypter';

export class LoginAdapter implements Login {
  private readonly jwtGenerator: JwtGenerator

  private readonly findUserRepository: FindUserRepository

  private readonly encrypter: Encrypter

  constructor(
    jwtGenerator: JwtGenerator, findUserRepository: FindUserRepository, encrypter: Encrypter,
  ) {
    this.jwtGenerator = jwtGenerator;
    this.findUserRepository = findUserRepository;
    this.encrypter = encrypter;
  }

  async execute(data: Authenticate): Promise<string> {
    const user = await this.findUserRepository.execute({ email: data.email });

    if (!user) {
      throw new Error('User not found.');
    }

    const isSamePassword = await this.encrypter.compare(data.password, user.password);

    if (!isSamePassword) {
      throw new Error('Invalid credentials.');
    }

    return this.jwtGenerator.generate({ id: user.id, email: user.email });
  }
}

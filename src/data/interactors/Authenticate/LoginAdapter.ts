import { Login } from '@domain/interactors/Authentication/Login';
import { Authenticate } from '@domain/entities/Authenticate';
import { JwtGenerator } from '@data/protocols/JwtGenerator';
import { FindUserRepository } from '@data/repositories/FindUserRepository';

export class LoginAdapter implements Login {
  private readonly jwtGenerator: JwtGenerator

  private readonly findUserRepository: FindUserRepository

  constructor(jwtGenerator: JwtGenerator, findUserRepository: FindUserRepository) {
    this.jwtGenerator = jwtGenerator;
    this.findUserRepository = findUserRepository;
  }

  async execute(data: Authenticate): Promise<string> {
    const user = await this.findUserRepository.execute(data);

    if (!user) {
      throw new Error('User not found.');
    }

    return this.jwtGenerator.generate({ id: user.id, email: user.email });
  }
}

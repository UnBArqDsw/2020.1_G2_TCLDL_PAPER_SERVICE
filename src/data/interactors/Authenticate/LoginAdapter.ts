import { Login } from '@domain/interactors/Authentication/Login';
import { Authenticate } from '@domain/entities/Authenticate';
import { JwtGenerator } from '@data/protocols/JwtGenerator';

export class LoginAdapter implements Login {
  private readonly jwtGenerator: JwtGenerator

  constructor(jwtGenerator: JwtGenerator) {
    this.jwtGenerator = jwtGenerator;
  }

  async execute(data: Authenticate): Promise<string> {
    return this.jwtGenerator.generate(data);
  }
}

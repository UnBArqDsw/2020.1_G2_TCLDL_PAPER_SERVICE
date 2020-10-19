import { User } from '@domain/entities/User';
import { ReadUser } from '@domain/interactors/ReadUser';
import { ReadUserRepository } from '@data/repositories/ReadUserRepository';

export class ReadUserAdapterDb implements ReadUser {
  private readonly readUserRepository: ReadUserRepository

  constructor(
    readUserRepository: ReadUserRepository,
  ) {
    this.readUserRepository = readUserRepository;
  }

  async execute(id: string): Promise<User> {
    return this.readUserRepository.execute(id);
  }
}

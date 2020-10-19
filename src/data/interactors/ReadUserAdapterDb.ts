import { User } from '@domain/entities/User';
import { ReadUser } from '@domain/interactors/ReadUser';
import { ReadUserRepository } from '@data/repositories/ReadUserRepository';

export class CreateUserAdapterDb implements ReadUser {
  private readonly readUserRepository: ReadUserRepository

  constructor(
    readUserRepository: ReadUserRepository,
  ) {
    this.readUserRepository = readUserRepository;
  }

  async execute(userData: Omit<User, 'id' | 'createdAt'| 'updatedAt'>): Promise<User> {
    return this.readUserRepository.execute({
      id: uuid,
      ...userData,
      password: hashedPassword,
      createdAt,
      updatedAt,
    });
  }
}

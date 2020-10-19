import { User } from '@domain/entities/User';
import { ReadUser } from '@domain/interactors/ReadUser';
import { CreateUserRepository } from '@data/repositories/CreateUserRepository';

export class CreateUserAdapterDb implements ReadUser {
  private readonly createUserRepository: CreateUserRepository

  constructor(
    createUserRepository: CreateUserRepository,
  ) {
    this.createUserRepository = createUserRepository;
  }

  async execute(userData: Omit<User, 'id' | 'createdAt'| 'updatedAt'>): Promise<User> {
    return this.createUserRepository.execute({
      id: uuid,
      ...userData,
      password: hashedPassword,
      createdAt,
      updatedAt,
    });
  }
}

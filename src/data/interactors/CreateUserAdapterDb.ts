import { User } from '@domain/entities/User';
import { CreateUser } from '@domain/interactors/CreateUser';
import { CreateUserRepository } from 'data/repositories/CreateUserRepository';

export class CreateUserAdapterDb implements CreateUser {
  private readonly createUserRepository: CreateUserRepository

  constructor(createUserRepository: CreateUserRepository) {
    this.createUserRepository = createUserRepository;
  }

  async execute(userData: Omit<User, 'id'>): Promise<User> {
    return this.createUserRepository.execute(userData);
  }
}

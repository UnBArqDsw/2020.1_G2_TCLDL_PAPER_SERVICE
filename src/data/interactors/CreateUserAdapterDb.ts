import { User } from '@domain/entities/User';
import { CreateUser } from '@domain/interactors/CreateUser';
import { Encrypter } from 'data/protocols/Encrypter';
import { CreateUserRepository } from 'data/repositories/CreateUserRepository';

export class CreateUserAdapterDb implements CreateUser {
  private readonly createUserRepository: CreateUserRepository

  private readonly encrypter: Encrypter

  constructor(createUserRepository: CreateUserRepository, encrypter: Encrypter) {
    this.createUserRepository = createUserRepository;
    this.encrypter = encrypter;
  }

  async execute(userData: Omit<User, 'id'>): Promise<User> {
    const hashedPassword = await this.encrypter.encrypt(userData.password);
    return this.createUserRepository.execute({ ...userData, password: hashedPassword });
  }
}

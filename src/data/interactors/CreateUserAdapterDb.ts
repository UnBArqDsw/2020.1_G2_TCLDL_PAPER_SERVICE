import { User } from '@domain/entities/User';
import { CreateUser } from '@domain/interactors/CreateUser';
import { Encrypter } from '@data/protocols/Encrypter';
import { CreateUserRepository } from '@data/repositories/CreateUserRepository';
import { UuidGenerator } from '@data/protocols/UuidGenerator';

export class CreateUserAdapterDb implements CreateUser {
  private readonly createUserRepository: CreateUserRepository

  private readonly encrypter: Encrypter

  private readonly uuidGenerator: UuidGenerator

  constructor(
    createUserRepository: CreateUserRepository, encrypter: Encrypter, uuidGenerator: UuidGenerator,
  ) {
    this.createUserRepository = createUserRepository;
    this.encrypter = encrypter;
    this.uuidGenerator = uuidGenerator;
  }

  async execute(userData: Omit<User, 'id' | 'createdAt'| 'updatedAt'>): Promise<User> {
    const hashedPassword = await this.encrypter.encrypt(userData.password);
    const uuid = this.uuidGenerator.generate();
    return this.createUserRepository.execute({ ...userData, id: uuid, password: hashedPassword });
  }
}

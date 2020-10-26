import { User } from '@domain/entities/User';
import { CreateUser } from '@domain/interactors/user/CreateUser';
import { Encrypter } from '@data/protocols/Encrypter';
import { CreateUserRepository } from '@data/repositories/user/CreateUserRepository';
import { UuidGenerator } from '@data/protocols/UuidGenerator';
import { DateGenerator } from '@data/protocols/DateGenerator';
import { FindRoleRepository } from '@data/repositories/role/FindRoleRepository';

export class CreateUserAdapterDb implements CreateUser {
  private readonly createUserRepository: CreateUserRepository

  private readonly encrypter: Encrypter

  private readonly uuidGenerator: UuidGenerator

  private readonly dateGenerator: DateGenerator

  private readonly findRoleRepository: FindRoleRepository

  constructor(
    createUserRepository: CreateUserRepository, encrypter: Encrypter, uuidGenerator: UuidGenerator,
    dateGenerator: DateGenerator, findRoleRepository: FindRoleRepository,
  ) {
    this.createUserRepository = createUserRepository;
    this.encrypter = encrypter;
    this.uuidGenerator = uuidGenerator;
    this.dateGenerator = dateGenerator;
    this.findRoleRepository = findRoleRepository;
  }

  async execute(userData: Omit<User, 'id' | 'createdAt'| 'updatedAt'>): Promise<User> {
    const role = await this.findRoleRepository.execute({ type: 'collab' });
    const hashedPassword = await this.encrypter.encrypt(userData.password);
    const uuid = this.uuidGenerator.generate();
    const createdAt = this.dateGenerator.generate();
    const updatedAt = createdAt;

    return this.createUserRepository.execute({
      id: uuid,
      ...userData,
      password: hashedPassword,
      createdAt,
      updatedAt,
      role,
    });
  }
}

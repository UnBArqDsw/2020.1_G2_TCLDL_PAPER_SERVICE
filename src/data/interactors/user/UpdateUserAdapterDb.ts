import { User } from '@domain/entities/User';
import { UpdateUser, UpdateUserAttribute } from '@domain/interactors/user/UpdateUser';
import { UpdateUserRepository } from '@data/repositories/user/UpdateUserRepository';
import { Encrypter } from '@data/protocols/Encrypter';
import { DateGenerator } from '@data/protocols/DateGenerator';

export class UpdateUserAdapterDb implements UpdateUser {
  private readonly updateUserRepository: UpdateUserRepository

  private readonly encrypter: Encrypter

  private readonly dateGenerator: DateGenerator

  constructor(
    updateUserRepository: UpdateUserRepository,
    encrypter: Encrypter,
    dateGenerator: DateGenerator,
  ) {
    this.updateUserRepository = updateUserRepository;
    this.encrypter = encrypter;
    this.dateGenerator = dateGenerator;
  }

  async execute(data: UpdateUserAttribute): Promise<User | undefined> {
    data.updatedAt = this.dateGenerator.generate();

    if (data.password) {
      data.password = await this.encrypter.encrypt(data.password);
    }

    return this.updateUserRepository.execute(data);
  }
}

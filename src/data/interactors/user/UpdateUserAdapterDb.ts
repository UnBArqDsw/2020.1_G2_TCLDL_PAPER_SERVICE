import { User } from '@domain/entities/User';
import { UpdateUser, UpdateUserAttribute } from '@domain/interactors/user/UpdateUser';
import { UpdateUserRepository } from '@data/repositories/user/UpdateUserRepository';
import { Encrypter } from '@data/protocols/Encrypter';

export class UpdateUserAdapterDb implements UpdateUser {
  private readonly updateUserRepository: UpdateUserRepository

  private readonly encrypter: Encrypter

  constructor(
    updateUserRepository: UpdateUserRepository,
    encrypter: Encrypter,
  ) {
    this.updateUserRepository = updateUserRepository;
    this.encrypter = encrypter;
  }

  async execute(data: UpdateUserAttribute): Promise<User | undefined> {
    if (data.password) {
      data.password = await this.encrypter.encrypt(data.password);
    }

    return this.updateUserRepository.execute(data);
  }
}

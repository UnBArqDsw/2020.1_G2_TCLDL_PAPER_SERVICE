import { User } from '@domain/entities/User';
import { UpdateUser } from '@domain/interactors/UpdateUser';
import { UpdateUserRepository, UpdateUserAttribute } from '@data/repositories/UpdateUserRepository';

export class UpdateUserAdapterDb implements UpdateUser {
  private readonly updateUserRepository: UpdateUserRepository

  constructor(
    updateUserRepository: UpdateUserRepository,
  ) {
    this.updateUserRepository = updateUserRepository;
  }

  async execute(data: UpdateUserAttribute): Promise<User> {
    return this.updateUserRepository.execute(data);
  }
}

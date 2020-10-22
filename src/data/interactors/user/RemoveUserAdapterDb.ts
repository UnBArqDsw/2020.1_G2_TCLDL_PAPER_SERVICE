import { RemoveUserRepository } from '@data/repositories/user/RemoveUserRepository';
import { RemoveUser } from '@domain/interactors/RemoveUser';

export class RemoveUserAdapterDb implements RemoveUser {
  private readonly removeUserRepository: RemoveUserRepository

  constructor(removeUserRepository: RemoveUserRepository) {
    this.removeUserRepository = removeUserRepository;
  }

  async execute(parameter: string) {
    return this.removeUserRepository.execute(parameter);
  }
}

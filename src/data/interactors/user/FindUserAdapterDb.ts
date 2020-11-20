import { FindUserRepository } from '@data/repositories/user/FindUserRepository';
import { User } from '@domain/entities/User';
import { FindUser } from '@domain/interactors/user/FindUser';

export default class FindUserAdapterDb implements FindUser {
  private readonly findUserRepository: FindUserRepository

  constructor(findUserRepository: FindUserRepository) {
    this.findUserRepository = findUserRepository;
  }

  async execute(attribute: Partial<User>) {
    return this.findUserRepository.execute(attribute);
  }
}

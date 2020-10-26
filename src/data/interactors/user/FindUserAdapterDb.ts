import { FindUserRepository } from '@data/repositories/user/FindUserRepository';
import { FindUser } from '@domain/interactors/user/FindUser';

export default class FindUserAdapterDb implements FindUser {
  private readonly findUserRepository: FindUserRepository

  constructor(findUserRepository: FindUserRepository) {
    this.findUserRepository = findUserRepository;
  }

  async execute(parameter: string, field: 'id'| 'email') {
    const attribute = { [field]: parameter };

    return this.findUserRepository.execute(attribute);
  }
}

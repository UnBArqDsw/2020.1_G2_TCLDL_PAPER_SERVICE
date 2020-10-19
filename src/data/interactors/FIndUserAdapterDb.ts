import { FindUserRepository } from '@data/repositories/FindUserRepository';
import { FindUser } from '@domain/interactors/FindUser';

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

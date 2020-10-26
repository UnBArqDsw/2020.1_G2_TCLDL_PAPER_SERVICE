import { findUserAttribute, FindUserRepository } from '@data/repositories/user/FindUserRepository';
import { getRepository } from 'typeorm';
import { UserAdapter } from '../../entities/UserAdapter';

export class FindUserRepositoryAdapter implements FindUserRepository {
  async execute(parameter: findUserAttribute): Promise<UserAdapter | undefined> {
    const userRepository = getRepository(UserAdapter);

    return userRepository.findOne({ where: parameter });
  }
}

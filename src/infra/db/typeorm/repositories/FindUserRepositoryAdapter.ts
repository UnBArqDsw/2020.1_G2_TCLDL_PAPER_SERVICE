import { FindUserRepository } from '@data/repositories/FindUserRepository';
import { getRepository } from 'typeorm';
import { UserAdapter } from '../entities/UserAdapter';

export class FindUserRepositoryAdapter implements FindUserRepository {
  async execute(parameter: string): Promise<UserAdapter | undefined> {
    const userRepository = getRepository(UserAdapter);
    return userRepository.findOne({ where: { email: parameter } });
  }
}

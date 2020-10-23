import { FindUserRepository } from '@data/repositories/FindUserRepository';
import { getRepository } from 'typeorm';
import { User } from '@domain/entities/User';
import { UserAdapter } from '../entities/UserAdapter';

export class FindUserRepositoryAdapter implements FindUserRepository {
  async execute(parameter: Partial<Omit<User, 'createdAt' | 'updatedAt'>>): Promise<UserAdapter | undefined> {
    const userRepository = getRepository(UserAdapter);
    return userRepository.findOne({ where: parameter });
  }
}

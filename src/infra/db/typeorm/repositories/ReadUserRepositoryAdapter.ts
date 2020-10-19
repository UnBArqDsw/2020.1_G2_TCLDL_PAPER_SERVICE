import { ReadUserRepository } from '@data/repositories/ReadUserRepository';
import { User } from '@domain/entities/User';
import { getRepository } from 'typeorm';
import { UserAdapter } from '../entities/UserAdapter';

export class ReadUserRepositoryAdapter implements ReadUserRepository {
  async execute(data: User): Promise<User> {
    const userRepository = getRepository(UserAdapter);
    const user = new UserAdapter(data);
    return userRepository.findOneById(id);
  }
}

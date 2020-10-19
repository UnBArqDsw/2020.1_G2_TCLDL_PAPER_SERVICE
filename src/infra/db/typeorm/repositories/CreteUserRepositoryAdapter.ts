import { CreateUserRepository } from '@data/repositories/CreateUserRepository';
import { User } from '@domain/entities/User';
import { getRepository } from 'typeorm';
import { UserAdapter } from '../entities/UserAdapter';

export class CreateUserRepositoryAdapter implements CreateUserRepository {
  async execute(data: User): Promise<User> {
    const userRepository = getRepository(UserAdapter);
    const user = new UserAdapter(data);
    return userRepository.save(user);
  }
}

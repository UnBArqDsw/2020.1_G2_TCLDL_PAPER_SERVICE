import { UpdateUserAttribute, UpdateUserRepository } from '@data/repositories/UpdateUserRepository';
import { getRepository } from 'typeorm';
import { UserAdapter } from '../entities/UserAdapter';

export class UpdateUserRepositoryAdapter implements UpdateUserRepository {
  async execute(data: UpdateUserAttribute): Promise<UserAdapter | undefined> {
    const userRepository = getRepository(UserAdapter);

    return userRepository.update(
      { id: data.id },
      {
        name: data.name,
        lastName: data.lastName
      });
  }
}

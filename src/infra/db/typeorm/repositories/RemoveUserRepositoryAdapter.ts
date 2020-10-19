import { RemoveUserRepository } from '@data/repositories/RemoveUserRepository';
import { getRepository } from 'typeorm';
import { UserAdapter } from '../entities/UserAdapter';

export class RemoveUserRepositoryAdapter implements RemoveUserRepository {
  async execute(id: string): Promise<void> {
    const userRepository = getRepository(UserAdapter);
    await userRepository.delete({ id });
  }
}

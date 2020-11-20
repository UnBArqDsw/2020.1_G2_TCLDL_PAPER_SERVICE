import { UpdateUserRepository } from '@data/repositories/user/UpdateUserRepository';
import { UpdateUserAttribute } from '@domain/interactors/user/UpdateUser';
import { getRepository } from 'typeorm';
import { UserAdapter } from '../../entities/UserAdapter';

export class UpdateUserRepositoryAdapter implements UpdateUserRepository {
  async execute(data: UpdateUserAttribute): Promise<UserAdapter | undefined> {
    const userRepository = getRepository(UserAdapter);

    const userId = { id: data.id };
    delete data.id;

    const user = await userRepository.findOne(userId);

    if (user) {
      Object.assign(user, data);
      await userRepository.save(user);
    }

    return user;
  }
}

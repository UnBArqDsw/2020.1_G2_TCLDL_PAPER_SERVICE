import { CreateUserRepository } from '@data/repositories/CreateUserRepository';
import { User } from '@domain/entities/User';
import { getRepository } from 'typeorm';
import { RoleAdapter } from '../entities/RoleAdapter';
import { UserAdapter } from '../entities/UserAdapter';
import { UserRoleAdapter } from '../entities/UserRoleAdapter';

export class CreateUserRepositoryAdapter implements CreateUserRepository {
  async execute(data: User): Promise<User> {
    const userRepository = getRepository(UserAdapter);
    const roleRepository = getRepository(RoleAdapter);
    const userRoleRepository = getRepository(UserRoleAdapter);
    const collabRole = await roleRepository.findOne({ where: { type: 'Collab' } });
    if (collabRole) {
      const user = new UserAdapter(data);
      await userRepository.save(user);
      const userRole = new UserRoleAdapter(user, collabRole);
      userRoleRepository.save(userRole);

      return user;
    }
    throw new Error('Cannot find user role.');
  }
}

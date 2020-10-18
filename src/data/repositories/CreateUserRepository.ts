import { User } from '@domain/entities/User';
import { Role } from '@domain/value_object/Role';

export interface CreateUserRepository {
  execute: (data: User, role: Role) => Promise<User>
}

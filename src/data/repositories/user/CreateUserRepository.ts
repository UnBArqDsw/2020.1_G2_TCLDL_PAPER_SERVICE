import { User } from '@domain/entities/User';

export interface CreateUserRepository {
  execute: (data: User) => Promise<User>
}

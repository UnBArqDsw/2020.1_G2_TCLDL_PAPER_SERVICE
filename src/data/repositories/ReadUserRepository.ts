import { User } from '@domain/entities/User';

export interface ReadUserRepository {
  execute: (data: User) => Promise<User>
}

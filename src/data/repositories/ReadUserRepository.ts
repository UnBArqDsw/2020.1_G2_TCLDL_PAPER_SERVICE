import { User } from '@domain/entities/User';

export interface ReadUserRepository {
  execute: (data: string) => Promise<User>
}

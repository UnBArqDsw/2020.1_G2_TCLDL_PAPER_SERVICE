import { User } from '@domain/entities/User';

export interface FindUserRepository {
  execute: (parameter: string) => Promise<User | undefined>
}

import { User } from '@domain/entities/User';

export interface FindUserRepository {
  execute: (attribute: Partial<Omit<User, 'createdAt' | 'updatedAt'>>) => Promise<User | undefined>
}

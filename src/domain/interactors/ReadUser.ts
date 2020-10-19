import { User } from '@domain/entities/User';

export interface ReadUser {
  execute: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => Promise<User>
}

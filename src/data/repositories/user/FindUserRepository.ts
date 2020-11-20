import { Repository } from '@data/protocols/Repository';
import { User } from '@domain/entities/User';

export interface FindUserRepository extends
  Repository<Partial<Omit<User, 'createdAt' | 'updatedAt'>>, User | undefined> {}

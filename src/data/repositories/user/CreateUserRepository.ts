import { Repository } from '@data/protocols/Repository';
import { User } from '@domain/entities/User';

export interface CreateUserRepository extends Repository<User> {}

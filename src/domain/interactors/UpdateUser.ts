import { User } from '@domain/entities/User';
import { UpdateUserAttribute } from '@data/repositories/UpdateUserRepository';

export interface UpdateUser {
  execute: (data: UpdateUserAttribute) => Promise<User>
}

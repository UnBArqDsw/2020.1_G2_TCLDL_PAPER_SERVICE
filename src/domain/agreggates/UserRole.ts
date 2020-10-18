import { User } from '@domain/entities/User';
import { Role } from '@domain/value_object/Role';

export interface UserRole {
  user: User
  role: Role
}

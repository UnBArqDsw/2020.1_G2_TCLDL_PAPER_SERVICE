import { User } from '@domain/entities/User';

export interface UpdateUserAttribute {
  id: string,
  name: string,
  lastName: string
}

export interface UpdateUserRepository {
  execute: (data: UpdateUserAttribute) => Promise<User>
}

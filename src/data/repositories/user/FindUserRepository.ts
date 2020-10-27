import { User } from '@domain/entities/User';

export interface findUserAttribute {
  id?: string
  email?: string
}
export interface FindUserRepository {
  execute: (attribute: findUserAttribute) => Promise<User | undefined>
}

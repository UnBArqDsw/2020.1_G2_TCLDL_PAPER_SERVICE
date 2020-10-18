import { User } from '@domain/entities/User';

export interface FindUser {
  execute: (parameter: string) => Promise<User | undefined>
}

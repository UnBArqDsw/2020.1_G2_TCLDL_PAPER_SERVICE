import { User } from '@domain/entities/User';

export interface FindUser {
  execute: (parameter: string, field: string) => Promise<User | undefined>
}

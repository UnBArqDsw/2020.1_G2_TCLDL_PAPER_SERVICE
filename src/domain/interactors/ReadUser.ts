import { User } from '@domain/entities/User';

export interface ReadUser {
  execute: (parameter: string, field: string) => Promise<User | undefined>
}

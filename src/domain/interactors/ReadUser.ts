import { User } from '@domain/entities/User';

export interface ReadUser {
  execute: (id: string) => Promise<User>
}

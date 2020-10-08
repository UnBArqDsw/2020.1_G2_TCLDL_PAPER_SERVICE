import { IUser } from '../entities/IUser';

export interface ICreateUser {
  execute: (data: Omit<IUser, 'id'>) => Promise<IUser>
}

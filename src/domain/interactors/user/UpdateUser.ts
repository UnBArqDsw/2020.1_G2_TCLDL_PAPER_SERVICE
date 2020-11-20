import { User } from '@domain/entities/User';
import { Interactor } from '@domain/protocols/Interactor';

export interface UpdateUserAttribute
  extends Partial<Pick<User, 'id' | 'name' | 'lastName' |'email' | 'password' | 'updatedAt'>> {}

export interface UpdateUser extends
  Interactor<UpdateUserAttribute, User | undefined>{}

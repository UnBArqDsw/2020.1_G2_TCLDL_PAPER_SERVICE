import { Interactor } from '@domain/protocols/Interactor';
import { Role } from '@domain/value_object/Role';

export interface FindRole extends Interactor<Partial<Omit<Role, 'users'>>, Omit<Role, 'users'>> {}

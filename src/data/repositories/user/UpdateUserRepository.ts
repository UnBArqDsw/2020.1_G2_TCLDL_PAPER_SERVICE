import { User } from '@domain/entities/User';
import { Repository } from '@data/protocols/Repository';
import { UpdateUserAttribute } from '@domain/interactors/user/UpdateUser';

export interface UpdateUserRepository extends Repository<UpdateUserAttribute, User | undefined> {}

import { Repository } from '@data/protocols/Repository';
import { Role } from '@domain/value_object/Role';

export interface FindRoleRepository extends Repository<Partial<Role>, Role> {}

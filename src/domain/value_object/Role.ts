import { RoleUsers } from '@domain/aggregates/RoleUsers';

export interface Role extends RoleUsers{
  id: number;
  type: 'admin' | 'sub_admin' | 'collab';
}

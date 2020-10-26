import { RoleUsers } from '@domain/agreggates/RoleUsers';

export interface Role extends RoleUsers{
  id: number;
  type: 'admin' | 'sub_admin' | 'collab';
}

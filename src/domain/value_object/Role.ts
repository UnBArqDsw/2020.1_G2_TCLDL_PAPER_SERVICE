import { RoleUsers } from '@domain/agreggates/RoleUsers';

export interface Role extends RoleUsers{
  id: string;
  type: 'admin' | 'sub_admin' | 'collab';
}

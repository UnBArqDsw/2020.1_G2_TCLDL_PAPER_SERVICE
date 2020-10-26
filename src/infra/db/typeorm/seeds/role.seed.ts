import { Role } from '@domain/value_object/Role';

export const roleSeed: Role[] = [
  {
    id: 1,
    type: 'admin',
  },
  {
    id: 2,
    type: 'sub_admin',
  },
  {
    id: 3,
    type: 'collab',
  },
];

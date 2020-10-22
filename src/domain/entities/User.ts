import { UserRole } from '@domain/agreggates/UserRole';

export interface User extends UserRole {
  id: string
  name: string
  lastName: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

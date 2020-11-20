import { UserRole } from '@domain/aggregates/UserRole';

export interface User extends UserRole {
  id: string
  name: string
  lastName: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

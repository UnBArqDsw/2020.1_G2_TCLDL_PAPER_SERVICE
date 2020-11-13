import { Paper } from '@domain/entities/Paper';

export interface CreateUser {
  execute: (data: Paper) => Promise<string>
}

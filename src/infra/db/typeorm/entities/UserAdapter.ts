import { User } from '@domain/entities/User';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('users')
export class UserAdapter implements User {
  @PrimaryColumn({ unique: true })
  readonly id: string

  @Column({ length: 30 })
  name: string

  @Column({ length: 255 })
  lastName: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ length: 255 })
  password: string

  @Column({ length: 255 })
  bio: string

  @Column({ length: 255 })
  location: string

  @Column({ length: 20 })
  role: string

  @Column('timestamp with time zone')
  readonly createdAt: string

  @Column('timestamp with time zone')
  updatedAt: string

  constructor(data: User) {
    Object.assign(this, data);
  }
}

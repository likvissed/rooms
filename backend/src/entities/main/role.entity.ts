import { Entity,Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64})
  name: string;

  @Column({ length: 64})
  short_description: string;

  @Column()
  long_description: string;

  @OneToMany(type => User, user => user.role)
  users: User[];
}
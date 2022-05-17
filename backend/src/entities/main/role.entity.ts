import { Entity,Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64})
  name: string;

  @Column({ length: 64})
  short_description: string;

  @Column()
  long_description: string;

  @OneToMany(type => UserEntity, user => user.role)
  users: UserEntity[];
}
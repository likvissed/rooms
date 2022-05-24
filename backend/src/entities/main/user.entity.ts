import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tn: number;

  @Column()
  id_tn: number;

  @Column()
  phone: string;

  @Column()
  fullname: string;

  @ManyToOne(() => RoleEntity)
  @JoinColumn([
    { name: "role_id", referencedColumnName: "id" },
  ])
  role: RoleEntity;

  @Column({ name: 'role_id', type: 'int' })
  role_id: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;
}
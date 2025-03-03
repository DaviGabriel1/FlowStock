/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { RoleEnum } from '../../../roles/roles.enum'; 

@Entity('users')
@Unique(['email'])
export default class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 191, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 191, nullable: false })
  email: string;

  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt: Date | null; 

  @Column({ type: 'varchar', length: 191, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  rememberToken: string | null; 

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date; 

  @Column({ type: 'varchar', length: 45, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  avatar: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
    nullable: false,
  })
  level: RoleEnum; 

  @Column({ type: 'tinyint', default: 1, nullable: false })
  active: number; // Mantido como number (0 ou 1)
}
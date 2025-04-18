import { IsInt } from 'class-validator';
import User from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  sku: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'int', nullable: false })
  minStock: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  category: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @IsInt()
  @Column({ type: 'tinyint', nullable: false })
  deleted: number;

  @Column({ type: 'varchar', length: 255 })
  imgUrl: string;

  @ManyToOne(() => User, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

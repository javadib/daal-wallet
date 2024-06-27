import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntityEx } from '../../core/base.entityEx';

export class Transaction extends BaseEntityEx<number> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}

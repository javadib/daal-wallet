import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityEx } from '../../core/base.entityEx';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity()
export class User extends BaseEntityEx<number> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ default: 1000 }) // todo: Default vale for test, should be zero in prod mode.
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}

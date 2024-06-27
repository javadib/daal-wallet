import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityEx } from '../../core/base.entityEx';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity()
export class User extends BaseEntityEx<number> {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName: string;

  @Column()
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}

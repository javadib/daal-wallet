import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityEx } from '../../core/base.entityEx';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { PayMethod } from '../../transaction/entities/payMethod';
import { PayType } from '../../transaction/entities/payType';

@Entity()
export class User extends BaseEntityEx<number> {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName: string;

  @Column({ default: 0 })
  balance: number;

  @OneToMany((type) => Transaction, (trans) => trans.user, {
    cascade: ['insert', 'update'],
  })
  transactions: Transaction[];

  addTransaction(amount: number) {
    const payType = amount > 0 ? PayType.income : PayType.expense;
    const trans = {
      user: this,
      amount: Math.abs(amount),
      payType: payType,
      payMethod: PayMethod.online,
    } as Transaction;

    this.transactions = this.transactions || [];
    this.transactions.push(trans);

    return trans;
  }
}

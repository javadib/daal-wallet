import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntityEx } from '../../core/base.entityEx';
import { PayType } from './payType';
import { PayMethod } from './payMethod';

@Entity()
export class Transaction extends BaseEntityEx<number> {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  amount: number;

  @Column()
  payType: PayType;

  @Column()
  payMethod: PayMethod;

  @ManyToOne(type => User, user => user.transactions)

  user: User;
}

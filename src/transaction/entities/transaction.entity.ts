import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntityEx } from '../../core/base.entityEx';
import { payType } from './payType';
import { payMethod } from './payMethod';

@Entity()
export class Transaction extends BaseEntityEx<number> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column()
  payType: payType;

  @Column()
  payMethod: payMethod;

  @Column()
  referenceId: string;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}

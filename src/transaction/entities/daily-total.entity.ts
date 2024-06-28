import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntityEx } from '../../core/base.entityEx';
import { Transaction } from './transaction.entity';
import { PayType } from './payType';
import {OnEvent} from "@nestjs/event-emitter";

@Entity()
export class DailyTotal extends BaseEntityEx<number> {
  @PrimaryColumn({ unique: true })
  id: number;

  // @Column({ unique: true })
  // unixDate: number;

  @Column({ default: 0 })
  txCount: number = 0;

  @Column()
  totalAmount: number;

  updateStat(tx: Transaction): DailyTotal {
    this.txCount += 1;
    this.totalAmount +=
      tx.payType == PayType.income ? tx.amount : tx.amount * -1;

    return this;
  }


}

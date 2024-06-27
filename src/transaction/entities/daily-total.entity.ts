import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityEx } from '../../core/base.entityEx';
import { PayType } from './payType';

@Entity()
export class DailyTotal extends BaseEntityEx<number> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  unixDate: number;

  @Column()
  payType: PayType;

  @Column()
  totalAmount: number;
}

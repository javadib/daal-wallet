import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityEx } from '../../core/base.entityEx';
import { payType } from './payType';

@Entity()
export class DailyTotal extends BaseEntityEx<number> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  unixDate: number;

  @Column()
  payType: payType;

  @Column('decimal', { precision: 15, scale: 2 })
  totalAmount: number;
}

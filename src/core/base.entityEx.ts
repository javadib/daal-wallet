import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntityEx<T> {
  constructor(id?: T) {
    // super();

    this.id = id;
  }

  id?: T;

  @CreateDateColumn()
  createAt?: Date;

  @Column({ nullable: true })
  createBy?: number;

  @UpdateDateColumn()
  lastUpdatedAt?: Date;

  @Column({ nullable: true })
  lastUpdatedBy?: number;
}

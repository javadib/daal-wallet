import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class BaseEntityEx<T> extends BaseEntity {
  constructor(id?: T) {
    super();

    this.id = id;
  }

  id: T;

  @Column({ nullable: true })
  createAt?: Date;

  @Column({ nullable: true })
  createBy?: string;

  @Column({ nullable: true })
  lastUpdatedAt?: Date;

  @Column({ nullable: true })
  lastUpdatedBy?: string;
}

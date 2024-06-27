import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction) private repo: Repository<Transaction>,
  ) {}

  async create(transaction: Partial<Transaction>): Promise<Transaction> {
    const newUser = this.repo.create(transaction);
    return this.repo.save(newUser);
  }

  async findAll(query: any = {}) {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const keyword = query.keyword || '';

    const [data, totalCount] = await this.repo.findAndCount({
      where: { referenceId: Like('%' + keyword + '%') },
      order: { referenceId: 'DESC' },
      take: take,
      skip: skip,
    });

    return { data, totalCount };
  }

  async findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, transaction: Partial<Transaction>) {
    const updateResult = await this.repo.update(id, transaction);

    return this.repo.findOne({ where: { id } });
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }
}

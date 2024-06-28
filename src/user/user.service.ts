import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repo.create(user);
    // newUser.balance = this.getRandomArbitrary(10000, 1000000);

    return this.repo.save(newUser);
  }

  async findAll(query: any = {}) {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const keyword = query.keyword || '';

    const [data, totalCount] = await this.repo.findAndCount({
      where: { firstName: Like('%' + keyword + '%') },
      order: { firstName: 'DESC' },
      take: take,
      skip: skip,
    });

    return { data, totalCount };
  }

  async findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async findOne2(options: FindOneOptions<User>) {
    return this.repo.findOne(options);
  }

  async update(id: number, user: Partial<User>) {
    const updateResult = await this.repo.update(id, user);

    return this.repo.findOne({ where: { id } });
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }

  async addMoney(
    userId: number,
    amount: number,
  ): Promise<{ reference_id: number }> {
    const user = await this.findOne2({
      relations: {
        transactions: true,
      },
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.balance + amount < 0) {
      const msg = "User balance can't be negative. First charge your balance.";
      throw new UnprocessableEntityException(msg);
    }

    user.balance += amount;
    const transaction = user.addTransaction(amount);
    await this.repo.save(user, { reload: true });

    return { reference_id: transaction.id };
  }

  async getBalance(userId: number): Promise<{ balance: number }> {
    const user = await this.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    return { balance: user.balance };
  }
}

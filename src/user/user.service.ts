import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repo.create(user);
    newUser.balance = this.getRandomArbitrary(10000, 1000000).toFixed(2);

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

  async update(id: number, user: Partial<User>) {
    const updateResult = await this.repo.update(id, user);

    return this.repo.findOne({ where: { id } });
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }
}

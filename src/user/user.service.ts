import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const userDto2 = createUserDto as User;

    return User.save(userDto2);
    // return this.repo.create(userDto2);
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
    return this.repo.create({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.repo.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}

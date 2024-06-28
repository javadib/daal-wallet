import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';

const userArray = [
  { id: 1, firstName: 'John', balance: 5000 },
  { id: 2, firstName: 'Jane', balance: 3000 },
];

const oneUser = { id: 1, firstName: 'John', balance: 5000 };

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      jest.spyOn(repo, 'create').mockImplementation(() => oneUser as any);
      jest.spyOn(repo, 'save').mockResolvedValue(oneUser as any);

      expect(await service.create(oneUser)).toEqual(oneUser);
    });

    it('should call repo.create and repo.save with correct parameters', async () => {
      jest.spyOn(repo, 'create').mockImplementation(() => oneUser as any);
      jest.spyOn(repo, 'save').mockResolvedValue(oneUser as any);

      await service.create(oneUser);
      expect(repo.create).toHaveBeenCalledWith(oneUser);
      expect(repo.save).toHaveBeenCalledWith(oneUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(repo, 'findAndCount').mockResolvedValue([userArray, 2] as any);

      const result = await service.findAll({});
      expect(result).toEqual({ data: userArray, totalCount: 2 });
    });

    it('should call findAndCount with correct parameters', async () => {
      jest.spyOn(repo, 'findAndCount').mockResolvedValue([userArray, 2] as any);

      await service.findAll({ keyword: 'John' });
      expect(repo.findAndCount).toHaveBeenCalledWith({
        where: { firstName: expect.any(Object) },
        order: { firstName: 'DESC' },
        take: 10,
        skip: 0,
      });
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(oneUser as any);

      expect(await service.findOne(1)).toEqual(oneUser);
    });

    it('should return null if user not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);

      expect(await service.findOne(1)).toBeNull();
    });

    it('should call findOne with correct parameters', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(oneUser as any);

      await service.findOne(1);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updatedUser = { ...oneUser, firstName: 'Updated' };
      jest.spyOn(repo, 'update').mockResolvedValue(updatedUser as any);
      jest.spyOn(repo, 'findOne').mockResolvedValue(updatedUser as any);

      expect(await service.update(1, { firstName: 'Updated' })).toEqual(updatedUser);
    });

    it('should call update and findOne with correct parameters', async () => {
      const updatedUser = { ...oneUser, firstName: 'Updated' };
      jest.spyOn(repo, 'update').mockResolvedValue(updatedUser as any);
      jest.spyOn(repo, 'findOne').mockResolvedValue(updatedUser as any);

      await service.update(1, { firstName: 'Updated' });
      expect(repo.update).toHaveBeenCalledWith(1, { firstName: 'Updated' });
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      jest.spyOn(repo, 'delete').mockResolvedValue(oneUser as any);

      expect(await service.delete(1)).toEqual(oneUser);
    });

    it('should call delete with correct parameters', async () => {
      jest.spyOn(repo, 'delete').mockResolvedValue(oneUser as any);

      await service.delete(1);
      expect(repo.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('addMoney', () => {
    it('should add money to a user\'s balance', async () => {
      const user = { ...oneUser, balance: 0, addTransaction: jest.fn().mockReturnValue({ id: 1 }) };
      jest.spyOn(service, 'findOne2').mockResolvedValue(user as any);
      jest.spyOn(repo, 'save').mockResolvedValue(user as any);

      const result = await service.addMoney(1, 500);
      expect(result).toEqual({ reference_id: 1 });
      expect(user.balance).toEqual(500);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(service, 'findOne2').mockResolvedValue(null);

      await expect(service.addMoney(1, 500)).rejects.toThrow(NotFoundException);
    });

    it('should throw UnprocessableEntityException if resulting balance is negative', async () => {
      const user = { ...oneUser, balance: 0, addTransaction: jest.fn().mockReturnValue({ id: 1 }) };
      jest.spyOn(service, 'findOne2').mockResolvedValue(user as any);

      await expect(service.addMoney(1, -500)).rejects.toThrow(UnprocessableEntityException);
    });
  });

  describe('getBalance', () => {
    it('should return the balance of a user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(oneUser as any);

      const result = await service.getBalance(1);
      expect(result).toEqual({ balance: oneUser.balance });
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(service.getBalance(1)).rejects.toThrow(NotFoundException);
    });

    it('should call findOne with correct parameters', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(oneUser as any);

      await service.getBalance(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
});

import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateTransactionDto } from '../transaction/dto/create-transaction.dto';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            getBalance: jest.fn(),
            addMoney: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<UserController>(UserController);
    service = moduleRef.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto: CreateUserDto = { firstName: 'Test User' };
      const result = { id: 1, ...dto, balance: 0 };
      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      expect(await controller.create(dto)).toBe(result);
    });

    it('should call create method with correct parameters', async () => {
      const dto: CreateUserDto = { firstName: 'Test User' };
      jest.spyOn(service, 'create').mockResolvedValue({} as any);

      await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('should throw an error if service create method fails', async () => {
      const dto: CreateUserDto = { firstName: 'Test User' };
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new Error('Service Error'));

      await expect(controller.create(dto)).rejects.toThrow('Service Error');
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: { data: User[]; totalCount: number } = {
        data: [{ id: 1, firstName: 'Test User', balance: 0 } as User],
        totalCount: 2,
      };
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(result as { data: User[]; totalCount: number });

      const actual = await controller.findAll({});
      expect(actual).toBe(result);
    });

    it('should call findAll method with correct parameters', async () => {
      const query = { name: 'Test' };
      jest.spyOn(service, 'findAll').mockResolvedValue([] as any);

      await controller.findAll(query);
      expect(service.findAll).toHaveBeenCalledWith(query);
    });

    it('should throw an error if service findAll method fails', async () => {
      const query = { name: 'Test' };
      jest.spyOn(service, 'findAll').mockRejectedValue(new Error('Service Error'));

      await expect(controller.findAll(query)).rejects.toThrow('Service Error');
    });

  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = {
        id: 1,
        firstName: 'Test User',
        balance: 0,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

      expect(await controller.findOne(1)).toBe(result);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const dto: UpdateUserDto = { firstName: 'new name' };
      const result = { id: 1, ...dto, balance: 0 };
      jest.spyOn(service, 'update').mockResolvedValue(result as any);

      expect(await controller.update(1, dto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const result = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        balance: 0,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result as any);
      jest.spyOn(service, 'delete').mockResolvedValue(result as any);

      expect(await controller.remove(1)).toBe(result);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(controller.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getBalance', () => {
    it('should return the balance of a user', async () => {
      const result = { balance: 1000 };
      jest.spyOn(service, 'getBalance').mockResolvedValue(result as any);

      expect(await controller.getBalance(1)).toBe(result);
    });

    it('should call getBalance method with correct parameters', async () => {
      const userId = 1;
      jest.spyOn(service, 'getBalance').mockResolvedValue({ balance: 1000 } as any);

      await controller.getBalance(userId);
      expect(service.getBalance).toHaveBeenCalledWith(userId);
    });

    it('should throw an error if service getBalance method fails', async () => {
      const userId = 1;
      jest.spyOn(service, 'getBalance').mockRejectedValue(new Error('Service Error'));

      await expect(controller.getBalance(userId)).rejects.toThrow('Service Error');
    });

  });

  describe('addMoney', () => {
    it('should add money to the user wallet', async () => {
      const dto: CreateTransactionDto = { user_id: 1, amount: 500 };
      const result = { reference_id: 1 };
      jest.spyOn(service, 'addMoney').mockResolvedValue(result as any);

      expect(await controller.addMoney(dto)).toBe(result);
    });

    it('should throw UnprocessableEntityException for amount 0', async () => {
      const dto: CreateTransactionDto = { user_id: 1, amount: 0 };

      await expect(controller.addMoney(dto)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });
});

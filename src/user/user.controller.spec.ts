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
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ id: 1, firstName: 'Test User', balance: 0 }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

      expect(await controller.findAll({})).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
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

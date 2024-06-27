import { Transaction } from '../../transaction/entities/transaction.entity';

export class CreateUserDto {
  id: number;

  balance: number;

  transactions: Transaction[];
}

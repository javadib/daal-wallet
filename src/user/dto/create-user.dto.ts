import { Transaction } from '../../transaction/entities/transaction.entity';

export class CreateUserDto {
  id?: number;

  firstName: string;

  transactions: Transaction[];
}

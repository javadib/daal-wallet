import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  amount: number;
}

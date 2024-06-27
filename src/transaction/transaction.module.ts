import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyTotal } from './entities/daily-total.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, DailyTotal])],
  exports: [TypeOrmModule, TransactionService],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}

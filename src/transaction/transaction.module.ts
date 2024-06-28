import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyTotal } from './entities/daily-total.entity';
import { TransactionSubscriber } from './entities/transaction.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, DailyTotal])],
  exports: [TypeOrmModule, TransactionService],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionSubscriber],
})
export class TransactionModule {}

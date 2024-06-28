import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyTotal } from './entities/daily-total.entity';
import { TransactionSubscriber } from './entities/transaction.subscriber';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, DailyTotal]), EventEmitter2],
  exports: [TypeOrmModule, TransactionService],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionSubscriber],
})
export class TransactionModule {}

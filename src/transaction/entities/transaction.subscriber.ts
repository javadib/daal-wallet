import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { DailyTotal } from './daily-total.entity';
import { Transaction } from './transaction.entity';
import { PayType } from './payType';
import { Injectable } from '@nestjs/common';

@Injectable()
@EventSubscriber()
export class TransactionSubscriber
  implements EntitySubscriberInterface<Transaction>
{
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return Transaction;
  }

  afterInsert(event: InsertEvent<Transaction>): Promise<any> | void {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const unixDate = now.getTime() / 1000;

    const dailyTotalRepo = event.connection.getRepository(DailyTotal);
    dailyTotalRepo.findOne({ where: { id: unixDate } })
      .then((dailyTotal) => {
        if (!dailyTotal) {
          const newDailyT = {
            id: unixDate,
            // unixDate: now.getTime() / 1000,
            totalAmount:
              event.entity.payType == PayType.income
                ? event.entity.amount
                : event.entity.amount * -1,
            txCount: 1,
          } as DailyTotal;

          return dailyTotalRepo.save(newDailyT);
        }

        dailyTotal.updateStat(event.entity);

        return dailyTotalRepo.save(dailyTotal);
      })
      .catch(console.error);
  }
}

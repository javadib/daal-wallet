import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from './wallet/wallet.module';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import * as path from 'path';

@Module({
  imports: [
    //todo: Jus for dev mode. `synchronize` & `migrationsRun` not suitable for production mode.
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'daalW',
      entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
      // autoLoadEntities: true,
      retryAttempts: 5,
      retryDelay: 3,
      synchronize: true,
      migrationsRun: true,
    }),
    WalletModule,
    UserModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

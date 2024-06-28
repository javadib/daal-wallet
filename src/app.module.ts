import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),

    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DB_HOST || 'localhost',
    //   port: +process.env.DB_PORT || 3306,
    //   username: process.env.DB_USERNAME || 'root',
    //   password: process.env.DB_PASSWORD || 'root',
    //   database: process.env.DB_NAME || 'daalW',
    //   entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
    //   // autoLoadEntities: true,
    //   subscribers: [path.join(__dirname, '/**/*.subscriber{.ts,.js}')],
    //   retryAttempts: 5,
    //   retryDelay: 3,
    //   synchronize: true,
    //   migrationsRun: true,
    // }),

    //todo: Jus for dev mode. `synchronize` & `migrationsRun` not suitable for production mode.
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.P_DB_HOST || 'localhost',
      port: +process.env.P_DB_PORT || 5432,
      username: process.env.P_DB_USERNAME || 'postgres',
      password: process.env.P_DB_PASSWORD || 'postgres',
      database: process.env.P_DB_NAME || 'daalW',
      entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
      // autoLoadEntities: true,
      subscribers: [path.join(__dirname, '/**/*.subscriber{.ts,.js}')],
      retryAttempts: 5,
      retryDelay: 3,
      synchronize: true,
      migrationsRun: true,
    }),
    UserModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    Logger.log(`Dataase config: ${process.env.P_DB_HOST}`);
  }
}

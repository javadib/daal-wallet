import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import setupOpenApi from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  const port = process.env.PORT || 3000;
  app.setGlobalPrefix(globalPrefix);
  setupOpenApi(app);

  Logger.log(`🚀 Application is running on: http://localhost:${port}}`);

  await app.listen(port);
}

bootstrap();

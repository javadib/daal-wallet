import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as pack from '../../package.json';

export default function setupOpenApi(app: INestApplication) {
  const pack = require('../../package.json');
  const config = new DocumentBuilder()
    .setTitle('Daal Wallet Service')
    .setDescription('Daal User Wallet Management')
    .setVersion(pack.version)
    // .addServer('http://localhost:3000/', 'Local environment')
    // .addServer('https://staging.yourapi.com/', 'Staging')
    // .addServer('https://production.yourapi.com/', 'Production')
    // .addTag('v1')
    .addApiKey()
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openApi', app, document, { useGlobalPrefix: true });
}

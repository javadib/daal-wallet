import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as pack from '../../package.json';

export default function setupOpenApi(app: INestApplication) {
  const pack = require('../../package.json');
  const config = new DocumentBuilder()
    .setTitle('Daal Wallet Service')
    .setDescription('Your API description')
    .setVersion(pack.version)
    // .addServer('http://localhost:3000/', 'Local environment')
    // .addServer('https://staging.yourapi.com/', 'Staging')
    // .addServer('https://production.yourapi.com/', 'Production')
    // .addTag('v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openApi', app, document, { useGlobalPrefix: true });
}

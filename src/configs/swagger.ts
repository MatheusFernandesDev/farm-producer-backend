import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as swaggerStats from 'swagger-stats';

export function initSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(`API Produtor Rural`)
    .setDescription(`Documentação das api's - API`)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  app.use(
    swaggerStats.getMiddleware({
      swaggerSpec: document,
      authentication: true,
    }),
  );
  SwaggerModule.setup('api', app, document);
}

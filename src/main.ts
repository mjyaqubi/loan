import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as compression from 'compression';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import * as fs from 'fs';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';
import { ConfigService } from './common/config/config.service';
import * as CONFIGS  from './common/config/config.const';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = app.getHttpAdapter();
  const configService = app.get(ConfigService);
  const loggerService = await app.resolve(LoggerService);

  const name = <string>configService.get(CONFIGS.SERVICE_CONFIG.NAME);
  const desc = <string>configService.get(CONFIGS.SERVICE_CONFIG.DESCRIPTION);
  const port = <number>configService.get(CONFIGS.SERVER_CONFIG.PORT);
  const version = <string>configService.get(CONFIGS.SERVICE_CONFIG.VERSION);
  const baseUrl = <string>configService.get(CONFIGS.SERVICE_URL_CONFIG.BASE);
  const docsUrl = <string>configService.get(CONFIGS.SERVICE_URL_CONFIG.DOCS);
  const docsUser = {
    [<string>configService.get(CONFIGS.SECURITY_DOCS_CONFIG.USERNAME)]: <string>(
      configService.get(CONFIGS.SECURITY_DOCS_CONFIG.PASSWORD)
    ),
  };

  app.enableCors();
  app.use(helmet());
  app.use(compression());
  app.setGlobalPrefix(baseUrl);
  app.useGlobalPipes(new ValidationPipe());
  app.use(docsUrl, basicAuth({ challenge: true, users: docsUser }));

  const options = new DocumentBuilder()
    .setTitle(name)
    .setDescription(`${desc} | [swagger.json](swagger.json)`)
    .setVersion(version)
    .addBearerAuth({
      type: 'http',
      name: 'authorization',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync(
    `${process.cwd()}/swagger.json`,
    JSON.stringify(document, null, 2),
    { encoding: 'utf8' },
  );
  server.get(`${docsUrl}/swagger.json`, (_req, res) => {
    res.json(document);
  });
  SwaggerModule.setup(docsUrl, app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
  });

  try {
    await app.listen(port);
    loggerService.log(
      `API endpoints are ready on port (${<number>(
        configService.get('server.port')
      )})`,
      'NestApplication',
    );
  } catch (error) {
    loggerService.error('Unable to lunch the API', error, 'NestApplication');
  }
}
bootstrap();






// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();
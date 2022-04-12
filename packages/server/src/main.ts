import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import common from 'common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log(common);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(configService.get('PORT'));

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

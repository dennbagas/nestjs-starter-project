import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './config/config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const config = new EnvService().read();

  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn'],
  });
  await app.listen(config.PORT);
  Logger.log(`RUNNING IN PORT: ${config.PORT}`);
}
bootstrap();

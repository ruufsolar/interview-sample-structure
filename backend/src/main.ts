import { LogLevel, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const DEBUG_LOGGER_LEVEL: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose']
const PRODUCTION_LOGGER_LEVEL: LogLevel[] = ['error', 'warn']

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.DEBUG_LOGS_ENABLED ? DEBUG_LOGGER_LEVEL : PRODUCTION_LOGGER_LEVEL,
  });
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
    transform: true,
  }));
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import config from 'helpers/db/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //cors config
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ["GET,PUT,POST,DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization']
  })

  await app.listen(config().portApp);
  console.log(`\nRunning port: http://127.0.0.1:${config().portApp}`)
}
bootstrap();

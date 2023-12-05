import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

config();
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
  }));

  const port = process.env.SERVER_PORT || 3001;
  await app.listen(port);


  console.log(`Server Run At: http://localhost:${port}`);
}
bootstrap();

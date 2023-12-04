import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from 'dotenv';

config();
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  const port = process.env.SERVER_PORT || 3001;
  await app.listen(port);
  console.log(`Server Run At: http://localhost:${port}`);
}
bootstrap();

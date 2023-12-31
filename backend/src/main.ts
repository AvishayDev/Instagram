import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist:true }));
  
  const corsOptions:CorsOptions = {
    origin:process.env.CLIENT_URL,
    credentials:true
  }
  
  app.enableCors(corsOptions);

  const port = process.env.SERVER_PORT || 3001;
  await app.listen(port);


  console.log(`Server Run At: http://localhost:${port}`);
}
bootstrap();

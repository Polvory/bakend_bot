import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {DEV_PORT} from './utils/dev'

async function bootstrap() {

  const PORT = DEV_PORT|| 3001;
  const app = await NestFactory.create(AppModule);
 
  const config = new DocumentBuilder()
    .setTitle(
      'Boot'
    )
    .setDescription(
      'Документация'
    )
    .setVersion(
      '0.0.1'
    )
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(PORT, () => console.log(`Serwer Start = :${PORT}`))

}
bootstrap();

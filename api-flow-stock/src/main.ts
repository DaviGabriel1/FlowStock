import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    })
  );
  app.enableCors();

  const documentBuilderConfig = new DocumentBuilder()
    .setTitle('FlowStock API')
    .setDescription(
      'gerencie seu estoque de produtos de forma eficiente para o seu negócio'
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilderConfig);

  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT, '0.0.0.0');
  console.log(`servidor rodando na porta ${PORT}...`);
}
bootstrap();

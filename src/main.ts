import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Zion API')
    .setDescription('Documentação da API Zion')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  if (process.env.NODE_ENV !== 'production') {
    await app.listen(process.env.PORT || 3000);
  } else {
    await app.init();
    return app.getHttpAdapter().getInstance();
  }
}

const server = bootstrap();
export default server;

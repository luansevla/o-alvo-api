import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Resolve o erro de rede local do Postman
  app.enableCors();

  // Swagger - Agora em /api/docs para evitar conflitos
  const config = new DocumentBuilder()
    .setTitle('Zion API')
    .setDescription('Documentação da API Zion')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 2. Condicional para rodar localmente no Windows ou na Vercel
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(process.env.PORT || 3000);
  } else {
    // Na Vercel, apenas inicializamos e retornamos o motor do Express
    await app.init();
    return app.getHttpAdapter().getInstance();
  }
}

// 3. O SEGREDO: Exportamos o resultado da execução para a Vercel
const server = bootstrap();
export default server;

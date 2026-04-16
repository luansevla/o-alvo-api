import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Instância do Express para a Vercel
const server = express();

export const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('O Alvo API')
    .setDescription('Documentação da API de Células')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Rota do Swagger: /api

  await app.init();
};

export default server;

// Inicializa o Nest
bootstrap();

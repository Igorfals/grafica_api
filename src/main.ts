import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Debug: Verificar variáveis de ambiente críticas
  console.log('🔍 Verificando variáveis de ambiente...');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Definida' : '❌ Não definida');
  console.log('REDIS_URL:', process.env.REDIS_URL ? '✅ Definida' : '❌ Não definida');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Definida' : '❌ Não definida');
  console.log('PORT:', process.env.PORT || '3000 (padrão)');

  app.enableCors({
    origin: configService.get<string>('PAINEL_URL') || '*', // fallback para * se não definido
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Grafica API')
    .setDescription('API para gerenciamento de usuários e autenticação')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);

  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);
}
void bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Your frontend URL
    credentials: true
  });
  
  // Set global prefix
  app.setGlobalPrefix('api');
  
  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('Task Manager API Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'bearerAuth',
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Fix Swagger UI options
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: true,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      defaultModelsExpandDepth: 3,
      defaultModelExpandDepth: 3,
    },
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap(); 
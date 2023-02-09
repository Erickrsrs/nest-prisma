import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConflictInterceptor } from './common/errors/interceptors/conflict.interceptor';
import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor';
import { NotFoundInterceptor } from './common/errors/interceptors/notfound.interceptor';
import { UnauthorizedInterceptor } from './common/errors/interceptors/unauthorized.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Simple blog')
    .setDescription('Simple blog API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(
    new ConflictInterceptor(),
    new DatabaseInterceptor(),
    new UnauthorizedInterceptor(),
    new NotFoundInterceptor(),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

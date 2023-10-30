import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev')); // 'combined', 'common', 'dev', 'tiny'

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          return {
            [`${error.property}`]: {
              error: `${error.property} has wrong value ${error.value}.`,
              message: Object.values(error.constraints).join(''),
            },
          };
        });

        const errorResponse = {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: messages,
        };
        return new BadRequestException(errorResponse);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Document Signing API')
    .setDescription(
      'An API that allows users to sign digital documents using digital signatures. Users can submit documents for signing along with their digital signatures and retrieve signed documents.',
    )
    .setVersion('1.0')
    .addTag('Sign')
    .addTag('Verify')
    // Add more tags as needed to categorize endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();

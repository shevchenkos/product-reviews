import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ReviewProcessingModule } from './review-processing.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ReviewProcessingModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'reviews_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.listen();
}
bootstrap();

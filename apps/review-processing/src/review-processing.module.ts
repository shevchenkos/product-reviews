import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, Review } from '@apps/common';
import { ReviewProcessingController } from './review-processing.controller';
import { ReviewProcessingService } from './review-processing.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [Product, Review],
      database: 'products',
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Product, Review]),
  ],
  controllers: [ReviewProcessingController],
  providers: [ReviewProcessingService],
})
export class ReviewProcessingModule {}

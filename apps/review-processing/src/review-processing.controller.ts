import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ReviewProcessingService } from './review-processing.service';

@Controller()
export class ReviewProcessingController {
  constructor(
    private readonly reviewProcessingService: ReviewProcessingService,
  ) {}

  @MessagePattern('review')
  async calculateAverageRating(productId: number): Promise<void> {
    return this.reviewProcessingService.execute(productId);
  }
}

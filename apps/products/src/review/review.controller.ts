import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  CreateReviewDto,
  ResponseReviewDto,
  UpdateReviewDto,
} from '@apps/common';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOkResponse({ type: ResponseReviewDto })
  async create(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<ResponseReviewDto> {
    const review = await this.reviewService.create(createReviewDto);
    return plainToInstance(ResponseReviewDto, review);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResponseReviewDto })
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<ResponseReviewDto> {
    const review = await this.reviewService.update(+id, updateReviewDto);
    return plainToInstance(ResponseReviewDto, review);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.reviewService.remove(+id);
  }
}

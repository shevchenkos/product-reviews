import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import {
  Review,
  Product,
  CreateReviewDto,
  UpdateReviewDto,
} from '@apps/common';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @Inject('REVIEWS_TRANSPORT') private notifier: ClientProxy,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const product = await this.productsRepository.findOne({
      where: { id: createReviewDto.productId },
      relations: ['reviews'],
    });

    if (!product) {
      throw new NotFoundException('Product does not exist!');
    }

    const review = await this.reviewsRepository.save(createReviewDto);

    product.reviews.push(review);
    await this.productsRepository.save(product);

    this.notifier.emit('review', product.id);
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const existingReview = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!existingReview) {
      throw new NotFoundException('Review does not exist!');
    }

    const reviewData = this.reviewsRepository.merge(
      existingReview,
      updateReviewDto,
    );
    const review = await this.reviewsRepository.save(reviewData);

    this.notifier.emit('review', review.product.id);
    return review;
  }

  async remove(id: number): Promise<void> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!review) {
      throw new NotFoundException('Review does not exist!');
    }

    await this.reviewsRepository.remove(review);
    this.notifier.emit('review', review.product.id);
  }
}

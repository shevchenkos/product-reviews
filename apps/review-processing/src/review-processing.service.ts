import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@apps/common';

@Injectable()
export class ReviewProcessingService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async execute(productId: number): Promise<void> {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
      relations: ['reviews'],
    });

    const ratings = product.reviews.map((review) => review.rating);
    const averageRating = ratings.length
      ? this.roundTo(ratings.reduce((a, b) => a + b) / ratings.length, 2)
      : 0;
    product.averageRating = averageRating;

    await this.productsRepository.save(product);
  }

  private roundTo = (num: number, precision: number): number => {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  };
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Product,
  Review,
  CreateProductDto,
  UpdateProductDto,
} from '@apps/common';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productsRepository.save(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product does not exist!');
    }

    return product;
  }

  async findReviews(id: number): Promise<Review[]> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });

    if (!product) {
      throw new NotFoundException('Product does not exist!');
    }

    return product.reviews;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    const productData = this.productsRepository.merge(
      product,
      updateProductDto,
    );
    return await this.productsRepository.save(productData);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }
}

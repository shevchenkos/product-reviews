import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { plainToInstance } from 'class-transformer';
import {
  ResponseProductDto,
  CreateProductDto,
  ResponseReviewDto,
  UpdateProductDto,
} from '@apps/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOkResponse({ type: ResponseProductDto })
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ResponseProductDto> {
    const product = await this.productService.create(createProductDto);
    return plainToInstance(ResponseProductDto, product);
  }

  @Get()
  @ApiOkResponse({ type: [ResponseProductDto] })
  async findAll(): Promise<ResponseProductDto[]> {
    const products = await this.productService.findAll();
    return plainToInstance(ResponseProductDto, products);
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseProductDto })
  async findOne(@Param('id') id: string): Promise<ResponseProductDto> {
    const product = await this.productService.findOne(+id);
    return plainToInstance(ResponseProductDto, product);
  }

  @UseInterceptors(CacheInterceptor)
  @Get(':id/reviews')
  @ApiOkResponse({ type: ResponseReviewDto })
  async productReviews(@Param('id') id: string): Promise<ResponseReviewDto[]> {
    const reviews = await this.productService.findReviews(+id);
    return plainToInstance(ResponseReviewDto, reviews);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResponseProductDto })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ResponseProductDto> {
    const product = await this.productService.update(+id, updateProductDto);
    return plainToInstance(ResponseProductDto, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(+id);
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CreateProductDto, UpdateProductDto } from '@apps/common';
import { ProductController } from '../src/product/product.controller';
import { ProductService } from '../src/product/product.service';
import {
  createProductMock,
  idMock,
  productMock,
  responseProductMock,
  responseReviewMock,
  reviewMock,
  updateProductMock,
} from './mocks';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((product: CreateProductDto) =>
                Promise.resolve({ id: +idMock, averageRating: 0, ...product }),
              ),
            findAll: jest
              .fn()
              .mockImplementation(() => Promise.resolve([productMock])),
            findOne: jest
              .fn()
              .mockImplementation(() => Promise.resolve(productMock)),
            findReviews: jest
              .fn()
              .mockImplementation(() => Promise.resolve([reviewMock])),
            update: jest
              .fn()
              .mockImplementation((id: string, product: UpdateProductDto) =>
                Promise.resolve({ id, averageRating: 0, ...product }),
              ),
            remove: jest.fn(),
          },
        },
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  describe('create()', () => {
    it('should create a product', async () => {
      const result = await productController.create(createProductMock);
      expect(result).toEqual(responseProductMock);
      expect(productService.create).toHaveBeenCalledWith(createProductMock);
    });
  });

  describe('findAll()', () => {
    it('should find all products', async () => {
      const result = await productController.findAll();
      expect(result.length).toEqual(1);
      expect(productService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a product', async () => {
      const result = await productController.findOne(idMock);
      expect(result).toEqual(responseProductMock);
      expect(productService.findOne).toHaveBeenCalledWith(+idMock);
    });
  });

  describe('productReviews()', () => {
    it('should find product reviews', async () => {
      const result = await productController.productReviews(idMock);
      expect(result).toEqual([responseReviewMock]);
      expect(productService.findReviews).toHaveBeenCalledWith(+idMock);
    });
  });

  describe('update()', () => {
    it('should update a product', async () => {
      const result = await productController.update(idMock, updateProductMock);
      expect(result).toEqual(responseProductMock);
      expect(productService.update).toHaveBeenCalledWith(
        +idMock,
        updateProductMock,
      );
    });
  });

  describe('remove()', () => {
    it('should remove the product', () => {
      productController.remove(idMock);
      expect(productService.remove).toHaveBeenCalled();
    });
  });
});

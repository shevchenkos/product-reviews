import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '@apps/common';
import { Repository } from 'typeorm';
import { ProductService } from '../src/product/product.service';
import {
  createProductMock,
  idMock,
  productMock,
  updateProductMock,
} from './mocks';

describe('ProductService', () => {
  let productService: ProductService;
  let productsRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            findOne: jest.fn().mockResolvedValue(productMock),
            save: jest.fn().mockResolvedValue(productMock),
            merge: jest.fn().mockResolvedValue(productMock),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productsRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a product', () => {
      expect(productService.create(createProductMock)).resolves.toEqual(
        productMock,
      );
    });
  });

  describe('findAll()', () => {
    it('should return an array of products', async () => {
      const users = await productService.findAll();
      expect(users).toEqual([productMock]);
    });
  });

  describe('findOne()', () => {
    it('should get a single product', () => {
      const repoSpy = jest.spyOn(productsRepository, 'findOne');
      expect(productService.findOne(+idMock)).resolves.toEqual(productMock);
      expect(repoSpy).toHaveBeenCalledWith({ where: { id: +idMock } });
    });
  });

  describe('update()', () => {
    it('should successfully update a product', () => {
      expect(
        productService.update(+idMock, updateProductMock),
      ).resolves.toEqual(productMock);
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(productsRepository, 'remove');
      const retVal = await productService.remove(+idMock);
      expect(removeSpy).toHaveBeenCalledWith(productMock);
      expect(retVal).toBeUndefined();
    });
  });
});

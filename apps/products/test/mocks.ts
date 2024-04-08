import {
  CreateReviewDto,
  UpdateReviewDto,
  ResponseReviewDto,
  Review,
  CreateProductDto,
  Product,
  ResponseProductDto,
  UpdateProductDto,
} from '@apps/common';

export const idMock = '1';

export const productMock: Product = {
  id: 1,
  name: 'pepsi',
  description: 'soft drink',
  price: 1.2,
  averageRating: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const reviewMock: Review = {
  id: 1,
  firstName: 'first name',
  lastName: 'last name',
  review: 'not bad',
  rating: 3,
  product: productMock,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const createProductMock: CreateProductDto = {
  name: 'pepsi',
  description: 'soft drink',
  price: 1.2,
};

export const updateProductMock: UpdateProductDto = {
  name: 'pepsi',
  description: 'soft drink',
  price: 1.2,
};

export const responseProductMock: ResponseProductDto = {
  id: 1,
  name: 'pepsi',
  description: 'soft drink',
  price: 1.2,
  averageRating: 0,
};

export const createReviewMock: CreateReviewDto = {
  productId: 1,
  firstName: 'first name',
  lastName: 'last name',
  review: 'not bad',
  rating: 3,
};

export const updateReviewMock: UpdateReviewDto = {
  firstName: 'first name',
  lastName: 'last name',
  review: 'not bad',
  rating: 3,
};

export const responseReviewMock: ResponseReviewDto = {
  id: 1,
  firstName: 'first name',
  lastName: 'last name',
  review: 'not bad',
  rating: 3,
};

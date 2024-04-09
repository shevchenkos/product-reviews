import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Product } from '@apps/common';
import * as request from 'supertest';
import { createProductMock, createReviewMock } from './mocks';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('healthcheck', () => {
    return request(app.getHttpServer())
      .get('/healthcheck')
      .expect(200)
      .expect('OK');
  });

  // create product
  // create 2 reviews
  // wait 5 sec
  // check product average rating
  it('reviews processing flow', async () => {
    const rating1 = 3;
    const rating2 = 4;

    const product: Product = (
      await request(app.getHttpServer())
        .post('/products')
        .send(createProductMock)
        .expect(201)
    ).body;

    await request(app.getHttpServer())
      .post('/reviews')
      .send({ ...createReviewMock, rating: rating1, productId: product.id })
      .expect(201);

    await request(app.getHttpServer())
      .post('/reviews')
      .send({ ...createReviewMock, rating: rating2, productId: product.id })
      .expect(201);

    await new Promise((o) => {
      setTimeout(o, 5000);
    });

    const updated: Product = (
      await request(app.getHttpServer())
        .get(`/products/${product.id}`)
        .expect(200)
    ).body;

    expect(updated.averageRating).toBe(
      (Math.round(((rating1 + rating2) / 2) * 100) / 100).toFixed(2),
    );
  }, 10000);
});

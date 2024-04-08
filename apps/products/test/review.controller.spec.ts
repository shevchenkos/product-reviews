import { Test, TestingModule } from '@nestjs/testing';
import { CreateReviewDto, UpdateReviewDto } from '@apps/common';
import { ReviewController } from '../src/review/review.controller';
import { ReviewService } from '../src/review/review.service';
import {
  createReviewMock,
  idMock,
  responseReviewMock,
  updateReviewMock,
} from './mocks';

describe('ReviewController', () => {
  let reviewController: ReviewController;
  let reviewService: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((review: CreateReviewDto) =>
                Promise.resolve({ id: +idMock, ...review }),
              ),
            update: jest
              .fn()
              .mockImplementation((id: string, review: UpdateReviewDto) =>
                Promise.resolve({ id, ...review }),
              ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    reviewController = module.get<ReviewController>(ReviewController);
    reviewService = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(reviewController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a review', async () => {
      const result = await reviewController.create(createReviewMock);
      expect(result).toEqual(responseReviewMock);
      expect(reviewService.create).toHaveBeenCalledWith(createReviewMock);
    });
  });

  describe('update()', () => {
    it('should update a review', async () => {
      const result = await reviewController.update(idMock, updateReviewMock);
      expect(result).toEqual(responseReviewMock);
      expect(reviewService.update).toHaveBeenCalledWith(
        +idMock,
        updateReviewMock,
      );
    });
  });

  describe('remove()', () => {
    it('should remove the review', () => {
      reviewController.remove(idMock);
      expect(reviewService.remove).toHaveBeenCalled();
    });
  });
});

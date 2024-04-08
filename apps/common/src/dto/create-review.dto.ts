import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  review: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}

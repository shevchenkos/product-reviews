import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Review } from './review.entity';

@Entity()
export class Product extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: number;

  @OneToMany(() => Review, (review) => review.product, { nullable: true })
  reviews?: Review[];

  @Column('decimal', {
    name: 'average_rating',
    precision: 3,
    scale: 2,
    default: 0,
  })
  averageRating: number;
}

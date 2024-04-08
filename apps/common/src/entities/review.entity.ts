import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { Product } from './product.entity';

@Entity()
export class Review extends Base {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  review: string;

  @Column({ enum: [1, 2, 3, 4, 5] })
  rating: number;

  @JoinColumn({ name: 'product_id' })
  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  product: Product;
}

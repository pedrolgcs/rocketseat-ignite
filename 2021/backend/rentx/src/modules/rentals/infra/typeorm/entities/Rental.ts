import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';

@Entity('rentals')
class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  car_id: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column()
  user_id: string;

  @CreateDateColumn()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export { Rental };

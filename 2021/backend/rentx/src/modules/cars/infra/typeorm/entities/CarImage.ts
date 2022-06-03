import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

// configs
import uploadConfig from '@config/upload';

// entities
import { Car } from './Car';

@Entity('cars_image')
class CarImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image_name: string;

  @Expose({ name: 'image_url' })
  getImageUrl(): string | null {
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/cars/${this.car_id}/${this.image_name}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/cars/${this.car_id}/${this.image_name}`;
      default:
        return null;
    }
  }

  @Column()
  car_id: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { CarImage };

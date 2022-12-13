import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from '@/shared/infra/database/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}

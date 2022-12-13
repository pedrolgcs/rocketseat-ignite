import { Body, Controller, Get, Post } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { PrismaService } from '@/shared/infra/database/prisma.service';
import { CreateNotificationDTO } from '@/create-notification-DTO';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list(): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany();

    return notifications;
  }

  @Post()
  async create(@Body() body: CreateNotificationDTO) {
    const { content, category, recipientId } = body;

    const notification = await this.prisma.notification.create({
      data: {
        content,
        category,
        recipientId,
      },
    });

    return notification;
  }
}

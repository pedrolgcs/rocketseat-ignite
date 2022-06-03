import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
  slug?: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async listAllCourses() {
    return this.prisma.course.findMany();
  }

  async getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }

  async getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async createCourse({ title, slug }: CreateCourseParams) {
    const courseSlug = slug ?? slugify(title, { lower: true });

    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseWithSameSlug) {
      throw new Error('Another course with same slug already exists');
    }

    const course = await this.prisma.course.create({
      data: {
        title,
        slug: courseSlug,
      },
    });

    return course;
  }
}

import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CoursesService } from '../../../services/courses.service';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';
import { CreateCourseInput } from '../inputs/create-course-input';
import { Course } from '../models/course';
import { AuthUser, CurrentUser } from '../../auth/current-user';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentsService.getStudentByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.coursesService.getCourseById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse(data);
  }
}

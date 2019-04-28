import { HttpModule, Module } from '@nestjs/common';
import { CourseController } from './controllers/course.controller';
import { CourseService } from './services/course.service';
import { PlmsService } from './services/plms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './model/course.entity';
import { User } from '../user/model/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, User]),
    HttpModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, PlmsService],
  exports: [CourseService, PlmsService],
})
export class CourseModule {}

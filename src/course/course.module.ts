import { HttpModule, Module } from '@nestjs/common';
import { CourseController } from './controllers/course.controller';
import { CourseService } from './services/course.service';
import { PlmsService } from './services/plms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './model/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    HttpModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, PlmsService],
})
export class CourseModule {}

import { HttpModule, Module } from '@nestjs/common';
import { CourseController } from './controllers/course.controller';
import { CourseService } from './services/course.service';
import { PlmsService } from './services/plms.service';

@Module({
  imports: [HttpModule],
  controllers: [CourseController],
  providers: [CourseService, PlmsService],
})
export class CourseModule {}

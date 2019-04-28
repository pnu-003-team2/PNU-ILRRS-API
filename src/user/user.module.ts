import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './model/user.entity';
import { JwtStrategy } from './services/jwt.strategy';
import { CourseService } from '../course/services/course.service';
import { PlmsService } from '../course/services/plms.service';
import { Course } from '../course/model/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, Course,
    ]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [UserService, CourseService, PlmsService, JwtStrategy],
})
export class UserModule {
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import dotenv = require('dotenv');
dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

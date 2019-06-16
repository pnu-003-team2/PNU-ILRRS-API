import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { SendbirdModule } from './sendbird/sendbird.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import dotenv = require('dotenv');
dotenv.config();

@Module({
  imports: [TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => configService.createTypeOrmOptions(),
  }), UserModule, CourseModule, SendbirdModule, ConfigModule],
  controllers: [AppController],
})
export class AppModule {
}

import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './model/user.entity';
import { JwtStrategy } from './services/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {
}

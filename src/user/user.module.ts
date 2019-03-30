import { Module } from '@nestjs/common';
import { UserView } from './view/user.view';

@Module({
  imports: [],
  controllers: [UserView],
  providers: [],
})
export class UserModule {
}

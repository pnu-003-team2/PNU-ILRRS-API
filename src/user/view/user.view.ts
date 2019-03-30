import { Controller, Post, Body } from '@nestjs/common';

import { LoginInfoDTO } from './dto/loginInfo.dto';

@Controller('user')
export class UserView {

  @Post()
  async login(@Body() loginInfoDTO: LoginInfoDTO): Promise<void> {
    console.log(loginInfoDTO);
  }
}

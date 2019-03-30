import { Controller, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { LoginInfoDTO } from './dto/loginInfo.dto';
import { UserService } from '../services/user.service';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  @Post()
  @ApiOperation({ title: '로그인' })
  @ApiResponse({
    status: 201,
    description: '로그인 되었습니다.',
  })
  async login(@Body() loginInfoDTO: LoginInfoDTO): Promise<void> {
  }
}

import { Controller, Post, Body, Res, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiForbiddenResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';

import { LoginInfoDTO } from './dto/LoginInfo.dto';
import { UserService } from '../services/user.service';
import { User } from '../model/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('login')
  @ApiOperation({ title: '로그인' })
  @ApiResponse({
    status: 201,
    description: '로그인 되었습니다.',
  })
  async login(@Body() loginInfoDTO: LoginInfoDTO, @Res() res): Promise<void> {
    console.log(loginInfoDTO);
    const { id, password } = loginInfoDTO;
    return res.status(HttpStatus.OK).json(await this.userService.login(id, password));
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: '유저 정보' })
  @ApiOkResponse({ description: 'Success!' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async getUser(@Req() req, @Res() res): Promise<User> {
    const { id } = req.user;
    return res.status(HttpStatus.OK).json(await this.userService.getUser(id));
  }

  @Get('users')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: '전체 유저 정보' })
  @ApiOkResponse({ description: 'Success!' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async getAllUser(@Res() res): Promise<User[]> {
    return res.status(HttpStatus.OK).json(await this.userService.getAllUser());
  }
}

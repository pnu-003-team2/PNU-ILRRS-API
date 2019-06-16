import { Controller, Get, HttpStatus, Render, Res } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {
  }
  @Get('health')
  healthCheck(@Res() res) {
    return res.status(HttpStatus.OK).json();
  }

  @Render('index')
  @Get()
  render() {
  }
}

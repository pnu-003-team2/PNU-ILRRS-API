import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { CourseService } from '../services/course.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiOkResponse, ApiForbiddenResponse, ApiUseTags } from '@nestjs/swagger';
import { CourseInfoDTO } from './dto/CourseInfo.dto';

@ApiUseTags('course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: '현재 유저의 등록된 강의가져오기' })
  @ApiOkResponse({ description: 'Success!' , type: [CourseInfoDTO]})
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findUserCourses(@Req() req, @Res() res): Promise<CourseInfoDTO[]> {
    const { id } = req.user;
    return res.status(HttpStatus.OK).json(await this.courseService.findUserCourses(id));
  }
}

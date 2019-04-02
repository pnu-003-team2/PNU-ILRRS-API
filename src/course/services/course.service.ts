import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
  constructor(
    private readonly httpService: HttpService,
    private readonly courseService: CourseService,
  ) {}

}

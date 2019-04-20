import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import * as querystring from 'querystring';
import * as cheerio from 'cheerio';
import { CourseInfo } from './interface/CourseInfo';

@Injectable()
export class PlmsService {
  constructor(
    private readonly httpService: HttpService,
  ) {
  }

  async getCourses(id: string) {
    const mainPageHTML = await this.getMainPageHTML(id);
    return this.getCoursesFromMainPage(mainPageHTML);
  }

  async getMainPageHTML(id: string): Promise<string> {
    const cookie = await this.getCookie(id);
    const response = await this.httpService.get('https://plms.pusan.ac.kr/', {
      headers: { cookie },
    });

    return await (response.pipe(map(res => res.data)).toPromise());
  }

  async getCookie(id: string) {
    const response = await (this.httpService.request({
      method: 'post',
      url: 'https://plms.pusan.ac.kr/login/index.php',
      data: querystring.stringify({ userid: id }),
      maxRedirects: 0,
      validateStatus: (status) => {
        return status >= 200 && status <= 303;
      },
    }).toPromise());
    const cookies = response.headers['set-cookie'];
    const lastIndex = cookies.length - 1;
    return cookies[lastIndex];
  }

  getCoursesFromMainPage(html: string) {
    const htmlSelector = cheerio.load(html);
    const courseContainer = htmlSelector('ul.my-course-lists.coursemos-layout-0');
    if (PlmsService.isEmptyInCourseContainer(courseContainer)) {
      return [];
    }

    return this.getCoursesInCourseContainer(htmlSelector, courseContainer);
  }

  static isEmptyInCourseContainer(courseContainer: Cheerio): boolean {
    const emptyIndicator = courseContainer.find('li.nocourse.well');
    return (emptyIndicator.length === 1);
  }

  getCoursesInCourseContainer(htmlSelector: CheerioStatic, courseContainer: Cheerio): CourseInfo[] {
    const courseList = courseContainer.find('li.course_label_re');
    const courses: CourseInfo[] = [];
    courseList.each((index, elem) => {
      const courseInfo = htmlSelector(elem).find('div.course-title');
      const nameAndCode = courseInfo.find('h3').text();
      const professor = courseInfo.find('p.prof').text();
      const { name, code } = PlmsService.extractNameAndCode(nameAndCode);
      const returnCourse = { name, code, professor };
      courses.push(returnCourse);
    });

    return courses;
  }

  static extractNameAndCode(nameAndCodeString): any {
    const name = nameAndCodeString.split(' ')[0];
    const code = nameAndCodeString.split(' ')[1].replace('(', '').replace(')', '');
    return { name, code };
  }
}

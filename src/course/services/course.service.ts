import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import courseJSON from '../model/pnu2019_1st.json';
import { CourseJSON } from './interface/CourseJSON';
import { Course } from '../model/course.entity';
import { Repository } from 'typeorm';
import { PlmsService } from './plms.service';
import { CourseInfo } from './interface/CourseInfo';
import { User } from '../../user/model/user.entity';
import { CourseInfoDTO } from '../controllers/dto/CourseInfo.dto';

@Injectable()
export class CourseService {
  constructor(
    private readonly plmsService: PlmsService,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async findUserCourses(id: string): Promise<CourseInfoDTO[]> {
    const user = await this.userRepository.findOne(id, { relations: ['courses'] });
    const {courses} = user;
    return courses.map(course => this.makeCourseInfoDTO(course));
  }

  makeCourseInfoDTO(course: Course): CourseInfoDTO {
    const {
      id, uni_name, depart_code, depart_name, grade, class_code,
      code, class_name, class_eng_name, class_division, score, theory,
      lab, professor_depart, professor_name, limit_person, time_table,
      liberal_name, is_native, is_remote, updated_at, created_at, version,
    } = course;
    const courseInfoDTO = new CourseInfoDTO();
    courseInfoDTO.id = id;
    courseInfoDTO.uni_name = uni_name;
    courseInfoDTO.depart_code = depart_code;
    courseInfoDTO.depart_name = depart_name;
    courseInfoDTO.grade = grade;
    courseInfoDTO.class_code = class_code;
    courseInfoDTO.code = code;
    courseInfoDTO.class_name = class_name;
    courseInfoDTO.class_eng_name = class_eng_name;
    courseInfoDTO.class_division = class_division;
    courseInfoDTO.score = score;
    courseInfoDTO.theory = theory;
    courseInfoDTO.lab = lab;
    courseInfoDTO.professor_depart = professor_depart;
    courseInfoDTO.professor_name = professor_name;
    courseInfoDTO.limit_person = limit_person;
    courseInfoDTO.time_table = time_table;
    courseInfoDTO.liberal_name = liberal_name;
    courseInfoDTO.is_native = is_native;
    courseInfoDTO.is_remote = is_remote;
    courseInfoDTO.updated_at = updated_at;
    courseInfoDTO.created_at = created_at;
    courseInfoDTO.version = version;
    return courseInfoDTO;
  }

  async makeUserCourse(id: string): Promise<Course[]> {
    const userCourseInfo: CourseInfo[] = await this.plmsService.getCourses(id);
    return await Promise.all(userCourseInfo.map(async (course) =>
      await this.getDBUserCourse(course)));
  }

  async getDBUserCourse(userCourse: CourseInfo): Promise<Course> {
    const { name, code } = userCourse;
    return await this.courseRepository.createQueryBuilder('course')
      .where('course.class_name = :name', { name })
      .andWhere('course.code = :code', { code })
      .getOne();
  }

  async importCourseJSONToDatabase() {
    console.log('JSON 데이터 Import 시작...');
    const courses: CourseJSON[] = courseJSON;
    courses.forEach(async (course, index) => {
      const {
        uni_name, depart_code, depart_name, grade, class_code, code, class_name, class_eng_name, class_division, score, theory,
        lab, professor_depart, professor_name, limit_person, time_table, liberal_name, is_native, is_remote,
      } = course;
      const newCourse = new Course();
      newCourse.uni_name = uni_name;
      newCourse.depart_code = depart_code;
      newCourse.depart_name = depart_name;
      newCourse.grade = grade;
      newCourse.class_code = class_code;
      newCourse.code = code;
      newCourse.class_name = class_name;
      newCourse.class_eng_name = class_eng_name;
      newCourse.class_division = class_division;
      newCourse.score = score;
      newCourse.theory = theory;
      newCourse.lab = lab;
      newCourse.professor_depart = professor_depart;
      newCourse.professor_name = professor_name;
      newCourse.limit_person = limit_person;
      newCourse.time_table = time_table;
      newCourse.liberal_name = liberal_name;
      newCourse.is_native = is_native;
      newCourse.is_remote = is_remote === 'Y';
      await this.courseRepository.save(newCourse);
      console.log(`진행률 : ${((index / courses.length) * 100).toFixed(2)}%`);
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import courseJSON from '../model/pnu2019_1st.json';
import { CourseJSON } from './interface/CourseJSON';
import { Course } from '../model/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {
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

export interface CourseJSON {
  // 개설 대학
  uni_name: string;

  // 개설학과 코드
  depart_code: string;

  // 개설 학과
  depart_name: string;

  // 학년
  grade: number;

  // 과목 코드
  class_code: string;

  // 과목 분반
  code: number;

  // 과목 명
  class_name: string;

  // 과목 영문 명
  class_eng_name: string;

  // 과목 구분
  class_division: string;

  // 학점
  score: number;

  // 이론 점수
  theory: number;

  // 실험 점수
  lab: number;

  // 교수 학과
  professor_depart: string;

  // 교수 이름
  professor_name: string;

  // 강의 제한 인원
  limit_person: number;

  // 과목 시간표
  time_table: string;

  // 교양 영역명
  liberal_name: string;

  // 원어 강의
  is_native: string;

  // 원격 강의
  is_remote: string;
}

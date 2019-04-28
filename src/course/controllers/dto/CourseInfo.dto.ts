import { ApiModelProperty } from '@nestjs/swagger';

export class CourseInfoDTO {
  @ApiModelProperty({
    description: 'id',
  })
  id: number;

  @ApiModelProperty({
    description: '개설 대학',
  })
  uni_name: string;

  @ApiModelProperty({
    description: '개설학과 코드',
  })
  depart_code: string;

  @ApiModelProperty({
    description: '개설 학과',
  })
  depart_name: string;

  @ApiModelProperty({
    description: '학년',
  })
  grade: number;

  @ApiModelProperty({
    description: '과목 코드',
  })
  class_code: string;

  @ApiModelProperty({
    description: '과목 분반',
  })
  code: number;

  @ApiModelProperty({
    description: '과목 명',
  })
  class_name: string;

  @ApiModelProperty({
    description: '과목 영문 명',
  })
  class_eng_name: string;

  @ApiModelProperty({
    description: '과목 구분',
  })
  class_division: string;

  @ApiModelProperty({
    description: '학점',
  })
  score: number;

  @ApiModelProperty({
    description: '이론 점수',
  })
  theory: number;

  @ApiModelProperty({
    description: '실험 점수',
  })
  lab: number;

  @ApiModelProperty({
    description: '교수 학과',
  })
  professor_depart: string | null;

  @ApiModelProperty({
    description: '교수 이름',
  })
  professor_name: string | null;

  @ApiModelProperty({
    description: '강의 제한 인원',
  })
  limit_person: number | null;

  @ApiModelProperty({
    description: '과목 시간표',
  })
  time_table: string | null;

  @ApiModelProperty({
    description: '교양 영역명',
  })
  liberal_name: string | null;

  @ApiModelProperty({
    description: '원어 강의',
  })
  is_native: string;

  @ApiModelProperty({
    description: '원격 강의',
  })
  is_remote: boolean;

  @ApiModelProperty({
    description: '수정일',
  })
  updated_at: Date;

  @ApiModelProperty({
    description: '생성일',
  })
  created_at: Date;

  @ApiModelProperty({
    description: '버전',
  })
  version: number;
}

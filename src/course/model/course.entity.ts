import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { User } from '../../user/model/user.entity';

@Entity('course')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  // 개설 대학
  @Column()
  uni_name: string;

  // 개설학과 코드
  @Column()
  depart_code: string;

  // 개설 학과
  @Column()
  depart_name: string;

  // 학년
  @Column()
  grade: number;

  // 과목 코드
  @Column()
  class_code: string;

  // 과목 분반
  @Column()
  code: number;

  // 과목 명
  @Column()
  class_name: string;

  // 과목 영문 명
  @Column()
  class_eng_name: string;

  // 과목 구분
  @Column()
  class_division: string;

  // 학점
  @Column()
  score: number;

  // 이론 점수
  @Column()
  theory: number;

  // 실험 점수
  @Column()
  lab: number;

  // 교수 학과
  @Column({
    nullable: true,
  })
  professor_depart: string;

  // 교수 이름
  @Column({
    nullable: true,
  })
  professor_name: string;

  // 강의 제한 인원
  @Column()
  limit_person: number;

  // 과목 시간표
  @Column({
    nullable: true,
  })
  time_table: string;

  // 교양 영역명
  @Column({
    nullable: true,
  })
  liberal_name: string;

  // 원어 강의
  @Column()
  is_native: string;

  // 원격 강의
  @Column()
  is_remote: boolean;

  // SendBird Channel Url
  @Column()
  channel_url: string;

  @ManyToMany(type => User, user => user.courses)
  users: User[];
  //
  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @VersionColumn()
  version: number;
}

import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Course } from '../../course/model/course.entity';

@Entity('user')
export class User {

  @PrimaryColumn()
  id: string;

  @Column('varchar', { length: 30 , nullable: true})
  name: string;

  // Send Bird Access token
  @Column()
  sendbird_access_token: string;

  @ManyToMany(type => Course, course => course.users)
  @JoinTable({name: 'user_course_join'})
  courses: Course[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  changeName(newName: string) {
    this.name = newName;
  }
}

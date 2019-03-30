import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {

  @PrimaryColumn()
  id: string;

  @Column('varchar', { length: 30 })
  name: string;

  @UpdateDateColumn()
  updated_at: Date;

  changeName(newName: string) {
    this.name = newName;
  }
}

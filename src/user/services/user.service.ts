import { Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../model/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 로그인
   * @param id - 학번
   * @param password - 비밀번호
   */
  async login(id: string, password: string): Promise<string> {
    await this.confirmPLMS(id, password);
    const user = await this.findOfId(id);
    let jwt;

    if (user) {
      jwt = this.createJWT(user);
    } else {
      const newUser = await this.create(id);
      jwt = this.createJWT(newUser);
    }

    return jwt;
  }

  /**
   * 이름 변경
   * @param id - 학번
   * @param newName - 새 이름
   */
  async changeName(id: string, newName: string): Promise<void> {
    const user = await this.findOfId(id);
    user.changeName(newName);
    this.userRepository.save(user);
  }

  /**
   * PLMS에 학번과 비밀번호가 맞는지 확인
   * @param id - 학번
   * @param password - 비밀번호
   */
  async confirmPLMS(id: string, password: string): Promise<boolean> {
    return true;
  }

  /**
   * 해당 학번 유저 가져오기
   * @param id - 학번
   */
  async findOfId(id: string): Promise<User|null> {
    const user = await this.userRepository.findOne(id);
    return user ? user : null;
  }

  /**
   * 유저 생성
   * @param id - 학번
   */
  async create(id: string): Promise<User> {
    const user = await this.findOfId(id);

    if (user) {
      throw new UnprocessableEntityException('user already exists');
    }

    const newUser = new User();
    newUser.id = id;
    return await this.userRepository.save(newUser);
  }

  /**
   * JWT 생성
   * @param user - 유저
   */
  createJWT(user: User): string {
    return 'token';
  }
}

import { HttpService, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import * as jwt from 'jsonwebtoken';
import * as querystring from 'querystring';
import * as cheerio from 'cheerio';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { CourseService } from '../../course/services/course.service';
import { SendbirdService } from '../../sendbird/sendbird.service';
import { UserInfoDTO } from '../controllers/dto/UserInfo.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly courseService: CourseService,
    private readonly sendBirdService: SendbirdService,
    private readonly httpService: HttpService,
  ) {
  }

  async getUser(userId: string): Promise<UserInfoDTO> {
    const { id, name, sendbird_access_token } = await this.userRepository.findOne(userId);
    const userInfoDTO = new UserInfoDTO();
    userInfoDTO.id = id;
    userInfoDTO.name = name;
    userInfoDTO.sendbird_access_token = sendbird_access_token;
    return userInfoDTO;
  }

  async getAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * 로그인
   * @param id - 학번
   * @param password - 비밀번호
   */
  async login(id: string, password: string): Promise<any> {
    const confirmPLMSResult = await this.confirmPLMS(id, password);
    if (!confirmPLMSResult) {
      throw new Error('아이디/비밀번호가 맞지 않습니다.');
    }

    const user = await this.findOfId(id);
    const expiresIn = '1d';
    let jwtToken;
    if (user) {
      jwtToken = this.createJWT(user, expiresIn);
    } else {
      const newUser = await this.create(id);
      jwtToken = this.createJWT(newUser, expiresIn);
    }

    const expireDate = moment().add(1, 'd');

    return {
      jwtToken,
      expireDate,
    };
  }

  /**
   * 이름 변경
   * @param id - 학번
   * @param newName - 새 이름
   */
  async changeName(id: string, newName: string): Promise<void> {
    const user = await this.findOfId(id);
    user.changeName(newName);
    await this.userRepository.save(user);
  }

  /**
   * PLMS에 학번과 비밀번호가 맞는지 확인
   * @param id - 학번
   * @param password - 비밀번호
   */
  async confirmPLMS(id: string, password: string): Promise<boolean> {
    const responseHTML = await this.requestToPLMS(id, password);
    return this.getCorrectInfoInHTML(responseHTML);
  }

  /**
   * PLMS 인증 요청 보내기
   * @param id - 학번
   * @param password - 비밀번호
   */
  async requestToPLMS(id, password): Promise<string> {
    const result = (await this.httpService.request({
      method: 'post',
      url: 'https://onestop.pusan.ac.kr/new_pass/exorgan/exidentify.asp',
      data: querystring.stringify({
        dest: 'https://plms.pusan.ac.kr/login/index.php',
        id,
        pswd: password,
      }),
    }));

    return await (result.pipe(map(res => res.data)).toPromise());
  }

  /**
   * html에서 인증 결과값 가져오기
   * @param html - HTML
   */
  async getCorrectInfoInHTML(html: string) {
    const htmlSelector = cheerio.load(html);
    const gbn = htmlSelector('input[name="gbn"]').attr('value');
    return gbn === 'True';
  }

  /**
   * 해당 학번 유저 가져오기
   * @param id - 학번
   */
  async findOfId(id: string): Promise<User | null> {
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
    newUser.courses = await this.courseService.makeUserCourse(id);
    newUser.name = await this.courseService.getUserName(id);
    const createSendBirdUser = await this.sendBirdService.createUser(newUser.id, newUser.name);
    newUser.sendbird_access_token = createSendBirdUser.access_token;
    for (const course of newUser.courses) {
      await this.sendBirdService.inviteMembersGroupChannel(createSendBirdUser.user_id, course.channel_url);
    }
    return await this.userRepository.save(newUser);
  }

  /**
   * JWT 생성
   * @param user - 유저
   */
  createJWT(user: User, expiresIn: string): string {
    const userPayload: JwtPayload = { id: user.id };
    return jwt.sign(userPayload, process.env.TOKEN_SECRETKEY, { expiresIn });
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.findOfId(payload.id);
  }
}

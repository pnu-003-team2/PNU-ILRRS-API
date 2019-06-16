import { HttpService, Injectable } from '@nestjs/common';
import { CreateUserReqDTO, CreateUserResDTO } from './CreateUser.dto';
import { AxiosRequestConfig } from 'axios';
import { CreateGroupChannelReqDTO, CreateGroupChannelResDTO } from './CreateGroupChannel.dto';

@Injectable()
export class SendbirdService {
  constructor(
    private readonly httpService: HttpService,
  ) {
  }

  // SendBird Api-Token Header
  axiosSBConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json, charset=utf8',
      'Api-Token': process.env.SENDBIRD_API_TOKEN,
    },
  };

  // SendBird Base URL
  sbBaseURL = process.env.SENDBIRD_API_BASE_URL;

  // SendBird Platform API - User

  async createUser(id: string, name: string): Promise<CreateUserResDTO> {
    const createUserReqDTO: CreateUserReqDTO = {
      user_id: id,
      nickname: name,
      profile_url: '',
      issue_access_token: true,
    };
    return (await this.httpService
      .post(`${this.sbBaseURL}/users`, createUserReqDTO, this.axiosSBConfig).toPromise()).data;
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await this.httpService.delete(`${this.sbBaseURL}/users/${id}`, this.axiosSBConfig).toPromise();
      return true;
    } catch (e) {
      return false;
    }
  }

  // SendBird Platform API - User

  // SendBird Platform API - Group Channel

  async createGroupChannel(name: string, custom_type: string): Promise<CreateGroupChannelResDTO> {
    const createGroupChannelReqDTO: CreateGroupChannelReqDTO = {
      name,
      custom_type,
    };
    return (await this.httpService.post(`${this.sbBaseURL}/group_channels`, createGroupChannelReqDTO, this.axiosSBConfig)
      .toPromise()).data;
  }

  async deleteGroupChannel(channel_url: string): Promise<boolean> {
    try {
      await this.httpService.delete(`${this.sbBaseURL}/group_channels/${channel_url}`, this.axiosSBConfig).toPromise();
      return true;
    } catch (e) {
      return false;
    }
  }

  async inviteMembersGroupChannel(id: string, channel_url: string): Promise<boolean> {
    try {
      await this.httpService.post(`${this.sbBaseURL}/group_channels/${channel_url}/invite`,
        { user_ids: [id] }, this.axiosSBConfig).toPromise();
      return true;
    } catch (e) {
      console.log(`Error inviteMembersGroupChannel`);
      console.log(e);
      return false;
    }
  }

  async acceptInvitationGroupChannel(id: string, channel_url: string): Promise<boolean> {
    try {
      await this.httpService
        .put(`${this.sbBaseURL}/group_channels/${channel_url}/accept`,
          { user_id: id }, this.axiosSBConfig).toPromise();
      return true;
    } catch (e) {
      console.log(`Error acceptInvitationGroupChannel`);
      console.log(e);
      return false;
    }
  }

  // SendBird Platform API - Group Channel

  async sendBirdInit() {
    return '성공!';
  }
}

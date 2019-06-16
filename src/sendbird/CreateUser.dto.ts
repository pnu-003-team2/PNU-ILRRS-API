export interface CreateUserReqDTO {
  user_id: string;
  nickname: string;
  profile_url: string;
  issue_access_token: boolean;
}

export interface CreateUserResDTO {
  user_id: string;
  nickname: string;
  profile_url: string;
  access_token: string;
}

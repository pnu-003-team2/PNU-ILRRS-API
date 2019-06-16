export interface CreateGroupChannelReqDTO {
  name: string;
  custom_type: string;
}

export interface CreateGroupChannelResDTO {
  name: string;
  channel_url: string;
  custom_type: string;
}

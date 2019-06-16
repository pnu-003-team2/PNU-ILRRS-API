import { ApiModelProperty } from '@nestjs/swagger';

export class UserInfoDTO {
  @ApiModelProperty({
    description: '학번',
  })
  id: string;

  @ApiModelProperty({
    description: '이름',
  })
  name: string;

  @ApiModelProperty({
    description: 'Sendbird Access Token',
  })
  sendbird_access_token: string;
}

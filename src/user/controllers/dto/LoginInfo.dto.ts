import { IsString, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginInfoDTO {
  @ApiModelProperty({
    maxLength: 9,
    minLength: 9,
    description: '학번',
  })
  @IsString()
  @Length(9)
  id: string;

  @ApiModelProperty({
    description: 'PLMS 비밀번호',
  })
  @IsString()
  password: string;
}

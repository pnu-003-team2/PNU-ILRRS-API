import { IsString, MinLength, Length } from 'class-validator';

export class LoginInfoDTO {

  @IsString()
  @Length(9)
  id: string;

  @IsString()
  password: string;
}

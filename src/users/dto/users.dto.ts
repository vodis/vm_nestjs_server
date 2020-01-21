import { IsString, IsDate, MinLength } from 'class-validator';

export class UpdatePasswordDTO {
  @IsString()
  @MinLength(6)
  oldPassword: string;

  @IsString()
  @MinLength(6)
  newPassword: string;

  @IsString()
  @MinLength(6)
  rePassword: string;
}

export class TokenPayloadDTO {
  @IsString()
  id: string;

  @IsDate()
  iat?: number;

  @IsDate()
  exp?: number;
}

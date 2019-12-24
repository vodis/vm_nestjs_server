import { IsString, MinLength } from 'class-validator';

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

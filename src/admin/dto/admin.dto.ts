import { IsString } from 'class-validator';

export class AdminDTO {
  @IsString()
  authorization: string;
}

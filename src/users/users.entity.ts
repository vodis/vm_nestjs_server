import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
import { IsEmail, MinLength, IsOptional } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { UPDATE } = CrudValidationGroups;
@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @IsOptional({ groups: [UPDATE] })
  @IsEmail()
  @Column()
  email?: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column()
  create_at: Date;

  @Column()
  update_at: Date;

  @Column()
  token: string;
}

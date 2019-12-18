import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import { IsEmail, IsDate } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsDate()
  create_at: Date;

  @Column()
  @IsDate()
  update_at: Date;

  @Column()
  token: string;
}

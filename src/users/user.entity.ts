import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  @IsEmail()
  email: string;

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

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Length, IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 25)
  firstName: string;

  @Column()
  @Length(3, 25)
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Length(6, 32)
  password: string;
}

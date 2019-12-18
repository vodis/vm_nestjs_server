import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

import * as bcrypt from 'bcryptjs';
import * as uuidv4 from 'uuid/v4';
import * as jwt from 'jsonwebtoken';
import tokenConfig from '../config/token.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(_id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'email', 'create_at', 'update_at'],
      where: [{ id: _id }],
    });
  }

  async createUser(user: User): Promise<User> {
    const isUserExist = await this.usersRepository.find({
      select: ['email'],
      where: [{ email: user.email }],
    });

    if (!!isUserExist.length) {
      throw new HttpException(
        'Email address already exists!',
        HttpStatus.FORBIDDEN,
      );
    }

    const _id = uuidv4();
    user.id = _id;
    user.token = jwt.sign(
      { _id },
      tokenConfig.secretKey,
      tokenConfig.expiryDate,
    );
    user.password = await bcrypt.hash(user.password, 8);
    user.create_at = new Date();
    user.update_at = new Date();

    return await this.usersRepository.save(user);
  }

  async updateUser(user: User) {
    this.usersRepository.save(user);
  }

  async deleteUser(user: User) {
    this.usersRepository.delete(user);
  }
}

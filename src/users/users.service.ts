import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

import * as uuidv4 from 'uuid/v4';
import * as jwt from 'jsonwebtoken';
import config from '../config/keys';

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
    const newUser = user;
    const _id = uuidv4();
    user.id = _id;
    user.token = jwt.sign({ _id }, config.secretKey);
    return await this.usersRepository.save(newUser);
  }

  async updateUser(user: User) {
    this.usersRepository.save(user);
  }

  async deleteUser(user: User) {
    this.usersRepository.delete(user);
  }
}

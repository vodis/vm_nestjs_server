import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

import * as bcrypt from 'bcryptjs';
import * as uuidv4 from 'uuid/v4';
import * as jwt from 'jsonwebtoken';
import tokenConfig from '../config/token.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'email', 'password'],
      where: [{ email }],
    });
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'create_at', 'update_at'],
    });
  }

  async getUserById(_id: string): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'email', 'create_at', 'update_at', 'token'],
      where: [{ id: _id }],
    });
  }

  async createUser(user: User): Promise<any> {
    const isUserExist = await this.usersRepository.find({
      select: ['email'],
      where: [{ email: user.email }],
    });

    if (!!isUserExist.length) {
      throw new HttpException(
        'Email address has already registered!',
        HttpStatus.FORBIDDEN,
      );
    }

    const _id = uuidv4();
    user.id = _id;
    user.token = await this.createToken(_id, undefined);
    user.password = await bcrypt.hash(user.password, 8);
    user.create_at = new Date();
    user.update_at = new Date();

    const { password, ...result } = await this.usersRepository.save(user);
    return result;
  }

  async updateToken(
    user: User,
    provideExpiryDate: object | undefined = tokenConfig.expiryDate,
  ): Promise<User> {
    user.token = await this.createToken(user.id, provideExpiryDate);
    user.update_at = new Date();
    return await this.usersRepository.save(user);
  }

  async updatePassword(id, oldPass, newPass, rePass) {
    const user = await this.usersRepository.findOne(id);

    const isMatch = await bcrypt.compare(oldPass, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Unable to change! Incorrect old password.',
        HttpStatus.FORBIDDEN,
      );
    }

    if (newPass !== rePass) {
      throw new HttpException(
        'Unable to change! Repeated password does not correspond new one.',
        HttpStatus.FORBIDDEN,
      );
    }

    user.password = await bcrypt.hash(newPass, 8);
    await this.usersRepository.save(user);
    return { id, message: 'Password is update!' };
  }

  async deleteUser(userId: string, bearerToken: string) {
    await this.compareTokenAndGetUser(userId, bearerToken);
    await this.usersRepository.delete(userId);
    return { id: userId, message: 'User deleted' };
  }

  async compareTokenAndGetUser(userId, bearerToken) {
    const user = await this.getUserById(userId);
    const isMatch = user[0].token === bearerToken.split(' ')[1];
    if (!isMatch) {
      throw new HttpException('Insufficiently rights', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  private async createToken(
    id: string,
    provideExpiryDate: object,
  ): Promise<string> {
    const token = jwt.sign({ id }, tokenConfig.secretKey, provideExpiryDate);
    return token;
  }
}

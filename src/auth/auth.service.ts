import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email, pass): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user.length) {
      throw new HttpException(
        'Unable to login! Email addresses does not exist.',
        HttpStatus.FORBIDDEN,
      );
    }

    const isMatch = await bcrypt.compare(pass, user[0].password);
    if (!isMatch) {
      throw new HttpException(
        'Unable to login! Incorrect password.',
        HttpStatus.FORBIDDEN,
      );
    }

    const { id, token } = await this.usersService.updateToken(user[0]);
    const decoded: any = jwt.decode(token);
    return {
      id,
      token,
      expiresAt: decoded.exp,
    };
  }

  async login(email, password) {
    const payload = { email, password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logoutUser(id: string, bearerToken: string) {
    const user = await this.usersService.compareTokenAndGetUser(
      id,
      bearerToken,
    );
    const provideDate = {
      expiresIn: '0 seconds',
    };
    return await this.usersService.updateToken(user[0], provideDate);
  }
}

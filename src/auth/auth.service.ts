import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (user && isMatch) {
      const { password, ...result } = await this.usersService.updateToken(
        user[0],
      );
      return result;
    }
    return null;
  }

  async login(email, password) {
    const payload = { email, password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

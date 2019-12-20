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
    const isMatch =
      user[0].password && (await bcrypt.compare(password, user[0].password));

    if (isMatch) {
      const [password, ...result] = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user[0].email, sub: user[0].id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

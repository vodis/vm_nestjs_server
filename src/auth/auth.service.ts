import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    const user = await this.usersService.findOne(email);
    const isMatch =
      user[0].password && (await bcrypt.compare(password, user[0].password));

    if (isMatch) {
      const [password, ...result] = user;
      return result;
    }
    return null;
  }
}

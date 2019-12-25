import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { User } from './users/users.entity';

@Injectable()
export class AppService {
  constructor(private usersService: UsersService) {}

  async updateToken(id: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (!user.length) {
      throw new HttpException('User id invalid.', HttpStatus.FORBIDDEN);
    }

    const { password, ...result } = await this.usersService.updateToken(
      user[0],
    );
    return result;
  }

  root(): Object {
    return {
      message: 'Server is up to running ..',
    };
  }
}
